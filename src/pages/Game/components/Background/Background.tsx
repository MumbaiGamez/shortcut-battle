import { useContext, useEffect } from 'react';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants';
import { GameContext } from '../../context';
import { useLayer } from '../../hooks/useLayer';

import { Entity } from '../../../../../typings/gameTypes';

import bgImg from '../../../../assets/images/starBackground.png';

export const Background = () => {
  const engine = useContext(GameContext);

  const background = useLayer({
    pos: [0, 0],
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    src: bgImg,
    type: Entity.background,
  });

  useEffect(() => {
    engine?.addLayer(background);

    return () => {
      engine?.removeLayer(background);
    };
  }, [background, engine]);

  return null;
};
