import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon
} from '@heroicons/react/24/outline';

function Description() {
  return (
    <>
      <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:h-full md:max-w-2xl md:flex-col lg:max-w-3xl">
        <h1 className="mt-6 ml-auto mr-auto mb-10 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mt-[20vh] sm:mb-16">
          ChatGPT
        </h1>
        <div className="items-start gap-3.5 text-center md:flex">
          {/* Examples */}
          <div className="main-item">
            <h2 className="main-item-title">
              <SunIcon className="h-6 w-6" />
              例子
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="main-item-content">简单解释量子计算</li>
              <li className="main-item-content">写一个七天的健身餐食谱</li>
              <li className="main-item-content">如何在JS中发起HTTP请求？</li>
            </ul>
          </div>
          {/* Capabilities */}
          <div className="main-item">
            <h2 className="main-item-title">
              <BoltIcon className="h-6 w-6" />
              能力
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="main-item-content">可追踪上下文</li>
              <li className="main-item-content">使用 Firebase 存储对话</li>
              <li className="main-item-content">提供免费的Key</li>
            </ul>
          </div>
          {/* Limitations */}
          <div className="main-item">
            <h2 className="main-item-title">
              <ExclamationTriangleIcon className="h-6 w-6" />
              建议
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="main-item-content">使用英文创建对话</li>
              <li className="main-item-content">重新生成对话，会丢失上下文</li>
              <li className="main-item-content">更多的新功能开发中。。。</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Description;
