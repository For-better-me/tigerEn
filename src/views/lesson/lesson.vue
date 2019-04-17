<template>
  <div class="lesson">
    <item-lesson></item-lesson>
    <tab index='2'></tab>
  </div>
</template>

<script lang="ts">
import AbstractBaseVueMixins,{MyComponent} from "@/util/AbstractBaseVue";
import tab from "@/components/tab.vue";
import itemLesson from '@/components/baseRecordL.vue'
@MyComponent({
  components: {
    tab,itemLesson
  }
})
export default class lesson extends AbstractBaseVueMixins {}
</script>
<style>
</style>

