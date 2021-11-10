import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export type GameContextType = CanvasRenderingContext2D | null;

export enum Phase {
  loading = 'loading',
  ready = 'ready',
  playing = 'playing',
  pause = 'pause',
  over = 'over',
}

export enum Entity {
  border = 'border',
  player = 'player',
  bullet = 'bullet',
  asteroid = 'asteroid',
}

export type Layer = {
  entity: Entity;
  width: number;
  height: number;
  x: MutableRefObject<number>;
  y: MutableRefObject<number>;
  render: (dt: number) => void;
  setVx: (velo: number) => void;
  setVy: (velo: number) => void;
};

export enum PlayerAction {
  moveLeft = 'moveLeft',
  moveRight = 'moveRight',
}

export type Shortcut = {
  code: string;
  ctrl?: boolean;
  shift?: boolean;
  meta?: boolean;
};

export type LayerProps = RequireAtLeastOne<
  {
    ctx: GameContextType;
    pos: number[];
    width: number;
    height: number;
    src?: string;
    color?: string;
    entity: Entity;
  },
  'src' | 'color'
>;

export type PlaygroundProps = {
  ctx: GameContextType;
  phase: Phase;
  clearCanvas: () => void;
};

export type GameUIProps = {
  phase: Phase;
  setPhase: Dispatch<SetStateAction<Phase>>;
};
