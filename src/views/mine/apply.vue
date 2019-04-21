<!--  -->
<template>
  <div class="apply">
    <ul>
        <li>
            <input type="text" v-model="formData.name" placeholder="请输入姓名">
        </li>
        <li class="tel">
            <input type="number" v-model="formData.tel" placeholder="请输入手机号">
            <b class="code_btn">验证码</b>
        </li>
        <li>
            <input type="text" v-model="formData.code" placeholder="请输入验证码">
        </li>
    </ul>
    <ul>
        <li class="chooseAddr" @click="isShowMap = true">
            <input type="text" v-model="formData.address" placeholder="请选择地址" readonly>
        </li>
        <li>
            <textarea  rows="6" v-model="formData.address" placeholder="请输入详细地址"></textarea>
        </li>
    </ul>
    <div class="submit_btn" @click="submitForm">立即绑定</div>

    <iframe
      v-show="isShowMap"
      id="map"
      ref="map"
      @load="loadiframe"
      src="https://m.amap.com/picker/?center=116.3972,39.9696&key=608d75903d29ad471362f8c58c550daf"
    ></iframe>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
@MyComponent({
  components: {  }
})
export default class Apply extends AbstractBaseVue {
  isShowMap: boolean = false; //地图是否显示
  center: any = { lng: 0, lat: 0 }; //经纬度
  formData: any = {
    name: "",
    tel: "",
    code: "",
    address: ""
  };
  mounted() {}
  loadiframe() {
    let self = this;
    let iframe: any = (this.$refs.map as any).contentWindow;
    iframe.postMessage("hello", "https://m.amap.com/picker/");
    window.addEventListener(
      "message",
      function(e: any) {
        if (e.data.command != "COMMAND_GET_TITLE") {
          self.formData.address = e.data.address;
          self.isShowMap = false;
        }
      }.bind(this),
      false
    );
  }
//   表单提交
  submitForm(){
      this.$util.showToast(this,'xxxx').show()
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/person/apply.less");
</style>