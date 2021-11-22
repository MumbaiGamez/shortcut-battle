import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import { eventBus, Listener } from '../../../utils/eventBus';

import { GameEvent, Layer } from '../types';

type ProviderProps = {
  children: ReactNode;
};

const bus = eventBus<GameEvent, Layer>();

const EventBusContext = createContext(bus);
const EventBusProvider = EventBusContext.Provider;

export const useListener = (event: GameEvent, callback: Listener<Layer>) => {
  const bus = useContext(EventBusContext);

  useEffect(() => {
    bus?.subscribe(event, callback);

    return () => {
      bus?.unsubscribe(event, callback);
    };
  }, [bus, callback, event]);
};

export const useEmit = () => {
  const bus = useContext(EventBusContext);

  return useCallback(
    (event: GameEvent, ...args: Layer[]) => {
      bus?.emit(event, ...args);
    },
    [bus]
  );
};

export const Provider = ({ children }: ProviderProps) => {
  return <EventBusProvider value={bus}>{children}</EventBusProvider>;
};
