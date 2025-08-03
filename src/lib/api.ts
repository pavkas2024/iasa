const BASE = "https://institutebackend-production.up.railway.app";

const fetchJson = async (path: string, locale: string) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Accept-Language": locale,
    },
    next: { revalidate: 60 }, // ISR: оновлення кожні 60 сек
  });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
};

// 👇 Функції на кожну сторінку
export const getHomeData = async (locale: string) => {
  const [
    instituts,
    news,
    documents,
    journals,
    procurements,
    publications,
    contacts,
  ] = await Promise.all([
    fetchJson("/instituts", locale),
    fetchJson("/news", locale),
    fetchJson("/documents", locale),
    fetchJson("/journals", locale),
    fetchJson("/procurements", locale),
    fetchJson("/publications", locale),
    fetchJson("/contacts", locale),
  ]);
  return {
    instituts,
    news,
    documents,
    journals,
    procurements,
    publications,
    contacts,
  };
};

export const getInstituteData = async (locale: string) => {
  const [instituts, departments, staffs, decisions] = await Promise.all([
    fetchJson("/instituts", locale),
    fetchJson("/departments", locale),
    fetchJson("/staffs", locale),
    fetchJson("/decisions", locale),
  ]);
  return { instituts, departments, staffs, decisions };
};

export const getIntActivityData = async (locale: string) => {
  const [collaborations, intprojects] = await Promise.all([
    fetchJson("/collaborations", locale),
    fetchJson("/intprojects", locale),
  ]);
  return { collaborations, intprojects };
};

export const getResearchData = async (locale: string) => {
  const [intprojects, natprojects, seminars, publications] = await Promise.all([
    fetchJson("/intprojects", locale),
    fetchJson("/natprojects", locale),
    fetchJson("/seminars", locale),
    fetchJson("/publications", locale),
  ]);
  return { intprojects, natprojects, seminars, publications };
};

export const getContactsData = async (locale: string) => {
  return fetchJson("/contacts", locale);
};
