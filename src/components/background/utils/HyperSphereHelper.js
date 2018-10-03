// @flow

import HyperSpherePoint from '../objects/HyperSpherePoint';
import HyperSphereLine from '../objects/HyperSphereLine';

function getDistance(start: HyperSpherePoint, end: HyperSpherePoint) {
  return Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2 + (end.z - start.z) ** 2);
}

function findNearestPoint(
  point: HyperSpherePoint,
  points: Array<HyperSpherePoint>
): HyperSpherePoint | null {
  let smallestDistance: number;
  let nearestPoint = null;

  for (let i = 0; i < points.length; i += 1) {
    const distance = getDistance(points[i], point);
    if (smallestDistance === undefined || (points[i] !== point && distance < smallestDistance)) {
      smallestDistance = distance;
      nearestPoint = points[i];
    }
  }

  return nearestPoint;
}

function findNearbyPoints(
  point: HyperSpherePoint,
  radius: number,
  points: Array<HyperSpherePoint>
): Array<HyperSpherePoint> {
  return points
    .map(p => ({
      point: p,
      distance: getDistance(p, point),
    }))
    .filter(distanceObjs => distanceObjs.point !== point && distanceObjs.distance < radius)
    .map(distanceObjs => distanceObjs.point);
}

function findAvarageDistance(points: Array<HyperSpherePoint>): number {
  let amount = 0;
  let sum = 0;
  for (const start of points) { //eslint-disable-line
    const end = findNearestPoint(start, points);
    if (end) {
      amount += 1;
      sum += getDistance(start, end);
    }
  }

  return sum / amount;
}

function findMaxNearestDistance(points: Array<HyperSpherePoint>): number {
  let max = 0;
  for (const start of points) { //eslint-disable-line
    const end = findNearestPoint(start, points);
    if (end) {
      const distance = getDistance(start, end);
      if (distance > max) {
        max = distance;
      }
    }
  }

  return max;
}

function hasConnection(point: HyperSpherePoint, lines: Array<HyperSphereLine>) {
  return lines.some(l => l.startPoint === point || l.endPoint === point);
}

function hasLine(line: HyperSphereLine, lines: Array<HyperSphereLine>) {
  return lines.some(
    l =>
      (l.startPoint === line.startPoint && l.endPoint === line.endPoint) ||
      (l.endPoint === line.startPoint && l.startPoint === line.endPoint)
  );
}

export {
  findAvarageDistance,
  findMaxNearestDistance,
  findNearestPoint,
  findNearbyPoints,
  hasConnection,
  hasLine,
};
