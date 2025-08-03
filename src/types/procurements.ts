export interface Procurement {
    _id: string;
    file: string;
    year: string;
    translates: {
      uk: {
        title: string;
      };
      en: {
        title: string;
      };
      _id?: string; // ← обов’язково додати, бо воно є у відповіді від MongoDB
    };
    createdAt?: string;
    updatedAt?: string;
  }