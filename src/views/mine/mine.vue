<template>
  <div class="mine">
    <div class="user">
      <img src="../../assets/img/bg_song.png" alt>
      <p>Frank</p>
    </div>
    <div class="list wrap">
      <ul>
        <li>
          <img src="../../assets/img/icon_lesson.png" alt="">
          <p>分销中心</p>
        </li>
        <li>
          <img src="../../assets/img/icon_lesson.png" alt="">
          <p>分销中心</p>
        </li>
      </ul>
    </div>
    <tab index="3"></tab>
  </div>
</template>

<script lang="ts">
import AbstractBaseVueMixins, { MyComponent } from "@/util/AbstractBaseVue";
import tab from "@/components/tab.vue";
@MyComponent({
  components: {
    tab
  }
})
export default class Person extends AbstractBaseVueMixins {}
</script>
<style <style lang="less" scoped>
  @import url("../../assets/css/person/mine.less");
</style>

