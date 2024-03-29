<script>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import CanvasFullScreen from "@/components/util/CanvasFullScreen.vue";
import ToggleFullScreen from "@/components/util/ToggleFullScreen.vue";
import {openGraphMixin} from "@/assets/ogimage/openGraphMixin";

export default {
  name: 'ThreeScene01',
  mixins: [openGraphMixin],
  components: {ToggleFullScreen, CanvasFullScreen},
  mounted() {
    const mainTitle = '3D cube';
    const title = '3D cube №1';
    const metaDescription = '3D cube (Vue.js + TypeScript & Three.js)';
    const description = 'Three.js project №1 (3D cube)';
    const imageUrl = 'https://vue-threejs-1.vercel.app/assets/ogimage/bmp/cube.jpg';
    const url = 'https://vue-threejs-1.vercel.app';

    this.setOpenGraphTags(metaDescription, title, description, imageUrl, url);
    this.setPageTitle(mainTitle);
  },
  setup() {
    const canvasContainer = ref(null);
    let scene, camera, renderer, cube;

    const init = () => {
      // Создаем сцену
      scene = new THREE.Scene();

      // Создаем камеру
      // camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
      camera.position.z = 3;

      // Создаем рендерер
      // renderer = new THREE.WebGLRenderer();
      renderer = new THREE.WebGLRenderer({ alpha: true });
      // renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setSize(window.innerWidth, window.innerHeight);


      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      scene.add(camera);

      // Создаем геометрию и материал для куба
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 1 }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 1 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 1 }),
        new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 1 }),
        new THREE.MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 1 }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 1 }),
      ];
      cube = new THREE.Mesh(geometry, materials);

      // Добавляем куб на сцену
      scene.add(cube);

      // Добавляем рендерер в контейнер
      canvasContainer.value.appendChild(renderer.domElement);

      // Обновляем сцену
      const animate = () => {
        requestAnimationFrame(animate);

        // Обновление контроллеров для вращения сцены
        controls.update();

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // renderer.render(scene, camera);
    };

    window.addEventListener('resize', onWindowResize);

    onMounted(() => {
      init();
      onWindowResize();
    });

    onUnmounted(() => {
      // Выполняем необходимые действия при удалении компонента
      // Например, очищаем ресурсы Three.js
      renderer.dispose();
    });

    return {
      canvasContainer
    };
  },
};
</script>

<template>
  <div class="container">
    <h1>{{ $t('project1.name') }} <CanvasFullScreen :canvasContainer="canvasContainer"></CanvasFullScreen> <ToggleFullScreen></ToggleFullScreen></h1>
    <line></line>
    <div class="scene-container" ref="canvasContainer"></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  flex: 1 0 auto;
  background: linear-gradient(to bottom, rgb(255, 249, 229), rgb(255, 240, 244)) no-repeat center;
  h1 {font-size: 2.5rem;margin: 0.7rem auto;color: black;}
  .scene-container {
    max-height: 70vh;
    max-width: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media(max-width: 1020px) {
  .container {
    h1 {font-size: 2.3rem;margin: 0.6rem auto;}
  }
}

@media (max-width: 768px) {
  .container {
    h1 {font-size: 2rem;margin: 0.5rem auto;}
  }
}
</style>
