<template>
  <div class="mine">
    <div class="user">
      <img src="../../assets/img/bg_song.png" alt>
      <p>Frank</p>
    </div>
    <div class="list wrap">
      <ul>
        <router-link tag='li' to='/lessonRecord/1' class="arrow">
          <img src="../../assets/img/icon_lesson.png" alt>
          <p>我的课程</p>
        </router-link>
        <router-link tag='li' to='/lessonRecord/2'  class="arrow">
          <img src="../../assets/img/icon_lesson.png" alt>
          <p>浏览记录</p>
        </router-link>
        <router-link tag='li' to='/apply/1'  class="arrow">
          <img src="../../assets/img/icon_lesson.png" alt>
          <p>绑定个人资料 <span>（有好礼）</span></p>
        </router-link>
        <router-link tag='li' to='/retailCenter'  class="arrow">
          <img src="../../assets/img/icon_lesson.png" alt>
          <p>分销中心</p>
        </router-link>
      </ul>
    </div>
    <div class="layer_wrap" v-show="layerShow">
      <div class="layer">
        <b class="close" @click="layerShow=false"></b>
        <h4>分销规则文字介绍</h4>
        <p>文字介绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字介绍文字介 文字介绍文字介绍文字介绍文字介绍文字介 文字介绍文字介绍文字介绍文字介绍文字介 文字介</p>
        <div class="btn">立即申请</div>
      </div>
    </div>
    <tab index="3"></tab>
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import tab from "@/components/tab.vue";
@MyComponent({
  components: {
    tab
  }
})
export default class Person extends AbstractBaseVue {
  layerShow:boolean = false;
}
</script>
<style <style lang="less" scoped>
@import url("../../assets/css/person/mine.less");
</style>

