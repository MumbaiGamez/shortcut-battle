import { Dispatch, SetStateAction } from 'react';

export type GameContextType = CanvasRenderingContext2D | null;

export enum GameStage {
  loading = 'loading',
  ready = 'ready',
  playing = 'playing',
  pause = 'pause',
  over = 'over',
}

export type LayerProps = {
  ctx: GameContextType;
  pos: number[];
  width: number;
  height: number;
  src: string;
};

export type PlaygroundProps = {
  ctx: GameContextType;
  stage: GameStage;
};

export type GameUIProps = {
  stage: GameStage;
  setStage: Dispatch<SetStateAction<GameStage>>;
};

export type Layer = {
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
