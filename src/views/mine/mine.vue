<template>
  <div class="mine">
    <div class="user">
      <img :src="userInfo.avatar" alt>
      <p>{{userInfo.nickname}}</p>
    </div>
    <div class="list wrap">
      <ul>
        <router-link tag='li' to='/lessonRecord/1' class="arrow">
          <img src="../../assets/img/icon_lesson.png" alt>
          <p>我的课程</p>
        </router-link>
        <router-link tag='li' to='/lessonRecord/2'  class="arrow">
          <img src="../../assets/img/icon_record.png" alt>
          <p>浏览记录</p>
        </router-link>
        <router-link tag='li' to='/apply/1'  class="arrow"  v-if='!userInfo.is_bind|| !userInfo.name'>
          <img src="../../assets/img/icon_info.png" alt>
          <p>绑定个人资料 <span>（有好礼）</span></p>
        </router-link>
        <li class="arrow" @click='goRetail'>
          <img src="../../assets/img/icon_fx.png" alt>
          <p>合伙人中心</p>
        </li>
        <router-link tag='li' to='/aboutUs'  class="arrow">
          <img src="../../assets/img/icon_us.png" alt>
          <p>联系我们</p>
        </router-link>
      </ul>
    </div>
    <div class="layer_wrap" v-show="layerShow">
      <div class="layer">
        <b class="close" @click="layerShow=false"></b>
        <div class="retail_tip" v-html="retailTip"></div>
        <div class="btn" v-if='!applyStatus' @click="$router.push('/apply/2')">立即申请</div>
        <div class="btn wait" v-else>审核中</div>
      </div>
    </div>
    <tab index="3"></tab>
   
    
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent,MyAction,MyGetter} from "@/util/AbstractBaseVue";
import tab from "@/components/tab.vue";
import {RetailApi} from '@/api/retail'
@MyComponent({
  components: {
    tab
  }
})
export default class Person extends AbstractBaseVue {
  layerShow:boolean = false;
  applyStatus:boolean = false;//false未通过/没申请 ，true审核中
  retailTip:string = ''
  @MyGetter('userInfo') public userInfo!: any
  @MyAction('GetUserInfo') public getUserInfo!: any
  created(){
    this.getUserInfo()
    this.getRetailTip()
  }
 
  goRetail(){
    if(this.userInfo.is_distribution == 1){
      this.$router.push('/retailCenter')
    } else{
      this.layerShow = true
      if(this.userInfo.distribution == null || this.userInfo.distribution.status == 2){//2 是审核失败
          this.applyStatus = false;
      } else if(this.userInfo.distribution.status == 1){//审核中
          this.applyStatus = true;
          
          
      }
    }
  }
  getRetailTip(){
    RetailApi.getTip().then(res=>{
      this.retailTip = res.data
    })
  }
    
}
</script>
<style <style lang="less" scoped>
@import url("../../assets/css/person/mine.less");
</style>

