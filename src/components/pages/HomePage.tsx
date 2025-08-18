import React from 'react';

import PublicationSlider from '../PublicationSlider/PublicationSlider';
import Hero from '../Hero/Hero';
import News from '../News/News';
import MenuGrid from '../MenuGrid/MenuGrid';

import  { HomeData } from '@/types/api';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';



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

      <MenuGrid
        documents={data.documents}
        procurements={data.procurements}
        journals={data.journals}
        locale={locale}
        t={t}
      />


    <News news={data.news} lang={locale}/>
    <PublicationSlider publications={data.publications} lang={locale} />
    
 

   
    </main>
  );
};

export default HomePage;
