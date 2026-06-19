/**
 * modelViewer.ts — all the Three.js glue, isolated here so:
 *  • the math (printCalc.ts) stays free of Three.js, and
 *  • this whole module (and Three.js with it) is lazy-loaded — the Calculator
 *    page only pulls it in when the first model is dropped.
 *
 * Responsibilities:
 *  • parse STL / OBJ / 3DS into a single merged, world-transformed geometry
 *    plus a flat position array for the volume math;
 *  • render that geometry with orbit controls, nice lighting and auto-framing.
 */

import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const SUPPORTED_EXTENSIONS = ['stl', 'obj', '3ds'] as const;
export type SupportedExtension = (typeof SUPPORTED_EXTENSIONS)[number];

export class UnsupportedFormatError extends Error {}
export class EmptyModelError extends Error {}

export interface ParsedModel {
  /** flat XYZ array (non-indexed, world-transformed) for the volume math */
  position: Float32Array;
  /** render-ready geometry (position + normals) in original coordinates */
  geometry: THREE.BufferGeometry;
}

function extensionOf(name: string): string {
  return name.slice(name.lastIndexOf('.') + 1).toLowerCase();
}

export function isSupportedFile(name: string): boolean {
  return (SUPPORTED_EXTENSIONS as readonly string[]).includes(extensionOf(name));
}

/** Pull world-transformed, non-indexed positions out of any Object3D tree. */
function collectPositions(root: THREE.Object3D): Float32Array {
  root.updateMatrixWorld(true);
  const chunks: Float32Array[] = [];
  let total = 0;

  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;

    let geo = mesh.geometry as THREE.BufferGeometry;
    if (geo.index) geo = geo.toNonIndexed();
    const pos = geo.getAttribute('position') as THREE.BufferAttribute | undefined;
    if (!pos) return;

    const m = mesh.matrixWorld.elements;
    const out = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      out[i * 3]     = m[0] * x + m[4] * y + m[8]  * z + m[12];
      out[i * 3 + 1] = m[1] * x + m[5] * y + m[9]  * z + m[13];
      out[i * 3 + 2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    }
    chunks.push(out);
    total += out.length;
  });

  const merged = new Float32Array(total);
  let offset = 0;
  for (const c of chunks) {
    merged.set(c, offset);
    offset += c.length;
  }
  return merged;
}

/** Parse a dropped/selected file into a renderable + measurable model. */
export async function parseModelFile(file: File): Promise<ParsedModel> {
  const ext = extensionOf(file.name);
  if (!isSupportedFile(file.name)) {
    throw new UnsupportedFormatError(ext);
  }

  const buffer = await file.arrayBuffer();
  let root: THREE.Object3D;

  if (ext === 'stl') {
    // STLLoader handles both binary and ASCII from an ArrayBuffer.
    const geometry = new STLLoader().parse(buffer);
    root = new THREE.Mesh(geometry);
  } else if (ext === 'obj') {
    const text = new TextDecoder().decode(buffer);
    root = new OBJLoader().parse(text);
  } else {
    // 3ds — textures are irrelevant for measuring/preview, so no resource path.
    root = new TDSLoader().parse(buffer, '');
  }

  const position = collectPositions(root);
  if (position.length < 9) {
    throw new EmptyModelError(file.name);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  return { position, geometry };
}

/* ------------------------------------------------------------------------- */
/*  Interactive viewer                                                        */
/* ------------------------------------------------------------------------- */

const BRAND_ORANGE = 0xf59222;

export class ModelViewer {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private material: THREE.MeshStandardMaterial;
  private mesh: THREE.Mesh | null = null;
  private resizeObserver: ResizeObserver;
  private rafId = 0;
  private disposed = false;

  constructor(private canvas: HTMLCanvasElement, modelColor: number = BRAND_ORANGE) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
    this.camera.position.set(60, 45, 80);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 1.4;
    this.controls.enablePan = false;
    // stop the idle spin as soon as the user grabs the model
    this.controls.addEventListener('start', () => {
      this.controls.autoRotate = false;
    });

    // lighting — tuned for MeshStandardMaterial without an env map
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const hemi = new THREE.HemisphereLight(0xffffff, 0x8d6e63, 0.8);
    this.scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(1, 1.4, 1);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.6);
    fill.position.set(-1, 0.4, -1);
    this.scene.add(fill);

    this.material = new THREE.MeshStandardMaterial({
      color: modelColor,
      metalness: 0.1,
      roughness: 0.62,
    });

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.resize();

    const loop = () => {
      if (this.disposed) return;
      this.rafId = requestAnimationFrame(loop);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  /** Replace the displayed model and re-frame the camera. */
  setGeometry(geometry: THREE.BufferGeometry): void {
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
    }
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);
    this.controls.autoRotate = true;
    this.frame(geometry);
  }

  private frame(geometry: THREE.BufferGeometry): void {
    if (!geometry.boundingSphere) geometry.computeBoundingSphere();
    const sphere = geometry.boundingSphere!;
    const radius = sphere.radius || 1;

    this.controls.target.copy(sphere.center);

    const fov = (this.camera.fov * Math.PI) / 180;
    const distance = (radius / Math.sin(fov / 2)) * 1.25;
    const dir = new THREE.Vector3(0.8, 0.6, 1).normalize();
    this.camera.position.copy(sphere.center).addScaledVector(dir, distance);

    this.camera.near = Math.max(radius / 100, 0.01);
    this.camera.far = distance + radius * 10;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  private resize(): void {
    const w = this.canvas.clientWidth || 1;
    const h = this.canvas.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    this.resizeObserver.disconnect();
    this.controls.dispose();
    if (this.mesh) this.mesh.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }
}
