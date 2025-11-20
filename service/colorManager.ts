import { closest, RGBColor } from 'color-diff';
import { Color, COLORS, ColorType } from 'data/colors';
import convert from 'color-convert';

export default class ColorManager {
  static getClosestColor(hex: string, type: ColorType | 'any' = 'any'): Color {
    const RGBColor = ColorManager.hexColorToRGB(hex);
    const RGBPallete = ColorManager.colorsToRGBPallete(COLORS, type);
    const closestRGB = closest(RGBColor, RGBPallete);
    return ColorManager.findColorByRGB(closestRGB)!;
  }

  static hexColorToRGB(hex: string): RGBColor {
    const hexToRGB = convert.hex.rgb(hex);
    const colorRGB = {
      R: hexToRGB[0],
      G: hexToRGB[1],
      B: hexToRGB[2],
    };

    return colorRGB;
  }

  static colorsToRGBPallete(colors: Color[], type: ColorType | 'any' = 'any'): RGBColor[] {
    colors = type === 'any' ? colors : colors.filter((color) => color.type === type);
    return colors.map((color) => color.rgb);
  }

  static findColorByRGB(rgb: RGBColor) {
    return COLORS.find(
      (color) => color.rgb.R === rgb.R && color.rgb.G === rgb.G && color.rgb.B === rgb.B
    );
  }

  static addColor(
    hex: string,
    type: ColorType,
    code: number,
    compatibilityCode?: number,
    name?: string
  ) {
    const rgb = ColorManager.hexColorToRGB(hex);
    const foundColor = ColorManager.findColorByRGB(rgb);
    if (foundColor) {
      return;
    }

    COLORS.push({
      rgb,
      name,
      type,
      code,
      compatibilityCode,
    });
  }

  static updateColor(
    code?: number,
    rgb?: RGBColor,
    type?: ColorType,
    compatibilityCode?: number,
    name?: string
  ) {
    const color = COLORS.find((color) => color.code === code);
    if (!color) return;

    if (rgb) color.rgb = rgb;
    if (type) color.type = type;
    if (compatibilityCode) color.compatibilityCode = compatibilityCode;
    if (name) color.name = name;
  }

  static removeColorByCode(code: number) {
    const index = COLORS.findIndex((color) => color.code === code);
    if (index !== -1) {
      COLORS.splice(index, 1);
    }
  }

  static getNClosestColors(hex: string, n: number, type: ColorType | 'any' = 'any'): Color[] {
    const RGB = ColorManager.hexColorToRGB(hex);
    const closestColors: Color[] = [];

    let colors = [...COLORS];
    let RGBPallete: RGBColor[];
    let closestRGB: RGBColor;
    let foundColor: Color | undefined;

    for (let i = 0; i < n; i++) {
      // update rgb pallete
      RGBPallete = ColorManager.colorsToRGBPallete(colors, type);
      if (RGBPallete.length === 0) break;

      closestRGB = closest(RGB, RGBPallete);
      if (!closestRGB) break;

      foundColor = ColorManager.findColorByRGB(closestRGB);
      if (!foundColor) break;

      // add color to result
      closestColors.push(foundColor);

      // update ref colors
      colors = colors.filter((color) => color.code !== foundColor!.code);
      if (colors.length === 0) break;
    }

    return closestColors;
  }
}
