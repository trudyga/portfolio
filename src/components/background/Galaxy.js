// @flow
import * as THREE from 'three';

import dotTexture from '../../../public/images/dotTexture.png';
import vertexShader from './vertexShader.glsl'; // eslint-disable-line
import fragmentShader from './fragmentShader.glsl'; // eslint-disable-line

const loader = new THREE.TextureLoader();
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
  lines: THREE.Group;

  points: THREE.Points;

  constructor(
    radius: number,
    pointsAmount: number,
    colors: Array<THREE.Color>,
    sizeRandomness: number,
    pointSize: number,
    connectLength: number
  ) {
    // const galaxy = new THREE.Group();
    const dotsGeometry = new THREE.Geometry();

    const colorsAttributes = new Float32Array(pointsAmount * 3); // list of 3-numbers vectors to represent color of vertix
    const positions = new Float32Array(pointsAmount * 3); // list of 3-numbers vectors to represent positions of vertixes
    const pointSizes = new Float32Array(pointsAmount); // list of numbers with represent sizes of vertixes

    for (let i = 0; i < pointsAmount; i += 1) {
      const vertex = new THREE.Vector3();
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
    const bufferWrapGeometry = new THREE.BufferGeometry();
    const bufferPositions = new THREE.BufferAttribute(positions, 3);
    bufferWrapGeometry.addAttribute('position', bufferPositions);
    const bufferSizes = new THREE.BufferAttribute(pointSizes, 1);
    bufferWrapGeometry.addAttribute('size', bufferSizes);
    const bufferColors = new THREE.BufferAttribute(colorsAttributes, 3);
    bufferWrapGeometry.addAttribute('color', bufferColors);

    const galaxyShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        texture: {
          value: loader.load(dotTexture),
        },
      },
      vertexShader,
      fragmentShader,
      transparent: false,
    });

    const wrap = new THREE.Points(bufferWrapGeometry, galaxyShaderMaterial);
    this.points = wrap;

    const segmentsGeom = new THREE.Geometry();
    const segmentsMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      vertexColors: THREE.VertexColors,
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
    const segments = new THREE.LineSegments(segmentsGeom, segmentsMat);
    this.lines = new THREE.Group();
    this.lines.add(segments);
  }
}

export default Galaxy;
