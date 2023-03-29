import '../../styles/index.css';
import { SessionProvider } from '@/provider/SesseionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { AtomProvider } from '@/provider/AtomProvider';
import ClientProvider from '@/provider/ClientProvider';
import SlideOver from '@/components/slide/SlideOver';
import SideBar from '@/components/sideBar';
import Analytic from '@/components/analytics';
import { I18nClientProvider } from '@/provider/I18nClientProvider';
import CustomThemeProvider from '@/provider/CustomThemeProvider';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await getServerSession(authOptions);
  const { locale = 'zh-CN' } = params || {};

  return (
    <I18nClientProvider locale={locale}>
      <AtomProvider>
        <SessionProvider session={session}>
          <html lang="en">
            <head />
            <body>
              <CustomThemeProvider>
                <div className="relative h-full w-full overflow-hidden">
                  {session && (
                    <div className="sidebar-container">
                      <SideBar />
                    </div>
                  )}
                  {children}
                </div>
              </CustomThemeProvider>
              <ClientProvider />
              <SlideOver />
              <Analytic />
            </body>
          </html>
        </SessionProvider>
      </AtomProvider>
    </I18nClientProvider>
  );
}
