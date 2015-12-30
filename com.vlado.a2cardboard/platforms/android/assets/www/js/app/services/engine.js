var Engine = (function () {
    function Engine(appElement) {
        init();
        animate();
        function init() {
            this.birds = [];
            this.boids = [];
            this.container = appElement;
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.001, 1500);
            this.camera.position.set(0, 10, 0);
            this.vector = new THREE.Vector3(0, 10, 0);
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
                map: texloader.load("images/jump.jpg")
            });
            var mesh = new THREE.Mesh(this.geometry, material);
            this.scene.add(mesh);
            for (var i = 0; i < 200; i++) {
                var boid = new Boid();
                this.boids.push(boid);
                boid.position.x = Math.random() * 400 - 200;
                boid.position.y = Math.random() * 400 - 200;
                boid.position.z = Math.random() * 400 - 200;
                boid.velocity.x = Math.random() * 2 - 1;
                boid.velocity.y = Math.random() * 2 - 1;
                boid.velocity.z = Math.random() * 2 - 1;
                boid.setAvoidWalls(true);
                boid.setWorldSize(500, 500, 400);
                var bird = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, side: THREE.DoubleSide }));
                this.birds.push(bird);
                bird.phase = Math.floor(Math.random() * 62.83);
                this.scene.add(bird);
            }
            window.addEventListener("resize", resize, false);
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
            for (var i = 0, il = this.birds.length; i < il; i++) {
                var boid = this.boids[i];
                boid.run(this.boids);
                var bird = this.birds[i];
                bird.position.copy(this.boids[i].position);
                var color = bird.material.color;
                color.r = color.g = color.b = (500 - bird.position.z) / 1000;
                bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
                bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());
                bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
                bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;
            }
            this.effect.render(this.scene, this.camera);
        }
    }
    return Engine;
})();
exports.Engine = Engine;

//# sourceMappingURL=engine.js.map
