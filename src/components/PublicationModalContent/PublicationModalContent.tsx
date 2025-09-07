import React from 'react';
import { Publication } from '@/types/publications';
import styles from './PublicationModalContent.module.css';

type Props = {
  publication: Publication;
  lang: 'uk' | 'en';
};

const PublicationModalContent: React.FC<Props> = ({ publication, lang }) => {
  const t = publication.translates[lang];
  const imgSrc = publication.photo || '/placeholderPublication.webp';

  return (
    <div className={styles.container}>
      <img src={imgSrc} alt={t.title} className={styles.image} />

      <div className={styles.details}>
        <h2 className={styles.title}>{t.title}</h2>

        {t.authors && <div className={styles.authors}>{t.authors}</div>}
        {t.journal && <div className={styles.journal}>{t.journal}</div>}
        {t.publisher && <div className={styles.publisher}>{t.publisher}</div>}
        {t.city && <div className={styles.city}>{t.city}</div>}
        {t.pages && <div className={styles.pages}>{t.pages}</div>}
        {t.description && <div className={styles.description}>{t.description}</div>}
        {t.other && <div className={styles.other}>{t.other}</div>}
        {publication.issn && <div className={styles.issn}>ISSN: {publication.issn}</div>}
        {publication.year && <div className={styles.year}>{publication.year}</div>}
        {publication.doi && (
          <div className={styles.doi}>
            <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
              {publication.doi}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicationModalContent;
