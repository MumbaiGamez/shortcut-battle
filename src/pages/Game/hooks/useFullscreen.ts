import { useCallback, useState } from 'react';

export const useFullscreen = (element: Element | null) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onFullScreenExit = useCallback(() => {
    document.removeEventListener('fullscreenchange', onFullScreenExit);

    setIsFullscreen(false);
  }, []);

  const onFullscreenEnter = useCallback(() => {
    document.removeEventListener('fullscreenchange', onFullscreenEnter);
    document.addEventListener('fullscreenchange', onFullScreenExit);

    setIsFullscreen(true);
  }, [onFullScreenExit]);

  const request = useCallback(() => {
    if (!element) {
      return;
    }

    document.addEventListener('fullscreenchange', onFullscreenEnter);

    element.requestFullscreen();
  }, [element, onFullscreenEnter]);

  const exit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, []);

  const toggle = useCallback(() => {
    isFullscreen ? exit() : request();
  }, [exit, isFullscreen, request]);

  return { isFullscreen, toggle };
};
