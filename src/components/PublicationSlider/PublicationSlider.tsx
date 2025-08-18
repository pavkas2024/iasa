'use client';

import React, { useEffect, useState } from 'react';
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

export default function PublicationSlider({ publications, lang = 'uk' }: Props) {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
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

  return (
    <section  className={styles.container}>
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
            const imgSrc = pub.photo || '/placeholderPublication.png';

            return (
              <SwiperSlide key={pub._id} className={styles.slide}>
                <article
                  className={styles.card}
                  onClick={() => setSelectedPublication(pub)}
                  role="button"
                  tabIndex={0}
                >
                  <div className={styles.imageWrap}>
                    <img src={imgSrc} alt={t.title} className={styles.image} loading="lazy" />
                  </div>
                  <div className={styles.body}>
                    <h3 className={styles.title}>{t.title}</h3>
                    <p className={styles.authors}>{t.authors}</p>
                    {t.journal && <p className={styles.meta}>{t.journal}</p>}
                    <div className={styles.footer}>
                      {pub.year && <span className={styles.year}>{pub.year}</span>}
                      {pub.doi && (
                        <a
                          href={pub.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.doiBtn}
                        >
                          DOI
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
        <Modal onClose={() => setSelectedPublication(null)}>
          <PublicationModalContent publication={selectedPublication} lang={lang} />
        </Modal>
      )}
      </ContainerWrap>
    </section>
  );
}
