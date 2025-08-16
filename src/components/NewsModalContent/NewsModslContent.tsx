'use client'

import React from 'react';
import { NewsItem } from '@/types/news';
import styles from './NewsModalContent.module.css';

type Props = {
  newsItem: NewsItem;
  lang: 'uk' | 'en';
};

const NewsModalContent: React.FC<Props> = ({ newsItem, lang }) => {
  const t = newsItem.translates[lang];

  return (
    <div className={styles.modalContent}>
      {newsItem.photo && (
        <img
          src={newsItem.photo}
          alt={t.title}
          className={styles.modalImage}
        />
      )}
      <h2 className={styles.title}>{t.title}</h2>
      {t.description && <p>{t.description}</p>}
      {newsItem.date && (
        <span className={styles.date}>
          {new Date(newsItem.date).toLocaleDateString(
            lang === 'uk' ? 'uk-UA' : 'en-US'
          )}
        </span>
      )}
    </div>
  );
};

export default NewsModalContent;
