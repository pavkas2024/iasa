import React from 'react';
import Image from 'next/image';
import { Institut } from '@/types/instituts';
import styles from './Hero.module.css';

type Props = {
  institut: Institut;
  lang: 'uk' | 'en';
};

const Hero: React.FC<Props> = ({ institut, lang }) => {
  const t = institut.translates[lang];

  return (
    <div className={styles.container}>
      <div className={styles.photoWrap}>
        <Image
          src="/building.png"
          alt={t.title}
          fill
          style={{ objectFit: 'contain' }} // зберігає пропорції і покриває контейнер
          priority // для швидкого preloading головного зображення
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
