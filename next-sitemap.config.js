/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://iasa-two.vercel.app',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
  
    transform: async (config, path) => ({
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        { href: `https://iasa-two.vercel.app/uk${path}`, hreflang: 'uk' },
        { href: `https://iasa-two.vercel.app/en${path}`, hreflang: 'en' },
      ],
    }),
  
    additionalPaths: async (config) => {
      const paths = [
        '/institute',
        '/research',
        '/intactivity',
        '/contacts',
      ];
  
      return paths.flatMap((path) => [
        { loc: path },
        { loc: `/uk${path}` },
        { loc: `/en${path}` },
      ]);
    },
  };
  