<template>
  <div class="login"></div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import { UserApi } from "@/api/user";
@MyComponent({
  components: {}
})
export default class Login extends AbstractBaseVue {
  mounted() {
    let code: string = this.$util.urlParams(window.location.href).code;
    if (!code) {
      this.getCode();
    } else {
      this.login(code);
    }
  }
  getCode() {
    let url: string = window.location.href;
    // url = decodeURIComponent(url)
    url = encodeURIComponent(url);
    let link =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9a20f5a69b500a93&state=123456789&response_type=code&scope=snsapi_userinfo&redirect_uri=" +
      url +
      "&connect_redirect=1#wechat_redirect/";
    window.location.replace(link);
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9a20f5a69b500a93&response_type=code&scope=snsapi_userinfo&state=1234a7393ef3f3cd61945f49db12d&redirect_uri='+url+'&connect_redirect=1#wechat_redirect/'
  }
  getUser() {
    let self = this;
    this.$store
      .dispatch("GetUserInfo")
      .then((res: any) => {
        console.log("user", res);
        let url = localStorage.beforeLoginUrl;
        localStorage.beforeLoginUrl = "";
        self.$router.replace(url);
      })
      .catch((err: any) => {
        // self.getUser()
        console.log(err, "GetUserInfo");
      });
  }
  login(code: string) {
    let self = this;
    if(localStorage.loginCode && localStorage.loginCode == code){
      return;
    }
    localStorage.loginCode = code;
    UserApi.login({ code })
      .then((res: any) => {
        localStorage.token = res.data.token;
        localStorage.time = new Date().getTime();
        this.getUser();
      })
      .catch((err: any) => {
        // if(err.msg.indexOf('code been used')>-1){

        // }
        console.log(err);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
