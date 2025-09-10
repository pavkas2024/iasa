'use client';

import React from 'react';
import ContainerWrap from '../Wrap/Wrap';
import ContactForm from '../ContactForm/ContactForm';
import ContactInfo from '../ContactInfo/ContactInfo';
import { Contact } from '@/types/contacts';

import styles from './ContactsPage.module.css';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';
import PreCourseInfo from '../PreCourseInfo/PreCourseInfo';

type Locale = "uk" | "en";

type Props = {
  locale: Locale;
  contacts: Contact[];
};

const translations = { en, uk };

const ContactsPage: React.FC<Props> = ({ locale, contacts }) => {
  const t = translations[locale];

  // Нові контакти з поштою
  const peopleContacts = [
    { label: t.contacts.adv, email: "zgurovsm@hotmail.com" },
    { label: t.contacts.dir, email: "p.o.kasyanov@gmail.com" },
    { label: t.contacts.dep, email: "natalidmp@gmail.com" },
    { label: t.contacts.secr, email: "okirik@ukr.net" },
    { label: t.contacts.org, email: "lili262808@gmail.com" },
  ];

  return (
    <main>
      <ContainerWrap>
        <h1 className={styles.heading}>{t.menu.contacts}</h1>

        <div className={styles.contactsWrapper}>
          {/* Оригінальні контакти */}
          <ContactInfo contacts={contacts} locale={locale} />

          <PreCourseInfo locale={locale}/>

          {/* Додаткові люди з поштою */}
          <div className={styles.contactInfoBlock}>
            {peopleContacts.map((p, i) => (
              <p key={i} className={styles.contactField}>
                <span>{p.label}:</span> <a href={`mailto:${p.email}`}>{p.email}</a>
              </p>
            ))}
          </div>

          {/* Форма */}
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
