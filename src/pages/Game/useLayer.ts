import { useCallback, useMemo, useRef } from 'react';

import { LayerProps } from './types';

export const useLayer = (props: LayerProps) => {
  const { width, height, pos, ctx, src } = props;

  const x = useRef(pos[0]);
  const y = useRef(pos[1]);
  const vx = useRef(0);
  const vy = useRef(0);
  const img = useMemo(() => {
    const image = new Image();
    image.src = src;

    return image;
  }, [src]);

  const setVx = useCallback((velo) => {
    vx.current = velo;
  }, []);

  const setVy = useCallback((velo) => {
    vy.current = velo;
  }, []);

  const render = useCallback(
    (dt: number) => {
      if (!ctx) {
        return;
      }

      if (vx) {
        x.current += dt * vx.current;
      }

      if (vy) {
        y.current += dt * vy.current;
      }

      ctx.drawImage(img, x.current, y.current, width, height);
    },
    [ctx, width, height, x, y, vx, vy, img]
  );

  return { render, setVx, setVy };
};
