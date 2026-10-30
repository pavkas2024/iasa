
export type SsaiLocale = "uk" | "en";

export interface SsaiPerson {
  name: string;
  degree?: string;
  academicTitle?: string;
  academyStatus?: string;
}

export interface SsaiInfoTranslation {
  title: string;
  chair: SsaiPerson;
  deputy1: SsaiPerson;
  section1: string;
  deputy2: SsaiPerson;
  section2: string;
  description: string;
}

export interface SsaiInfo {
  _id: string;
  translates: {
    uk: SsaiInfoTranslation;
    en: SsaiInfoTranslation;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface SsaiSessionTranslation {
  title: string;
  speakers: string[];
  summary?: string;
}

export interface SsaiSession {
  _id: string;
  date: string;
  time?: string;
  orderInMonth: number;
  completed: boolean;
  link?: string;
  photos?: string[];
  translates: {
    uk: SsaiSessionTranslation;
    en: SsaiSessionTranslation;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface SsaiSessionsResponse {
  items: SsaiSession[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
