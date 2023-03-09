import '../styles/index.css';
import { SessionProvider } from '@/provider/SesseionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { AtomProvider } from '@/provider/AtomProvider';
import ClientProvider from '@/provider/ClientProvider';
import SlideOver from '@/components/slide/SlideOver';
import SideBar from '@/components/sideBar';

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
          </SessionProvider>
        </AtomProvider>
      </body>
    </html>
  );
}
