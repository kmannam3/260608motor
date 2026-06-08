export type Language = 'KO' | 'EN';

export interface ConsultationSubmission {
  name: string;
  contact: string;
  specs: string;
  consent: boolean;
}

export interface TranslationSet {
  header: {
    products: string;
    types: string;
    strengths: string;
    applications: string;
    contact: string;
  };
  hero: {
    tag: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  advantages: {
    tag: string;
    title: string;
    subtitle: string;
    list: {
      customization: {
        title: string;
        desc: string;
      };
      energy: {
        title: string;
        desc: string;
      };
      reliability: {
        title: string;
        desc: string;
      };
    };
  };
  products: {
    tag: string;
    title: string;
    list: {
      lvhv: {
        title: string;
        tag: string;
        desc: string;
      };
      explosion: {
        title: string;
        tag: string;
        desc: string;
      };
      pm: {
        title: string;
        tag: string;
        desc: string;
      };
    };
    specsLink: string;
  };
  impact: {
    tag: string;
    title: string;
    list: {
      pumps: {
        title: string;
        desc: string;
      };
      automation: {
        title: string;
        desc: string;
      };
      renewable: {
        title: string;
        desc: string;
      };
    };
    smartFactory: string;
    infrastructure: string;
  };
  consulting: {
    tag: string;
    title: string;
    desc: string;
    bullet1: string;
    bullet2: string;
    form: {
      name: string;
      namePlaceholder: string;
      contact: string;
      contactPlaceholder: string;
      specs: string;
      specsPlaceholder: string;
      consent: string;
      submitBtn: string;
      successMsg: string;
      errorMsg: string;
      consentError: string;
    };
  };
  location: {
    tag: string;
    title: string;
    addressLabel: string;
    addressVal: string;
    phoneLabel: string;
    phoneVal: string;
    emailLabel: string;
    emailVal: string;
  };
}
