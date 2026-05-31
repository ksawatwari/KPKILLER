import type {Metadata} from 'next';
import { Anuphan } from 'next/font/google';
import './globals.css'; // Global styles

const anuphan = Anuphan({
  subsets: ['thai', 'latin'],
  variable: '--font-anuphan',
});

export const metadata: Metadata = {
  title: 'ENG KP Killer - ติวอังกฤษ ก.พ.',
  description: 'ติวอังกฤษ ก.พ. แบบเพื่อนบอกเพื่อน อ่านง่าย จบไว ผ่านจริง',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className={`${anuphan.className} antialiased bg-white text-[#1B2A4A]`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
