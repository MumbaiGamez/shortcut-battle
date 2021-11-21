import { useEffect } from 'react';

import { Layer } from '../types';

export enum GameEvent {
  hit = 'hit',
  out = 'out',
  crash = 'crash',
}

type Listener = (...args: Layer[]) => void;

type Listeners = Partial<Record<GameEvent, Listener[]>>;

const listeners: Listeners = {};

const subscribe = (event: GameEvent, callback: Listener) => {
  if (!listeners[event]) {
    listeners[event] = [];
  }

  listeners[event]?.push(callback);
};

const unsubscribe = (event: GameEvent, callback: Listener) => {
  if (!listeners[event]) {
    return;
  }

  listeners[event] = listeners[event]?.filter(
    (listener) => listener !== callback
  );
};

const emit = (event: GameEvent, ...args: Layer[]) => {
  if (!listeners[event]) {
    return;
  }

  listeners[event]?.forEach((listener) => {
    listener(...args);
  });
};

export const useEventBus = (event?: GameEvent, callback?: Listener) => {
  useEffect(() => {
    if (event && callback) {
      subscribe(event, callback);
    }

    return () => {
      if (event && callback) {
        unsubscribe(event, callback);
      }
    };
  }, [callback, event]);

  return { emit };
};
