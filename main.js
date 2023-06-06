import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import landJPG from "./assets/land.jpg";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  50000
);
camera.position.set(-15, 0, 15);

scene.background = new THREE.Color("#000000");

const pivotGeometry = new THREE.SphereGeometry(0.001, 1, 1);
const pivotMaterial = new THREE.MeshBasicMaterial();

const sunGeometry = new THREE.SphereGeometry(20, 32, 16);
const sunMaterial = new THREE.MeshPhongMaterial({
  color: 0xffff00,
  emissive: 0xffff00,
  shininess: 0xffff00,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(500, 0, 0);
scene.add(sun);
const sunPivot = new THREE.Mesh(pivotGeometry, pivotMaterial);
sunPivot.position.set(500, 0, 0);
scene.add(sunPivot);

const sunLight = new THREE.PointLight(0xffffff, 1);
sun.add(sunLight);

const alwaysLight = new THREE.AmbientLight(0xffffff, 0.05);
alwaysLight.position.set(0, 0, 0);
scene.add(alwaysLight);

const geometry = new THREE.SphereGeometry(6.371, 32, 16);
const material = new THREE.MeshStandardMaterial({ color: 0x0099ff });
const sphere = new THREE.Mesh(geometry, material);
sphere.castShadow = true; //default is false
sphere.receiveShadow = true; //default
sphere.rotation.z = -0.5;
sphere.position.set(-500, 0, 0);
sunPivot.add(sphere);

const landGeometry = new THREE.IcosahedronGeometry(6.371, 1);
const landMaterial = new THREE.MeshStandardMaterial({ color: 0x009900 });
const land = new THREE.Mesh(landGeometry, landMaterial);
land.position.set(-0.288, 0.394, -0.225);
land.castShadow = true;
land.receiveShadow = true;

sphere.add(land);

const landGeometry2 = new THREE.IcosahedronGeometry(6.371, 1);
const landMaterial2 = new THREE.MeshStandardMaterial({ color: 0x009900 });
const land2 = new THREE.Mesh(landGeometry2, landMaterial2);
land2.position.set(0.645, -0.799, -0.591);
land2.castShadow = true;
land2.receiveShadow = true;

sphere.add(land2);

const NorthPoleGeometry = new THREE.IcosahedronGeometry(3, 1);
const NorthPoleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const NorthPole = new THREE.Mesh(NorthPoleGeometry, NorthPoleMaterial);
NorthPole.position.set(0, 5.125, 0);
NorthPole.scale.set(1, 0.5, 1);
NorthPole.castShadow = true;
NorthPole.receiveShadow = true;

sphere.add(NorthPole);

const SouthPoleGeometry = new THREE.IcosahedronGeometry(3, 1);
const SouthPoleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const SouthPole = new THREE.Mesh(SouthPoleGeometry, SouthPoleMaterial);
SouthPole.position.set(0, -5.544, 0);
SouthPole.scale.set(1, 0.5, 1);
SouthPole.castShadow = true;
SouthPole.receiveShadow = true;

sphere.add(SouthPole);

const atmoshpereGeometry = new THREE.SphereGeometry(8, 32, 16);
const atmosphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0099ff,
  transparent: true,
  opacity: 0.1,
});
const atmosphere = new THREE.Mesh(atmoshpereGeometry, atmosphereMaterial);
sphere.add(atmosphere);

//Satelite
const satelitePivot = new THREE.Mesh(pivotGeometry, pivotMaterial);
sphere.add(satelitePivot);

const sateliteGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 32, 1);
const sateliteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const satelite = new THREE.Mesh(sateliteGeometry, sateliteMaterial);
satelite.position.set(12, 0, 0);
satelite.rotation.set(1.5708, 0, 1.5708);
satelite.receiveShadow = true;
satelite.castShadow = true;
satelitePivot.add(satelite);

const anteneGeometry = new THREE.TetrahedronGeometry(0.25, 0);
const anteneMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const antene = new THREE.Mesh(anteneGeometry, anteneMaterial);
antene.position.set(0, 0.155, -0.003);
antene.rotation.set(0.785398, 0.785398, 0);
antene.receiveShadow = true;
antene.castShadow = true;
satelite.add(antene);

const planeGeometry = new THREE.PlaneGeometry(0.7, 0.1, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const plane1 = new THREE.Mesh(planeGeometry, planeMaterial);
const plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
plane1.position.set(0, -0.078, 0);
plane1.rotation.set((-90 * Math.PI) / 180, 0, 0);
plane2.position.set(0, -0.078, 0);
plane2.rotation.set((90 * Math.PI) / 180, 0, 0);
plane1.receiveShadow = true;
plane2.receiveShadow = true;
plane1.castShadow = true;
plane2.castShadow = true;
satelite.add(plane1);
satelite.add(plane2);

const earthOrbitGeometry = new THREE.TorusGeometry(500, 0.1, 360, 360);
const earthOrbitMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
});
const earthOrbit = new THREE.Mesh(earthOrbitGeometry, earthOrbitMaterial);
earthOrbit.rotation.x = (90 * Math.PI) / 180;
earthOrbit.position.x = 0;
sunPivot.add(earthOrbit);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

function animate() {
  controls.update();
  requestAnimationFrame(animate);

  sphere.rotation.y -= 0.005;
  satelitePivot.rotation.y += 0.005;
  satelitePivot.rotation.x -= 0.001;
  sunPivot.rotation.y += 0.0;

  renderer.render(scene, camera);
}

animate();
