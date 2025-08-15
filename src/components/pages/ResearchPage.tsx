import React from 'react';

import { ResearchData } from '@/types/api';
import { Intproject } from '@/types/intprojects';
import { Natproject } from '@/types/natprojects';
import { Seminar } from '@/types/seminars';
import { Publication } from '@/types/publications';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Locale = 'uk' | 'en';

type Props = {
  locale: Locale;
  data: ResearchData;
};

const translations = { uk, en };

const ResearchPage: React.FC<Props> = ({ locale, data }) => {
  const t = translations[locale];

  return (
    <main>
      <h1>{t.menu.research}</h1>

      <section>
        <h2>{t.submenu.intProjects}</h2>
        <ul>
          {data.intprojects.map((proj: Intproject) => (
            <li key={proj._id}>{proj.translates[locale]?.title ?? '—'}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t.submenu.natProjects}</h2>
        <ul>
          {data.natprojects.map((proj: Natproject) => (
            <li key={proj._id}>{proj.translates[locale]?.title ?? '—'}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t.submenu.conferences}</h2>
        <ul>
          {data.seminars.map((seminar: Seminar) => (
            <li key={seminar._id}>{seminar.translates[locale]?.title ?? '—'}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t.submenu.publications}</h2>
        <ul>
          {data.publications.map((pub: Publication) => (
            <li key={pub._id}>{pub.translates[locale]?.title ?? '—'}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ResearchPage;
