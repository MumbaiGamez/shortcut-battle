import { useCallback, useMemo } from 'react';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';

import { GameContextType } from './types';

type UseBackgroundProps = {
  ctx: GameContextType;
  src: string;
};

export const useBackground = (props: UseBackgroundProps) => {
  const { ctx, src } = props;

  const backgroundImage = useMemo(() => {
    const image = new Image();
    image.src = src;

    return image;
  }, [src]);

  const render = useCallback(() => {
    if (!ctx) {
      return;
    }

    const pattern = ctx.createPattern(backgroundImage, 'repeat');

    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }, [ctx, backgroundImage]);

  return { render };
};
