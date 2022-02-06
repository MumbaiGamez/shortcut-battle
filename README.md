# Shortcut Battle

Shortcut Battle is a game for practicing shortcuts in a fun way. Try it [for free](https://shortcut-battle.herokuapp.com/)!

## Setup

Example of .env file:
```bash
NODE_ENV=development
DEBUG=0

DB_USER=postgres
DB_PASS=password

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=password

REDIRECT_URI=https://shortcut-battle.ya-praktikum.tech/

RUN_CMD=npm run dev
```

## Docker

Run:
```bash
npm run docker:up
```

Stop:
```bash
npm run docker:down
```