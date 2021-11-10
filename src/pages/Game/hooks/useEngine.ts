import { useCallback, useRef } from 'react';

import {
  CollisionHandler,
  CollisionRule,
  CollisionRules,
  EntityType,
  Layer,
  LayersType,
  UseEngineProps,
} from '../types';

export const useEngine = (props: UseEngineProps) => {
  const { clear, ctx } = props;

  const layers = useRef<LayersType>({});

  const collisionRules = useRef<CollisionRules>({});

  const addLayer = useCallback(
    (type: EntityType, layer: Layer) => {
      if (!layers.current[type]) {
        layers.current[type] = [];
      }

      layers.current[type]?.push(layer);
    },
    [layers]
  );

  const addCollisionHandler = useCallback(
    (type: EntityType, withType: EntityType, callback: CollisionHandler) => {
      if (!collisionRules.current[type]) {
        collisionRules.current[type] = {};
      }

      (collisionRules.current[type] as CollisionRule)[withType] = callback;
    },
    [collisionRules]
  );

  const render = useCallback(
    (dt: number) => {
      clear();

      for (const type of Object.values(EntityType)) {
        for (const layer of layers.current[type] || []) {
          const rule = collisionRules.current[layer.type];

          const handlers = Object.entries(rule || {}).map((handler) => {
            const [type, callback] = handler;

            return {
              layers: layers.current[type as EntityType] || [],
              callback,
            };
          });

          layer.render(dt, handlers);
        }
      }
    },
    [clear, layers]
  );

  return { ctx, render, addLayer, addCollisionHandler };
};
