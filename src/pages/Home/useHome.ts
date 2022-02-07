import { useState, UIEvent } from 'react';

export const useHome = () => {
  const [shipTransform, setShipTransform] = useState(100);
  const [subtitleTransform, setSubtitleTransform] = useState(0);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const containerHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;

    const scrollTop = event.currentTarget.scrollTop;

    const scrollPercent = (scrollTop / (scrollHeight - containerHeight)) * 100;

    setShipTransform(100 - scrollPercent * 3);

    setSubtitleTransform(scrollPercent);
  };

  return { subtitleTransform, shipTransform, handleScroll };
};
