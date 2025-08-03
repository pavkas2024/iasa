export interface InstituteDocument {
    _id: string;
    link: string;
    translates: {
      uk: {
        title: string;
        _id?: string;  // необов’язковий
      };
      en: {
        title: string;
        _id?: string;  // необов’язковий
      };
    };
    createdAt?: string;
    updatedAt?: string;
  }