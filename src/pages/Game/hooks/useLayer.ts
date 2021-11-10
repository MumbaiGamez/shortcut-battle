import { useCallback, useMemo, useRef } from 'react';

import { CollisionHandler, EntityType, Layer, LayerProps } from '../types';
import { haveCollisions } from '../utils/collision';

export const useLayer = (props: LayerProps) => {
  const { width, height, pos, ctx, src, color, type } = props;

  const x = useRef(pos[0]);
  const y = useRef(pos[1]);

  const vx = useRef(0);
  const vy = useRef(0);

  const img = useMemo(() => {
    if (!src) {
      return null;
    }

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
    (
      dt: number,
      collisionHandlers: Array<{ layers: Layer[]; callback: CollisionHandler }>
    ) => {
      if (!ctx) {
        return;
      }

      const prevX = x.current;
      const prevY = y.current;

      if (vx) {
        x.current += dt * vx.current;
      }

      if (vy) {
        y.current += dt * vy.current;
      }

      const hasCollision = collisionHandlers.some(({ layers, callback }) => {
        const ownBoundaries = [
          x.current,
          y.current,
          x.current + width,
          y.current + height,
        ];

        for (const layer of layers) {
          const layerBoundaries = [
            layer.x.current,
            layer.y.current,
            layer.x.current + layer.width,
            layer.y.current + layer.height,
          ];

          if (haveCollisions(ownBoundaries, layerBoundaries)) {
            callback && callback(layer);

            return true;
          }
        }

        return false;
      });

      if (hasCollision) {
        x.current = prevX;
        y.current = prevY;
      }

      if (type === EntityType.background && img) {
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
    },
    [ctx, width, height, x, y, vx, vy, img, color, type]
  );

  return { render, setVx, setVy, x, y, width, height, type };
};
