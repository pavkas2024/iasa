import React from 'react';
import type { ResearchData } from '@/types/api';

type Props = {
  locale: string;
  data: ResearchData;
};

const ResearchPage: React.FC<Props> = ({ locale, data }) => {
  return (
    <main>
      <h1>Дослідження ({locale})</h1>

      <section>
        <h2>Міжнародні проекти</h2>
        <ul>
          {data.intprojects.map(proj => (
            <li key={proj._id}>{proj.translates[locale].title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Національні проекти</h2>
        <ul>
          {data.natprojects.map(proj => (
            <li key={proj._id}>{proj.translates[locale].title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Семінари</h2>
        <ul>
          {data.seminars.map(seminar => (
            <li key={seminar._id}>{seminar.translates[locale].title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Публікації</h2>
        <ul>
          {data.publications.map(pub => (
            <li key={pub._id}>{pub.translates[locale].title}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ResearchPage;