import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export type GameContextType = CanvasRenderingContext2D | null;

export enum Phase {
  loading = 'loading',
  ready = 'ready',
  playing = 'playing',
  pause = 'pause',
  over = 'over',
}

export enum EntityType {
  background = 'background',
  topBorder = 'topBorder',
  rightBorder = 'rightBorder',
  bottomBorder = 'bottomBorder',
  leftBorder = 'leftBorder',
  player = 'player',
  bullet = 'bullet',
  asteroid = 'asteroid',
}

export type Layer = {
  type: EntityType;
  width: number;
  height: number;
  x: MutableRefObject<number>;
  y: MutableRefObject<number>;
  setVx: (velo: number) => void;
  setVy: (velo: number) => void;
  render: (
    dt: number,
    collisionHandlers: Array<{ layers: Layer[]; callback: CollisionHandler }>
  ) => void;
};

export type CollisionHandler = (withLayer: Layer) => void;

export type CollisionRule = Partial<{
  [key in EntityType]: CollisionHandler;
}>;

export type CollisionRules = Partial<{
  [key in EntityType]: CollisionRule;
}>;

export type Engine = {
  ctx: GameContextType;
  render: (dt: number) => void;
  addLayer: (type: EntityType, layer: Layer) => void;
  addCollisionHandler: (
    type: EntityType,
    withType: EntityType,
    callback: CollisionHandler
  ) => void;
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
    type: EntityType;
  },
  'src' | 'color'
>;

export type PlaygroundProps = {
  phase: Phase;
};

export type GameUIProps = {
  phase: Phase;
  setPhase: Dispatch<SetStateAction<Phase>>;
};

export type LayerComponentProps = {
  engine: Engine;
};

export type LayersType = Partial<Record<EntityType, Layer[]>>;

export type UseEngineProps = {
  ctx: GameContextType;
  clear: () => void;
};
