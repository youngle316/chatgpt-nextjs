'use client';
import { signIn } from 'next-auth/react';
import ChatGPTLogo from 'public/assets/chatgpt.svg';
import GoogleLogo from 'public/assets/google.svg';
import GitHubLogo from 'public/assets/github.svg';
import Footer from '@/components/Footer';

function Login() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className=" mb-3 border-b border-solid border-[#D9DADC] p-3 md:mb-8 md:pb-4 md:pt-6">
        <div className="flex h-14 items-center justify-center gap-3">
          <ChatGPTLogo className="h-full" />
          <div className="text-2xl font-semibold">ChatGPT</div>
        </div>
      </div>

      <div className="flex flex-1 justify-center p-4">
        <div className="w-full max-w-[450px]">
          <div className="flex flex-col gap-3">
            <p className="text-center text-sm font-black">
              To continue, log in to ChatGPT
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="flex relative w-full items-center justify-center
              rounded-full border border-[#878787] bg-transparent px-8 py-2 text-center text-base font-bold"
              >
                <div className="flex items-center justify-center gap-2">
                  <GoogleLogo className="h-5 w-5" />
                  CONTINUE WITH GOOGLE
                </div>
              </button>

              <button
                onClick={() => signIn('github', { callbackUrl: '/' })}
                className="flex relative w-full items-center justify-center
              rounded-full border border-[#878787] bg-transparent px-8 py-2 text-center text-base font-bold"
              >
                <div className="flex items-center justify-center gap-2">
                  <GitHubLogo className="h-5 w-5" />
                  CONTINUE WITH GITHUB
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex justify-center gap-3 px-3 pt-2 pb-3 text-center text-xs text-black/50 
      md:px-4 md:pt-3 md:pb-6"
      >
        <Footer />
      </div>
    </div>
  );
}

export default Login;
