import '@/app/ui/global.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Cadet Connect',
    default: 'Cadet Connect',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="has-background-white-bis">
      <body className='has-navbar-fixed-top'>
        {children}
      </body>
    </html>
  );
}
