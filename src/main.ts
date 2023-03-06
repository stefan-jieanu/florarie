import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

const alight = new THREE.AmbientLight(0x40aa40);
scene.add(alight);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}

document
  .getElementById("add-btn-1")
  ?.addEventListener("click", (e: MouseEvent) => {
    console.log("add flower type 1");
  });

animate();
