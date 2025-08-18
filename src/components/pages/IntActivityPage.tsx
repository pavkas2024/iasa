import React from 'react';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import { IntActivityData } from '@/types/api';
import { Collaboration } from '@/types/collaborations';
import { Intproject } from '@/types/intprojects';
import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Locale = 'uk' | 'en';

type Props = {
  locale: Locale;
  data: IntActivityData;
};

export default function IntActivityPage({ locale, data }: Props) {
  const t = locale === 'uk' ? uk : en;

  const menuItems = [
    { key: 'cooperation', label: t.submenu.intCooperation },
    { key: 'projects', label: t.submenu.intProjects },
  ];

  const childrenMap = {
    cooperation: (
      <section>
        <h2>{t.submenu.intCooperation}</h2>
        <ul>
          {data.collaborations.map((collab: Collaboration) => (
            <li key={collab._id}>
              {collab.translates[locale]?.org ?? '—'}
            </li>
          ))}
        </ul>
      </section>
    ),
    projects: (
      <section>
        <h2>{t.submenu.intProjects}</h2>
        <ul>
          {data.intprojects.map((proj: Intproject) => (
            <li key={proj._id}>
              {proj.translates[locale]?.title ?? '—'}
            </li>
          ))}
        </ul>
      </section>
    ),
  };

  return <TwoColumnLayout menuItems={menuItems} childrenMap={childrenMap} />;
}
