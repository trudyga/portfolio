// @flow
import { Vector3 } from 'three/src/math/Vector3';

class HyperSpherePoint {
  x: number;

  y: number;

  z: number;

  position: Vector3;

  color: string;

  constructor({ x, y, z, color }: Object) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;
    this.position = new Vector3(x, y, z);
  }
}

export default HyperSpherePoint;
