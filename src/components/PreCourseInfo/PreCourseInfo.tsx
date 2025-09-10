import React from 'react';
import styles from './PreCourseInfo.module.css';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface Props {
  locale: Locale;
}

const PreCourseInfo: React.FC<Props> = ({ locale }) => {
   

    const t = locale === "uk" ? uk : en;


  
    return (
      <div className={styles.contactItem}>
         <p className={styles.name}>
          {t.precourse.name}
        </p>
        <p>
          {t.precourse.city}, {t.precourse.street}, 37, {t.precourse.build} 35, {t.precourse.room} 104
        </p>
        <p>+38 (044) 204-97-02, +38 (066) 446-72-70</p>
        <a className={styles.facebook} href="https://www.facebook.com/kpi.iasa.training" target="_blank" rel="noopener noreferrer">
              Facebook
        </a>
      </div>
    );
};

export default PreCourseInfo;
