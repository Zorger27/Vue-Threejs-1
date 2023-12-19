<script>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

export default {
  name: 'ThreeScene01',
  setup() {
    const canvasContainer = ref(null);
    let scene, camera, renderer, cube;

    const init = () => {
      // Создаем сцену
      scene = new THREE.Scene();

      // Создаем камеру
      camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 2.3;

      // Создаем рендерер
      // renderer = new THREE.WebGLRenderer();
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Создаем геометрию и материал для куба
      const geometry = new THREE.BoxGeometry();
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 }),
        new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.5 }),
        new THREE.MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.5 }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 }),
      ];
      cube = new THREE.Mesh(geometry, materials);


      // Добавляем куб на сцену
      scene.add(cube);

      // Добавляем рендерер в контейнер
      canvasContainer.value.appendChild(renderer.domElement);

      // Обновляем сцену
      const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();
    };
    const onWindowResize = () => {
      // const newWidth = 500; // новая ширина
      const newHeight = 400; // новая высота
      // camera.aspect = window.innerWidth / window.innerHeight;
      camera.aspect = window.innerWidth / newHeight;
      camera.updateProjectionMatrix();
      // renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setSize(window.innerWidth, newHeight);

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
      canvasContainer,
    };
  },
};
</script>

<template>
  <div class="container">
    <h1>{{ $t('project1.name') }}</h1>
    <line></line>
    <div class="scene-container" ref="canvasContainer"></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  //display: flex;
  flex: 1 0 auto;
  //flex-direction: column;
  //justify-content: flex-start;
  //height: 100vh;
  background: linear-gradient(to bottom, rgb(255, 249, 229), rgb(255, 240, 244)) no-repeat center;
  h1 {font-size: 2.5rem;margin: 0.7rem auto;color: black;}
  .scene-container {
    //width: 100%;
    height: 100%;
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
