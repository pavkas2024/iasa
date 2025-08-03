export interface Publication {
    _id: string;
    photo?: string;
    doi?: string;
    year: string;
    issn?: string;
    translates: {
      uk: {
        title: string;
        authors: string;
        journal?: string;
        publisher?: string;
        city?: string;
        pages?: string;
        description?: string;
        other?: string;
      };
      en: {
        title: string;
        authors: string;
        journal?: string;
        publisher?: string;
        city?: string;
        pages?: string;
        description?: string;
        other?: string;
      };
      _id?: string; // ← додай це, щоб врахувати внутрішній _id у translates
    };
    createdAt?: string;
    updatedAt?: string;
  }