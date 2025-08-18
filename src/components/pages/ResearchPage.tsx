import React from 'react';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
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

export default function ResearchPageWrapper({ locale, data }: Props) {
  const t = locale === 'uk' ? uk : en;

  const menuItems = [
    { key: 'intProjects', label: t.submenu.intProjects },
    { key: 'natProjects', label: t.submenu.natProjects },
    { key: 'conferences', label: t.submenu.conferences },
    { key: 'publications', label: t.submenu.publications },
  ];

  const childrenMap = {
    intProjects: (
      <section>
        <h2>{t.submenu.intProjects}</h2>
        <ul>
          {data.intprojects.map((proj: Intproject) => (
            <li key={proj._id}>{proj.translates[locale]?.title ?? '—'}</li>
          ))}
        </ul>
      </section>
    ),
    natProjects: (
      <section>
        <h2>{t.submenu.natProjects}</h2>
        <ul>
          {data.natprojects.map((proj: Natproject) => (
            <li key={proj._id}>{proj.translates[locale]?.title ?? '—'}</li>
          ))}
        </ul>
      </section>
    ),
    conferences: (
      <section>
        <h2>{t.submenu.conferences}</h2>
        <ul>
          {data.seminars.map((seminar: Seminar) => (
            <li key={seminar._id}>{seminar.translates[locale]?.title ?? '—'}</li>
          ))}
        </ul>
      </section>
    ),
    publications: (
      <section>
        <h2>{t.submenu.publications}</h2>
        <ul>
          {data.publications.map((pub: Publication) => (
            <li key={pub._id}>{pub.translates[locale]?.title ?? '—'}</li>
          ))}
        </ul>
      </section>
    ),
  };

  return <TwoColumnLayout menuItems={menuItems} childrenMap={childrenMap} />;
}
