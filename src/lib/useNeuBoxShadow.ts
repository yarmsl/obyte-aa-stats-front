import { useMemo } from 'react';
import { useAppSelector } from 'store';
import { darkModeSelector } from 'store/UI';
import { useMedia } from './useMedia';

interface IUseNeuBoxShadow {
  boxShadow: string;
}

export const useNeuBoxShadow = (): IUseNeuBoxShadow => {
  const darkMode = useAppSelector(darkModeSelector);

  const { isPortable } = useMedia();

  const boxShadow = useMemo(() => {
    const color1 = darkMode ? '#0e152e' : '#cccfd4';
    const color2 = darkMode ? '#141d3e' : '#ffffff';
    const pos1 = isPortable ? '6px 6px 12px' : '16px 16px 32px';
    const pos2 = isPortable ? '-6px -6px 12px' : '-16px -16px 32px';
    return `${pos1} ${color1}, ${pos2} ${color2}`;
  }, [darkMode, isPortable]);

  return { boxShadow };
};
