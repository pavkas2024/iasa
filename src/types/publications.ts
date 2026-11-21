
export interface Publication {
  _id: string;

  photo?: string;
  doi?: string;
  year: string;
  issn?: string;

  // Постійна адреса сторінки
  slug?: string;

  // Тип публікації
  type?: 'scientific' | 'popular';

  // Посилання на відео YouTube
  videoUrl?: string;

  // Чи показувати анонс у новинах
  showInNews?: boolean;

  translates: {
    uk: {
      title: string;
      authors: string;
      journal?: string;
      publisher?: string;
      city?: string;
      pages?: string;
      description?: string;
      other?: string;
      fullText?: string;
    };

    en: {
      title: string;
      authors: string;
      journal?: string;
      publisher?: string;
      city?: string;
      pages?: string;
      description?: string;
      other?: string;
      fullText?: string;
    };

    _id?: string;
  };

  createdAt?: string;
  updatedAt?: string;
}
