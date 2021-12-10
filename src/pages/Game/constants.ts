export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 480;
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 30;
export const ASTEROID_SIZE_SMALL = 40;
export const BULLET_HEIGHT = 33;
export const BULLET_WIDTH = 8;
export const MIN_PLAYER_SPEED = 0.3;
export const MIN_BULLET_SPEED = 0.5;

export const APP_SHORTCUTS = {
  VS_CODE: [
    {
      name: 'Ctrl + Shift + Enter',
      keys: ['Control', 'Shift', 'Enter'],
      desc: 'Insert line above',
    },
    {
      name: 'Ctrl + Enter',
      keys: ['Control', 'Enter'],
      desc: 'Insert line below',
    },
    {
      name: 'Ctrl + Shift + K',
      keys: ['Control', 'Shift', 'K'],
      desc: 'Delete line',
    },
    {
      name: 'Shift + Alt + UP',
      keys: ['Shift', 'Alt', 'ArrowUp'],
      desc: 'Copy line up',
    },
    {
      name: 'Shift + Alt + DOWN',
      keys: ['Shift', 'Alt', 'ArrowDown'],
      desc: 'Copy line down',
    },
    { name: 'Alt + UP', keys: ['Alt', 'ArrowUp'], desc: 'Move line up' },
    { name: 'Alt + DOWN', keys: ['Alt', 'ArrowDown'], desc: 'Move line down' },
    {
      name: 'Ctrl + Shift + ]',
      keys: ['Control', 'Shift', '}'],
      desc: 'Unfold region',
    },
    {
      name: 'Ctrl + Shift + [',
      keys: ['Control', 'Shift', '{'],
      desc: 'Fold region',
    },
  ],
};
