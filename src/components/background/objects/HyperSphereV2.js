/* eslint-disable */

import * as THREE from 'three';

import dotTexture from '../../../../public/images/dotTexture.png';
import vertexShader from '../vertexShader.glsl'; // eslint-disable-line
import fragmentShader from '../fragmentShader.glsl'; // eslint-disable-line

import VogelSpherePoints from '../utils/VogelSpherePoints';
import { findAvarageDistance } from '../utils/HyperSphereHelper';

/**
 * TODO
 * 1. Move parameters to a sphere
 * 2. Add displaisment buffer attribute (it will be variying shader attribute)
 * 3. Add Perlin noise support to vertex shader by using ready only examples
 * 4. Create raycaster
 * 5. Raycast from mouse to scene
 * 6. On mouse movement change displaisment attribute of affected vertices
 */

const radius = 30;
const pointsAmount = 400;
const pointSize = 1.5;
const connectLength = 4;
const colors = [new THREE.Color(0xe83b6c), new THREE.Color(0xff749b), new THREE.Color(0x6e5f6a)];
console.log('Colors', colors);
const loader = new THREE.TextureLoader();
loader.crossOrigin = '';
const getRandomColorIndex = colors => Math.floor(Math.random() * colors.length);

const pointPositions = new Float32Array(pointsAmount * 3);
const pointColors = new Float32Array(pointsAmount * 3);
const pointSizes = new Float32Array(pointsAmount);
const points = VogelSpherePoints.getPoints(pointsAmount);
const vertices = new Array(pointsAmount);

points.forEach(({ x, y, z }, i) => {
  const vertex = new THREE.Vector3(x, y, z);
  vertex.colorIndex = getRandomColorIndex(colors);
  vertex.pointSize = pointSize;
  vertex.multiplyScalar(radius);
  vertices[i] = vertex;

  const pointColor = colors[vertex.colorIndex];

  pointPositions[i * 3] = vertex.x
  pointPositions[i * 3 + 1] = vertex.y;
  pointPositions[i * 3 + 2] = vertex.z;
  pointColors[i * 3] = pointColor.r;
  pointColors[i * 3 + 1] = pointColor.g;
  pointColors[i * 3 + 2] = pointColor.b;
  pointSizes[i] = pointSize;
});

class HyperSphere {
  constructor() {
    this.vertices = vertices;

    // create geometry
    const pointsGeometry = new THREE.BufferGeometry();
    console.log('Point colors', pointColors);

    const positionsBufferAttribute = new THREE.BufferAttribute(pointPositions, 3);
    pointsGeometry.addAttribute('position', positionsBufferAttribute);
    const colorsBufferAttribute = new THREE.BufferAttribute(pointColors, 3);
    pointsGeometry.addAttribute('color', colorsBufferAttribute);
    const sizesBufferAttribute = new THREE.BufferAttribute(pointSizes, 1);
    pointsGeometry.addAttribute('size', sizesBufferAttribute);
    // create materials
    const pointsShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        texture: {
          value: loader.load(dotTexture),
        },
      },
      vertexShader,
      fragmentShader,
      transparent: false,
    });

    // create points mesh
    this.points = new THREE.Points(pointsGeometry, pointsShaderMaterial);
    this.pointsAvgDistance = findAvarageDistance(vertices) * 1.2;
    console.log(pointPositions);
    console.log('points', this.points);

    // create sphere lines
    const linesGeometry = this.getLinesGeometry();
    console.log('linesGeometry', linesGeometry);
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      vertexColors: THREE.VertexColors,
    });

    const lineSegments = new THREE.LineSegments(linesGeometry, linesMaterial);
    this.lines = new THREE.Group();
    this.lines.add(lineSegments);
  }

  getLinesGeometry () {
    const { vertices, pointsAvgDistance } = this;
    const segmentsGeom = new THREE.Geometry();
    const distance = pointsAvgDistance * 1.2;

    for (let i = 0; i < vertices.length; i++) {
      const lineStart = vertices[i];
      for (let j = 0; j < vertices.length; j++) {
        const lineEnd = vertices[j];
        const distanceTo = lineStart.distanceTo(lineEnd);
        if (i !== j && distanceTo < distance) {
          segmentsGeom.vertices.push(lineStart);
          segmentsGeom.vertices.push(lineEnd);
          segmentsGeom.colors.push(colors[lineStart.colorIndex]);
          segmentsGeom.colors.push(colors[lineStart.colorIndex]);
        }
      }
    }

    return segmentsGeom;
  }
}

export default HyperSphere;
