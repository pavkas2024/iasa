export interface Department {
    _id: string;
    translates: {
      uk: {
        title: string;
        shortTitle: string;
        head: string;
        description: string;
        projects?: string[];
        _id?: string;  // необов’язковий
      };
      en: {
        title: string;
        shortTitle: string;
        head: string;
        description: string;
        projects?: string[];
        _id?: string;  // необов’язковий
      };
    };
    createdAt?: string;
    updatedAt?: string;
    order: string;
  }