import './globals.css';
import { ReactNode } from 'react';


export const metadata = {
  title: 'IASA',
  icons: {
    icon: '/favicon.ico', 
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}