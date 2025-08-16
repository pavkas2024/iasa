

import React from "react";
import { getContactsData } from "@/lib/api";
import styles from './Footer.module.css';
import { Contact } from "@/types/contacts";
import { Institut } from "@/types/instituts";

type Locale = "uk" | "en";

type FooterProps = {
  locale: Locale;
};

export default async function Footer({ locale }: FooterProps) {
  const {instituts, contacts} = await getContactsData();


  if (!contacts || contacts.length === 0) return null;

  const institut: Institut = instituts[0];
  const contact: Contact = contacts[0];
  const t = contact.translates[locale];
  const tt = institut.translates[locale];

  const fullAddress = `${t.street}, ${contact.build}, ${t.city}, ${contact.indexPost}`;
  const email = contact.email;
  const phone = contact.phone;
  const facebook = contact.linkFacebook;
  const academy = contact.linkAcademy;

  return (
    <footer className={styles.footerStyle}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>{tt.shortTitle}</h1>
          <p className={styles.address}>{fullAddress}</p>
        </div>

        <div className={styles.right}>
          {email && <div className={styles.info}>Email: {email}</div>}
          {phone && <div className={styles.info}> {phone}</div>}

          {(facebook || academy) && (
            <div className={styles.links}>
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              )}
              {academy && (
                <a href={academy} target="_blank" rel="noopener noreferrer">
                  Academy
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
