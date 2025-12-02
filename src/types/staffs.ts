export type Role = "advisor" | "director" | "dep" | "secr" | "scientific" | "fin";


export interface Staff {
    _id: string;
    photo?: string;
    link?: string;
    cv?: string;
    pub?: string;
    shortPub?: string;
    council: 'так' | 'ні';
    profiles?: {
      orcid?: string;
      linkedIn?: string;
      googleScholar?: string;
      scopus?: string;
      wos?: string;
      academy?: string;
      facebook?: string;
      _id?: string; 
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
        department?: string;
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
        department?: string;
      };
      _id?: string; 
    };
    order: string;
    role: Role;
    createdAt?: string;
    updatedAt?: string;
  }