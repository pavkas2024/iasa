
import { notFound } from "next/navigation";
import { Publication } from "@/types/publications";

type Locale = "uk" | "en";

type Props = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};

const API_URL =
  "https://institutebackend-production.up.railway.app";

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

// Отримуємо ID відео з YouTube
function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    let videoId: string | null = null;

    if (
      host === "youtu.be" ||
      host === "www.youtu.be"
    ) {
      videoId = parsed.pathname.split("/")[1];
    } else if (
      host === "youtube.com" ||
      host === "www.youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com" ||
      host === "www.youtube-nocookie.com"
    ) {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else if (
        parsed.pathname.startsWith("/embed/") ||
        parsed.pathname.startsWith("/shorts/") ||
        parsed.pathname.startsWith("/live/")
      ) {
        videoId = parsed.pathname.split("/")[2];
      }
    }

    return videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)
      ? videoId
      : null;
  } catch {
    return null;
  }
}


async function getYouTubeViews(
    videoId: string,
  ): Promise<number | null> {
    try {
      const response = await fetch(
        `${API_URL}/youtube/views/${videoId}`,
        {
          next: { revalidate: 43200 },
        },
      );
  
      if (!response.ok) {
        return null;
      }
  
      const data = await response.json();
  
      return typeof data.views === 'number'
        ? data.views
        : null;
    } catch (error) {
      console.error('YouTube views fetch error:', error);
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

  const videoId = publication.videoUrl
    ? getYouTubeId(publication.videoUrl)
    : null;

    const videoViews = videoId
        ? await getYouTubeViews(videoId)
        : null;

  const externalLink = publication.doi
    ? /^https?:\/\//i.test(publication.doi)
      ? publication.doi
      : `https://doi.org/${publication.doi}`
    : null;

  const isExternalUrl = publication.doi
    ? /^https?:\/\//i.test(publication.doi)
    : false;

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

        {/* 2. НАЗВА СТАТТІ */}

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

        {/* АВТОРИ */}

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

        {/* РІК */}

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

        {/* 3. YOUTUBE-ВІДЕО */}

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


            {videoViews !== null && (
                <p
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '12px',
                    marginBottom: 0,
                    fontSize: '0.95rem',
                    color: 'var(--dark-gray)',
                    }}
                >
                    <span aria-hidden="true">👁</span>
                    {videoViews.toLocaleString(
                    locale === 'uk' ? 'uk-UA' : 'en-US'
                    )}
                    {' '}
                    {locale === 'uk' ? 'переглядів' : 'views'}
                    {' · YouTube'}
                </p>
            )}

          </section>
        )}

         {/* 5. DOI АБО ЗОВНІШНЄ ПОСИЛАННЯ */}

         {externalLink && (
          <p
            style={{
                marginTop: "0px",
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
              }}
            >
              {publication.doi}
            </a>
          </p>
        )}

        {/* 4. ТЕКСТ СТАТТІ */}

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
