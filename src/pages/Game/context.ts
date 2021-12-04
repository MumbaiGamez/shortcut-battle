import { createContext } from 'react';

import { Engine } from '../../../typings/gameTypes';

export const EngineContext = createContext<Engine | null>(null);
