# Shortcut Battle

Shortcut Battle is a game for practicing shortcuts in a fun way. Try it [for free](https://shortcut-battle.herokuapp.com/)!

## .env

Example of .env file:
```bash
NODE_ENV=development

DB_URL=postgres://postgres:password@postgres:5432/settings-db
DB_USER=postgres
DB_PASS=password

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=password
```


## Docker notes

- After first `docker-compose` run you could encounter pgadmin "Operation not permitted" error. To fix it run this command:
```bash
sudo chown -R 5050:5050 ./pgadmin-data/
```
