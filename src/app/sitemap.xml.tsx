// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["uk", "en"];

  const urls: string[] = [];

  locales.forEach((locale) => {
    // Головна
    urls.push(`/${locale}`);

    // Інститут
    urls.push(`/${locale}/institute`);
    urls.push(`/${locale}/institute/about`);
    urls.push(`/${locale}/institute/structure`);
    urls.push(`/${locale}/institute/staff`);
    urls.push(`/${locale}/institute/council`);

    // Наукові дослідження
    urls.push(`/${locale}/research`);
    urls.push(`/${locale}/research/natprojects`);
    urls.push(`/${locale}/research/intprojects`);
    urls.push(`/${locale}/research/publications`);
    urls.push(`/${locale}/research/seminars`);

    // Міжнародна діяльність
    urls.push(`/${locale}/intactivity`);
    urls.push(`/${locale}/intactivity/collaborations`);
    urls.push(`/${locale}/intactivity/intprojects`);

    // Контакти
    urls.push(`/${locale}/contacts`);
  });

  return urls.map((url) => ({
    url,
    lastModified: new Date().toISOString(),
  }));
}
