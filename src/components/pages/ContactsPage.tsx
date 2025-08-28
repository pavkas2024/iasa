import React from 'react';

import ContainerWrap from '../Wrap/Wrap';
import ContactForm from '../ContactForm/ContactForm';
import ContactInfo from '../ContactInfo/ContactInfo';

import { Contact } from '@/types/contacts';

import styles from './ContactsPage.module.css';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

type Props = {
  locale: Locale;
  contacts: Contact[];
};

const translations = { en, uk };

const ContactsPage: React.FC<Props> = ({ locale, contacts }) => {
  const t = translations[locale];

  return (
    <main>
      <ContainerWrap>
        <h1 className={styles.heading}>{t.menu.contacts}</h1>

        <div className={styles.contactsWrapper}>
          <ContactInfo contacts={contacts} locale={locale} />

         <div className={styles.formWrap}>
         <h2 className={styles.heading}>{t.form.title}</h2>
          <ContactForm locale={locale} />
         </div>
        </div>
      </ContainerWrap>
    </main>
  );
};

export default ContactsPage;
