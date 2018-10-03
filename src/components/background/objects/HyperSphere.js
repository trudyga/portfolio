// @flow
import { SphereBufferGeometry, MeshBasicMaterial, Mesh, Object3D } from 'three';
import HyperSphereColorPalette from './HyperSphereColorPalette';
import HyperSpherePoint from './HyperSpherePoint';
import HyperSphereLine from './HyperSphereLine';
import HyperSpherePointCluster from './HyperSpherePointCluster';
import VogelSpherePoints from '../utils/VogelSpherePoints';
import { findMaxNearestDistance, findNearbyPoints, hasLine } from '../utils/HyperSphereHelper';

type HyperSphereOptions = {
  sphereRadius: number,
  pointRadius: number,
  pointsAmount: number,
  colorPalete: HyperSphereColorPalette,
};

const HyperSphereDefaults = {
  sphereRadius: 10,
  pointsAmount: 256,
  pointRadius: 0.08,
  colorPalete: new HyperSphereColorPalette({
    primary: '#e83b6c',
    secondary: '#ff749b',
    neutral: '#6e5f6a',
  }),
};
class HyperSphere {
  options: HyperSphereOptions;

  points: Array<HyperSpherePoint>;

  spherePoints: Array<Mesh>;

  lines: Array<HyperSphereLine>;

  clusters: Array<HyperSpherePointCluster>;

  hyperSphere: Object3D;

  constructor(options: HyperSphereOptions) {
    this.options = Object.assign({}, HyperSphereDefaults, options);
    const { pointRadius } = this.options;
    this.points = this.getPoints();
    this.spherePoints = this.points.map(({ x, y, z, color }) => {
      const geometry = new SphereBufferGeometry(pointRadius);
      const material = new MeshBasicMaterial({ color });
      const sphere = new Mesh(geometry, material);
      sphere.position.x = x;
      sphere.position.y = y;
      sphere.position.z = z;

      return sphere;
    });
    this.lines = this.connectPoints();
    this.clusters = this.getPointClusters();
    this.hyperSphere = this.constructSphere();
  }

  get3DObject(): Object3D {
    return this.hyperSphere;
  }

  constructSphere(): Object3D {
    const group = new Object3D();

    this.spherePoints.forEach(mesh => group.add(mesh));

    this.lines.forEach(line => group.add(line.value));

    this.clusters.forEach(cluster => {
      cluster.meshPoints.forEach(mesh => group.add(mesh));
      cluster.meshLines.forEach(mesh => group.add(mesh));
    });
    return group;
  }

  getPoints(): Array<HyperSpherePoint> {
    const { sphereRadius, pointsAmount } = this.options;
    const points = VogelSpherePoints.getPoints(pointsAmount, sphereRadius);
    for (let i = 0; i < points.length; i += 1) {
      points[i].color = this.getPointColors(i);
    }

    return points;
  }

  getPointClusters(): Array<HyperSpherePointCluster> {
    const { pointRadius, colorPalete } = this.options;
    // duplication of maxNearestDistance
    const maxNearestDistance = findMaxNearestDistance(this.points);
    const distance = maxNearestDistance * 0.3;
    return this.points.map(point => {
      const { x, y, z, color } = point;
      const leftBottom = new HyperSpherePoint({
        x: x + distance,
        y: y + distance,
        z: z + distance,
        color,
      });
      const rightTop = new HyperSpherePoint({
        x: x - distance,
        y: y - distance,
        z: z - distance,
        color,
      });
      const options = {
        anchor: point,
        pointsAmount: 8,
        pointRadius,
        colorPalete,
      };

      const cluster = new HyperSpherePointCluster(leftBottom, rightTop, options);
      return cluster;
    });
  }

  connectPoints(): Array<HyperSphereLine> {
    const lines = [];
    const maxNearestDistance = findMaxNearestDistance(this.points);
    const distance = maxNearestDistance + maxNearestDistance * 0.2;

    for (let i = 0; i < this.points.length; i += 1) {
      const startPoint = this.points[i];
      const endPoints = findNearbyPoints(startPoint, distance, this.points);
      endPoints.forEach(endPoint => {
        const line = new HyperSphereLine(startPoint, endPoint);
        if (!hasLine(line, lines)) {
          lines.push(line);
        }
      });
    }

    return lines;
  }

  getPointColors(i: number) {
    const { primary, secondary, neutral } = this.options.colorPalete;

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
}

export default HyperSphere;
