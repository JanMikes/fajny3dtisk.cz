export interface Translations {
  // Language metadata
  lang: string;
  locale: string;

  // Navigation
  nav: {
    logoAlt: string;
    brandName: string;
    whyMe: string;
    materials: string;
    howItWorks: string;
    gallery: string;
    reviews: string;
    faq: string;
    contact: string;
    calculator: string;
  };

  // Holiday / vacation announcement banner (optional — remove to hide sitewide)
  banner?: {
    title: string;
    dates: string;
    text: string;
  };

  // Hero Section
  hero: {
    logoAlt: string;
    heading: string;
    location: string;
    subheading: string;
    cta: string;
    backgroundAlt: string;
  };

  // Team Section
  team: {
    heading: string;
    subheading: string;
    intro: string;
    michal: {
      name: string;
      role: string;
      description: string;
      imageAlt: string;
    };
    sabina: {
      name: string;
      role: string;
      description: string;
      imageAlt: string;
    };
    frank: {
      name: string;
      role: string;
      description: string;
      imageAlt: string;
    };
  };

  // Why Choose Us Section
  whyUs: {
    heading: string;
    features: {
      variability: {
        title: string;
        description: string;
      };
      speed: {
        title: string;
        description: string;
      };
      friendliness: {
        title: string;
        description: string;
      };
      consulting: {
        title: string;
        description: string;
      };
    };
    pricingNote?: string;
  };

  // Materials Section
  materials: {
    heading: string;
    subheading: string;
    intro: string;
    pla: {
      title: string;
      description: string;
    };
    petg: {
      title: string;
      description: string;
    };
    tpu: {
      title: string;
      description: string;
    };
    asa: {
      title: string;
      description: string;
    };
    abs: {
      title: string;
      description: string;
    };
    pc: {
      title: string;
      description: string;
    };
    colorsNote: string;
  };

  // Process Section
  process: {
    heading: string;
    subheading: string;
    ownModel: {
      title: string;
      description: string;
    };
    haveIdea: {
      title: string;
      description: string;
    };
    calculation: {
      title: string;
      description: string;
    };
    printing: {
      title: string;
      description: string;
    };
    delivery: {
      title: string;
      description: string;
    };
  };

  // Gallery Section
  gallery: {
    heading: string;
    subheading: string;
    imageAlt: string;
    instagramText: string;
    instagramLink: string;
  };

  // Testimonials Section
  testimonials: {
    heading: string;
    subheading: string;
    swipeHint: string;
    ctaText: string;
    ctaButton: string;
  };

  // FAQ Section
  faq: {
    heading: string;
    subheading: string;
    questions: {
      whatIs3dPrint: {
        question: string;
        answer: string;
      };
      materials: {
        question: string;
        answer: string;
      };
      delivery: {
        question: string;
        answer: string;
      };
      speed: {
        question: string;
        answer: string;
      };
      pricing: {
        question: string;
        answer: string;
      };
      size: {
        question: string;
        answer: string;
      };
      noModel: {
        question: string;
        answer: string;
      };
    };
  };

  // Contact Section
  contact: {
    heading: string;
    subheading: string;
    intro: string;
    minimumPriceLabel?: string;
    minimumPriceText?: string;
    infoHeading: string;
    ownerName: string;
    ownerInfo: string;
    whatsappHint: string;
    whatsappButton: string;
    whatsappPrefill: string;
    quickResponseLabel: string;
    quickResponseText: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitButton: string;
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      errorMessage: string;
    };
  };

  // Calculator (price estimator page)
  calculator: {
    seo: { title: string; description: string };
    pageTitle: string;
    pageSubtitle: string;
    badgeEstimate: string;
    dropzone: {
      title: string;
      hint: string;
      formats: string;
      privacy: string;
      button: string;
      loadAnother: string;
      loading: string;
      /** pill over the 3D preview, until the visitor first touches it */
      viewerHint: string;
      /** accessible name of the 3D preview canvas */
      viewerLabel: string;
    };
    errors: {
      unsupported: string;
      parse: string;
      tooBig: string;
    };
    controls: {
      heading: string;
      materialLabel: string;
      /** option text per material id: name + what it is good for */
      materials: Record<string, string>;
      infillLabel: string;
      infillHint: string;
      /** shown when changing infill cannot move this model's price */
      infillNoEffect: string;
      quantityLabel: string;
      quantityDecrease: string;
      quantityIncrease: string;
      /** {max} = highest quantity the calculator accepts */
      quantityMaxNote: string;
      advancedToggle: string;
      qualityLabel: string;
      quality: { draft: string; standard: string; fine: string };
      wallCountLabel: string;
      wallCountHint: string;
    };
    results: {
      heading: string;
      dimensions: string;
      volume: string;
      /** label of the combined size + volume tile */
      model: string;
      weight: string;
      time: string;
      pricePerPiece: string;
      total: string;
      emptyHint: string;
      perPieceSuffix: string;
      /** caption above the price: what the number covers */
      scope: string;
      /** line under the price: what it leaves out */
      scopeNote: string;
      breakdownMaterial: string;
      breakdownPrinting: string;
      /** the row that is deliberately NOT priced */
      breakdownManual: string;
      byAgreement: string;
      /** labels for the price split in the quote summary */
      materialPrice: string;
      printingPrice: string;
      /** order minimum applies; {raw} = material + printing, {min} = the minimum */
      minOrderExplain: string;
      minTopUp: string;
      /** {n} = how many pieces the minimum order price would cover */
      samePriceHint: string;
      /** order does not fit one plate; {n} = number of plates */
      platesNote: string;
      /** always-visible note under the weight/time tiles: these are estimates, a real slice will adjust them */
      slicerNote: string;
      /** screen-reader announcement; {price}, {qty} */
      status: string;
    };
    warnings: {
      notWatertight: string;
      exceedsBed: string;
      tiny: string;
    };
    disclaimer: {
      /** heading of the "what is not included" box */
      scopeTitle: string;
      callout: string;
      priceNote: string;
      howTitle: string;
      howText: string;
    };
    quote: {
      cta: string;
      heading: string;
      intro: string;
      /** small reassurance line under the CTA */
      ctaNote: string;
      /** CTA label before any model is loaded */
      ctaNoModel: string;
      /** how to get the model file to Michal (it is never uploaded) */
      fileNote: string;
      callText: string;
      whatsappText: string;
      specsHeading: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      noteLabel: string;
      notePlaceholder: string;
      submit: string;
      sending: string;
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      errorMessage: string;
      messageHeader: string;
    };
    units: { pieces: string };
    homeCta: {
      badge: string;
      title: string;
      subtitle: string;
      button: string;
      note: string;
    };
    heroButton: string;
  };

  // Footer
  footer: {
    aboutHeading: string;
    aboutText: string;
    servicesHeading: string;
    services: {
      printing: string;
      fastDelivery: string;
      modeling: string;
      shipping: string;
      pickup: string;
      consulting: string;
    };
    whyUsHeading: string;
    whyUsText: string;
    tagline: string;
    copyright: string;
  };

  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
  };

  // Structured Data (JSON-LD)
  structuredData: {
    businessName: string;
    alternateName: string;
    description: string;
    countryName: string;
    offerCatalogName: string;
    services: {
      pla: {
        name: string;
        description: string;
      };
      petg: {
        name: string;
        description: string;
      };
      tpu: {
        name: string;
        description: string;
      };
      asa: {
        name: string;
        description: string;
      };
      abs: {
        name: string;
        description: string;
      };
      pc: {
        name: string;
        description: string;
      };
      modeling: {
        name: string;
        description: string;
      };
    };
    founderJobTitle: string;
  };
}
