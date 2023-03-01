'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SideBar from './SideBar';
import { useRecoilState } from 'recoil';
import { openState } from '@/atom/AtomSlideOver';

function SlideOver() {
  const [open, setOpen] = useRecoilState(openState);

  return (
    <>
      {open && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child as={Fragment}>
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-20">
                  <Transition.Child as={Fragment}>
                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                      <Transition.Child as={Fragment}>
                        <div className="absolute top-0 right-0 -mr-8 flex pt-4 pl-2">
                          <button
                            type="button"
                            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </Transition.Child>
                      <div className=" flex h-full w-full flex-1 flex-col bg-[#343541] shadow-xl">
                        <SideBar />
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}

export default SlideOver;
