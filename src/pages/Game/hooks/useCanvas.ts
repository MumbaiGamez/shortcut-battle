import { useEffect, useRef, useState } from 'react';

import { setVar } from '../../../utils/css';

import { GameCanvas } from '../../../../typings/gameTypes';

export type UseCanvasProps = {
  width: number;
  height: number;
};

export const useCanvas = (props: UseCanvasProps) => {
  const { width, height } = props;

  const [ctx, setCtx] = useState<GameCanvas>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;

    if (canvas) {
      canvas.width = width;
      canvas.height = height;

      setCtx(canvas.getContext('2d'));
    }
  }, [ref, width, height]);

  useEffect(() => {
    setVar('--game-canvas-width', `${width}px`);
    setVar('--game-canvas-height', `${height}px`);
  }, [width, height]);

  return { ctx, ref };
};
