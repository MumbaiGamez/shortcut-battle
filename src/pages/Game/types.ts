import { MutableRefObject } from 'react';

export type CanvasContext = CanvasRenderingContext2D | null;

export enum Phase {
  loading = 'loading',
  ready = 'ready',
  playing = 'playing',
  pause = 'pause',
  over = 'over',
}

export enum Entity {
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
  type: Entity;
  width: number;
  height: number;
  prevX: MutableRefObject<number>;
  prevY: MutableRefObject<number>;
  x: MutableRefObject<number>;
  y: MutableRefObject<number>;
  vx: MutableRefObject<number>;
  vy: MutableRefObject<number>;
  render: (dt: number) => void;
  setVx: (value: number) => void;
  setVy: (value: number) => void;
};

export type GameState = {
  phase: Phase;
  score: number;
  reset: () => void;
  start: () => void;
  pause: () => void;
};

export type Engine = {
  ctx: CanvasContext;
  render: (dt: number) => void;
  addLayer: (type: Entity, layer: Layer) => void;
  setCollisionHandler: (
    type: Entity,
    withTypes: Entity[],
    callback: CollisionHandler
  ) => void;
  setShortcutHandler: (
    type: Entity,
    acton: PlayerAction,
    callback: ShortcutHandler
  ) => void;
};

export type CollisionHandler = (layer: Layer, withLayer?: Layer) => void;

export type ShortcutsPressed = Partial<Record<PlayerAction, boolean>>;

export type ShortcutHandler = (
  layer: Layer,
  pressed: boolean | undefined,
  shortcutsPressed?: ShortcutsPressed
) => void;

export type LayerProps = RequireAtLeastOne<
  {
    type: Entity;
    ctx: CanvasContext;
    pos: number[];
    width: number;
    height: number;

    velo?: number[];
    src?: string;
    color?: string;
    id?: number;
  },
  'src' | 'color'
>;

export type LayerComponentProps = {
  engine: Engine;
};

export enum PlayerAction {
  moveLeft = 'moveLeft',
  moveRight = 'moveRight',
  fire = 'fire',
}
