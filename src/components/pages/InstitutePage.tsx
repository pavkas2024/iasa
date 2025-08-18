import React from 'react';
import TwoColumnLayout from '../TwoColumnLayout/TwoColumnLayout';
import { InstituteData } from '@/types/api';
import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Locale = 'uk' | 'en';

interface PageProps {
  params?: { locale?: Locale };
  data: InstituteData;
}

export default function InstitutePage({ params, data }: PageProps) {
  const locale: Locale = params?.locale ?? 'uk';
  const t = locale === 'uk' ? uk : en;

  const menuItems = [
    { key: 'about', label: t.submenu.strInstitute, href: `/${locale}/institute/about` },
    { key: 'structure', label: t.submenu.departments, href: `/${locale}/institute/structure` },
    { key: 'staff', label: t.submenu.staff, href: `/${locale}/institute/staff` },
    { key: 'council', label: t.submenu.scientificCouncil, href: `/${locale}/institute/council` },
  ];

  const childrenMap = {
    about: (
      <section>
        <h2>{t.submenu.strInstitute}</h2>
        <ul>
          {data.instituts.map(i => (
            <li key={i._id}>{i.translates[locale]?.title ?? '—'}</li>
          ))}
        </ul>
      </section>
    ),
    structure: (
      <section>
        <h2>{t.submenu.departments}</h2>
        <ul>
          {data.departments.map(d => (
            <li key={d._id}>{d.translates[locale]?.title ?? '—'}</li>
          ))}
        </ul>
      </section>
    ),
    staff: (
      <section>
        <h2>{t.submenu.staff}</h2>
        <ul>
          {data.staffs.map(s => (
            <li key={s._id}>
              {`${s.translates[locale]?.surname ?? '—'} ${s.translates[locale]?.name ?? ''}`.trim()}
            </li>
          ))}
        </ul>
      </section>
    ),
    council: (
      <section>
        <h2>{t.submenu.scientificCouncil}</h2>
        <ul>
          {data.decisions.map(d => (
            <li key={d._id}>{d.translates[locale]?.title ?? '—'}</li>
          ))}
        </ul>
      </section>
    ),
  };

  return <TwoColumnLayout menuItems={menuItems} childrenMap={childrenMap} />;
}
