<template>
  <div class="mine">
    Person
    <tab index='3'></tab>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import tab from "@/components/tab.vue";
@Component({
  components: {
    tab
  }
})
export default class Person extends Vue {}
</script>
<style>
</style>

