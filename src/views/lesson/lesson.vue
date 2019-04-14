<template>
  <div class="lesson">
    lesson
    <tab index='2'></tab>
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
export default class lesson extends Vue {}
</script>
<style>
</style>

