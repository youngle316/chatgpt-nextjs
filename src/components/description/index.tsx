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
              Examples
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="main-item-content">
                Explain quantum computing in simple terms
              </li>
              <li className="main-item-content">
                Got any creative ideas for a 10 year old’s birthday?
              </li>
              <li className="main-item-content">
                How do I make an HTTP request in Javascript?
              </li>
            </ul>
          </div>
          {/* Capabilities */}
          <div className="main-item">
            <h2 className="main-item-title">
              <BoltIcon className="h-6 w-6" />
              Capabilities
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="main-item-content">
                Remembers what user said earlier in the conversation
              </li>
              <li className="main-item-content">
                Allows user to provide follow-up corrections
              </li>
              <li className="main-item-content">
                Trained to decline inappropriate requests
              </li>
            </ul>
          </div>
          {/* Limitations */}
          <div className="main-item">
            <h2 className="main-item-title">
              <ExclamationTriangleIcon className="h-6 w-6" />
              Limitations
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="main-item-content">
                May occasionally generate incorrect information
              </li>
              <li className="main-item-content">
                May occasionally produce harmful instructions or biased content
              </li>
              <li className="main-item-content">
                Limited knowledge of world and events after 2021
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Description;
