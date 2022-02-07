import React from 'react';

import { Star } from '@components/Star';
import { useHome } from './useHome';

import styles from './Home.css';

import playerImg from '@assets/images/player.png';

export const Home = () => {
  const { shipTransform, handleScroll } = useHome();

  return (
    <div className={styles.home} onScroll={handleScroll}>
      <div>
        <h1 className={styles.title}>Shortcat battle</h1>
        <p>
          Игра в жанре Shoot ’em up для запоминания комбинаций горячих клавиш
          различных программ.
        </p>
        <p>
          Правила простые - нужно уничтожать астероиды или уворачиваться от них,
          но стрельба происходит только при нажатии комбинации горячих клавиш,
          которые меняются после попаданий в астероид.
        </p>
        <p>
          В верхней части интерфейса игры есть кнопка Огонь с названием
          действия. Если навести мышку на это поле, то появится подсказка с
          комбинацией горячих клавиш.
        </p>
        <p>
          За каждый уничтоженный астероид вы получаете очки, которые
          записываются в турнирную таблицу (если вы авторизованы на сайте).
        </p>
        <p>
          Зарегистрированным пользователям доступны турнирная таблица и
          возможность писать на форуме. Доступна авторизация через Яндекс.
        </p>
        <h2 className={styles.subtitle}>Технологии</h2>
        <p>
          Сайт создан с использованием React, Redux Toolkit, RTK Query для
          запросов на сервер. В проекте используется SSR, бекенд форума написан
          на Node.js, база данных PostgreSQL.
        </p>
      </div>
      <div>
        <Star className={styles.star} />
        <img
          className={styles.ship}
          src={playerImg}
          style={{ transform: `translate(-50%, ${shipTransform}%)` }}
        />
      </div>
    </div>
  );
};
