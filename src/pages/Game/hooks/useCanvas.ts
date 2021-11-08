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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      setCtx(canvas.getContext('2d'));
      canvas.width = width;
      canvas.height = height;
    }
  }, [canvasRef, width, height]);

  const clearCanvas = useCallback(() => {
    ctx && ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, [ctx]);

  return { ctx, canvasRef, clearCanvas };
};
