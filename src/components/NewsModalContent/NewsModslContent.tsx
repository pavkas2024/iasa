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
      {t.description && <p className={styles.description}>{t.description}</p>}
      {newsItem.link &&  <a href={newsItem.link} target="_blank" rel="noopener noreferrer">
              {newsItem.link}
            </a>}
      {newsItem.date && (
        <span className={styles.date}>
          {newsItem.date}
        </span>
      )}
    </div>
  );
};

export default NewsModalContent;
