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
    infoHeading: string;
    ownerName: string;
    ownerInfo: string;
    address1: string;
    address2: string;
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
