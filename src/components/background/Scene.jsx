import React, { Component, Fragment } from 'react';
import { Scene } from 'three/src/scenes/Scene';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Clock } from 'three/src/core/Clock';
import * as Stats from 'stats.js';
import WebGL from './utils/WebGL';
// import HyperSphere from './objects/HyperSphere';
// import Galaxy from './Galaxy';
import HyperSphere from './objects/HyperSphereV2';

const isWebGL2Available = WebGL.isWebGL2Available();

type Props = {
  fullScreen?: boolean,
};
class ThreeScene extends Component<Props> {
  static defaultProps = {
    fullScreen: true,
  };

  componentDidMount() {
    if (!isWebGL2Available) return;
    const { fullScreen } = this.props;
    window.addEventListener('resize', this.handleResize, true);
    const width = fullScreen ? window.innerWidth : this.mount.clientWidth;
    const height = fullScreen ? window.innerHeight : this.mount.clientHeight;

    // ADD SCENE
    this.scene = new Scene();

    // ADD CAMERA
    this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 50;
    this.camera.position.x = -10;

    // ADD RENDERER
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    // ADD Stats
    if (!PRODUCTION) {
      this.stats = new Stats();
      this.stats.showPanel(0);
      this.statsMount.appendChild(this.stats.dom);
    }

    // ADD HyperSphere
    this.galaxy = new HyperSphere();
    this.scene.add(this.galaxy.points);
    this.scene.add(this.galaxy.lines);
    // this.galaxy = new Galaxy(
    //   70 / 3,
    //   3000 / 3,
    //   [new Color(0xe83b6c), new Color(0xff749b), new Color(0x6e5f6a)],
    //   5 / 3,
    //   3 / 2,
    //   7.5 / 1.5
    // );

    // this.scene.add(this.galaxy.points);
    // this.scene.add(this.galaxy.lines);
    // this.hyperSphere = new HyperSphere({ pointsAmount: 256 });
    // console.log(this.hyperSphere);
    // this.scene.add(this.hyperSphere.get3DObject());

    // SET Clock
    this.clock = new Clock();

    this.start();
  }

  componentWillUnmount() {
    if (!isWebGL2Available) return;

    this.stop();
    this.mount.removeChild(this.renderer.domElement);
    if (!PRODUCTION) {
      this.statsMount.removeChild(this.stats.dom);
    }

    window.removeEventListener('resize', this.handleResize, false);
  }

  start = () => {
    if (!isWebGL2Available) return null;

    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }

    return null;
  };

  stop = () => {
    if (!isWebGL2Available) return;
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    if (!isWebGL2Available) return;

    if (!PRODUCTION) {
      this.stats.begin();
      this.stats.end();
    }
    const rotationSpeed = Math.PI / 25;
    const deltaTime = this.clock.getDelta();

    // this.hyperSphere.get3DObject().rotateX(0.01);
    // this.hyperSphere.get3DObject().rotateY(0.01);
    this.galaxy.points.rotateX(rotationSpeed * deltaTime);
    this.galaxy.lines.rotateX(rotationSpeed * deltaTime);

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    if (!isWebGL2Available) return;
    this.renderer.render(this.scene, this.camera);
  };

  handleResize = () => {
    if (!isWebGL2Available) return;
    const { fullScreen } = this.props;
    const width = fullScreen ? window.innerWidth : this.mount.clientWidth;
    const height = fullScreen ? window.innerHeight : this.mount.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  render() {
    return (
      <Fragment>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
          ref={mount => {
            this.mount = mount;
          }}
        />
        {!PRODUCTION && (
          <div
            style={{ position: 'absolute' }}
            ref={mount => {
              this.statsMount = mount;
            }}
          />
        )}
      </Fragment>
    );
  }
}

export default ThreeScene;
