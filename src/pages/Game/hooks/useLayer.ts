import { MutableRefObject, useCallback, useMemo, useRef } from 'react';

import { Entity, LayerProps } from '../../../../typings/gameTypes';

const SPEED_CHANGE_TRESHOLD = 100;

export const useLayer = (props: LayerProps) => {
  const {
    width,
    height,
    pos = [0, 0],
    velo = [0, 0],
    ctx,
    src,
    color,
    type,
    id,
  } = props;

  const prevX = useRef(pos[0]);
  const prevY = useRef(pos[1]);
  const x = useRef(pos[0]);
  const y = useRef(pos[1]);
  const vx = useRef(velo[0]);
  const vy = useRef(velo[1]);

  const img = useMemo(() => {
    if (!src) {
      return null;
    }

    const image = new Image();
    image.src = src;

    return image;
  }, [src]);

  const render = useCallback(
    (dt: number) => {
      if (!ctx) {
        return;
      }

      if (type === Entity.background && img) {
        const pattern = ctx.createPattern(img, 'repeat');

        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(x.current, y.current, width, height);
        }
      } else if (img) {
        ctx.drawImage(img, x.current, y.current, width, height);
      } else {
        ctx.fillStyle = color as string;
        ctx.fillRect(x.current, y.current, width, height);
      }

      if (vx) {
        prevX.current = x.current;
        x.current += dt * vx.current;
      }

      if (vy) {
        prevY.current = y.current;
        y.current += dt * vy.current;
      }
    },
    [ctx, width, height, x, y, vx, vy, img, color, type]
  );

  const lastUpdate = useRef(performance.now());

  const updateVelo = (velo: MutableRefObject<number>, value: number) => {
    const now = performance.now();

    if (now - lastUpdate.current < SPEED_CHANGE_TRESHOLD) {
      return;
    }

    velo.current = value;
    lastUpdate.current = now;
  };

  const setVx = useCallback((value) => {
    updateVelo(vx, value);
  }, []);

  const setVy = useCallback((value) => {
    updateVelo(vy, value);
  }, []);

  return {
    id,
    prevX,
    prevY,
    x,
    y,
    vx,
    vy,
    width,
    height,
    type,
    render,
    setVx,
    setVy,
  };
};
