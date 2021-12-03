import { createContext } from 'react';

import { Engine } from '../../../typings/gameTypes';

export const GameContext = createContext<Engine | null>(null);
