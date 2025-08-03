import React from 'react';
import type { IntActivityData } from '@/types/api';

type Props = {
  locale: string;
  data: IntActivityData;
};

const IntActivityPage: React.FC<Props> = ({ locale, data }) => {
  return (
    <main>
      <h1>Міжнародна діяльність ({locale})</h1>

      <section>
        <h2>Співпраці</h2>
        <ul>
          {data.collaborations.map(collab => (
            <li key={collab._id}>{collab.translates[locale].org}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Міжнародні проекти</h2>
        <ul>
          {data.intprojects.map(proj => (
            <li key={proj._id}>{proj.translates[locale].title}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default IntActivityPage;