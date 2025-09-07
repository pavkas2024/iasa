export type RoleKey = 'sci' | 'edu' | 'org' | 'fin' | 'pub';

export interface Department {
  _id: string;
  translates: {
    uk: {
      title: string;
      shortTitle?: string;
      head?: string;
      description?: string;
      projects?: string[];
      _id?: string;
    };
    en: {
      title: string;
      shortTitle?: string;
      head?: string;
      description?: string;
      projects?: string[];
      _id?: string;
    };
  };
  createdAt?: string;
  updatedAt?: string;
  order: string;
  role: RoleKey; 
}
