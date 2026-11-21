
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

    if (host === "youtu.be" || host === "www.youtu.be") {
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

  return (
    <main
      style={{
        maxWidth: "950px",
        margin: "0 auto",
        padding: "40px 20px 80px",
      }}
    >
      <article>
        <h1
          style={{
            fontSize: "clamp(1.7rem, 4vw, 2.5rem)",
            lineHeight: 1.3,
            marginBottom: "20px",
          }}
        >
          {t.title}
        </h1>

        {t.authors && (
          <p style={{ marginBottom: "12px" }}>
            {t.authors}
          </p>
        )}

        {publication.year && (
          <p style={{ marginBottom: "24px" }}>
            {publication.year}
          </p>
        )}

        {publication.photo && (
          <img
            src={publication.photo}
            alt={t.title}
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "contain",
              borderRadius: "12px",
              marginBottom: "32px",
            }}
          />
        )}

        {t.description && (
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              marginBottom: "28px",
              whiteSpace: "pre-line",
            }}
          >
            {t.description}
          </p>
        )}

        {t.fullText && (
          <div
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.9,
              whiteSpace: "pre-line",
              marginBottom: "40px",
            }}
          >
            {t.fullText}
          </div>
        )}

        {videoId && (
          <section style={{ marginTop: "40px" }}>
            <h2 style={{ marginBottom: "20px" }}>
              {locale === "uk"
                ? "Відеоматеріал"
                : "Video"}
            </h2>

            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
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
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "12px",
                }}
              />
            </div>
          </section>
        )}

        
        {publication.doi && (
        <p style={{ marginTop: "32px" }}>
            {/^https?:\/\//i.test(publication.doi)
            ? (locale === "uk" ? "Посилання: " : "Link: ")
            : "DOI: "}

            <a
            href={
                /^https?:\/\//i.test(publication.doi)
                ? publication.doi
                : `https://doi.org/${publication.doi}`
            }
            target="_blank"
            rel="noopener noreferrer"
            >
            {publication.doi}
            </a>
        </p>
        )}
      </article>
    </main>
  );
}
