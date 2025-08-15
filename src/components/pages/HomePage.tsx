import React from 'react';

import PublicationSlider from '../PublicationSlider/PublicationSlider';
import Hero from '../Hero/Hero';

import  { HomeData } from '@/types/api';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';
import ContainerWrap from '../Wrap/Wrap';


type Locale = 'uk' | 'en';

type Props = {
  locale: Locale;
  data: HomeData;
};

const translations = { en, uk };

const HomePage: React.FC<Props> = ({ locale, data }) => {
  const t = translations[locale];

  return (
    <main>
     
    <Hero institut={data.instituts[0]} lang={locale} />
    <ContainerWrap>
      <section>
        <h2>{t.submenu.procurements}</h2>
        <ul>
          {data.procurements.map(inst => (
            <li key={inst._id}>
              {inst.translates[locale]?.title ?? '—'}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t.submenu.journals}</h2>
      <p>{data.journals[0].translates[locale]?.title}</p>
      </section>

      <section>
        <h2>{t.submenu.news}</h2>
        <ul>
          {data.news.map(news => (
            <li key={news._id}>
              {news.translates[locale]?.title ?? '—'}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t.submenu.docs}</h2>
        <ul>
          {data.documents.map(doc => (
            <li key={doc._id}>
              {doc.translates[locale]?.title ?? '—'}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="sr-only">{t.submenu.publications}</h2>
        <PublicationSlider publications={data.publications} lang={locale} />
      </section>
     </ContainerWrap>

   
    </main>
  );
};

export default HomePage;
