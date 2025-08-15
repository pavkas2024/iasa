import React from 'react';

import { IntActivityData} from '@/types/api';
import { Collaboration } from '@/types/collaborations';
import { Intproject } from '@/types/intprojects';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';
import ContainerWrap from '../Wrap/Wrap';

type Locale = 'uk' | 'en';

type Props = {
  locale: Locale;
  data: IntActivityData;
};

const translations = { uk, en };

const IntActivityPage: React.FC<Props> = ({ locale, data }) => {
  const t = translations[locale];

  return (
    <main>
     <ContainerWrap>
        <h1>{t.menu.intActivity} </h1>

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
     </ContainerWrap>
    </main>
  );
};

export default IntActivityPage;
