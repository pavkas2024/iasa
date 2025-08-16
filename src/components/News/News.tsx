'use client'

import React, { useState } from 'react';

import parseDate from '@/utils/parseDate';

import Pagination from '../Pagination/Paginatiom';
import ContainerWrap from '../Wrap/Wrap';
import Modal from '../Modal/Modal';
import NewsModalContent from '../NewsModalContent/NewsModslContent';

import { NewsItem } from '@/types/news';
import styles from './News.module.css';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';


type Props = {
    news: NewsItem[];
    lang: 'uk' | 'en';
  };

  const translations = { en, uk };
  
  const News: React.FC<Props> = ({ news, lang }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const itemsPerPage = 4;

    const t = translations[lang];
  
    const sortedNews = news
      .slice()
      .sort((a, b) => parseDate(b.date) - parseDate(a.date));
  
    const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
    const paginatedNews = sortedNews.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const openModal = (newsItem: NewsItem) => setSelectedNews(newsItem);
    const closeModal = () => setSelectedNews(null);
  
    return (
        <section className={styles.container}>
        <ContainerWrap>
          <h2 className={styles.sectionTitle}>{t.submenu.news}</h2>
          <div className={styles.list}>
            {paginatedNews.map((pub) => {
              const t = pub.translates[lang];
              return (
                <div key={pub._id} className={styles.newsCard}>
                  {pub.photo && (
                    <div className={styles.photoWrap}>
                      <img src={pub.photo} alt={t.title} className={styles.image} />
                    </div>
                  )}
                  <div className={styles.details}>
                    <h2 className={styles.title}>{t.title}</h2>
  
                    <div className={styles.detailsBottom}>
                      {pub.date && (
                        <span className={styles.date}>
                          {new Date(pub.date).toLocaleDateString(lang === 'uk' ? 'uk-UA' : 'en-US')}
                        </span>
                      )}
                      <button
                        className={styles.moreButton}
                        onClick={() => openModal(pub)}
                      >
                        Більше
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
  
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </ContainerWrap>
  
        {selectedNews && (
          <Modal onClose={closeModal}>
            <NewsModalContent newsItem={selectedNews} lang={lang} />
          </Modal>
        )}
      </section>
    );
  };
  
  export default News;