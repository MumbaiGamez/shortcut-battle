import { createContext } from 'react';

import { GameContextType } from './types';

export const GameContext = createContext<GameContextType>(null);
