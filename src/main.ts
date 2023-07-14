import "../dist/output.css";
// import * as THREE from "three";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
// import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';

import { Application } from "./scene";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );


// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const composer = new EffectComposer(renderer);

// const controls = new OrbitControls(camera, renderer.domElement);

// //controls.update() must be called after any manual changes to the camera's transform
// camera.position.set(0, 2, 1);
// controls.update();

// const loader = new GLTFLoader();
// loader.load(
//   '/Soldier.glb',
//   (gltf) => {
//     // called when the resource is loaded
//     scene.add(gltf.scene);
//   },
//   (xhr) => {
//     // called while loading is progressing
//     console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
//   },
//   (error) => {
//     // called when loading has errors
//     console.error('An error happened', error);
//   },
// );

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial();
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// const light = new THREE.PointLight(0xff00ff, 1, 100);
// light.position.set(5, 5, 0);
// scene.add(light);

// const alight = new THREE.AmbientLight(0xaaaaaa);
// scene.add(alight);

// const renderPass = new RenderPass(scene, camera);
// composer.addPass(renderPass);

// const glitchPass = new GlitchPass();
// composer.addPass(glitchPass);

// const filmPass = new FilmPass();
// composer.addPass(filmPass);

// function animate() {
//   requestAnimationFrame(animate);
//   // renderer.render(scene, camera);

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   // required if controls.enableDamping or controls.autoRotate are set to true
//   // controls.update();
//   composer.render();
// }

// document
//   .getElementById("add-btn-1")
//   ?.addEventListener("click", (e: MouseEvent) => {
//     console.log("add flower type 1");
//   });

// animate();

const app = new Application();
app.addObject();
app.update();

window.addEventListener('click', app.onMouseClicked.bind(app));