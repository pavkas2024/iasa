
'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
  videoId?: string | null;
};

const API_URL =
  'https://institutebackend-production.up.railway.app';

// Отримуємо ID YouTube-відео
function getYouTubeId(videoUrl?: string): string | null {
  if (!videoUrl) return null;

  try {
    const url = new URL(videoUrl);
    const host = url.hostname.toLowerCase();

    let id: string | null | undefined = null;

    if (
      host === 'youtu.be' ||
      host === 'www.youtu.be'
    ) {
      id = url.pathname.split('/')[1];
    } else if (
      host === 'youtube.com' ||
      host === 'www.youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'youtube-nocookie.com' ||
      host === 'www.youtube-nocookie.com'
    ) {
      if (url.pathname === '/watch') {
        id = url.searchParams.get('v');
      } else if (
        /^\/(embed|shorts|live)\//.test(url.pathname)
      ) {
        id = url.pathname.split('/')[2];
      }
    }

    return id && /^[a-zA-Z0-9_-]{11}$/.test(id)
      ? id
      : null;
  } catch {
    return null;
  }
}

// Отримуємо обкладинку YouTube
function getYouTubeThumbnail(
  videoUrl?: string,
): string | null {
  const id = getYouTubeId(videoUrl);

  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : null;
}

// Нормалізуємо заголовки
function normalizeTitle(title?: string): string {
  return (title || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

const News: React.FC<Props> = ({
  news,
  publications = [],
  lang,
}) => {
  const [selectedNews, setSelectedNews] =
    useState<DisplayNewsItem | null>(null);

  const [activeVideoId, setActiveVideoId] =
    useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  // Перегляди YouTube
  const [videoViews, setVideoViews] = useState<
    Record<string, number>
  >({});

  const itemsPerPage = 8;
  const t = lang === 'uk' ? uk : en;

  // Публікації, які відображаються в новинах
  const newsPublications = publications.filter(
    (pub) => pub.showInNews === true && !!pub.slug
  );

  // Формуємо новини з публікацій
  const publicationNews: DisplayNewsItem[] =
    newsPublications.map((pub) => ({
      _id: `publication-${pub._id}`,

      translates: {
        uk: {
          title: pub.translates.uk.title,
          description: pub.translates.uk.description || '',
        },
        en: {
          title: pub.translates.en.title,
          description: pub.translates.en.description || '',
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
      videoId: getYouTubeId(pub.videoUrl),
    }));

  // Заголовки публікацій для пошуку дублікатів
  const publicationTitles = new Set(
    newsPublications
      .flatMap((pub) => [
        normalizeTitle(pub.translates.uk.title),
        normalizeTitle(pub.translates.en.title),
      ])
      .filter(Boolean)
  );

  // Прибираємо дублікати старих новин
  const regularNews: DisplayNewsItem[] = news.filter(
    (item) => {
      const ukTitle = normalizeTitle(
        item.translates?.uk?.title
      );

      const enTitle = normalizeTitle(
        item.translates?.en?.title
      );

      return (
        !publicationTitles.has(ukTitle) &&
        !publicationTitles.has(enTitle)
      );
    }
  );

  // Об'єднуємо новини та публікації.
  // Якщо існує стара новина з такою самою назвою,
  // зберігаємо її дату.
  const allNews: DisplayNewsItem[] = [
    ...regularNews,
    ...publicationNews.map((pub) => {
      const originalNews = news.find((item) => {
        const oldUkTitle = normalizeTitle(
          item.translates?.uk?.title
        );

        const oldEnTitle = normalizeTitle(
          item.translates?.en?.title
        );

        const newUkTitle = normalizeTitle(
          pub.translates?.uk?.title
        );

        const newEnTitle = normalizeTitle(
          pub.translates?.en?.title
        );

        return (
          (oldUkTitle !== '' &&
            oldUkTitle === newUkTitle) ||
          (oldEnTitle !== '' &&
            oldEnTitle === newEnTitle)
        );
      });

      return {
        ...pub,
        date: originalNews?.date || pub.date,
      };
    }),
  ];

  // Сортування новин за датою
  const sortedNews = allNews
    .slice()
    .sort(
      (a, b) =>
        parseDate(b.date) - parseDate(a.date)
    );

  const totalPages = Math.ceil(
    sortedNews.length / itemsPerPage
  );

  const paginatedNews = sortedNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Збираємо ID YouTube-відео для поточної сторінки
  const videoIdsKey = useMemo(() => {
    const ids = publications
      .filter(
        (pub) =>
          pub.showInNews === true &&
          !!pub.slug
      )
      .map((pub) => getYouTubeId(pub.videoUrl))
      .filter((id): id is string => id !== null);

    return Array.from(new Set(ids)).join(',');
  }, [publications]);

  // Отримуємо кількість переглядів із бекенду
  useEffect(() => {
    if (!videoIdsKey) return;

    const controller = new AbortController();

    const loadViews = async () => {
      const ids = videoIdsKey.split(',');

      await Promise.all(
        ids.map(async (videoId) => {
          try {
            const response = await fetch(
              `${API_URL}/youtube/views/${videoId}`,
              {
                signal: controller.signal,
              }
            );

            if (!response.ok) return;

            const data: { views?: number } =
              await response.json();

            if (
              typeof data.views === 'number' &&
              Number.isFinite(data.views)
            ) {
              if (controller.signal.aborted) return;

              setVideoViews((previous) => ({
                ...previous,
                [videoId]: data.views as number,
              }));
            }
          } catch {
            // Якщо API недоступний,
            // новини продовжують працювати.
          }
        })
      );
    };

    void loadViews();

    return () => controller.abort();
  }, [videoIdsKey]);

  const openModal = (newsItem: DisplayNewsItem) => {
    setSelectedNews(newsItem);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  const closeVideoModal = () => {
    setActiveVideoId(null);
  };

  return (
    <section className={styles.container}>
      <ContainerWrap>
        <h2 className={styles.sectionTitle}>
          {t.submenu.news}
        </h2>

        <div className={styles.list}>
          {paginatedNews.map((item) => {
            const tn = item.translates?.[lang];

            if (!tn) return null;

            const articleUrl = item.articleSlug
              ? `/${lang}/research/publications/${item.articleSlug}`
              : null;

            const views = item.videoId
              ? videoViews[item.videoId]
              : undefined;

            return (
              <div
                key={item._id}
                className={styles.newsCard}
                style={{ position: 'relative' }}
              >
                {/* Основний перехід із картки */}

                {articleUrl ? (
                  <Link
                    href={articleUrl}
                    aria-label={
                      lang === 'uk'
                        ? `Читати статтю: ${tn.title}`
                        : `Read article: ${tn.title}`
                    }
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                      borderRadius: 'inherit',
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => openModal(item)}
                    aria-label={
                      lang === 'uk'
                        ? `Детальніше: ${tn.title}`
                        : `Read more: ${tn.title}`
                    }
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  />
                )}

                {/* Зображення або YouTube-відео */}

                {item.photo && (
                  <div
                    className={styles.photoWrap}
                    style={{ position: 'relative' }}
                  >
                    {item.videoId ? (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveVideoId(item.videoId!)
                        }
                        aria-label={
                          lang === 'uk'
                            ? `Переглянути відео: ${tn.title}`
                            : `Watch video: ${tn.title}`
                        }
                        style={{
                          position: 'relative',
                          zIndex: 2,
                          display: 'block',
                          width: '100%',
                          padding: 0,
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <img
                          src={item.photo}
                          alt={tn.title}
                          className={styles.image}
                          loading="lazy"
                          style={{ display: 'block' }}
                        />

                        <span
                          aria-hidden="true"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform:
                              'translate(-50%, -50%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background:
                              'rgba(0,0,0,0.75)',
                            color: '#fff',
                            fontSize: '24px',
                            pointerEvents: 'none',
                          }}
                        >
                          ▶
                        </span>
                      </button>
                    ) : (
                      <img
                        src={item.photo}
                        alt={tn.title}
                        className={styles.image}
                        loading="lazy"
                      />
                    )}
                  </div>
                )}

                {/* Назва, перегляди та дата */}

                <div className={styles.details}>
                  <h2 className={styles.title}>
                    {tn.title}
                  </h2>

                  {/* Кількість переглядів YouTube */}

                  {views !== undefined && (
                    <p
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        margin: '10px 0',
                        fontSize: '0.9rem',
                        color: 'var(--dark-gray)',
                      }}
                    >
                      <span aria-hidden="true">👁</span>

                      <span>
                        {views.toLocaleString(
                          lang === 'uk'
                            ? 'uk-UA'
                            : 'en-US'
                        )}
                        {' '}
                        {lang === 'uk'
                          ? 'переглядів'
                          : 'views'}
                      </span>
                    </p>
                  )}

                  <div className={styles.detailsBottom}>
                    {item.date && (
                      <span className={styles.date}>
                        {item.date}
                      </span>
                    )}

                    {articleUrl ? (
                      <Link
                        href={articleUrl}
                        className={styles.moreButton}
                        style={{
                          position: 'relative',
                          zIndex: 2,
                        }}
                      >
                        {t.buttons.more}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={styles.moreButton}
                        onClick={() => openModal(item)}
                        style={{
                          position: 'relative',
                          zIndex: 2,
                        }}
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

        {/* Пагінація */}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </ContainerWrap>

      {/* Модальне вікно звичайної новини */}

      <Modal
        isOpen={selectedNews !== null}
        onClose={closeModal}
      >
        {selectedNews && (
          <NewsModalContent
            newsItem={selectedNews}
            lang={lang}
          />
        )}
      </Modal>

      {/* Модальне вікно YouTube */}

      <Modal
        isOpen={activeVideoId !== null}
        onClose={closeVideoModal}
      >
        {activeVideoId && (
          <div
            style={{
              width: '100%',
              padding: '12px',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                borderRadius: '10px',
              }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}`}
                title={
                  lang === 'uk'
                    ? 'Відео до публікації'
                    : 'Publication video'
                }
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default News;
