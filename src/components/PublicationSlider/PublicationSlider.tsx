
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

import { Publication } from '@/types/publications';
import styles from './PublicationSlider.module.css';

import Modal from '../Modal/Modal';
import ContainerWrap from '../Wrap/Wrap';
import PublicationModalContent from '../PublicationModalContent/PublicationModalContent';

type Lang = 'uk' | 'en';

interface Props {
  publications: Publication[];
  lang?: Lang;
}

const translations = { en, uk };

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

// Обкладинка відео
function getYouTubeThumbnail(
  videoUrl?: string,
): string | null {
  const id = getYouTubeId(videoUrl);

  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : null;
}

export default function PublicationSlider({
  publications,
  lang = 'uk',
}: Props) {
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);

  const [activeVideoId, setActiveVideoId] =
    useState<string | null>(null);

  const [videoViews, setVideoViews] = useState<
    Record<string, number>
  >({});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const sortedPublications = useMemo(
    () =>
      publications
        .slice()
        .sort((a, b) => Number(b.year) - Number(a.year)),
    [publications],
  );

  const videoIds = useMemo(
    () =>
      Array.from(
        new Set(
          publications
            .map((pub) => getYouTubeId(pub.videoUrl))
            .filter((id): id is string => id !== null),
        ),
      ),
    [publications],
  );

  const videoIdsKey = videoIds.join(',');

  // Отримуємо перегляди через наш бекенд.
  // Запитуємо кожне відео лише один раз.
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
            // слайдер продовжує працювати.
          }
        }),
      );
    };

    void loadViews();

    return () => controller.abort();
  }, [videoIdsKey]);

  const t = translations[lang];

  const openModal = (pub: Publication) => {
    setSelectedPublication(pub);
  };

  const closeModal = () => {
    setSelectedPublication(null);
  };

  const closeVideoModal = () => {
    setActiveVideoId(null);
  };

  return (
    <section className={styles.container}>
      <ContainerWrap>
        <h2 className={styles.sectionTitle}>
          {t.submenu.publications}
        </h2>

        <div className={styles.wrapper}>
          <Swiper
            key={isMobile ? 'vertical' : 'horizontal'}
            modules={[Pagination, A11y]}
            direction={isMobile ? 'vertical' : 'horizontal'}
            slidesPerView={isMobile ? 'auto' : 1}
            spaceBetween={12}
            pagination={{ clickable: true }}
            className={styles.swiper}
            breakpoints={{
              768: {
                direction: 'horizontal',
                slidesPerView: 3,
                spaceBetween: 12,
              },
              960: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            {sortedPublications.map((pub) => {
              const item = pub.translates[lang];

              if (!item) return null;

              const videoId = getYouTubeId(pub.videoUrl);

              const imgSrc =
                getYouTubeThumbnail(pub.videoUrl) ||
                pub.photo ||
                '/placeholderPublication.webp';

              const publicationUrl = pub.slug
                ? `/${lang}/research/publications/${pub.slug}`
                : null;

              const isExternalUrl = pub.doi
                ? /^https?:\/\//i.test(pub.doi)
                : false;

              const externalLink = pub.doi
                ? isExternalUrl
                  ? pub.doi
                  : `https://doi.org/${pub.doi}`
                : null;

              const views = videoId
                ? videoViews[videoId]
                : undefined;

              return (
                <SwiperSlide
                  key={pub._id}
                  className={styles.slide}
                >
                  <article
                    className={styles.card}
                    style={{ position: 'relative' }}
                  >
                    {/* Перехід на сторінку статті */}

                    {publicationUrl ? (
                      <Link
                        href={publicationUrl}
                        aria-label={
                          lang === 'uk'
                            ? `Відкрити статтю: ${item.title}`
                            : `Open article: ${item.title}`
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
                        onClick={() => openModal(pub)}
                        aria-label={
                          lang === 'uk'
                            ? `Детальніше про публікацію: ${item.title}`
                            : `More about publication: ${item.title}`
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

                    {/* Обкладинка з відео */}

                    <div
                      className={styles.imageWrap}
                      style={{ position: 'relative' }}
                    >
                      {videoId ? (
                        <button
                          type="button"
                          onClick={() => setActiveVideoId(videoId)}
                          aria-label={
                            lang === 'uk'
                              ? `Переглянути відео: ${item.title}`
                              : `Watch video: ${item.title}`
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
                            src={imgSrc}
                            alt={item.title}
                            className={styles.image}
                            loading="lazy"
                          />

                          <span
                            className={styles.playIcon}
                            aria-hidden="true"
                          >
                            ▶
                          </span>
                        </button>
                      ) : (
                        <img
                          src={imgSrc}
                          alt={item.title}
                          className={styles.image}
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Інформація про публікацію */}

                    <div className={styles.body}>
                      <h3 className={styles.title}>
                        {item.title}
                      </h3>

                      {item.authors && (
                        <p className={styles.authors}>
                          {item.authors}
                        </p>
                      )}

                      {item.journal && (
                        <p className={styles.meta}>
                          {item.journal}
                        </p>
                      )}

                      {/* Перегляди YouTube */}

                      {views !== undefined && (
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            margin: '8px 0',
                            fontSize: '0.85rem',
                            color: 'var(--dark-gray)',
                          }}
                        >
                          <span aria-hidden="true">👁</span>

                          <span>
                            {views.toLocaleString(
                              lang === 'uk'
                                ? 'uk-UA'
                                : 'en-US',
                            )}
                            {' '}
                            {lang === 'uk'
                              ? 'переглядів'
                              : 'views'}
                          </span>
                        </p>
                      )}

                      <div className={styles.footer}>
                        {pub.year && (
                          <span className={styles.year}>
                            {pub.year}
                          </span>
                        )}

                        {externalLink && (
                          <a
                            href={externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.doiBtn}
                            style={{
                              position: 'relative',
                              zIndex: 2,
                            }}
                          >
                            {isExternalUrl
                              ? lang === 'uk'
                                ? 'Посилання'
                                : 'Link'
                              : 'DOI'}
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Модальне вікно звичайної публікації */}

        <Modal
          isOpen={selectedPublication !== null}
          onClose={closeModal}
        >
          {selectedPublication && (
            <PublicationModalContent
              publication={selectedPublication}
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
      </ContainerWrap>
    </section>
  );
}
