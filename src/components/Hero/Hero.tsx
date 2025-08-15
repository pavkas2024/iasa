import React from 'react';
import { Institut } from '@/types/instituts';
import styles from './Hero.module.css';

type Props = {
  institut: Institut;
  lang: 'uk' | 'en';
};

const Hero: React.FC<Props> = ({ institut, lang }) => {
    const imgSrc = '/building.png';
  const t = institut.translates[lang];

  return (
    <div className={styles.container}>
        <div className={styles.photoWrap}>
            <img
            src={imgSrc}
                alt={t.title}
                className={styles.image}
            />
        </div>

      <div className={styles.details}>
        <h1 className={styles.title}>{t.title}</h1>
        <h2 className={styles.shortTitle}>{t.shortTitle}</h2>
      </div>
    </div>
  );
};

export default Hero;
