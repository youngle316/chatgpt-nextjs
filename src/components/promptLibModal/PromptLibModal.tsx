import React, { Fragment } from 'react';
import { Tabs } from 'flowbite-react';
import { Dialog, Transition } from '@headlessui/react';
import { cnPrompts } from '@/assets/prompts/cnPrompts';
import { enPrompts } from '@/assets/prompts/enPrompts';
import PromptContent from './PromptContent';
import { useRecoilState } from 'recoil';
import { promptLibModalState } from '@/recoil/atom/AtomMessage';
import { useI18n } from '@/hook/useI18n';
import CustomPrompt from './CustomPrompt';

function PromptLibModal() {
  const [promptLibModal, setPromptLibModal] =
    useRecoilState(promptLibModalState);

  const { t } = useI18n();

  return (
    <Transition appear show={promptLibModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setPromptLibModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-black">
                <Dialog.Title
                  as="h3"
                  className="flex justify-center text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  {t('promptLib')}
                </Dialog.Title>
                <Tabs.Group aria-label="Tabs with underline" style="underline">
                  <Tabs.Item title={t('yourPrompt')}>
                    <CustomPrompt />
                  </Tabs.Item>
                  <Tabs.Item active={true} title="中文">
                    <PromptContent content={cnPrompts} />
                  </Tabs.Item>
                  <Tabs.Item title="English">
                    <PromptContent content={enPrompts} />
                  </Tabs.Item>
                </Tabs.Group>
                <div className="flex justify-center">
                  <button
                    onClick={() => setPromptLibModal(false)}
                    className="blue-button"
                  >
                    {t('closePromptLib')}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PromptLibModal;
