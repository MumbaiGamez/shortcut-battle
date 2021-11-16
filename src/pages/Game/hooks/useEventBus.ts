import { useEffect } from 'react';

import { Layer } from '../types';

export enum Event {
  hit = 'hit',
}

type Listener = (...args: Layer[]) => void;

type Listeners = Partial<Record<Event, Listener[]>>;

const listeners: Listeners = {};

const subscribe = (event: Event, callback: Listener) => {
  if (!listeners[event]) {
    listeners[event] = [];
  }

  listeners[event]?.push(callback);
};

const unsubscribe = (event: Event, callback: Listener) => {
  if (!listeners[event]) {
    return;
  }

  listeners[event] = listeners[event]?.filter(
    (listener) => listener !== callback
  );
};

const emit = (event: Event, ...args: Layer[]) => {
  if (!listeners[event]) {
    return;
  }

  listeners[event]?.forEach((listener) => {
    listener(...args);
  });
};

export const useEventBus = (event?: Event, callback?: Listener) => {
  useEffect(() => {
    event && callback && subscribe(event, callback);

    return () => {
      event && callback && unsubscribe(event, callback);
    };
  }, [callback, event]);

  return { emit };
};
