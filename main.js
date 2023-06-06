import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

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
const sunBlurGeometry = new THREE.SphereGeometry(25, 32, 16);
const sunBlurMaterial = new THREE.MeshStandardMaterial({
  color: 0xaaff00,
  emissive: 0xaaff00,
  shininess: 0xaaff00,
  transparent: true,
  opacity: 0.2,
});
const sunBlur = new THREE.Mesh(sunBlurGeometry, sunBlurMaterial);
sunBlur.position.set(500, 0, 0);
scene.add(sunBlur);

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
//sunPivot.add(earthOrbit);

//ROCKET
const RocketGeometry = new THREE.CapsuleGeometry(0.25, 1, 4, 8);
const RocketMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const rocket = new THREE.Mesh(RocketGeometry, RocketMaterial);
const RocketHeadGeometry = new THREE.TetrahedronGeometry(0.25, 0);
const RocketHeadMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const rocketHead = new THREE.Mesh(RocketHeadGeometry, RocketHeadMaterial);
rocketHead.position.set(0.01, -0.636, 0.001);
rocketHead.rotation.set(
  (-45 * Math.PI) / 180,
  (-45 * Math.PI) / 180,
  (100 * Math.PI) / 180
);
rocket.add(rocketHead);
const points = [
  new THREE.Vector2(0, -0.5),
  new THREE.Vector2(0.5, 0.5),
  new THREE.Vector2(0, 0.5),
];
const RocketBottomGeometry = new THREE.LatheGeometry(points, 36, 0, 360);
const RocketBottomMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const rocketBottom = new THREE.Mesh(RocketBottomGeometry, RocketBottomMaterial);
rocketBottom.position.set(0, 0.5, 0);
rocket.add(rocketBottom);
const RocketFireGeometry = new THREE.IcosahedronGeometry(0.25, 0);
const RocketFireMaterial = new THREE.MeshStandardMaterial({
  color: 0xfd9900,
  emissive: 0xfd9900,
});
const rocketFire = new THREE.Mesh(RocketFireGeometry, RocketFireMaterial);
rocketFire.position.set(0, 0.601, -0.036);
rocketBottom.add(rocketFire);
rocket.position.set(6.325, 3.045, 2.016);
rocket.rotation.set(
  (35.4 * Math.PI) / 180,
  (3.8 * Math.PI) / 180,
  (126.6 * Math.PI) / 180
);
scene.add(rocket);

const MoonGeometry = new THREE.SphereGeometry(1.74, 32, 16);
const MoonMaterial = new THREE.MeshStandardMaterial({
  color: 0xc4c4c4,
  metalness: 0.92,
});
const Moon = new THREE.Mesh(MoonGeometry, MoonMaterial);

const MoonPartGeometry = new THREE.IcosahedronGeometry(0.5, 1);
const MoonPartMaterial = new THREE.MeshStandardMaterial({
  color: 0xa1a1a1,
  metalness: 0.92,
});
let MoonParts = [
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
  new THREE.Mesh(MoonPartGeometry, MoonPartMaterial),
];
MoonParts[0].position.set(0.105, 0.638, 1.175);
MoonParts[1].position.set(1.272, 0.554, -0.07);
MoonParts[2].position.set(-0.625, -0.005, 1.24);
MoonParts[3].position.set(-1.121, -0.553, 0.482);
MoonParts[4].position.set(-1.253, 0.343, -0.315);
MoonParts[5].position.set(0.489, 1.053, -0.745);
MoonParts[6].position.set(-0.3, 1.263, 0.331);
MoonParts[7].position.set(0.469, -0.62, -1.125);
MoonParts[8].position.set(-0.862, -0.957, -0.516);
MoonParts[9].position.set(-0.536, 0.19, -1.233);
MoonParts[10].position.set(0.568, -0.915, 0.811);
MoonParts[11].position.set(0.814, -1.022, -0.307);

for (let i = 0; i < MoonParts.length; i++) {
  Moon.add(MoonParts[i]);
}

const moonPivot = new THREE.Mesh(pivotGeometry, pivotMaterial);
moonPivot.rotation.set((45 * Math.PI) / 180, 0, 0);
scene.add(moonPivot);

Moon.position.set(25, 10, 0);
moonPivot.add(Moon);

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
  moonPivot.rotation.z -= (0.01 * Math.PI) / 180;
  moonPivot.rotation.x += (0.01 * Math.PI) / 180;
  moonPivot.rotation.y += 0.01;
  if (rocket.rotation.x > 0) {
    rocket.rotation.x -= 0.01;
  }
  if (rocket.rotation.y > 0) {
    rocket.rotation.y -= 0.01;
  }
  if (rocket.rotation.z > (90 * Math.PI) / 180) {
    rocket.rotation.z -= (0.1 * Math.PI) / 180;
    rocket.position.x += 0.01;
    rocket.position.y += 0.001;
  } else {
    rocket.position.x += 0.01;
  }
  renderer.render(scene, camera);
}

animate();
