<template>
  <div id="app">
    <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script lang="ts">
import AbstractBaseVue, { MyComponent, MyAction } from "@/util/AbstractBaseVue";
@MyComponent({
  components: {}
})
export default class App extends AbstractBaseVue {
  @MyAction('GetUserInfo') public getUserInfo!: any
  created() {
    this.getUserInfo()
    // let url = 'https://www.tjitfw.com/quhu/'
    // url = encodeURIComponent(url)
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx16cb5a501e876d70&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=8fff58aa7393ef3f3cd61945f49db12d&connect_redirect=1#wechat_redirect/'
  }

}
</script>

<style lang="less">
  @import url("./assets/css/common/reset.css");
</style>
