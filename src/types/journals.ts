export interface Journal {
    _id: string;
    translates: {
      _id?: string;  // для _id самого translates
      uk: {
        _id?: string;  // для _id перекладу uk
        title: string;
        description: string;
      };
      en: {
        _id?: string;  // для _id перекладу en
        title: string;
        description: string;
      };
    };
    photo: string;
    link: string;
    createdAt?: string;
    updatedAt?: string;
  }