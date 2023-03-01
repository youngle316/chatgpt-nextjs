import './globals.css';
import SideBar from '@/components/SideBar';
import { SessionProvider } from '@/components/SesseionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Login from '@/components/Login';
import ClientProvider from '@/components/ClientProvider';
import SlideOver from '@/components/SlideOver';
import { AtomProvider } from '@/components/AtomProvider';
import TopBar from '@/components/TopBar';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head />
      <body>
        <AtomProvider>
          <SessionProvider session={session}>
            {!session ? (
              <Login />
            ) : (
              <div className="relative flex h-screen flex-col sm:flex-row">
                {/* sidebar */}
                <div className="hidden h-screen max-w-xs overflow-y-auto bg-[#202123] md:block md:min-w-[260px]">
                  <SideBar />
                </div>

                <div className="flex w-full flex-col bg-[#343541]">
                  <div className="sticky top-0 flex h-10 w-full items-center justify-between border-b border-white/20 bg-[#343541] px-4 text-white sm:hidden">
                    <TopBar />
                  </div>
                  {children}
                </div>

                {/* ClientProvider - Notification */}
                <ClientProvider />

                {/* SlideOver */}
                <SlideOver />
              </div>
            )}
          </SessionProvider>
        </AtomProvider>
      </body>
    </html>
  );
}
