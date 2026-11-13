import type { Translations } from './types';

export const cs: Translations = {
  lang: 'cs',
  locale: 'cs_CZ',

  nav: {
    logoAlt: 'Fajný 3D tisk logo',
    brandName: 'Fajný 3D tisk',
    whyMe: 'Proč já?',
    materials: 'Materiály',
    howItWorks: 'Jak to funguje',
    gallery: 'Ukázky',
    reviews: 'Recenze',
    faq: 'FAQ',
    contact: 'Kontakt',
    calculator: 'Kalkulačka',
  },


  calculator: {
    seo: {
      title: 'Kalkulačka ceny 3D tisku online | Fajný 3D tisk Frýdek-Místek',
      description: 'Spočítejte si orientační cenu 3D tisku zdarma a online. Nahrajte model (STL, OBJ, 3DS), prohlédněte si ho ve 3D a hned uvidíte, kolik přibližně stojí materiál a tisk. Vše běží přímo ve vašem prohlížeči.',
    },
    pageTitle: 'Kalkulačka ceny 3D tisku',
    pageSubtitle: 'Nahrajte model a hned uvidíte, kolik přibližně bude stát materiál a tisk. Ruční práci a modelování domlouvám zvlášť, závaznou cenu vám potvrdím po kontrole modelu.',
    badgeEstimate: 'Orientační odhad',
    dropzone: {
      title: 'Nahrajte 3D model',
      hint: 'Přetáhněte ho sem, nebo vyberte soubor ze zařízení',
      formats: 'STL · OBJ · 3DS — max 50 MB',
      privacy: 'Váš soubor zůstává jen ve vašem prohlížeči. Nikam se nenahrává ani neodesílá.',
      button: 'Vybrat soubor',
      loadAnother: 'Nahrát jiný model',
      loading: 'Načítám a počítám model…',
      viewerHint: 'Otáčejte tažením',
      viewerLabel: 'Otočný 3D náhled nahraného modelu',
    },
    errors: {
      unsupported: 'Tento formát neumím načíst. Použijte prosím STL, OBJ nebo 3DS.',
      parse: 'Model se nepodařilo načíst. Zkuste prosím jiný soubor nebo mě rovnou kontaktujte.',
      tooBig: 'Soubor je příliš velký (max 50 MB). Zkuste model zmenšit nebo mi ho pošlete e-mailem.',
    },
    controls: {
      heading: 'Nastavení tisku',
      materialLabel: 'Materiál',
      materials: {
        pla: 'PLA — figurky a prototypy',
        petg: 'PETG — mechanické díly',
        asa: 'ASA — na ven, odolá slunci',
        tpu: 'TPU — pružné díly, těsnění',
        abs: 'ABS — snese vyšší teploty',
        pc: 'PC — extrémně pevný',
      },
      infillLabel: 'Výplň',
      infillHint: 'Vnitřek se netiskne plný. 15 % stačí na většinu věcí, víc dejte na namáhané díly.',
      infillNoEffect: 'Tento model je tenkostěnný a tiskne se skoro plný — výplň cenu nezmění.',
      quantityLabel: 'Počet kusů',
      quantityDecrease: 'O kus méně',
      quantityIncrease: 'O kus více',
      quantityMaxNote: 'Kalkulačka počítá nejvýš {max} kusů. U větších sérií mi raději rovnou napište.',
      advancedToggle: 'Pokročilé nastavení',
      qualityLabel: 'Kvalita tisku',
      quality: {
        draft: 'Hrubá — vrstva 0,28 mm (rychlá)',
        standard: 'Standardní — vrstva 0,2 mm',
        fine: 'Jemná — vrstva 0,12 mm (hladší, pomalá)',
      },
      wallCountLabel: 'Počet obvodových stěn',
      wallCountHint: 'Víc stěn = pevnější a těžší díl. Běžně 2–4.',
    },
    results: {
      heading: 'Váš odhad',
      dimensions: 'Rozměry',
      volume: 'Objem',
      model: 'Rozměry a objem',
      weight: 'Hmotnost',
      time: 'Doba tisku',
      pricePerPiece: 'Cena za kus',
      total: 'Celkem za materiál a tisk',
      emptyHint: 'Nahrajte model a hned uvidíte rozměry, hmotnost, dobu tisku a orientační cenu materiálu a tisku.',
      perPieceSuffix: '/ ks',
      scope: 'Cena za materiál a tisk',
      scopeNote: 'bez ruční práce a modelování — ty domlouvám zvlášť',
      breakdownMaterial: 'Materiál',
      breakdownPrinting: 'Čas tiskárny',
      breakdownManual: 'Ruční práce a modelování',
      byAgreement: 'dohodou',
      materialPrice: 'Cena materiálu',
      printingPrice: 'Cena tisku',
      minOrderExplain: 'Materiál a tisk by vyšly na {raw}, nejnižší cena objednávky je ale {min}.',
      minTopUp: 'Doplatek do minimální objednávky',
      samePriceHint: 'Za stejnou cenu vytisknu až {n} ks.',
      platesNote: 'Kusy se nevejdou na jednu tiskovou desku, vytisknu je na {n}× — v ceně už je to započítané.',
      status: 'Odhad {price} za materiál a tisk, počet kusů: {qty}.',
    },
    warnings: {
      notWatertight: 'Model nejspíš není uzavřený (vodotěsný), takže odhad objemu může být nepřesný. Pro jistotu mě kontaktujte.',
      exceedsBed: 'Model je větší než tisková plocha 256 × 256 × 256 mm. Půjde nejspíš rozdělit na části — ozvěte se mi.',
      tiny: 'Model je velmi malý — zkontrolujte prosím, že je v milimetrech.',
    },
    disclaimer: {
      scopeTitle: 'Ruční práce a modelování se domlouvají zvlášť',
      callout: 'Příprava tisku, odstranění podpěr, začištění, úpravy modelu ani modelování na zakázku v odhadu nejsou. Jejich cenu vám vždy řeknu předem.',
      priceNote: 'I cena materiálu a tisku je orientační: počítám ji z tvaru modelu, ne z ostrého slicování, takže se může lišit podle orientace dílu a podpěr. Závaznou cenu vám potvrdím po kontrole modelu.',
      howTitle: 'Jak se cena počítá?',
      howText: 'Z tvaru modelu odhadnu, kolik plastu se spotřebuje (stěny, plné vrstvy a výplň) a jak dlouho bude tiskárna tisknout. Cena je součet materiálu a času tiskárny. U více kusů počítám s tím, že se tisknou společně. Není to plnohodnotný slicer, takže výsledek berte jako odhad, ne jako závaznou nabídku.',
    },
    quote: {
      cta: 'Chci přesnou cenu',
      ctaNote: 'Nezávazně — ozvu se vám e-mailem.',
      ctaNoModel: 'Nemáte model? Napište mi',
      heading: 'Nezávazná poptávka',
      intro: 'Pošlete mi poptávku a já se vám ozvu s přesnou cenou včetně případné ruční práce a s termínem.',
      fileNote: 'Soubor modelu se s formulářem neposílá — zůstává ve vašem prohlížeči. Pošlete mi ho prosím na michal@fajny3dtisk.cz, nebo ho přiložte k odpovědi na můj e-mail.',
      callText: 'Raději zavoláte?',
      specsHeading: 'Shrnutí modelu',
      nameLabel: 'Jméno',
      namePlaceholder: 'Vaše jméno',
      emailLabel: 'E-mail',
      emailPlaceholder: 'vas@email.cz',
      phoneLabel: 'Telefon (nepovinné)',
      phonePlaceholder: '+420 …',
      noteLabel: 'Poznámka',
      notePlaceholder: 'Barva, termín, počet kusů, na co model bude…',
      submit: 'Odeslat poptávku',
      sending: 'Odesílám…',
      successTitle: 'Děkuji, poptávka dorazila!',
      successMessage: 'Ozvu se vám co nejdříve s přesnou cenou. Soubor modelu mi prosím pošlete na michal@fajny3dtisk.cz.',
      errorTitle: 'Odeslání se nepovedlo',
      errorMessage: 'Zkuste to prosím znovu, nebo mi napište přímo na michal@fajny3dtisk.cz či zavolejte na +420 702 887 319.',
      messageHeader: 'Poptávka z kalkulačky ceny 3D tisku',
    },
    units: { pieces: 'ks' },
    homeCta: {
      badge: 'Novinka',
      title: 'Spočítejte si cenu tisku online',
      subtitle: 'Nahrajte svůj 3D model (STL, OBJ nebo 3DS), prohlédněte si ho ve 3D a získejte okamžitý orientační odhad ceny — přímo v prohlížeči, bez registrace.',
      button: 'Spustit kalkulačku',
      note: 'Orientační cena materiálu a tisku — přesnou cenu potvrdím po kontrole modelu.',
    },
    heroButton: 'Spočítat cenu',
  },

  hero: {
    logoAlt: 'Fajný 3D tisk - Profesionální 3D tisk ve Frýdku-Místku logo',
    heading: 'Fajný 3D tisk',
    location: 've Frýdku-Místku',
    subheading: 'Mám 3D tiskárnu, manželku Sabinu a psa Franka. V žilách mi nejspíš místo krve teče PLA.\nTak to jsem já, Michal z Frýdku-Místku. Vítejte v mém království 3d tisku!',
    cta: 'Chci něco vytisknout!',
    backgroundAlt: '3D tisk pozadí - Fajný 3D tisk Frýdek-Místek',
  },

  team: {
    heading: 'Kdo za tím stojí?',
    subheading: 'Jak funguje 3D tisk ve Frýdku-Místku?',
    intro: 'Ahoj, já jsem Michal – přes den běžný smrtelník, co tvrdě pracuje a honí přesčasy, ale po práci… no dobře, většina lidí odpočívá. Já zapínám tiskárnu a nechávám ji jet bomby až do noci. Sabča zatím balí hotové výtisky a pospíchá s nimi do Zásilkovny, Frank na to všechno dohlíží spokojeným vrtěním ocasu s občasným štěknutím potvrzujícím kvalitu. Jsme prostě rodinné 3D tisk kombo, které vám s radostí pomůže i s nejmenší zakázkou, nad kterou velká studia ohrnou nos. Jsme z Frýdku-Místku, ale expedujeme samozřejmě po celé České Republice!',
    michal: {
      name: 'Michal',
      role: 'Váš 3D tiskař',
      description: 'Jsem ten, kdo po večerech místo spaní modeluje a tiskne – a v noci si dokonce stavím budík, abych zkontroloval vrstvy. Kdyby náhodou tisk selhal, radši obětuju polštář než kvalitu!',
      imageAlt: 'Michal Trněný - profesionální 3D tiskář ve Frýdku-Místku, majitel Fajný 3D tisk',
    },
    sabina: {
      name: 'Sabina',
      role: 'Balící ninja',
      description: 'Moje lepší polovička, která každý výtisk zabalí rychlostí fotonu a utíká s balíkem do Zásilkovny. Nejvíc ji baví vaše nadšené recenze – pokaždé si je čte nahlas a já získám klidné spaní.',
      imageAlt: 'Sabina - balení a expedice 3D tisků Fajný 3D tisk Frýdek-Místek',
    },
    frank: {
      name: 'Frank',
      role: 'Psí kontrolor kvality',
      description: 'Náš čtyřnohý fanoušek, který hypnotizuje tiskárnu, dokud neuzná, že odvedla fajnou práci. Občas nám něco sežere, takže tiskneme znovu. Když v balíčku najdete psí chlup, berte to jako Frankův podpis – bonus zdarma.',
      imageAlt: 'Frank - psí kontrolor kvality 3D tisku ve Frýdku-Místku',
    },
  },

  whyUs: {
    heading: 'Proč zvolit 3D tisk\nve Frýdku-Místku právě u nás?',
    features: {
      variability: {
        title: 'Variabilita',
        description: 'Od drobných ozubených koleček až po sochu vaší kočky v životní velikosti. Malosériová výroba? Jednotlivý prototyp? Jsem váš člověk.',
      },
      speed: {
        title: 'Rychlost',
        description: 'Průměrně tisknu a posílám do 48 h. Když na tom fakt visí budoucnost vesmíru, zvládnu i expres do 24 h.',
      },
      friendliness: {
        title: 'Vstřícnost',
        description: 'Tisk je koníček, ne otrava. Proto se k vám chovám lidsky, radím, vysvětluji a kafe k tomu klidně přidám.',
      },
      consulting: {
        title: 'Poradenství',
        description: 'Nejste si jistí materiálem, nastavením nebo vůbec ničím? Pošlete mi model a společně ho doladíme, aby výsledek byl fajný.',
      },
    },
    pricingNote: 'Každého zákazníka beru individuálně – cenu počítám na míru podle materiálu, složitosti a post-processingu. Snažím se o nejvyšší kvalitu za nejlepší cenu!',
  },

  materials: {
    heading: '3D tisk materiály:',
    subheading: 'PLA, PETG, TPU, ASA, ABS a PC',
    intro: 'Aktuálně tisknu z šesti druhů materiálů: PLA, PETG, TPU, ASA, ABS a PC. Tisková plocha má sympatických 256 × 256 × 256 mm, takže běžné krabičky, držáky či roztomilé kosmické lodě nejsou problém.',
    pla: {
      title: 'PLA',
      description: 'Ideální na figurky, šperky, prototypy a drobné marketingové předměty. Skvěle vypadá a tisknout s ním je radost.',
    },
    petg: {
      title: 'PETG',
      description: 'Držáky, mechanické díly, vodotěsné nádoby a cokoli, co potřebuje vydržet vyšší teploty. Trochu houževnatosti nikoho ještě nezabilo.',
    },
    tpu: {
      title: 'TPU',
      description: 'TPU filament je pružný a odolný materiál, který se hodí na tisk věcí, co se mají ohýbat nebo tlumit nárazy, jako jsou těsnění, pouzdra na telefon nebo gumové nožičky. Díky své elasticitě se neláme a vydrží i náročné používání.',
    },
    asa: {
      title: 'ASA',
      description: 'ASA filament je pevný a odolný vůči slunečnímu záření a počasí, takže je ideální pro venkovní použití – třeba na kryty, držáky nebo díly do auta. Navíc si dlouho udrží barvu a tvar i na přímém slunci.',
    },
    abs: {
      title: 'ABS',
      description: 'ABS filament je houževnatý a odolný plast, který se používá pro funkční díly, náhradní součástky nebo modely vystavené vyšším teplotám. Je pevnější než běžný PLA.',
    },
    pc: {
      title: 'PC',
      description: 'PC filament je extrémně pevný a teplotně odolný materiál vhodný pro technické a mechanicky namáhané díly. Hodí se tam, kde je potřeba vysoká odolnost vůči nárazům a teplu.',
    },
    colorsNote: 'Barvy? Základní mám skladem, speciální odstíny rád doobjednám. Mnohobarevný tisk? Ano! Nová tiskárna to zvládá na jedničku.',
  },

  process: {
    heading: 'Jak funguje naše služba\n3D tisku ve Frýdku-Místku?',
    subheading: 'Od prvního kontaktu k hotovému výtisku',
    ownModel: {
      title: 'Vlastní Model',
      description: 'Máte vlastní 3D soubor? Pošlete mi STL, 3MF, STEP/STP nebo OBJ.',
    },
    haveIdea: {
      title: 'Mám nápad',
      description: 'Nemáte nic? Nevadí! V databázích vyhledám hotový model, nebo vám ho podle domluvy vymodeluji na míru.',
    },
    calculation: {
      title: 'Kalkulace',
      description: 'Do 48 h víte cenu, materiál i termín - ať už přicházíte s modelem nebo jen nápadem.',
    },
    printing: {
      title: 'Tiskneme',
      description: 'Já kouzlím s filamentem, Frank hlídá, Sabina připravuje balící rituál.',
    },
    delivery: {
      title: 'Doručení',
      description: 'Osobně, Zásilkovnou nebo Balíkovnou. Za pár dní držíte plastový sen v ruce.',
    },
  },

  gallery: {
    heading: 'Ukázky 3D tisků',
    subheading: 'z naší dílny ve Frýdku-Místku',
    imageAlt: '3D tisk ukázka',
    instagramText: 'Více fotek a Frankovy recenze najdete na mém Instagramu –',
    instagramLink: 'mrkněte sem',
  },

  testimonials: {
    heading: 'Co říkají naši zákazníci?',
    subheading: 'Garantujeme 100% spokojenost!',
    swipeHint: 'Přejeďte prstem',
    ctaText: 'Tiskli jsme i pro vás? Napište nám prosím recenzi.',
    ctaButton: 'Napsat recenzi na Google',
  },

  faq: {
    heading: 'Často kladené otázky',
    subheading: 'o 3D tisku ve Frýdku-Místku',
    questions: {
      whatIs3dPrint: {
        question: 'Co vlastně 3D tisk je?',
        answer: '3D tisk je jako kouzelná pekárna pro plastové věci! Místo mouky používám roztavený plast (PLA nebo PETG), který vrstva po vrstvě "peču" do požadovaného tvaru. Ve Frýdku-Místku máme jednu z nejmodernějších 3D tiskáren v okolí – dokáže vytvořit téměř cokoliv, co si dokážete představit!',
      },
      materials: {
        question: 'Jaké materiály používáme pro 3D tisk?',
        answer: 'Tiskneme ze šesti materiálů: PLA (perfektní pro dekorativní věci, hračky, prototypy), PETG (odolnější, snese vyšší teploty), TPU (pružný a odolný), ASA (venkovní použití, UV odolný), ABS (houževnatý, tepelně odolný) a PC neboli polykarbonát (extrémně pevný a žáruvzdorný). V našem skladu ve Frýdku-Místku máme základní barvy po ruce, speciální odstíny rád objednám!',
      },
      delivery: {
        question: 'Kam 3D tisk dodáváme?',
        answer: 'I když jsme z Frýdku-Místku, expedujeme po celé České republice a také na Slovensko, do Polska a Německa! Zásilkovna, Balíkovna nebo osobní předání – jak chcete. Místní zákazníci z Frýdku-Místku, Ostravy, Havířova, Třince a okolí si mohou výtisky vyzvednout přímo u nás!',
      },
      speed: {
        question: 'Jak rychlý je 3D tisk?',
        answer: 'Na rozdíl od velkých firem, kde čekáte týdny, u nás ve Frýdku-Místku tiskneme express! Běžně do 48 hodin, a když opravdu hoří, zvládnu express za 24 hodin. Frank zatím hlídá, aby se tiskárna nezastavila, a Sabina už připravuje balení.',
      },
      pricing: {
        question: 'Kolik stojí 3D tisk?',
        answer: 'Každý tisk je originál, takže i cena je vždy na míru! Závisí na spotřebě materiálu, typu plastu, délce tisku a případném post-processingu (odstraňování podpor, lepení a podobné lahůdky). Minimální cena zakázky je 250 Kč – i kdyby to byla kostička velikosti hrášku, příprava a Frankova kontrola kvality si své vyžádají. Nebojte, přesnou cenu vám spočítám do 48 hodin!',
      },
      size: {
        question: 'Jak velké věci dokážeme vytisknout?',
        answer: 'Naše 3D tiskárna zvládne rozměry 256×256×256 mm. To znamená, že vytiskneme prakticky cokoliv od miniaturních šperků po větší držáky či krabičky. Potřebujete něco většího? Rozdělíme model na části a pak ho slepíme!',
      },
      noModel: {
        question: 'Nemám 3D model – pomůžete?',
        answer: 'Jasně! Buď vám najdu hotový model z databází, nebo podle dohody navrhnu úplně nový na míru. Stačí mi říct, co potřebujete, a já vymyslím, jak to ve Frýdku-Místku rychle a kvalitně vytisknout!',
      },
    },
  },

  contact: {
    heading: 'Kontakt',
    subheading: 'na 3D tisk Frýdek-Místek',
    intro: 'Máte nápad? Chcete rychlou cenovku? Vyplňte formulář a já se vám ozvu rychlostí roztaveného filamentu. Jsme sice z Frýdku-Místku, zásilku vám ale pošleme kamkoliv! Obsluhujeme Ostravu, Havířov, Třinec, Český Těšín a celý Moravskoslezský kraj.',
    minimumPriceLabel: 'Minimální cena:',
    minimumPriceText: 'Minimální cena zakázky je 250 Kč.',
    infoHeading: 'Kontaktní informace',
    ownerName: 'Michal Trněný',
    ownerInfo: 'IČ 14406713 – nejsem plátce DPH',
    address1: 'Jana Čapka 3081',
    address2: '738 01 Frýdek-Místek',
    quickResponseLabel: 'Rychlá odezva:',
    quickResponseText: 'Na dotazy odpovídám běžně do 24 hodin, často i rychleji. Frank zatím hlídá, aby nic neuniklo!',
    form: {
      nameLabel: 'Jméno',
      namePlaceholder: 'Jan Novák',
      emailLabel: 'E-mail',
      emailPlaceholder: 'jan.novak@example.com',
      phoneLabel: 'Telefon (volitelné)',
      phonePlaceholder: '+420 777 666 555',
      messageLabel: 'Zpráva',
      messagePlaceholder: 'Co potřebujete vytisknout?',
      submitButton: 'Odeslat poptávku',
      successTitle: 'Děkujeme!',
      successMessage: 'Vaše zpráva byla úspěšně odeslána. Ozveme se vám co nejdříve!',
      errorTitle: 'Chyba',
      errorMessage: 'Došlo k chybě při odesílání zprávy. Zkuste to prosím znovu nebo nás kontaktujte přímo na email.',
    },
  },

  footer: {
    aboutHeading: '3D tisk Frýdek-Místek',
    aboutText: 'Fajný 3D tisk je rodinná služba specializující se na rychlý a kvalitní 3D tisk ve Frýdku-Místku a okolí. Tiskneme ze šesti různých materiálů (PLA, PETG, TPU, ASA, ABS, PC) s expresním dodáním do 48 hodin.',
    servicesHeading: 'Naše služby 3D tisku',
    services: {
      printing: '3D tisk na zakázku',
      fastDelivery: 'Rychlé dodání do 48h',
      modeling: '3D modelování na míru',
      shipping: 'Expedice po celé ČR',
      pickup: 'Osobní odběr Frýdek-Místek',
      consulting: 'Poradenství zdarma',
    },
    whyUsHeading: 'Proč 3D tisk u nás?',
    whyUsText: 'Ve Frýdku-Místku nabízíme nejrychlejší 3D tisk v regionu. Naše moderní 3D tiskárna dokáže zpracovat jakýkoliv projekt – od jednoduchých prototypů po složité mechanické díly.',
    tagline: 'Plastové (3D Tisk) sny na počkání',
    copyright: 'Michal Trněný © {year} | Fajný 3D tisk | Frýdek-Místek | 3D tisk na zakázku | PLA PETG TPU ASA ABS PC materiály',
  },

  seo: {
    title: '3D tisk Frýdek-Místek | Rychlý 3D tisk na zakázku | Fajný 3D tisk',
    description: 'Profesionální 3D tisk na zakázku ve Frýdku-Místku a okolí. Rychlý 3D tisk z PLA a PETG do 48h. Osobní přístup, kvalitní výsledky a rychlé dodání po celé ČR.',
    keywords: '3D tisk, Frýdek-Místek, 3D tiskárna, PLA, PETG, 3D tisk na zakázku, rychlý 3D tisk, Ostrava, Havířov, Třinec',
    ogTitle: '3D tisk Frýdek-Místek | Rychlý 3D tisk na zakázku | Fajný 3D tisk',
    ogDescription: 'Profesionální 3D tisk na zakázku ve Frýdku-Místku a okolí. Rychlý 3D tisk z PLA a PETG do 48h. Osobní přístup, kvalitní výsledky a rychlé dodání po celé ČR.',
    ogImageAlt: 'Fajný 3D tisk - Profesionální 3D tiskové služby ve Frýdku-Místku',
  },

  structuredData: {
    businessName: 'Fajný 3D tisk',
    alternateName: 'Fajný 3D tisk Frýdek-Místek',
    description: 'Profesionální 3D tisk na zakázku ve Frýdku-Místku a okolí. Rychlý 3D tisk ze šesti materiálů (PLA, PETG, TPU, ASA, ABS, PC) do 48h s osobním přístupem a kvalitními výsledky.',
    countryName: 'Česká republika',
    offerCatalogName: '3D tiskové služby',
    services: {
      pla: {
        name: '3D tisk z PLA',
        description: '3D tisk z PLA materiálu - ideální pro figurky, šperky, prototypy a dekorativní předměty',
      },
      petg: {
        name: '3D tisk z PETG',
        description: '3D tisk z PETG materiálu - odolný materiál vhodný pro mechanické díly a funkční prototypy',
      },
      tpu: {
        name: '3D tisk z TPU',
        description: '3D tisk z TPU materiálu - pružný a odolný materiál pro těsnění, pouzdra a tlumící díly',
      },
      asa: {
        name: '3D tisk z ASA',
        description: '3D tisk z ASA materiálu - UV odolný materiál pro venkovní použití a náročné podmínky',
      },
      abs: {
        name: '3D tisk z ABS',
        description: '3D tisk z ABS materiálu - houževnatý a tepelně odolný materiál pro funkční díly',
      },
      pc: {
        name: '3D tisk z PC (polykarbonát)',
        description: '3D tisk z polykarbonátu - extrémně pevný a žáruvzdorný materiál pro náročné aplikace',
      },
      modeling: {
        name: '3D modelování',
        description: 'Návrh a vytvoření 3D modelů na zakázku podle vašich požadavků',
      },
    },
    founderJobTitle: '3D tiskař a majitel',
  },
};
