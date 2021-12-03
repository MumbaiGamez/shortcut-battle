import { createContext } from 'react';

import { CanvasContext } from '../../../typings/gameTypes';

export const GameContext = createContext<CanvasContext>(null);
