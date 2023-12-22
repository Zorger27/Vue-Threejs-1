<script>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default {
  name: 'ThreeScene01',
  setup() {
    const canvasContainer = ref(null);
    let scene, camera, renderer, cube;
    // const isSmallScreen = window.innerWidth <= 768
    // const isMediumScreen = window.innerWidth > 768 && window.innerWidth <= 1020
    // const isBigScreen = window.innerWidth > 1020

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
      // cube.material.wireframe = true;
      // cube.material = new THREE.MeshBasicMaterial({
      //   color: 0x8B0000,  // Тёмно-красный цвет
      //   wireframe: true,
      // });

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
    // const onWindowResize = () => {
    //   // const newHeight = isBigScreen || isMediumScreen ? 610 : 420;
    //   let newHeight;
    //
    //   if (isBigScreen) {
    //     newHeight = 610;
    //   } else if (isMediumScreen){
    //     newHeight = 620;
    //   } else if (isSmallScreen) {
    //     newHeight = 630;
    //   }
    //   camera.aspect = window.innerWidth / newHeight;
    //   camera.updateProjectionMatrix();
    //   renderer.setSize(window.innerWidth, newHeight);
    // };
    // window.addEventListener('resize', onWindowResize);

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
  flex: 1 0 auto;
  background: linear-gradient(to bottom, rgb(255, 249, 229), rgb(255, 240, 244)) no-repeat center;
  h1 {font-size: 2.5rem;margin: 0.7rem auto;color: black;}
  .scene-container {
    position: fixed;
    transform: translate(0,-10%);
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
