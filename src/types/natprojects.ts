export interface Natproject {
    _id: string;
    yearStart: string;
    yearFinish: string;
    translates: {
      _id?: string;  // додано _id для translates
      uk: {
        context?: string;
        head: string;
        title: string;
        results?: string;
      };
      en: {
        context?: string;
        head: string;
        title: string;
        results?: string;
      };
    };
    link?: string;
    rk?: string;
    funding?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
  }