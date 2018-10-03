// @flow

class HyperSphereColorPalette {
  primary: string;

  secondary: string;

  neutral: string;

  constructor(
    { primary, secondary, neutral }: any = {
      primary: '#e83b6c',
      secondary: '#ff749b',
      neutral: '#6e5f6a',
    }
  ) {
    this.primary = primary;
    this.secondary = secondary;
    this.neutral = neutral;
  }
}

export default HyperSphereColorPalette;
