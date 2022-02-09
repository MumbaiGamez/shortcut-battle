import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { Star } from '@components/Star';
import { useHome } from './useHome';

import styles from './Home.css';

import playerImg from '@assets/images/player.png';

export const Home = () => {
  const { subtitleTransform, shipTransform, handleScroll } = useHome();
  const { t } = useTranslation();

  return (
    <div className={styles.home} onScroll={handleScroll}>
      <div className={styles.homeContainer}>
        <Star
          className={styles.starPointer}
          style={{
            left: `${Math.min(subtitleTransform, 90)}%`,
            top: `${Math.min(subtitleTransform, 95)}%`,
          }}
        />
        <h1 className={styles.title}>Shortcut battle</h1>
        <section>
          <p
            className={styles.subtitle}
            style={{ left: `${Math.min(40 - subtitleTransform, 0)}%` }}
          >
            {t('home.about.title')}
          </p>
          <p style={{ left: `${Math.min(50 - subtitleTransform, 0)}%` }}>
            {t('home.about.text')}
          </p>
        </section>
        <section>
          <p className={styles.subtitle}>{t('home.social.title')}</p>
          <p>{t('home.social.text')}</p>
        </section>
        <section>
          <p className={styles.subtitle}>{t('home.project.title')}</p>
          <p>
            <Trans
              i18nKey="home.project.text1"
              components={[
                <a
                  key={0}
                  href="https://practicum.yandex.ru/middle-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>,
              ]}
            />
          </p>
          <p>
            <Trans i18nKey="home.project.text2" />
          </p>
          <p>
            <Trans i18nKey="home.project.text3" />
          </p>
        </section>
        <section>
          <p className={styles.subtitle}>
            <Trans i18nKey="home.authors.title" components={{ s: <s /> }} />
          </p>
          <p>
            <Trans i18nKey="home.authors.devs" components={{ s: <s /> }} />
          </p>
          <p>
            <a href="https://github.com/orlovse">{t('home.authors.s')}</a>
          </p>
          <p>
            <a href="https://github.com/ryabtsovdn">{t('home.authors.d')}</a>
          </p>
          <br />
          <p>
            <Trans i18nKey="home.authors.mentor" /> ({t('home.authors.thx')}{' '}
            &#128540;):
          </p>
          <p>
            <a href="https://github.com/kotosha-real">{t('home.authors.a')}</a>
          </p>
        </section>
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
