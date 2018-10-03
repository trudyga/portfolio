import React, { Component } from 'react';
import * as THREE from 'three';
import WebGL from './utils/WebGL';
import HyperSphere from './objects/HyperSphere';

class ThreeScene extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize, true);
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    // ADD SCENE
    this.scene = new THREE.Scene();

    // ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 20;

    // ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    // ADD CUBE
    const geometry = new THREE.SphereGeometry(0.1);
    const material = new THREE.MeshBasicMaterial({ color: '#fff' });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // ADD HyperSphere
    this.hyperSphere = new HyperSphere({ pointsAmount: 256 });
    console.log(this.hyperSphere);
    this.scene.add(this.hyperSphere.get3DObject());

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
    window.removeEventListener('resize', this.handleResize, false);
  }

  start = () => {
    if (!WebGL.isWebGLAvailable()) {
      const warning = WebGL.getWebGLErrorMessage();
      this.mount.removeChild(this.renderer.domElement);
      return this.mount.appendChild(warning);
    }

    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }

    return null;
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.hyperSphere.get3DObject().rotateX(0.01);
    this.hyperSphere.get3DObject().rotateY(0.01);

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  handleResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  render() {
    return (
      <div
        style={{ position: 'fixed', width: '100%', height: '100%' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeScene;
