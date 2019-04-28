<template>
  <div id="app">
    <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script lang="ts">
import AbstractBaseVue, { MyComponent, MyWatch } from "@/util/AbstractBaseVue";


@MyComponent({
  components: {}
})
export default class WordCard extends AbstractBaseVue {
  created() {
    
  }

}
</script>

<style lang="less">
@import url("./assets/css/common/reset.css");
</style>
