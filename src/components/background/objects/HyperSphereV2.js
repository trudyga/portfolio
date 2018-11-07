import {
  Color,
  TextureLoader,
  Vector3,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  Points,
  LineSegments,
  LineBasicMaterial,
  Geometry,
  Group,
  VertexColors,
} from 'three';

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
const colors = [new Color(0xe83b6c), new Color(0xff749b), new Color(0x6e5f6a)];
const loader = new TextureLoader();
loader.crossOrigin = '';
const getRandomColorIndex = colorsList => Math.floor(Math.random() * colorsList.length);

const pointPositions = new Float32Array(pointsAmount * 3);
const pointColors = new Float32Array(pointsAmount * 3);
const pointSizes = new Float32Array(pointsAmount);
const points = VogelSpherePoints.getPoints(pointsAmount);
const vertices = new Array(pointsAmount);

points.forEach(({ x, y, z }, i) => {
  const vertex = new Vector3(x, y, z);
  vertex.colorIndex = getRandomColorIndex(colors);
  vertex.pointSize = pointSize;
  vertex.multiplyScalar(radius);
  vertices[i] = vertex;

  const pointColor = colors[vertex.colorIndex];

  pointPositions[i * 3] = vertex.x;
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
    const pointsGeometry = new BufferGeometry();

    const positionsBufferAttribute = new BufferAttribute(pointPositions, 3);
    pointsGeometry.addAttribute('position', positionsBufferAttribute);
    const colorsBufferAttribute = new BufferAttribute(pointColors, 3);
    pointsGeometry.addAttribute('color', colorsBufferAttribute);
    const sizesBufferAttribute = new BufferAttribute(pointSizes, 1);
    pointsGeometry.addAttribute('size', sizesBufferAttribute);
    // create materials
    const pointsShaderMaterial = new ShaderMaterial({
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
    this.points = new Points(pointsGeometry, pointsShaderMaterial);
    this.pointsAvgDistance = findAvarageDistance(vertices) * 1.2;

    // create sphere lines
    const linesGeometry = this.getLinesGeometry();
    const linesMaterial = new LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      vertexColors: VertexColors,
    });

    const lineSegments = new LineSegments(linesGeometry, linesMaterial);
    this.lines = new Group();
    this.lines.add(lineSegments);
  }

  getLinesGeometry() {
    const { vertices, pointsAvgDistance } = this; // eslint-disable-line
    const segmentsGeom = new Geometry();
    const distance = pointsAvgDistance * 1.2;

    for (let i = 0; i < vertices.length; i += 1) {
      const lineStart = vertices[i];
      for (let j = 0; j < vertices.length; j += 1) {
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
