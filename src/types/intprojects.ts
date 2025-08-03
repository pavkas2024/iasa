export interface Partner {
    title: string;
    link?: string;
    _id?: string;  // додано для Mongo ObjectId
  }
  
  export interface Intproject {
    _id: string;
    yearStart: string;
    yearFinish: string;
    translates: {
      uk: {
        context?: string;
        head: string;
        title: string;
        results?: string;
        partners: Partner[];
        _id?: string; // додано для вкладеного _id в translates.uk
      };
      en: {
        context?: string;
        head: string;
        title: string;
        results?: string;
        partners: Partner[];
        _id?: string; // додано для вкладеного _id в translates.en
      };
      _id?: string;  // додано для _id в кореневому translates
    };
    link?: string;
    rk?: string;
    funding?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
  }