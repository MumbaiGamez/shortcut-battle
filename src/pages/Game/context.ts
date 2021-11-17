import { createContext } from 'react';

import { CanvasContext } from './types';

export const GameContext = createContext<CanvasContext>(null);
