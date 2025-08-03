import React from 'react';
import type { HomeData } from '@/lib/api';

type Props = {
  locale: string;
  data: HomeData;
};

const HomePage: React.FC<Props> = ({ locale, data }) => {
  return (
    <main>
      <h1>Головна сторінка ({locale})</h1>

      <section>
        <h2>Інститути</h2>
        <ul>
          {data.instituts.map(inst => (
            <li key={inst._id}>{inst.translates[locale].title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Новини</h2>
        <ul>
          {data.news.map(news => (
            <li key={news._id}>{news.translates[locale].title}</li>
          ))}
        </ul>
      </section>

      {/* Аналогічно інші розділи: documents, journals, procurements, publications, contacts */}
    </main>
  );
};

export default HomePage;