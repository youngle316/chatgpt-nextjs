import {
  SunIcon,
  BoltIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-2 text-white">
      <h1 className="mb-20 text-5xl font-bold">ChatGPT</h1>

      <div className="flex space-x-2">
        {/* Examples */}
        <div>
          <div className="mb-5 flex flex-col items-center justify-center">
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">{`"Explain something to me"`}</p>
            <p className="infoText">{`"What is the different between a dog and a cat?"`}</p>
            <p className="infoText">{`"What is the color of the sun"`}</p>
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <div className="mb-5 flex flex-col items-center justify-center">
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">
              Remembers what user said earlier in the conversation
            </p>
            <p className="infoText">
              Allow user to provide follow-up corrections
            </p>
            <p className="infoText">Trained to decline inappropriate request</p>
          </div>
        </div>

        {/* Limitations */}
        <div>
          <div className="mb-5 flex flex-col items-center justify-center">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">
              Many occasionally generate incorrect information
            </p>
            <p className="infoText">
              May occasionally produce harmful instructions or biased content
            </p>
            <p className="infoText">
              Limited knowledge of world and events after 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
