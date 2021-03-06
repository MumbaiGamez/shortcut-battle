import { MutableRefObject } from 'react';

export type GameCanvas = CanvasRenderingContext2D | null;

export enum Phase {
  loading = 'loading',
  ready = 'ready',
  playing = 'playing',
  pause = 'pause',
  win = 'win',
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
  render: (ctx: GameCanvas, dt: number) => void;
  setVx: (value: number) => void;
  setVy: (value: number) => void;

  id?: number;
};

export enum GameEvent {
  hit = 'hit',
  out = 'out',
  miss = 'miss',
  crash = 'crash',
}

export enum AppName {
  VS_CODE = 'VS_CODE',
}

export type Engine = {
  ctx: GameCanvas;
  render: (dt: number) => void;
  addLayer: (layer: Layer) => void;
  removeLayer: (layer: Layer) => void;
  setCollisionHandler: (
    type: Entity,
    withTypes: Entity[],
    callback: CollisionHandler
  ) => void;
  setShortcutHandler: (
    type: Entity,
    action: PlayerAction,
    callback: ShortcutHandler
  ) => void;
};

export type CollisionHandler = (layer: Layer, withLayer: Layer) => void;

export type ShortcutsPressed = Partial<Record<PlayerAction, boolean>>;

export type ShortcutHandler = (
  layer: Layer,
  pressed: boolean | undefined,
  shortcutsPressed?: ShortcutsPressed
) => void;

export type LayerProps = RequireAtLeastOne<
  {
    type: Entity;
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

export enum PlayerAction {
  moveLeft = 'moveLeft',
  moveRight = 'moveRight',
  fire = 'fire',
}
