import { useCallback, useEffect, useRef, useState } from 'react';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';

import { GameContextType } from '../types';

type UseCanvasProps = {
  width: number;
  height: number;
};

export const useCanvas = (props: UseCanvasProps) => {
  const { width, height } = props;
  const [ctx, setCtx] = useState<GameContextType>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;

    if (canvas) {
      setCtx(canvas.getContext('2d'));
      canvas.width = width;
      canvas.height = height;
    }
  }, [ref, width, height]);

  const clear = useCallback(() => {
    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, [ctx]);

  return { ctx, ref, clear };
};
