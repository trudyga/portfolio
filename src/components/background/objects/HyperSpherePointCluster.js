// @flow
import * as Chance from 'chance';
import { SphereGeometry, MeshBasicMaterial, Mesh } from 'three';
import HyperSpherePoint from './HyperSpherePoint';
import HyperSphereLine from './HyperSphereLine';
import HyperSphereColorPalette from './HyperSphereColorPalette';
import RandomAreaPoints from '../utils/RandomAreaPoints';
import { hasLine } from '../utils/HyperSphereHelper';

type HyperSpherePointClusterOptions = {
  anchor: HyperSpherePoint,
  pointsAmount: number,
  pointRadius: number,
  colorPalete: HyperSphereColorPalette,
};

class HyperSpherePointCluster {
  leftBottom: HyperSpherePoint;

  rightTop: HyperSpherePoint;

  options: HyperSpherePointClusterOptions;

  points: Array<HyperSpherePoint>;

  // meshPoints: Array<Mesh>;

  lines: Array<HyperSphereLine>;

  // meshLines: Array<Mesh>;

  constructor(
    leftBottom: HyperSpherePoint,
    rightTop: HyperSpherePoint,
    options: HyperSpherePointClusterOptions
  ) {
    this.leftBottom = leftBottom;
    this.rightTop = rightTop;
    this.options = options;
    const { pointsAmount, colorPalete } = this.options;
    this.points = RandomAreaPoints(leftBottom, rightTop, pointsAmount, colorPalete);
    this.points.push(this.options.anchor);
    // this.meshPoints = this.getMeshPoints();
    this.lines = this.getLines();
    // this.meshLines = this.getMeshLines();
  }

  getMeshPoints(color: string): Array<Mesh> {
    const { pointRadius } = this.options;
    return this.points.filter(p => p.color === color).map(point => {
      const material = new MeshBasicMaterial({ color: point.color });
      const sphereGeometry = new SphereGeometry(pointRadius);
      const sphere = new Mesh(sphereGeometry, material);
      sphere.position.x = point.x;
      sphere.position.y = point.y;
      sphere.position.z = point.z;

      return sphere;
    });
  }

  getLines(): Array<HyperSphereLine> {
    const chance = new Chance();
    const lines = [];

    this.points.forEach(point => {
      const linesAmount = chance.integer({ min: 1, max: Math.min(3, this.points.length) });

      for (let i = 0; i < linesAmount; i += 1) {
        const startPoint = point;
        const endPoint = this.points[chance.integer({ min: 0, max: this.points.length - 1 })];
        const line = new HyperSphereLine(startPoint, endPoint);
        if (!hasLine(line, lines)) {
          lines.push(line);
        }
      }
    });

    return lines;
  }

  getMeshLines(color: string): Array<Mesh> {
    return this.lines.filter(l => l.startPoint.color === color).map(line => line.value);
  }
}

export default HyperSpherePointCluster;
