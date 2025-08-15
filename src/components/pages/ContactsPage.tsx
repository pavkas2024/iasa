import React from 'react';

import ContainerWrap from '../Wrap/Wrap';

import { Contact } from '@/types/contacts';

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
        <h1>{t.menu.contacts}</h1>

        <ul>
          {contacts.map(contact => (
            <li key={contact._id}>
              {contact.translates[locale].city}, {contact.translates[locale].street}, {contact.build} {contact.corp || ''}
              <br />
              {contact.phone}
              <br />
              Email: {contact.email}
            </li>
          ))}
        </ul>
      </ContainerWrap>
    </main>
  );
};

export default ContactsPage;