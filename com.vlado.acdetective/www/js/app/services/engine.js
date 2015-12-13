var Engine = (function () {
    function Engine(appElement) {
        init();
        animate();
        function init() {
            this.container = appElement;
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
            this.camera.position.set(0, 10, 0);
            var meshMaterial = new THREE.MeshBasicMaterial({ color: 0xFF00FF, wireframe: true });
            var cube = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 5), meshMaterial);
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
            var texloader = new THREE.TextureLoader();
            texloader.anisotropy = 16;
            var material = new THREE.MeshBasicMaterial({
                map: texloader.load("images/scene 3.jpg")
            });
            var mesh = new THREE.Mesh(this.geometry, material);
            this.scene.add(mesh);
            window.addEventListener("resize", resize, false);
            window.addEventListener("click", function () {
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
        function animate(t) {
            if (t === void 0) { t = null; }
            requestAnimationFrame(animate);
            this.controls.update();
            this.effect.render(this.scene, this.camera);
        }
    }
    return Engine;
})();
exports.Engine = Engine;

//# sourceMappingURL=engine.js.map
