
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import parseDate from '@/utils/parseDate';
import Pagination from '../Pagination/Paginatiom';
import ContainerWrap from '../Wrap/Wrap';
import Modal from '../Modal/Modal';
import NewsModalContent from '../NewsModalContent/NewsModslContent';

import { NewsItem } from '@/types/news';
import { Publication } from '@/types/publications';

import styles from './News.module.css';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Locale = 'uk' | 'en';

type Props = {
  news: NewsItem[];
  publications?: Publication[];
  lang: Locale;
};

type DisplayNewsItem = NewsItem & {
  articleSlug?: string;
};

// Обкладинка YouTube-відео
function getYouTubeThumbnail(
  videoUrl?: string,
): string | null {
  if (!videoUrl) return null;

  try {
    const url = new URL(videoUrl);
    const host = url.hostname.toLowerCase();

    let videoId: string | null | undefined;

    if (
      host === 'youtu.be' ||
      host === 'www.youtu.be'
    ) {
      videoId = url.pathname.split('/')[1];
    } else if (
      host === 'youtube.com' ||
      host === 'www.youtube.com' ||
      host === 'm.youtube.com'
    ) {
      if (url.pathname === '/watch') {
        videoId = url.searchParams.get('v');
      } else if (
        url.pathname.startsWith('/shorts/') ||
        url.pathname.startsWith('/embed/') ||
        url.pathname.startsWith('/live/')
      ) {
        videoId = url.pathname.split('/')[2];
      }
    }

    if (
      !videoId ||
      !/^[a-zA-Z0-9_-]{11}$/.test(videoId)
    ) {
      return null;
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch {
    return null;
  }
}

const News: React.FC<Props> = ({
  news,
  publications = [],
  lang,
}) => {
  const [selectedNews, setSelectedNews] =
    useState<DisplayNewsItem | null>(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 8;
  const t = lang === 'uk' ? uk : en;

  // Перетворюємо публікації, позначені showInNews,
  // на картки новин без дублювання в MongoDB.
  const publicationNews: DisplayNewsItem[] = publications
    .filter((pub) => pub.showInNews === true && !!pub.slug)
    .map((pub) => ({
      _id: `publication-${pub._id}`,

      translates: {
        uk: {
          title: pub.translates.uk.title,
          description:
            pub.translates.uk.description || '',
        },
        en: {
          title: pub.translates.en.title,
          description:
            pub.translates.en.description || '',
        },
      },

      photo:
        getYouTubeThumbnail(pub.videoUrl) ||
        pub.photo ||
        '',

      date:
        pub.createdAt?.slice(0, 10) ||
        `${pub.year}-01-01`,

      articleSlug: pub.slug,
    }));

  // Об'єднуємо звичайні новини та анонси статей.
  const allNews: DisplayNewsItem[] = [
    ...news,
    ...publicationNews,
  ];

  const sortedNews = allNews
    .slice()
    .sort(
      (a, b) =>
        parseDate(b.date) - parseDate(a.date),
    );

  const totalPages = Math.ceil(
    sortedNews.length / itemsPerPage,
  );

  const paginatedNews = sortedNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const openModal = (newsItem: DisplayNewsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <section className={styles.container}>
      <ContainerWrap>
        <h2 className={styles.sectionTitle}>
          {t.submenu.news}
        </h2>

        <div className={styles.list}>
          {paginatedNews.map((pub) => {
            const tn = pub.translates[lang];

            return (
              <div
                key={pub._id}
                className={styles.newsCard}
              >
                {pub.photo && (
                  <div className={styles.photoWrap}>
                    <img
                      src={pub.photo}
                      alt={tn.title}
                      className={styles.image}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className={styles.details}>
                  <h2 className={styles.title}>
                    {tn.title}
                  </h2>

                  <div className={styles.detailsBottom}>
                    {pub.date && (
                      <span className={styles.date}>
                        {pub.date}
                      </span>
                    )}

                    {pub.articleSlug ? (
                      <Link
                        href={`/${lang}/research/publications/${pub.articleSlug}`}
                        className={styles.moreButton}
                      >
                        {t.buttons.more}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={styles.moreButton}
                        onClick={() => openModal(pub)}
                      >
                        {t.buttons.more}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </ContainerWrap>

      <Modal
        onClose={closeModal}
        isOpen={isModalOpen}
      >
        {selectedNews && (
          <NewsModalContent
            newsItem={selectedNews}
            lang={lang}
          />
        )}
      </Modal>
    </section>
  );
};

export default News;
