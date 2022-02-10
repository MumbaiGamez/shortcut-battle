import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { selectConfig, change } from '@redux/slices/configSlice';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { Dropdown } from '@components/Dropdown';

import { AppName } from '@typings/gameTypes';

import styles from '../GameUI.css';

const apps = {
  [AppName.VS_CODE]: { name: 'VS Code', value: AppName.VS_CODE },
  [AppName.FIGMA]: { name: 'Figma', value: AppName.FIGMA },
};

export const ConfigHeader = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { appName } = useAppSelector(selectConfig);

  const changeApp = useCallback(
    (appName) => {
      dispatch(change({ appName }));
    },
    [dispatch]
  );

  return (
    <header className={classNames(styles.header, styles.configHeader)}>
      <div className={styles.app}>
        <b>{t('play.choose')}:</b>{' '}
        <Dropdown<AppName>
          items={Object.values(apps)}
          selectedItem={apps[appName]}
          setSelectedItem={changeApp}
        />
      </div>
    </header>
  );
};
