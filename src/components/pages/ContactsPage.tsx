import React from 'react';
import type { Contact } from '@/types/api';

type Props = {
  locale: string;
  contacts: Contact[];
};

const ContactsPage: React.FC<Props> = ({ locale, contacts }) => {
  return (
    <main>
      <h1>Контакти ({locale})</h1>

      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            {contact.translates[locale].city}, {contact.translates[locale].street}, {contact.build} {contact.corp || ''}
            <br />
            Телефон: {contact.phone}
            <br />
            Email: {contact.email}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ContactsPage;