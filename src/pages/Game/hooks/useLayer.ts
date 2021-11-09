import { useCallback, useMemo, useRef } from 'react';

import { Layer, LayerProps } from '../types';

type CollisionHandler = undefined | ((layer: Layer) => void);

const haveCollisions = (boundaries1: number[], boundaries2: number[]) => {
  const [left1, top1, right1, bottom1] = boundaries1;
  const [left2, top2, right2, bottom2] = boundaries2;

  return (
    right1 >= left2 && left1 <= right2 && bottom1 >= top2 && top1 <= bottom2
  );
};

export const useLayer = (props: LayerProps) => {
  const { width, height, pos, ctx, src, color, entity } = props;

  const x = useRef(pos[0]);
  const y = useRef(pos[1]);

  const vx = useRef(0);
  const vy = useRef(0);

  const collisionHandlers = useRef<[Layer[], CollisionHandler][]>([]);

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

  const onCollide = useCallback(
    (layers: Layer[], callback: CollisionHandler = undefined) => {
      collisionHandlers.current.push([layers, callback]);
    },
    [collisionHandlers]
  );

  const render = useCallback(
    (dt: number) => {
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

      const hasCollision = collisionHandlers.current.some(
        ([layers, callback]) => {
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
        }
      );

      if (hasCollision) {
        x.current = prevX;
        y.current = prevY;
      }

      if (img) {
        ctx.drawImage(img, x.current, y.current, width, height);
      } else {
        ctx.fillStyle = color as string;
        ctx.fillRect(x.current, y.current, width, height);
      }
    },
    [ctx, width, height, x, y, vx, vy, img, color]
  );

  return { render, setVx, setVy, x, y, width, height, entity, onCollide };
};
