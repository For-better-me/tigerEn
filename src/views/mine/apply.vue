<!--  -->
<template>
  <div class="apply">
    <!-- <cube-form :model="model" @validate="validateHandler" @submit="submitHandler"> -->
    <cube-form>
      <cube-input placeholder="请输入姓名" v-model="formData.name" clearable></cube-input>
      <cube-input placeholder="请输入手机号" v-model="formData.tel" type="number" clearable></cube-input>
      <cube-input placeholder="请输入验证码" v-model="formData.code" clearable></cube-input>
      <cube-input placeholder="请选择地址" readonly v-model="formData.code" clearable></cube-input>
      <!-- <cube-button @click="submit">Submit</cunbe-button> -->
      <baidu-map ak = '333' class="map" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
    </cube-form>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVueMixins, { MyComponent } from "@/util/AbstractBaseVue";
import {BaiduMap} from "vue-baidu-map";
@MyComponent({
  components: { BaiduMap }
})
export default class Home extends AbstractBaseVueMixins {
  center: any = { lng: 0, lat: 0 }; //经纬度
  zoom: number = 3; //地图展示级别
  formData: any = {
    name: "",
    tel: "",
    code: ""
  };
  mounted() {}
  handler({ BMap, map }: any) {
    console.log(BMap, map);
    this.center.lng = 116.404;
    this.center.lat = 39.915;
    this.zoom = 15;
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/person/income.less");
.map{
  width: 100%;
  height: 500px;;
}
</style>