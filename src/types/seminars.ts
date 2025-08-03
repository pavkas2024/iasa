export interface Seminar {
    _id: string;
    link?: string;
    date: string;
    photos?: string[];
    translates: {
      uk: {
        title: string;
        place: string;
        description: string;
      };
      en: {
        title: string;
        place: string;
        description: string;
      };
      _id?: string; // ← для MongoDB-шного _id у translates
    };
    createdAt?: string;
    updatedAt?: string;
  }