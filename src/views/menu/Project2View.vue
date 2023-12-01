<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  methods: {},
  components: {},
})
export default class Project2 extends Vue {
};
</script>

<template>
  <div class="container">
    <h1>{{ $t('project2.name') }}</h1>
    <line></line>
  </div>
</template>

<style lang="scss" scoped>
.container {
  flex: 1 0 auto;
  background: linear-gradient(to bottom, rgb(229, 251, 255), rgb(255, 240, 244)) no-repeat center;

  //background-image: url("@/assets/background/background02.jpg");
  //background-position: center;
  //background-size: cover;
  //background-repeat: no-repeat;
}
</style>
