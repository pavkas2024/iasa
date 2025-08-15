import React from 'react';

import { InstituteData } from '@/types/api';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';
import ContainerWrap from '../Wrap/Wrap';


type Locale = 'uk' | 'en';

type Props = {
  locale: Locale;
  data: InstituteData;
};

const translations = { uk, en };

const InstitutePage: React.FC<Props> = ({ locale, data }) => {
  const t = translations[locale];

  return (
    <main>
    <ContainerWrap>
      <h1>{t.submenu.strInstitute} </h1>

      <section>
        <h2>{t.submenu.strInstitute}</h2>
        <ul>
          {data.instituts.map(inst => (
            <li key={inst._id}>
              {inst.translates[locale]?.title ?? '—'}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t.submenu.departments}</h2>
        <ul>
          {data.departments.map(dep => (
            <li key={dep._id}>
              {dep.translates[locale]?.title ?? '—'}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t.submenu.staff}</h2>
        <ul>
          {data.staffs.map(staff => (
            <li key={staff._id}>
              {`${staff.translates[locale]?.surname ?? '—'} ${staff.translates[locale]?.name ?? ''}`.trim()}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t.submenu.decisions}</h2>
        <ul>
          {data.decisions.map(decision => (
            <li key={decision._id}>
              {decision.translates[locale]?.title ?? '—'}
            </li>
          ))}
        </ul>
      </section>
    </ContainerWrap>
    </main>
  );
};

export default InstitutePage;
