export interface Staff {
    _id: string;
    photo?: string;
    link?: string;
    council: 'так' | 'ні';
    profiles?: {
      orcid?: string;
      linkedIn?: string;
      googleScholar?: string;
      scopus?: string;
      wos?: string;
      academy?: string;
      facebook?: string;
      _id?: string; // ← ID, який MongoDB додає в profiles
    };
    translates: {
      uk: {
        name: string;
        surname: string;
        patronymic: string;
        degree?: string;
        acadTitle?: string;
        acadTitle2?: string;
        info?: string;
        position: string;
        department: string;
      };
      en: {
        name: string;
        surname: string;
        patronymic?: string;
        degree?: string;
        acadTitle?: string;
        acadTitle2?: string;
        info?: string;
        position: string;
        department: string;
      };
      _id?: string; // ← ID, який MongoDB додає в translates
    };
    createdAt?: string;
    updatedAt?: string;
  }