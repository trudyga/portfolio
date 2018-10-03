// @flow
import HyperSpherePoint from '../objects/HyperSpherePoint';
import HyperSphereColorPalette from '../objects/HyperSphereColorPalette';

function getPointColors(colorPalete: HyperSphereColorPalette, i: number) {
  const { primary, secondary, neutral } = colorPalete;

  switch (i % 3) {
    case 0:
      return primary;
    case 1:
      return secondary;
    case 2:
      return neutral;
    default:
      return neutral;
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomize(
  bottomLeft: HyperSpherePoint,
  topRight: HyperSpherePoint,
  amount: number,
  colorPalete: HyperSphereColorPalette
): Array<HyperSpherePoint> {
  const points = new Array(amount);

  for (let i = 0; i < amount; i += 1) {
    const x = randomIntFromInterval(
      Math.min(topRight.x, bottomLeft.x),
      Math.max(topRight.x, bottomLeft.x)
    );
    const y = randomIntFromInterval(
      Math.min(topRight.y, bottomLeft.y),
      Math.max(topRight.y, bottomLeft.y)
    );
    const z = randomIntFromInterval(
      Math.min(topRight.z, bottomLeft.z),
      Math.max(topRight.z, bottomLeft.z)
    );

    const color = getPointColors(colorPalete, i);

    points[i] = new HyperSpherePoint({ x, y, z, color });
  }

  return points;
}

export default randomize;
