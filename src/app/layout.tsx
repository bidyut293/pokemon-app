import { QueryProvider } from '@/providers/QueryProvider';
import { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
  title: 'Pokemon Search App',
  description: 'Search and explore Pokemon with detailed information',
  keywords: 'pokemon, search, pokedex, types, abilities',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}