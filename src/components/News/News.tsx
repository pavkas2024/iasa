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

type Locale = "uk" | "en";

type Props = {
  news: NewsItem[];
  lang: Locale;
};



const News: React.FC<Props> = ({ news, lang }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const t = lang === "uk" ? uk : en;

  const sortedNews = news.slice().sort((a, b) => parseDate(b.date) - parseDate(a.date));
  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
  const paginatedNews = sortedNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={styles.container}>
      <ContainerWrap>
        <h2 className={styles.sectionTitle}>{t.submenu.news}</h2>
        <div className={styles.list}>
          {paginatedNews.map((pub) => {
            const tn = pub.translates[lang];
            return (
              <div key={pub._id} className={styles.newsCard}>
                {pub.photo && (
                  <div className={styles.photoWrap}>
                    <img src={pub.photo} alt={tn.title} className={styles.image} />
                  </div>
                )}
                <div className={styles.details}>
                  <h2 className={styles.title}>{tn.title}</h2>
                  <div className={styles.detailsBottom}>
                    {pub.date && (
                      <span className={styles.date}>
                        {pub.date}
                      </span>
                    )}
                    <button
                      type="button"
                      className={styles.moreButton}
                      onClick={() => openModal(pub)}
                    >
                      {t.buttons.more}
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

      <Modal onClose={closeModal} isOpen={isModalOpen}>
        {selectedNews && <NewsModalContent newsItem={selectedNews} lang={lang} />}
      </Modal>
    </section>
  );
};

export default News;
