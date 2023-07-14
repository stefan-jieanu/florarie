import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from "three";
import { randFloat } from 'three/src/math/MathUtils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// enum FlowerType {
//     Lily,
//     Tulip,
//     Rose
// }

// interface FlowerObject {
//     name: string,
//     model: THREE.Scene
// }

// function createFlower(type: FlowerType,) {

// }

export class Application {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;
    ambientLight: THREE.AmbientLight;
    cameraControls: OrbitControls;
    gui: GUI;
    models: Map<string, GLTF>;

    constructor() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            300000
        );
        this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set(0, 2, 0);
        this.cameraControls.update();

        this.ambientLight = new THREE.AmbientLight(0xaabbaa);
        this.scene.add(this.ambientLight);

        this.gui = new GUI();
        this.initGui();

        this.models = new Map();
        this.loadModels();

        this.loadSkybox();

        // Add the renderer to the cavnas 
        // Adding it like this we'll use it like the canvas occupying the whole screen
        document.body.appendChild(this.renderer.domElement);
    }

    loadModels() {
        const loader = new GLTFLoader();
        loader.load(
            '/yellow-white-flower.glb',
            (gltf) => {
                this.models.set('yellow-white-flower', gltf);
            },
            (xhr) => {
                // called while loading is progressing
                console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
            },
            (error) => {
                // called when loading has errors
                console.error('An error happened', error);
            },
        );
        loader.load(
            '/papadie.glb',
            (gltf) => {
                this.models.set('papadie', gltf);
            },
            (xhr) => {
                // called while loading is progressing
                console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
            },
            (error) => {
                // called when loading has errors
                console.error('An error happened', error);
            },
        );
    }

    loadSkybox() {
        let materialArray = [];
        let texture_ft = new THREE.TextureLoader().load('/penguins-skybox-pack/harmony_ft.jpg');
        let texture_bk = new THREE.TextureLoader().load('/penguins-skybox-pack/harmony_bk.jpg');
        let texture_up = new THREE.TextureLoader().load('/penguins-skybox-pack/harmony_up.jpg');
        let texture_dn = new THREE.TextureLoader().load('/penguins-skybox-pack/harmony_dn.jpg');
        let texture_rt = new THREE.TextureLoader().load('/penguins-skybox-pack/harmony_rt.jpg');
        let texture_lf = new THREE.TextureLoader().load('/penguins-skybox-pack/harmony_lf.jpg');

        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

        for (let i = 0; i < 6; i++) {
            materialArray[i].side = THREE.BackSide;
        }

        let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
        let skybox = new THREE.Mesh(skyboxGeo, materialArray);
        this.scene.add(skybox);
    }

    initGui() {
        const cameraFolder = this.gui.addFolder('Camera')
        cameraFolder.add(this.camera.position, 'z', 0, 10)
        cameraFolder.open();

        let instance = this;
        let addBtn = {
            add: function () { instance.addObject() },
            addYWFlower: function () { instance.addModel('yellow-white-flower') },
            addPapadie: function () { instance.addModel('papadie') }
        }
        this.gui.add(addBtn, "add").name("Add object");
        this.gui.add(addBtn, 'addYWFlower').name("Add yellow white flower");
        this.gui.add(addBtn, 'addPapadie').name('Add papadie');
    }

    addObject() {
        let x = randFloat(-10, 10);
        let y = randFloat(-10, 10);
        let z = randFloat(-10, 10);
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial();
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;

        this.scene.add(cube);
    }

    addModel(name: string) {
        let x = randFloat(-5, 5);
        let y = randFloat(-5, 5);
        let z = randFloat(-5, 5);

        let copyModel = this.models.get(name)?.scene.clone()!;
        this.scene.add(copyModel);
        copyModel.translateX(x);
        copyModel.translateY(y);
        copyModel.translateZ(z);
    }

    update() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.update.bind(this));
    }

    onMouseClicked(event: MouseEvent) {
        this.deleteOnClick(event.clientX, event.clientY);
    }

    deleteOnClick(x: number, y: number) {
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        pointer.x = (x / window.innerWidth) * 2 - 1;
        pointer.y = - (y / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(pointer, this.camera);

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(this.scene.children);

        for (let i = 0; i < intersects.length; i++) {
            this.scene.remove(intersects[i].object.parent!);
            break;
        }
    }
}
