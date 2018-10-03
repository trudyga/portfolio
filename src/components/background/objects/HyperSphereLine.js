// @flow
import { LineBasicMaterial, Geometry, Vector3, Line } from 'three';
import HyperSpherePoint from './HyperSpherePoint';

class HyperSphereLine {
  startPoint: HyperSpherePoint;

  endPoint: HyperSpherePoint;

  value: Line;

  constructor(startPoint: HyperSpherePoint, endPoint: HyperSpherePoint) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    const material = new LineBasicMaterial({ color: startPoint.color });
    const geometry = new Geometry();
    geometry.vertices.push(new Vector3(startPoint.x, startPoint.y, startPoint.z));
    geometry.vertices.push(new Vector3(endPoint.x, endPoint.y, endPoint.z));
    this.value = new Line(geometry, material);
  }
}

export default HyperSphereLine;
