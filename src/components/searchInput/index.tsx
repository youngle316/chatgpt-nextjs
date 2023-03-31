import { useI18n } from '@/hook/useI18n';
import { Dispatch, SetStateAction } from 'react';

type SearchInputProps = {
  setData: Dispatch<SetStateAction<string>>;
};

function SearchInput({ setData }: SearchInputProps) {
  const { t } = useI18n();

  return (
    <>
      <input
        type="text"
        className="basic-input"
        placeholder={t('searchPrompt')}
        onChange={(e) => setData(e.target.value)}
      />
    </>
  );
}

export default SearchInput;
