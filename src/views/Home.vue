<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    
    <cube-button :active="true">Active Button</cube-button>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  },
})
export default class Home extends Vue {}
</script>
<style>
  .cube-btn{
    width: 375px;
  }
</style>

