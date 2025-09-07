/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'], // Автоматично генерує сучасні формати
  },
};

export default nextConfig;