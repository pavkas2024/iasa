'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import styles from './ContactForm.module.css';
import 'react-toastify/dist/ReactToastify.css';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface ContactFormProps {
  locale: Locale;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const t = locale === "uk" ? uk : en;
  const formTexts = t.form;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('email', formData.email);
    dataToSend.append('message', formData.message);

    try {
      const response = await fetch('https://usebasin.com/f/1ee777e0df85', {
        method: 'POST',
        body: dataToSend,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        toast.success(formTexts.success);
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(formTexts.error);
      }
    } catch (err) {
      toast.error(formTexts.generalError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form className={styles.contactForm} onSubmit={handleSubmit} autoComplete="off">
        {/* Honeypot для спаму */}
        <label htmlFor="website" className={styles.srOnly}>
          Do not fill this field (spam protection)
        </label>
        <input
          type="text"
          id="website"
          name="website"
          className={styles.hiddenField}
          aria-hidden="true"
          tabIndex={-1}
        />

        <label className={styles.label}>
          {formTexts.name}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
            autoComplete="new-name"
          />
        </label>

        <label className={styles.label}>
          {formTexts.email}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
            autoComplete="new-email"
          />
        </label>

        <label className={`${styles.label} ${styles.fullWidth}`}>
          {formTexts.message}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </label>

        <button type="submit" className={styles.button} disabled={submitting}>
          {submitting ? formTexts.sending : formTexts.send}
        </button>
      </form>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
