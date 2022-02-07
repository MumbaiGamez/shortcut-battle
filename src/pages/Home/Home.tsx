import React from 'react';

import { Star } from '@components/Star';
import { useHome } from './useHome';

import styles from './Home.css';

import playerImg from '@assets/images/player.png';

export const Home = () => {
  const { subtitleTransform, shipTransform, handleScroll } = useHome();

  return (
    <div className={styles.home} onScroll={handleScroll}>
      <div>
        <Star
          className={styles.starPointer}
          style={{
            left: `${Math.min(5 + subtitleTransform, 90)}%`,
            top: `${Math.min(37 + subtitleTransform, 95)}%`,
          }}
        />
        <h1 className={styles.title}>Shortcut battle</h1>
        <p
          className={styles.subtitle}
          style={{ left: `${-subtitleTransform}%` }}
        >
          Изучай шорткаты программ стреляя по астероидам
        </p>
        <p style={{ left: `${Math.min(10 - subtitleTransform, 0)}%` }}>
          Чтобы уничтожиить астероид тебе надо запомнить комбинацию горячих
          клавиш. (Сейчас шоткаты VSCode)
        </p>
        <p
          className={styles.subtitle}
          style={{ left: `${Math.min(20 - subtitleTransform, 0)}%` }}
        >
          Соревнуйся с друзьями
        </p>
        <p style={{ left: `${Math.min(30 - subtitleTransform, 0)}%` }}>
          Зарегистрированным пользователям доступны лидерборд и возможность
          писать на форуме.
        </p>
        <p
          className={styles.subtitle}
          style={{ left: `${Math.min(40 - subtitleTransform, 0)}%` }}
        >
          Легкая авторизация через Яндекс
        </p>
        <p style={{ left: `${Math.min(50 - subtitleTransform, 0)}%` }}>
          Регистрация в один клик!
        </p>
        <p className={styles.subtitle}>Технологии</p>
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
