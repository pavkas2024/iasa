
  import { Institut } from '@/types/instituts';
  import { NewsItem } from '@/types/news';
  import { InstituteDocument } from '@/types/documents';
  import { Journal } from '@/types/journals';
  import { Procurement } from '@/types/procurements';
  import { Publication } from '@/types/publications';
  import { Contact } from '@/types/contacts';
  import { Department } from '@/types/departments';
  import { Staff } from '@/types/staffs';
  import { Decision } from '@/types/decisions';
  import { Collaboration } from '@/types/collaborations';
  import { Intproject } from '@/types/intprojects';
  import { Natproject } from '@/types/natprojects';
  import { Seminar } from '@/types/seminars';
  
  const BASE = 'https://institutebackend-production.up.railway.app';
  
  const fetchJson = async <T>(path: string, locale: string): Promise<T> => {
    const res = await fetch(`${BASE}${path}`, {
      headers: {
        'Accept-Language': locale,
      },
      next: { revalidate: 60 }, // ISR: оновлення кожні 60 сек
    });
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return res.json();
  };
  
  // Типи для даних кожної сторінки
  export type HomeData = {
    instituts: Institut[];
    news: NewsItem[];
    documents: InstituteDocument[];
    journals: Journal[];
    procurements: Procurement[];
    publications: Publication[];
    contacts: Contact[];
  };
  
  export type InstituteData = {
    instituts: Institut[];
    departments: Department[];
    staffs: Staff[];
    decisions: Decision[];
  };
  
  export type IntActivityData = {
    collaborations: Collaboration[];
    intprojects: Intproject[];
  };
  
  export type ResearchData = {
    intprojects: Intproject[];
    natprojects: Natproject[];
    seminars: Seminar[];
    publications: Publication[];
  };
  
  export type ContactsData = Contact[];
  
  // Функції з типізацією
  
  export const getHomeData = async (locale: string): Promise<HomeData> => {
    const [
      instituts,
      news,
      documents,
      journals,
      procurements,
      publications,
      contacts,
    ] = await Promise.all([
      fetchJson<Institut[]>('/instituts', locale),
      fetchJson<NewsItem[]>('/news', locale),
      fetchJson<InstituteDocument[]>('/documents', locale),
      fetchJson<Journal[]>('/journals', locale),
      fetchJson<Procurement[]>('/procurements', locale),
      fetchJson<Publication[]>('/publications', locale),
      fetchJson<Contact[]>('/contacts', locale),
    ]);
    return { instituts, news, documents, journals, procurements, publications, contacts };
  };
  
  export const getInstituteData = async (locale: string): Promise<InstituteData> => {
    const [instituts, departments, staffs, decisions] = await Promise.all([
      fetchJson<Institut[]>('/instituts', locale),
      fetchJson<Department[]>('/departments', locale),
      fetchJson<Staff[]>('/staffs', locale),
      fetchJson<Decision[]>('/decisions', locale),
    ]);
    return { instituts, departments, staffs, decisions };
  };
  
  export const getIntActivityData = async (locale: string): Promise<IntActivityData> => {
    const [collaborations, intprojects] = await Promise.all([
      fetchJson<Collaboration[]>('/collaborations', locale),
      fetchJson<Intproject[]>('/intprojects', locale),
    ]);
    return { collaborations, intprojects };
  };
  
  export const getResearchData = async (locale: string): Promise<ResearchData> => {
    const [intprojects, natprojects, seminars, publications] = await Promise.all([
      fetchJson<Intproject[]>('/intprojects', locale),
      fetchJson<Natproject[]>('/natprojects', locale),
      fetchJson<Seminar[]>('/seminars', locale),
      fetchJson<Publication[]>('/publications', locale),
    ]);
    return { intprojects, natprojects, seminars, publications };
  };
  
  export const getContactsData = async (locale: string): Promise<ContactsData> => {
    return fetchJson<Contact[]>('/contacts', locale);
  };