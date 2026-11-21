'use client'

import React, { useEffect, useState } from 'react';
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


function getYouTubeThumbnail(
  videoUrl?: string,
): string | null {
  if (!videoUrl) return null;

  try {
    const url = new URL(videoUrl);
    const host = url.hostname.toLowerCase();

    let videoId: string | undefined;

    if (host === 'youtu.be' || host === 'www.youtu.be') {
      videoId = url.pathname.split('/')[1];
    } else if (
      host === 'youtube.com' ||
      host === 'www.youtube.com' ||
      host === 'm.youtube.com'
    ) {
      if (url.pathname === '/watch') {
        videoId = url.searchParams.get('v') ?? undefined;
      } else if (
        url.pathname.startsWith('/shorts/') ||
        url.pathname.startsWith('/embed/') ||
        url.pathname.startsWith('/live/')
      ) {
        videoId = url.pathname.split('/')[2];
      }
    }

    if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return null;
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch {
    return null;
  }
}


interface Props {
  publications: Publication[];
  lang?: Lang;
}

const translations = { en, uk };

export default function PublicationSlider({ publications, lang = 'uk' }: Props) {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sortedPublications = publications
    .slice()
    .sort((a, b) => Number(b.year) - Number(a.year));

  const t = translations[lang];

  const openModal = (pub: Publication) => {
    setSelectedPublication(pub);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPublication(null);
  };

  return (
    <section className={styles.container}>
      <ContainerWrap>
        <h2 className={styles.sectionTitle}>{t.submenu.publications}</h2>
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
              const t = pub.translates[lang];
              const imgSrc =
                getYouTubeThumbnail(pub.videoUrl) ||
                pub.photo ||
                '/placeholderPublication.webp';

              return (
                <SwiperSlide key={pub._id} className={styles.slide}>
                  <article
                    className={styles.card}
                    onClick={() => openModal(pub)}
                    role="button"
                    tabIndex={0}
                  >
                    
                  <div className={styles.imageWrap}>
                    {pub.videoUrl && pub.slug ? (
                      <Link
                        href={`/${lang}/research/publications/${pub.slug}`}
                        className={styles.videoLink}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={
                          lang === 'uk'
                            ? `Переглянути відео: ${t.title}`
                            : `Watch video: ${t.title}`
                        }
                      >
                        <img
                          src={imgSrc}
                          alt={t.title}
                          className={styles.image}
                          loading="lazy"
                        />
                        <span className={styles.playIcon} aria-hidden="true">
                          ▶
                        </span>
                      </Link>
                    ) : (
                      <>
                        <img
                          src={imgSrc}
                          alt={t.title}
                          className={styles.image}
                          loading="lazy"
                        />
                        {pub.videoUrl && (
                          <span className={styles.playIcon} aria-hidden="true">
                            ▶
                          </span>
                        )}
                      </>
                    )}
                  </div>

                    <div className={styles.body}>
                      <h3 className={styles.title}>{t.title}</h3>
                      <p className={styles.authors}>{t.authors}</p>
                      {t.journal && <p className={styles.meta}>{t.journal}</p>}
                      <div className={styles.footer}>
                        {pub.year && <span className={styles.year}>{pub.year}</span>}
                        
                        {pub.doi && (
                          <a
                            href={
                              /^https?:\/\//i.test(pub.doi)
                                ? pub.doi
                                : `https://doi.org/${pub.doi}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.doiBtn}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/^https?:\/\//i.test(pub.doi)
                              ? (lang === 'uk' ? 'Посилання' : 'Link')
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

        {selectedPublication && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <PublicationModalContent publication={selectedPublication} lang={lang} />
          </Modal>
        )}
      </ContainerWrap>
    </section>
  );
}
