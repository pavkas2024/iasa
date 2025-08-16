
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

import {HomeData, InstituteData, IntActivityData,  ResearchData, ContactsData} from '@/types/api';

const BASE = 'https://institutebackend-production.up.railway.app';

// 🔧 Оновлена функція без Accept-Language
const fetchJson = async <T>(path: string): Promise<T> => {
    const url = `${BASE}${path}`;
    console.log(`Fetching: ${url}`);
    const res = await fetch(url, { next: { revalidate: 60 } });
  
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch ${path}, status ${res.status}: ${text}`);
    }
    return res.json();
  };



export const getHomeData = async (): Promise<HomeData> => {
    const [instituts, news, publications] = await Promise.all([
        fetchJson<Institut[]>('/instituts'),
        fetchJson<NewsItem[]>('/news'),
        fetchJson<Publication[]>('/publications'),
      ]);
    
    
      const documentsPromise = fetchJson<InstituteDocument[]>('/documents');
      const journalsPromise = fetchJson<Journal[]>('/journals');
      const procurementsPromise = fetchJson<Procurement[]>('/procurements');
      const contactsPromise = fetchJson<Contact[]>('/contacts');
    
     
      const [documents, journals, procurements, contacts] = await Promise.all([
        documentsPromise,
        journalsPromise,
        procurementsPromise,
        contactsPromise,
      ]);
    
      return { instituts, news, documents, journals, procurements, publications, contacts };

};

export const getInstituteData = async (): Promise<InstituteData> => {
  const [instituts, departments, staffs, decisions] = await Promise.all([
    fetchJson<Institut[]>('/instituts'),
    fetchJson<Department[]>('/departments'),
    fetchJson<Staff[]>('/staffs'),
    fetchJson<Decision[]>('/decisions'),
  ]);

  return { instituts, departments, staffs, decisions };
};

export const getIntActivityData = async (): Promise<IntActivityData> => {
  const [collaborations, intprojects] = await Promise.all([
    fetchJson<Collaboration[]>('/collaborations'),
    fetchJson<Intproject[]>('/intprojects'),
  ]);

  return { collaborations, intprojects };
};

export const getResearchData = async (): Promise<ResearchData> => {
  const [intprojects, natprojects, seminars, publications] = await Promise.all([
    fetchJson<Intproject[]>('/intprojects'),
    fetchJson<Natproject[]>('/natprojects'),
    fetchJson<Seminar[]>('/seminars'),
    fetchJson<Publication[]>('/publications'),
  ]);

  return { intprojects, natprojects, seminars, publications };
};

export const getContactsData = async (): Promise<ContactsData> => {
  const [instituts, contacts] = await Promise.all([
  fetchJson<Institut[]>('/instituts'),
  fetchJson<Contact[]>('/contacts')
  ]);

  return {instituts, contacts};
};
