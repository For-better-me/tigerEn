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
import AbstractBaseVue, {
  MyComponent,
  MyAction,
  MyWatch
} from "@/util/AbstractBaseVue";
import { RetailApi } from "@/api/retail";
import reqConfig from "@/util/enjoyWx";
@MyComponent({
  components: { backHome }
})
export default class App extends AbstractBaseVue {
  @MyAction("GetUserInfo") public getUserInfo!: any;
  show: boolean = true;
  created() {
    this.getUserInfo();
    setTimeout(() => {
      this.recordId();
    }, 1000);

    if (
      this.$route.name == "home" ||
      this.$route.name == "lesson" ||
      this.$route.name == "person"
    ) {
      this.show = false;
    } else {
      this.show = true;
    }
    // ios 设备进入页面则进行js-sdk签名
    this.getIosConfig()
  }
  getIosConfig() {
    var u: any = navigator.userAgent;
    var isiOS: boolean = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
      let _url = window.location.href.split("#")[0];
      reqConfig(_url);
    }
  }
  recordId() {
    console.log(this.$route);
    if (this.$route.query.id) {
      this.getDistriId(this.$route.query.id);
    }
  }
  getDistriId(distribution_user_id: any) {
    RetailApi.getId().then(res => {
      let data = res.data;//疑惑：ts里空数组居然--->boolean == true，number没有length属性，所以number.length == false
      if (data.length == 0) {
        this.setDistriId(distribution_user_id);
      }
    });
  }
  setDistriId(distribution_user_id: any) {
    let data = { distribution_user_id };
    RetailApi.setId(data);
  }
  @MyWatch("$route")
  watchRoute(n: any, o: any) {
    if (n.name == "home" || n.name == "lesson" || n.name == "person") {
      this.show = false;
    } else {
      this.show = true;
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
