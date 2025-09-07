/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://iasa-two.vercel.app',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 0.7,
    alternateRefs: [
      {
        href: 'https://iasa-two.vercel.app/uk',
        hreflang: 'uk',
      },
      {
        href: 'https://iasa-two.vercel.app/en',
        hreflang: 'en',
      },
    ],
  };
  