'use client';

import { useRef, useEffect } from 'react';
import ChatInput from '../chatInput/ChatInput';
import TopBar from '../topBar/TopBar';
import { useRecoilState } from 'recoil';
import { showBottomDivRef } from '@/recoil/atom/AtomRef';
import { ArrowSmallDownIcon } from '@heroicons/react/24/outline';
import { useScrollToView } from '@/hook/useScrollToView';
import { useInView } from 'react-intersection-observer';

type ContentContainerProps = {
  children: React.ReactNode;
  pageId?: string;
};

function ContentContainer({ children, pageId }: ContentContainerProps) {
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const [ShowBottomDiv, setShowBottomDivRef] = useRecoilState(showBottomDivRef);

  const scrollIntoView = useScrollToView(ShowBottomDiv);

  const { ref, inView } = useInView();

  useEffect(() => {
    setShowBottomDivRef(messageEndRef);
  }, []);

  const scrollTobBottom = () => {
    scrollIntoView();
  };

  return (
    <div className="main">
      <TopBar />
      <main className=" relative flex h-full w-full flex-1 flex-col items-stretch overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="relative h-full dark:bg-gray-800">
            <div className="h-full w-full overflow-y-auto">
              <div className="flex flex-col items-center text-sm dark:bg-gray-800">
                {children}
                <div
                  ref={messageEndRef}
                  className="h-32 w-full flex-shrink-0 md:h-48"
                >
                  <div ref={ref} />
                </div>
              </div>
              <button
                onClick={scrollTobBottom}
                className={`scrollDown ${inView && 'hidden'}`}
              >
                <ArrowSmallDownIcon className="m-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="chatInput">
          <ChatInput chatId={pageId as string} />
        </div>
      </main>
    </div>
  );
}

export default ContentContainer;
