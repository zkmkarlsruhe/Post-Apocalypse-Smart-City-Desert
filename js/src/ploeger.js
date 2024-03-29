var camera, scene, renderer, controls, video;

function init() {
	// Initialize camera and renderer.
	camera = new THREE.PerspectiveCamera(75,
		window.innerWidth / window.innerHeight, 1, 1100);
	camera.target = new THREE.Vector3(0, 0, 0);
  controls = new THREE.DeviceOrientationControls(camera);

	scene = new THREE.Scene();
	let geometry = new THREE.SphereBufferGeometry(500, 60, 40);
	geometry.scale(-1, 1, 1);

	video = document.createElement('video');
	video.crossOrigin = 'anonymous';
	video.width = 1920;
	video.height = 1080;
	video.loop = true;
	video.muted = false;
	video.volume = 1;
	video.setAttribute('webkit-playsinline', 'webkit-playsinline');
	video.setAttribute('playsinline', '');
	video.src = `media/${getParams(location.href).id}.mp4`;

	let texture = new THREE.VideoTexture(video);
	let material = new THREE.MeshBasicMaterial({map: texture});
	scene.add(new THREE.Mesh(geometry, material));
	console.debug('OK: Mesh with video added to the scene');

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('container').appendChild(renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('orientationchange', onWindowResize, false);
	console.debug('OK: Renderer inititialized');
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	console.debug('Resize!');
}

function animate() {
	requestAnimationFrame(animate);
  controls.update();
	renderer.render(scene, camera);
}

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 */
function getParams(url) {
	let params = {};
	let parser = document.createElement('a');
	parser.href = url;
	let vars = parser.search.substring(1).split('&');
	for (var i = 0; i < vars.length; i++) {
		let pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

function openFullscreen() {
		let container = document.getElementById('container');
		if (container.requestFullscreen) container.requestFullscreen();
		else if (container.mozRequestFullScreen) container.mozRequestFullScreen();
		else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
		else if (container.msRequestFullscreen) container.msRequestFullscreen();
		container.style.width = '100%';
		container.style.height = '100%';
}

function run() {
	console.debug('Starting...');
	openFullscreen();
	video.play();
	document.getElementById('Step1Message').remove();
	document.getElementById('container').style.display = 'block';
	animate();
}
