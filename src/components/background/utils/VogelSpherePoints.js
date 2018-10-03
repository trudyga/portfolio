// @flow
import nj from 'jsnumpy';
import HyperSpherePoint from '../objects/HyperSpherePoint';

function getPoints(numberOfPoints: number = 256, r: number = 1): Array<HyperSpherePoint> {
  const GoldenAngle = Math.PI * (3 - Math.sqrt(5));
  const theta = new Array(numberOfPoints);
  for (let i = 0; i < numberOfPoints; i += 1) {
    theta[i] = i * GoldenAngle;
  }

  const zValues = nj.linspace(1 - 1 / numberOfPoints, 1 / numberOfPoints - 1, numberOfPoints);

  const radius = nj.squareRoot(zValues.map(zElem => 1 - zElem * zElem));

  const points = nj.fillWithNumber([2, 3, numberOfPoints]);
  points[0] = nj.multiply(radius, nj.cos(theta, 'radian'));
  points[1] = nj.multiply(radius, nj.sin(theta, 'radian'));
  points[2] = zValues;

  const pointObjs = new Array(numberOfPoints);
  for (let i = 0; i < pointObjs.length; i += 1) {
    const x = points[0][i] * r;
    const y = points[1][i] * r;
    const z = points[2][i] * r;
    pointObjs[i] = new HyperSpherePoint({ x, y, z });
  }
  return pointObjs;
}

export default {
  getPoints,
};
