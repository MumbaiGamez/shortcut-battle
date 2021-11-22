export type Listener<T> = (...args: T[]) => void;

type ListenersMap<K extends string, T> = {
  [key in K]?: Listener<T>[];
};

export const eventBus = <Events extends string, T>() => {
  const listeners: ListenersMap<Events, T> = {};

  const subscribe = (event: Events, callback: Listener<T>) => {
    if (!listeners[event]) {
      listeners[event] = [];
    }

    listeners[event]?.push(callback);
  };

  const unsubscribe = (event: Events, callback: Listener<T>) => {
    if (!listeners[event]) {
      return;
    }

    listeners[event] = listeners[event]?.filter(
      (listener) => listener !== callback
    );
  };

  const emit = (event: Events, ...args: T[]) => {
    if (!listeners[event]) {
      return;
    }

    listeners[event]?.forEach((listener) => {
      listener(...args);
    });
  };

  return {
    subscribe,
    unsubscribe,
    emit,
  };
};
