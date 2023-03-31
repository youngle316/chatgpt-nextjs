'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/hook/useI18n';
import BasicInput from '../Input';
import { PlusIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { db } from '@/service/firebase/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import PromptItem from './PromptItem';

function CustomPrompt() {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>('');
  const [desValue, setDesValue] = useState<string>('');
  const [promptValue, setPromptValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [addBtnDis, setAddBtnDis] = useState<boolean>(false);

  const { data: session } = useSession();

  const { t } = useI18n();

  const [customPromptData] = useCollection(
    query(
      collection(db, 'users', session?.user?.email!, 'customPrompt'),
      orderBy('createAt', 'asc')
    )
  );

  const addPrompt = () => {
    if (titleValue === '' || promptValue === '') {
      return;
    }

    const newPrompt = {
      title: titleValue,
      des: desValue,
      source: Date.now(),
      prompt: promptValue,
      type: 'custom',
      createAt: serverTimestamp()
    };

    setAddBtnDis(true);

    addDoc(
      collection(db, 'users', session?.user?.email!, 'customPrompt'),
      newPrompt
    )
      .then((res) => {
        if (res && res.id) {
          setIsAdding(false);
          setTitleValue('');
          setDesValue('');
          setPromptValue('');
        }
      })
      .finally(() => {
        setAddBtnDis(false);
      });
  };

  return (
    <>
      {isAdding ? (
        <div className="flex flex-col gap-2 border-b pb-3">
          <div>
            <label className="label">{t('title')}</label>
            <BasicInput
              setData={setTitleValue}
              placeholder={t('promptTitle')}
            />
          </div>
          <div>
            <label className="label">{t('des')}</label>
            <BasicInput setData={setDesValue} placeholder={t('promptDes')} />
          </div>
          <div>
            <label className="label">{t('prompt')}</label>
            <textarea
              rows={4}
              className="basic-input"
              placeholder={t('promptContent')}
              onChange={(e) => setPromptValue(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-5">
            <button onClick={addPrompt} className="blue-button gap-1">
              <PlusIcon className="h-4 w-4" />
              {t('addPrompt')}
            </button>
            <button onClick={() => setIsAdding(false)}>
              {t('cancelAddPrompt')}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 border-b pb-3">
          <div className="flex">
            <div className="flex-1">
              <BasicInput
                setData={setSearchValue}
                placeholder={t('searchPrompt')}
              />
            </div>
            <div className="flex">
              <button
                disabled={addBtnDis}
                onClick={() => setIsAdding(true)}
                className="common-button gap-1"
              >
                <PlusCircleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div
            className={`${
              customPromptData?.docs.length === 0 &&
              'rounded-lg border border-dashed border-gray-700 px-5 py-3 text-sm text-gray-400 dark:border-white'
            }`}
          >
            {customPromptData?.docs.length === 0 ? (
              <p>{t('noCustomPrompt')}</p>
            ) : (
              customPromptData?.docs.map((item) => {
                const { title, des, source, prompt } = item.data();
                if (title.includes(searchValue)) {
                  return (
                    <PromptItem
                      key={item.id}
                      prompt={{ title, des, source, content: prompt }}
                    />
                  );
                }
              })
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CustomPrompt;
