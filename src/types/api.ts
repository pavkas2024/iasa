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
  
  export type ContactsData = {
    instituts:  Institut[];
    contacts: Contact[];
  }