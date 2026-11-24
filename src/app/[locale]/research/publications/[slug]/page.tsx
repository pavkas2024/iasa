
import { notFound } from "next/navigation";
import { Publication } from "@/types/publications";

type Locale = "uk" | "en";

type Props = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};

type YouTubeStats = {
  views: number;
  likes: number | null;
};

const API_URL =
  "https://institutebackend-production.up.railway.app";

// Отримання публікації з бекенду
async function getPublication(
  slug: string,
): Promise<Publication | null> {
  try {
    const response = await fetch(
      `${API_URL}/publications/slug/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Publication fetch error:", error);
    return null;
  }
}

// Визначення ID YouTube-відео
// Підтримує watch, shorts, embed, live та youtu.be
function getYouTubeId(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl);
    const host = url.hostname.toLowerCase();

    let videoId: string | null | undefined = null;

    if (
      host === "youtu.be" ||
      host === "www.youtu.be"
    ) {
      videoId = url.pathname.split("/")[1];
    } else if (
      host === "youtube.com" ||
      host === "www.youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com" ||
      host === "www.youtube-nocookie.com"
    ) {
      if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v");
      } else if (
        /^\/(embed|shorts|live)\//.test(url.pathname)
      ) {
        videoId = url.pathname.split("/")[2];
      }
    }

    return videoId &&
      /^[a-zA-Z0-9_-]{11}$/.test(videoId)
      ? videoId
      : null;
  } catch {
    return null;
  }
}

// Отримання переглядів та лайків YouTube
async function getYouTubeStats(
  videoId: string,
): Promise<YouTubeStats | null> {
  try {
    const response = await fetch(
      `${API_URL}/youtube/stats/${videoId}`,
      {
        next: { revalidate: 43200 },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (
      typeof data.views !== "number" ||
      !Number.isSafeInteger(data.views) ||
      data.views < 0
    ) {
      return null;
    }

    return {
      views: data.views,
      likes:
        typeof data.likes === "number" &&
        Number.isSafeInteger(data.likes) &&
        data.likes >= 0
          ? data.likes
          : null,
    };
  } catch (error) {
    console.error("YouTube stats fetch error:", error);
    return null;
  }
}

export default async function PublicationDetailPage({
  params,
}: Props) {
  const { locale, slug } = await params;

  if (locale !== "uk" && locale !== "en") {
    notFound();
  }

  const publication = await getPublication(slug);

  if (!publication) {
    notFound();
  }

  const t = publication.translates?.[locale];

  if (!t) {
    notFound();
  }

  // ID відео з актуального поля videoUrl
  const videoId = publication.videoUrl
    ? getYouTubeId(publication.videoUrl)
    : null;

  // Отримуємо статистику саме цього відео
  const videoStats = videoId
    ? await getYouTubeStats(videoId)
    : null;

  // DOI або зовнішнє посилання
  const isExternalUrl = publication.doi
    ? /^https?:\/\//i.test(publication.doi)
    : false;

  const externalLink = publication.doi
    ? isExternalUrl
      ? publication.doi
      : `https://doi.org/${publication.doi}`
    : null;

  const numberLocale =
    locale === "uk" ? "uk-UA" : "en-US";

  return (
    <main
      style={{
        maxWidth: "950px",
        margin: "0 auto",
        padding: "40px 20px 80px",
      }}
    >
      <article>

        {/* 1. ГОЛОВНЕ ЗОБРАЖЕННЯ */}

        {publication.photo && (
          <div
            style={{
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            <img
              src={publication.photo}
              alt={t.title}
              style={{
                display: "block",
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          </div>
        )}

        {/* 2. НАЗВА ПУБЛІКАЦІЇ */}

        <h1
          style={{
            fontSize: "clamp(1.7rem, 4vw, 2.5rem)",
            lineHeight: 1.3,
            marginBottom: "24px",
            color: "var(--text)",
          }}
        >
          {t.title}
        </h1>

        {/* 3. АВТОРИ */}

        {t.authors && (
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              marginBottom: "12px",
              color: "var(--dark-gray)",
            }}
          >
            {t.authors}
          </p>
        )}

        {/* 4. РІК */}

        {publication.year && (
          <p
            style={{
              fontSize: "0.95rem",
              marginBottom: "32px",
              color: "var(--dark-gray)",
            }}
          >
            {publication.year}
          </p>
        )}

        {/* 5. YOUTUBE-ВІДЕО */}

        {videoId && (
          <section
            style={{
              marginBottom: "16px",
            }}
          >
            <h2
              style={{
                fontSize: "1.4rem",
                marginBottom: "20px",
                color: "var(--text)",
              }}
            >
              {locale === "uk"
                ? "Відеоматеріал"
                : "Video"}
            </h2>

            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                overflow: "hidden",
                borderRadius: "12px",
              }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                title={
                  locale === "uk"
                    ? "Відео до публікації"
                    : "Publication video"
                }
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>

            {/* ПЕРЕГЛЯДИ ТА ЛАЙКИ YOUTUBE */}

            {videoStats && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "24px",
                  marginTop: "14px",
                  fontSize: "0.95rem",
                  color: "var(--dark-gray)",
                }}
              >
                <span>
                  <span aria-hidden="true">👁</span>
                  {" "}
                  {videoStats.views.toLocaleString(
                    numberLocale,
                  )}
                  {" "}
                  {locale === "uk"
                    ? "переглядів"
                    : "views"}
                </span>

                {videoStats.likes !== null && (
                  <span>
                    <span aria-hidden="true"> </span>
                    {" "}
                    {videoStats.likes.toLocaleString(
                      numberLocale,
                    )}
                    {" "}
                    {locale === "uk"
                      ? 'реакцій'
                      : 'reactions'}
                  </span>
                )}
              </div>
            )}
          </section>
        )}

        {/* 6. DOI АБО ЗОВНІШНЄ ПОСИЛАННЯ */}

        {externalLink && (
          <p
            style={{
              marginTop: "16px",
              marginBottom: "48px",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              overflowWrap: "anywhere",
            }}
          >
            {isExternalUrl
              ? locale === "uk"
                ? "Посилання: "
                : "Link: "
              : "DOI: "}

            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--main)",
                textDecoration: "underline",
              }}
            >
              {publication.doi}
            </a>
          </p>
        )}

        {/* 7. ТЕКСТ СТАТТІ */}

        {t.description && (
          <div
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.85,
              marginBottom: "32px",
              whiteSpace: "pre-line",
              color: "var(--text)",
              overflowWrap: "anywhere",
            }}
          >
            {t.description}
          </div>
        )}

        {t.fullText && (
          <div
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.9,
              marginBottom: "40px",
              whiteSpace: "pre-line",
              color: "var(--text)",
              overflowWrap: "anywhere",
            }}
          >
            {t.fullText}
          </div>
        )}

      </article>
    </main>
  );
}
