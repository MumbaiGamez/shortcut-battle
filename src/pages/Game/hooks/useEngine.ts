import { useCallback, useRef } from 'react';

import { haveCollisions } from '../utils/collision';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';

import {
  CanvasContext,
  CollisionHandler,
  Entity,
  GameState,
  Layer,
} from '../types';

type CollisionHandlers = [Entity, Entity, CollisionHandler][];

type Layers = Partial<Record<Entity, Layer[]>>;

type UseEngineProps = {
  ctx: CanvasContext;
  state: GameState;
};

export const useEngine = (props: UseEngineProps) => {
  const { ctx } = props;

  const layers = useRef<Layers>({});

  const collisionHandlers = useRef<CollisionHandlers>([]);

  const addLayer = useCallback((type: Entity, layer: Layer) => {
    if (!layers.current[type]) {
      layers.current[type] = [];
    }

    layers.current[type]?.push(layer);
  }, []);

  const updateCollisionHandler = useCallback(
    (type: Entity, withType: Entity, callback: CollisionHandler) => {
      const currentHandler = collisionHandlers.current.find(
        (handler) => handler[0] === type && handler[1] === withType
      );

      if (currentHandler) {
        currentHandler[2] = callback;
      } else {
        collisionHandlers.current.push([type, withType, callback]);
      }
    },
    []
  );

  const setCollisionHandler = useCallback(
    (type: Entity, withTypes: Entity[], callback: CollisionHandler) => {
      withTypes.forEach((withType) => {
        updateCollisionHandler(type, withType, callback);
      });
    },
    [updateCollisionHandler]
  );

  const handleCollisions = useCallback(
    (layer: Layer, layers: Layer[], callback: CollisionHandler) => {
      const ownBoundaries = [
        layer.x.current,
        layer.y.current,
        layer.x.current + layer.width,
        layer.y.current + layer.height,
      ];

      for (const withLayer of layers) {
        const layerBoundaries = [
          withLayer.x.current,
          withLayer.y.current,
          withLayer.x.current + withLayer.width,
          withLayer.y.current + withLayer.height,
        ];

        if (haveCollisions(ownBoundaries, layerBoundaries)) {
          callback && callback(layer, withLayer);
        }
      }
    },
    []
  );

  const render = useCallback(
    (dt: number) => {
      ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      for (const type of Object.values(Entity)) {
        const handlers = collisionHandlers.current.filter(
          (handler) => handler[0] === type
        );

        for (const layer of layers.current[type] || []) {
          for (const handler of handlers) {
            const [, withType, callback] = handler;

            handleCollisions(layer, layers.current[withType] || [], callback);
          }

          layer.render(dt);
        }
      }
    },
    [ctx, handleCollisions]
  );

  return {
    ctx,
    render,
    addLayer,
    setCollisionHandler,
  };
};
