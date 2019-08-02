
var camera, scene, renderer, controls, container, video;

function init() {
	container = document.getElementById('container');
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1100);
  controls = new THREE.DeviceOrientationControls(camera);
	camera.target = new THREE.Vector3(0, 0, 0);

	scene = new THREE.Scene();

	// Define the geomtry holding the video
	let geometry = new THREE.SphereBufferGeometry(500, 60, 40);
	// correctly orient the surface by scaling inverting it
	geometry.scale(-1, 1, 1);

	video = document.createElement('video');
	video.crossOrigin = 'anonymous';
	video.width, video.height  = 1080, 1920;
	video.loop, video.muted = true, true;
	video.setAttribute('webkit-playsinline', 'webkit-playsinline');
	video.setAttribute('playsinline','');

	urlParams = getParams(location.href);
	video.src = 'media/' + urlParams.id + '.mp4';

	let texture = new THREE.VideoTexture(video);
	let material = new THREE.MeshBasicMaterial({map: texture});
	scene.add(new THREE.Mesh(geometry, material));

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('orientationchange', onWindowResize, false);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
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