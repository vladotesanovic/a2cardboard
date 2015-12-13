
declare var THREE: any;

export class Engine {

	public scene: any;
    public camera: any;
    public renderer: any;
    public mesh: any;
    public controls: any;
    public geometry: any;
    public container: any;

    constructor(appElement: any) {

        init();
        animate();

        function init() {

            this.container = appElement;
            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
            this.camera.position.set(0, 10, 0);

            // crosshair
            let meshMaterial = new THREE.MeshBasicMaterial({ color: 0xFF00FF, wireframe: true });
            let cube = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 5), meshMaterial);
            cube.position.set(25, 25, 25);
            this.scene.add(cube);

            this.scene.add(this.camera);

            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.domElement.style.position = "absolute";
            this.renderer.domElement.style.top = 0;
            this.container.appendChild(this.renderer.domElement);

            this.effect = new THREE.StereoEffect(this.renderer);
            this.effect.eyeSeparation = -1;

            this.geometry = new THREE.SphereGeometry(500, 16, 8);
            this.geometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

            let texloader = new THREE.TextureLoader();
            texloader.anisotropy = 16;

            let material = new THREE.MeshBasicMaterial({
                map: texloader.load("images/scene 3.jpg")
            });

            let mesh = new THREE.Mesh(this.geometry, material);
            this.scene.add(mesh);

            // let geometry2 = new THREE.BoxGeometry(100, 100, 100, 4, 4, 4);
            // let material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.BackSide, wireframe: true });
            // let mesh2 = new THREE.Mesh(geometry2, material2);
            // this.scene.add(mesh2);

            window.addEventListener("resize", resize, false);
            window.addEventListener("click", function() {
                console.log("click");
            }, false);
            setTimeout(resize, 1);

            this.controls = new THREE.DeviceOrientationControls(this.camera, !0);
            this.controls.connect();
            this.controls.update();
        }

        function resize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.effect.setSize(window.innerWidth, window.innerHeight);
        }

        function animate(t: any = null) {
            requestAnimationFrame(animate);

            this.controls.update();
            // this.renderer.render(this.scene, this.camera);
            this.effect.render(this.scene, this.camera);

        }
    }
}
