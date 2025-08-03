export interface Contact {
    _id: string;
    build: string;
    corp?: string;
    indexPost: string;
    linkFacebook?: string;
    linkAcademy?: string;
    email: string;
    phone: string;
    translates: {
      uk: {
        street: string;
        city: string;
        _id?: string; // необов’язковий _id всередині перекладу
      };
      en: {
        street: string;
        city: string;
        _id?: string; // необов’язковий _id всередині перекладу
      };
    };
    createdAt?: string;
    updatedAt?: string;
  }