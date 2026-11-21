
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { Publication } from '@/types/publications';
import Pagination from '../Pagination/Paginatiom';
import Modal from '../Modal/Modal';

import styles from './PublicationPageContent.module.css';

type Locale = 'uk' | 'en';

interface Props {
  publications: Publication[];
  locale: Locale;
  heading: string;
}

const API_URL =
  'https://institutebackend-production.up.railway.app';

// Отримуємо ID відео YouTube
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

// Обкладинка YouTube
function getYouTubeThumbnail(
  videoUrl?: string,
): string | null {
  const id = getYouTubeId(videoUrl);

  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : null;
}

// Скорочений опис статті
function getShortDescription(description?: string): string {
  if (!description) return '';

  const paragraph = description
    .split(/\n\s*\n/)[0]
    .trim();

  if (paragraph.length <= 240) {
    return paragraph;
  }

  return `${paragraph.slice(0, 240).trimEnd()}…`;
}

export default function PublicationPageContent({
  publications,
  locale,
  heading,
}: Props) {
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const [activeVideoId, setActiveVideoId] =
    useState<string | null>(null);

  const [videoViews, setVideoViews] = useState<
    Record<string, number>
  >({});

  const sortedPublications = useMemo(
    () =>
      (publications || [])
        .slice()
        .sort((a, b) => Number(b.year) - Number(a.year)),
    [publications],
  );

  const totalPages = Math.ceil(
    sortedPublications.length / itemsPerPage,
  );

  const currentPublications = sortedPublications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ID відео на поточній сторінці
  const videoIdsKey = currentPublications
    .map((pub) => getYouTubeId(pub.videoUrl))
    .filter((id): id is string => id !== null)
    .filter((id, index, array) => array.indexOf(id) === index)
    .join(',');

  // Отримання переглядів із NestJS
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
              { signal: controller.signal },
            );

            if (!response.ok) return;

            const data: { views?: number } =
              await response.json();

            if (
              typeof data.views === 'number' &&
              Number.isFinite(data.views) &&
              !controller.signal.aborted
            ) {
              setVideoViews((previous) => ({
                ...previous,
                [videoId]: data.views as number,
              }));
            }
          } catch {
            // Якщо YouTube API недоступний,
            // публікації залишаються видимими.
          }
        }),
      );
    };

    void loadViews();

    return () => controller.abort();
  }, [videoIdsKey]);

  if (!publications || publications.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>

      <ul className={styles.list}>
        {currentPublications.map((pub) => {
          const t = pub.translates[locale];

          if (!t) return null;

          const isPopular = pub.type === 'popular';

          const videoId = getYouTubeId(pub.videoUrl);

          const imgSrc =
            getYouTubeThumbnail(pub.videoUrl) ||
            pub.photo ||
            '/placeholderPublication.webp';

          const publicationUrl = pub.slug
            ? `/${locale}/research/publications/${pub.slug}`
            : null;

          const views = videoId
            ? videoViews[videoId]
            : undefined;

          const externalLink = pub.doi
            ? /^https?:\/\//i.test(pub.doi)
              ? pub.doi
              : `https://doi.org/${pub.doi}`
            : null;

          // НАУКОВО-ПОПУЛЯРНА ПУБЛІКАЦІЯ
          if (isPopular) {
            return (
              <li
                key={pub._id}
                className={`${styles.item} ${styles.popularItem}`}
              >
                {/* Ліва частина: відео і перегляди */}
                <div className={styles.popularImageWrap}>
                  {videoId ? (
                    <button
                      type="button"
                      className={styles.popularImageLink}
                      onClick={() => setActiveVideoId(videoId)}
                      aria-label={
                        locale === 'uk'
                          ? `Переглянути відео: ${t.title}`
                          : `Watch video: ${t.title}`
                      }
                    >
                      <img
                        src={imgSrc}
                        alt={t.title}
                        className={styles.popularImage}
                        loading="lazy"
                      />

                      <span
                        className={styles.playIcon}
                        aria-hidden="true"
                      >
                        ▶
                      </span>
                    </button>
                  ) : publicationUrl ? (
                    <Link
                      href={publicationUrl}
                      className={styles.popularImageLink}
                      aria-label={t.title}
                    >
                      <img
                        src={imgSrc}
                        alt={t.title}
                        className={styles.popularImage}
                        loading="lazy"
                      />
                    </Link>
                  ) : (
                    <div className={styles.popularImageLink}>
                      <img
                        src={imgSrc}
                        alt={t.title}
                        className={styles.popularImage}
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Перегляди під відео */}
                  {views !== undefined && (
                    <p
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        margin: '10px 0 0',
                        fontSize: '0.9rem',
                        color: 'var(--dark-gray)',
                      }}
                    >
                      <span aria-hidden="true">👁</span>

                      <span>
                        {views.toLocaleString(
                          locale === 'uk' ? 'uk-UA' : 'en-US',
                        )}{' '}
                        {locale === 'uk'
                          ? 'переглядів'
                          : 'views'}
                      </span>
                    </p>
                  )}
                </div>

                {/* Права частина: стаття */}
                <div className={styles.popularContent}>
                  <span className={styles.popularBadge}>
                    {locale === 'uk'
                      ? 'Науково-популярна публікація'
                      : 'Popular science article'}
                  </span>

                  <h3 className={styles.popularTitle}>
                    {publicationUrl ? (
                      <Link href={publicationUrl}>
                        {t.title}
                      </Link>
                    ) : (
                      t.title
                    )}
                  </h3>

                  {t.authors && (
                    <p className={styles.authors}>
                      {t.authors}
                    </p>
                  )}

                  {pub.year && (
                    <span className={styles.year}>
                      {pub.year}
                    </span>
                  )}

                  {t.description && (
                    <p className={styles.popularDescription}>
                      {getShortDescription(t.description)}
                    </p>
                  )}

                  {publicationUrl && (
                    <Link
                      href={publicationUrl}
                      className={styles.readMore}
                    >
                      {locale === 'uk'
                        ? 'Читати статтю'
                        : 'Read article'}
                      {' →'}
                    </Link>
                  )}
                </div>
              </li>
            );
          }

          // ЗВИЧАЙНА НАУКОВА ПУБЛІКАЦІЯ
          return (
            <li key={pub._id} className={styles.item}>
              {publicationUrl ? (
                <Link
                  href={publicationUrl}
                  className={styles.title}
                >
                  {t.title}
                </Link>
              ) : (
                <p className={styles.title}>
                  {t.title}
                </p>
              )}

              {t.authors && (
                <div className={styles.authors}>
                  {t.authors}
                </div>
              )}

              <div className={styles.journalLine}>
                {t.journal && (
                  <span className={styles.journalName}>
                    {t.journal}
                  </span>
                )}

                {t.pages && (
                  <span className={styles.pages}>
                    {t.pages}
                  </span>
                )}
              </div>

              {t.publisher && (
                <div className={styles.publisher}>
                  {t.publisher}
                </div>
              )}

              {t.city && (
                <div className={styles.city}>
                  {t.city}
                </div>
              )}

              {t.description && (
                <div
                  className={styles.description}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {t.description}
                </div>
              )}

              {t.other && (
                <div className={styles.other}>
                  {t.other}
                </div>
              )}

              {pub.issn && (
                <div className={styles.issn}>
                  ISSN: {pub.issn}
                </div>
              )}

              {pub.year && (
                <div className={styles.year}>
                  {pub.year}
                </div>
              )}

              {externalLink && (
                <div className={styles.doi}>
                  <a
                    href={externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pub.doi}
                  </a>
                </div>
              )}

              {/* Перегляди звичайних публікацій із відео */}
              {views !== undefined && (
                <p
                  style={{
                    margin: '4px 0',
                    fontSize: '0.9rem',
                    color: 'var(--dark-gray)',
                  }}
                >
                  👁{' '}
                  {views.toLocaleString(
                    locale === 'uk' ? 'uk-UA' : 'en-US',
                  )}{' '}
                  {locale === 'uk' ? 'переглядів' : 'views'}
                </p>
              )}

              {videoId && (
                <button
                  type="button"
                  className={styles.readMore}
                  onClick={() => setActiveVideoId(videoId)}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                  }}
                >
                  {locale === 'uk'
                    ? 'Переглянути відео'
                    : 'Watch video'}
                  {' ▶'}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Модальне вікно YouTube */}
      <Modal
        isOpen={activeVideoId !== null}
        onClose={() => setActiveVideoId(null)}
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
                  locale === 'uk'
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
}
