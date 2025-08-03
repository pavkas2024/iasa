export interface Institut {
    _id: string;
    translates: {
      uk: {
        title: string;
        shortTitle: string;
        description: string;
        _id?: string; // необов’язковий
      };
      en: {
        title: string;
        shortTitle: string;
        description: string;
        _id?: string; // необов’язковий
      };
      _id?: string; // якщо іноді є в кореневому об’єкті translates
    };
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
  }