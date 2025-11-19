export type Color = {
  name?: string;
  rgb: {
    R: number;
    G: number;
    B: number;
    A?: number | undefined;
  };
  hex: string;
  code: number;
  compatibilityCode?: number;
  type: 'linha' | 'fio';
};

export type ColorType = 'linha' | 'fio';

export const COLORS: Color[] = [
  {
    name: 'vermelho',
    rgb: { R: 255, G: 0, B: 0 },
    hex: 'FF0000',
    code: 1,
    compatibilityCode: 101,
    type: 'linha',
  },
];
