export interface Collaboration {
    _id: string;
    photo?: string;
    translates: {
      uk: {
        description: string;
        org: string;
        _id?: string;  // необов’язковий _id всередині перекладу
      };
      en: {
        description: string;
        org: string;
        _id?: string;  // необов’язковий _id всередині перекладу
      };
    };
    link?: string;
    publications: string[];
    createdAt?: string;
    updatedAt?: string;
  }