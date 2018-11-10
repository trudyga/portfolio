// @flow
import { Geometry } from 'three/src/core/Geometry';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { BufferAttribute } from 'three/src/core/BufferAttribute';
import { Points } from 'three/src/objects/Points';
import { VertexColors } from 'three/src/constants';
import { Group } from 'three/src/objects/Group';
import { LineSegments } from 'three/src/objects/LineSegments';
import { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Vector3 } from 'three/src/math/Vector3';
import { Color } from 'three/src/math/Color';

import dotTexture from '../../../assets/images/dotTexture.png';
import vertexShader from './vertexShader.glsl'; // eslint-disable-line
import fragmentShader from './fragmentShader.glsl'; // eslint-disable-line

const loader = new TextureLoader();
loader.crossOrigin = '';

function randomSpherePoint() {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const x = Math.sin(phi) * Math.cos(theta);
  const y = Math.sin(phi) * Math.sin(theta);
  const z = Math.cos(phi);

  return [x, y, z];
}

class Galaxy {
  lines: Group;

  points: Points;

  constructor(
    radius: number,
    pointsAmount: number,
    colors: Array<Color>,
    sizeRandomness: number,
    pointSize: number,
    connectLength: number
  ) {
    // const galaxy = new Group();
    const dotsGeometry = new Geometry();

    const colorsAttributes = new Float32Array(pointsAmount * 3); // list of 3-numbers vectors to represent color of vertix
    const positions = new Float32Array(pointsAmount * 3); // list of 3-numbers vectors to represent positions of vertixes
    const pointSizes = new Float32Array(pointsAmount); // list of numbers with represent sizes of vertixes

    for (let i = 0; i < pointsAmount; i += 1) {
      const vertex = new Vector3();
      const pointPositions = randomSpherePoint();
      const [x, y, z] = pointPositions;
      vertex.x = x;
      vertex.y = y;
      vertex.z = z;
      vertex.multiplyScalar(radius + (Math.random() - 0.5) * sizeRandomness); // make sphere with radius
      // vertex.scaleX(5); // ?
      vertex.color = Math.floor(Math.random() * colors.length);

      dotsGeometry.vertices.push(vertex);
      vertex.toArray(positions, i * 3);
      colors[vertex.color].toArray(colorsAttributes, i * 3);
      pointSizes[i] = pointSize;
    }

    // init geometry which will store points strucuture and add custom attributes to it
    const bufferWrapGeometry = new BufferGeometry();
    const bufferPositions = new BufferAttribute(positions, 3);
    bufferWrapGeometry.addAttribute('position', bufferPositions);
    const bufferSizes = new BufferAttribute(pointSizes, 1);
    bufferWrapGeometry.addAttribute('size', bufferSizes);
    const bufferColors = new BufferAttribute(colorsAttributes, 3);
    bufferWrapGeometry.addAttribute('color', bufferColors);

    const galaxyShaderMaterial = new ShaderMaterial({
      uniforms: {
        texture: {
          value: loader.load(dotTexture),
        },
      },
      vertexShader,
      fragmentShader,
      transparent: false,
    });

    const wrap = new Points(bufferWrapGeometry, galaxyShaderMaterial);
    this.points = wrap;

    const segmentsGeom = new Geometry();
    const segmentsMat = new LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      vertexColors: VertexColors,
    });
    for (let i = dotsGeometry.vertices.length - 1; i >= 0; i -= 1) {
      const lineStart = dotsGeometry.vertices[i];
      for (let j = dotsGeometry.vertices.length - 1; j >= 0; j -= 1) {
        if (i !== j && lineStart.distanceTo(dotsGeometry.vertices[j]) < connectLength) {
          const lineEnd = dotsGeometry.vertices[j];
          segmentsGeom.vertices.push(lineStart);
          segmentsGeom.vertices.push(lineEnd);
          segmentsGeom.colors.push(colors[lineStart.color]);
          segmentsGeom.colors.push(colors[lineStart.color]);
        }
      }
    }
    const segments = new LineSegments(segmentsGeom, segmentsMat);
    this.lines = new Group();
    this.lines.add(segments);
  }
}

export default Galaxy;
