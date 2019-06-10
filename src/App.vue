<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <back-home v-if="show"></back-home>
  </div>
</template>
<script lang="ts">
import backHome from "@/components/backHome.vue";
import AbstractBaseVue, { MyComponent, MyAction,MyWatch } from "@/util/AbstractBaseVue";
@MyComponent({
  components: { backHome }
})
export default class App extends AbstractBaseVue {
  @MyAction("GetUserInfo") public getUserInfo!: any;
  show: boolean = true;
  created() {
    this.getUserInfo();
    if(this.$route.name == 'home' ||this.$route.name == 'lesson' ||this.$route.name == 'person'){
      this.show = false
    } else{
      this.show = true
    }
  }
  @MyWatch("$route")
  watchRoute(n: any, o: any) {
    if(n.name == 'home' ||n.name == 'lesson' ||n.name == 'person'){
      this.show = false
    } else{
      this.show = true
    }
  }
}
</script>

<style lang="less">
@import url("./assets/css/common/reset.css");
.cube-slide-dots {
  bottom: 10px;
  span.active {
    background: #fc5e64;
  }
}
</style>
