import '../../styles/index.css';
import { NextIntlClientProvider } from 'next-intl/client';
import { SessionProvider } from '@/provider/SesseionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { AtomProvider } from '@/provider/AtomProvider';
import ClientProvider from '@/provider/ClientProvider';
import SlideOver from '@/components/slide/SlideOver';
import SideBar from '@/components/sideBar';
import Analytic from '@/components/analytics';
import { notFound } from 'next/navigation';

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../message/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  const session = await getServerSession(authOptions);

  return (
    <html>
      <head />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AtomProvider>
            <SessionProvider session={session}>
              <div className="relative h-full w-full overflow-hidden">
                {session && (
                  <div className="sidebar-container">
                    <SideBar />
                  </div>
                )}
                {children}
              </div>
              <ClientProvider />
              <SlideOver />
              <Analytic />
            </SessionProvider>
          </AtomProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
