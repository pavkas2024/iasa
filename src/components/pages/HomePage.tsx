import React from 'react';
import dynamic from 'next/dynamic';


import Hero from '../Hero/Hero';
import MenuGrid from '../MenuGrid/MenuGrid';

import  { HomeData } from '@/types/api';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';


const News = dynamic(() => import('../News/News'));
const PublicationSlider = dynamic(() => import('../PublicationSlider/PublicationSlider'));

type Locale = 'uk' | 'en';

type Props = {
  locale: Locale;
  data: HomeData;
};

const translations = { en, uk };

const HomePage: React.FC<Props> = ({ locale, data }) => {
  const t = translations[locale];
  const journal = data.journals[0];

  return (
    <main>
     
    <Hero institut={data.instituts[0]} lang={locale} />

      <MenuGrid
        documents={data.documents}
        procurements={data.procurements}
        journal={journal}
        locale={locale}
        t={t}
      />


    <News news={data.news} lang={locale}/>
    <PublicationSlider publications={data.publications} lang={locale} />
    
 

   
    </main>
  );
};

export default HomePage;
