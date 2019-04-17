<template>
  <div class="lesson">
    lesson
    <tab index='2'></tab>
  </div>
</template>

<script lang="ts">
import AbstractBaseVueMixins,{MyComponent} from "@/util/AbstractBaseVue";
import tab from "@/components/tab.vue";
@MyComponent({
  components: {
    tab
  }
})
export default class lesson extends AbstractBaseVueMixins {}
</script>
<style>
</style>

