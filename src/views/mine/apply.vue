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
        <textarea rows="6" v-model="formData.address" placeholder="请输入详细地址"></textarea>
      </li>
    </ul>
    <div class="submit_btn" @click="submitForm">立即绑定</div>
    <iframe
      v-show="isShowMap"
      id="map"
      width="100%"
      height="100%"
      frameborder="0"
      src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
    ></iframe>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
@MyComponent({
  components: {}
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
  mounted() {
    this.initMap()
  }
  initMap(): void {
    let self = this;
    window.addEventListener(
      "message",
      function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == "locationPicker") {
          //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          self.formData.address = loc.poiaddress;
          self.isShowMap = false;
        }
      },
      false
    );
  }
  //  表单提交
  submitForm() {
    this.$util.showToast(this, "xxxx").show();
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/person/apply.less");
</style>