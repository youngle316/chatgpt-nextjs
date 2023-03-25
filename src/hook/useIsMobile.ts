import { useState } from 'react';

import useEventListener from './useEventListener';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

function useIsMobile() {
  const getScreen = () => {
    if (typeof window !== 'undefined' && window.screen) {
      return window.screen;
    }
    return undefined;
  };

  const [screen, setScreen] = useState<Screen | undefined>(getScreen());

  function handleSize() {
    setScreen(getScreen());
  }

  useEventListener('resize', handleSize);

  useIsomorphicLayoutEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return screen?.width ? screen.width <= 768 : false;
}

export default useIsMobile;
