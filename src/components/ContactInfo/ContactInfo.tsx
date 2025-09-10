import React from 'react';
import { Contact } from '@/types/contacts';
import styles from './ContactInfo.module.css';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface Props {
  contacts: Contact[];
  locale: Locale;
}

const ContactInfo: React.FC<Props> = ({ contacts, locale }) => {
    if (!contacts || contacts.length === 0) return null;

    const t = locale === "uk" ? uk : en;

    const contact = contacts[0]; // беремо лише перший елемент
  
    return (
      <div className={styles.contactItem}>
        <p>
          {contact.translates[locale].city}, {contact.translates[locale].street}, {contact.build}, {t.adress.build} {contact.corp || ''}
        </p>
        <p>{contact.phone}</p>
        <p>Email: {contact.email}</p>
      </div>
    );
};

export default ContactInfo;
