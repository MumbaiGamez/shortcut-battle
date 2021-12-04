import { useCallback, useEffect, useState } from 'react';

export const useFullscreen = (element: Element | null) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === element);
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [element]);

  const request = useCallback(() => {
    element?.requestFullscreen();
  }, [element]);

  const exit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    isFullscreen ? exit() : request();
  }, [exit, isFullscreen, request]);

  return { isFullscreen, toggleFullscreen };
};
