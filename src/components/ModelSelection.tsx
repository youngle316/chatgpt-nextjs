'use client';

import Select from 'react-select';
import useSwr from 'swr';

const fetchModels = () => fetch('/api/getEngines').then((res) => res.json());

function ModelSelection() {
  const { data: models, isLoading } = useSwr('models', fetchModels);

  const { data: model, mutate: setModel } = useSwr('model', {
    fallbackData: 'text-davinci-003'
  });

  return (
    <div>
      <Select
        className="mt-2"
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{ control: (state) => 'bg-[#434654] border-[#434654]' }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}

export default ModelSelection;
