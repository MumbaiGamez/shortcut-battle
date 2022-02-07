import { useState, UIEvent } from 'react';

export const useHome = () => {
  const [shipTransform, setShipTransform] = useState(100);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const containerHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;

    const scrollTop = event.currentTarget.scrollTop;

    setShipTransform(
      100 - (scrollTop / (scrollHeight - containerHeight)) * 300
    );
  };

  return { shipTransform, handleScroll };
};
