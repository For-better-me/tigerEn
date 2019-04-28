<template>
  <div class="mine">
    <div class="user">
      <img src="../../assets/img/bg_song.png" alt>
      <p>Frank</p>
    </div>
    <div class="list wrap">
      <ul>
        <li class="price">
          <img src="../../assets/img/icon_lesson.png" alt>
          <p>可提现的余额 <span>￥{{info.price}}</span> <b class="btn">提取</b></p>
        </li>
         <li class="price">
          <img src="../../assets/img/icon_lesson.png" alt>
          <p>不可提现余额 <span>￥{{info.frozen_price}}</span> <b class="tip"></b></p>
        </li>
        <router-link tag='li' to='/income'  class="arrow">
          <img src="../../assets/img/icon_lesson.png" alt>
          <p>我的收入</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import {RetailApi} from '@/api/retail'
@MyComponent({
  components: {}
    
})
export default class Person extends AbstractBaseVue {
    // data
    info:object = {}
    //   method
    getInfo(){
        RetailApi.info().then(res=>{
            this.info = res.data;
        })
    }
    created(){
        this.getInfo()
    }
}
</script>
<style <style lang="less" scoped>
@import url("../../assets/css/person/mine.less");
</style>

