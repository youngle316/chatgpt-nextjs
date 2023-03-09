'use client';
import { signIn } from 'next-auth/react';
import ChatGPTLogo from 'public/assets/chatgpt.svg';

function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#11A37F] text-center">
      <ChatGPTLogo className="w-[300px]" />
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="animate-pulse text-3xl font-bold text-white"
      >
        Sign In To Use ChatGPT
      </button>
    </div>
  );
}

export default Login;
