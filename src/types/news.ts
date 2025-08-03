interface Translation {
    title: string;
    description: string;
    _id?: string;  // необов’язкове поле, яке може бути в об’єкті перекладу
  }
  
  interface Translates {
    uk: Translation;
    en: Translation;
  }
  
  export interface NewsItem {
    _id: string;
    translates: Translates;
    photo?: string;
    date?: string;
    createdAt?: string;
    updatedAt?: string;
  }