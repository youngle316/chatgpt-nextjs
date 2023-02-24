import './globals.css';
import SideBar from '@/components/SideBar';
import { SessionProvider } from '@/components/SesseionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Login from '@/components/Login';

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
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              {/* sidebar */}
              <div className="h-screen max-w-xs overflow-y-auto bg-[#202123] md:min-w-[260px]">
                <SideBar />
              </div>

              {/* ClientProvider - Notification */}

              <div className="flex-1 bg-[#343541]">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
