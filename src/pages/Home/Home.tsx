import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Home.css';

export const Home = () => {
  const { t } = useTranslation();

  return <div className={styles.home}>{t('homePage.title')}</div>;
};
