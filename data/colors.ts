import { LinhaColumnA } from './linha/ColumnA';

export type Color = {
  name?: string;
  rgb: {
    R: number;
    G: number;
    B: number;
    A?: number | undefined;
  };
  code: number;
  compatibilityCode?: number;
  type: 'linha' | 'fio';
};

export type ColorType = 'linha' | 'fio';

export const COLORS: Color[] = [...LinhaColumnA];
