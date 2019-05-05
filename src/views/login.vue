<template>
  <div class="login">
    
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import {UserApi} from '@/api/user'
@MyComponent({
  components:{}
})
export default class Login extends AbstractBaseVue {
  created(){
    let code:string = this.$util.urlParams(window.location.href).code
    alert(code)
    if(!code){
      if(!localStorage.token){
        this.getCode()
      }else{
        // 如果有token 但是vuex中没有用户登录信息则做登录操作
        let time:number = localStorage.time;
        let now:number = new Date().getTime()
        let secondHDay :number = 24*60*60*1000
        const Expire_Date  = 1//token有效期
        if((now - time)/secondHDay < Expire_Date){
          this.getUser()
        } else{
          this.getCode()
        }
        
      }
    }else{
      this.login(code)
    }
    
  }
  getCode(){
      let url:string = window.location.href;
      // url = decodeURIComponent(url)
      url = encodeURIComponent(url)
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx16cb5a501e876d70&response_type=code&scope=snsapi_userinfo&state=1234a7393ef3f3cd61945f49db12d&redirect_uri='+url+'&connect_redirect=1#wechat_redirect/'
    
  }
  getUser(){
    let self = this
    this.$store.dispatch('GetUserInfo')
    .then((res:any)=>{
      console.log('user',res)
      let url = localStorage.beforeLoginUrl;
      localStorage.beforeLoginUrl = ''
      self.$router.push(url);
    })
    .catch((err:any)=>{
      self.getUser()
      console.log(err,'GetUserInfo')
    })
  }
  login(code:string){
    let self = this
    UserApi.login({code}).then((res:any)=>{
      localStorage.token = res.data.token
      alert(res.data.token)
      localStorage.time = new Date().getTime()
      this.getUser()
    }).catch((err:any)=>{
      // self.getCode()
      console.log(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    
</style>
