<template>
  <div class="mine">
    <div class="user">
      <img :src="info.avatar" alt>
      <p>{{info.nickname}}</p>
    </div>
    <div class="list wrap">
      <ul>
        <li class="price">
          <img src="../../assets/img/icon_money.png" alt>
          <p>可提现的余额 <span v-if='info.price'>￥{{info.price}}</span> <b class="btn">提取</b></p>
        </li>
         <li class="price">
          <img src="../../assets/img/icon_money2.png" alt>
          <p>不可提现余额 <span v-if='info.frozen_price'>￥{{info.frozen_price}}</span> <b class="tip"></b></p>
        </li>
        <router-link tag='li' to='/income'  class="arrow">
          <img src="../../assets/img/icon_money3.png" alt>
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
export default class Retail extends AbstractBaseVue {
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

