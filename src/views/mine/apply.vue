<!--  -->
<template>
  <div class="apply">
    <p class="tip" v-if='mode == "2"'>请填写相关信息，以便于快速审核通过</p>
    <ul>
      <li>
        <input type="text" v-model="formData.name" placeholder="请输入姓名">
      </li>
      <li class="tel">
        <input type="number" v-model="formData.phone" placeholder="请输入手机号">
        <b class="code_btn" @click="sendCode" v-if='!disable'>{{captcha}}</b>
        <b class="code_btn disable" v-else>{{captcha}}</b>
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
 
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import {UserApi} from '@/api/user'
import {AreaApi} from '@/api/other'
@MyComponent({
  components: {}
})
export default class Apply extends AbstractBaseVue {
  isShowMap: boolean = false; //地图是否显示
  center: any = { lng: 0, lat: 0 }; //经纬度
  disable:boolean = false
  captcha:string = '验证码'
  mode:string = '1'
  formData: any = {
    name: "",
    phone: "",
    code: "",
    address: ""
  };
  provice:any[] = []
  city:any[] = []
  area:any[] = []
  created(){
    this.mode = this.$route.params.mode;//1是个人资料，2是申请开通分销
    document.title = this.mode == '1'? '个人资料':'申请'
  }
  mounted() {
    this.getProvince()
  }
  getProvince(){
    AreaApi.getProvinceList().then(res=>{
      this.provice = res.data
      this.getCity(this.provice[0].id)
    })
  }
  getCity(id:number){
    AreaApi.getCityList({id}).then(res=>{
      this.city = res.data
      this.getArea(this.city[0].id)
    })
  }
  getArea(id:number){
    AreaApi.getAreaList({id}).then(res=>{
      this.area = res.data
    })
  }
  //  表单提交
  submitForm() {
    // this.$util.showToast(this, "xxxx").show();
  }
  sendCode(){
      let tel = this.formData.phone;
      let self = this;
      if(!this.$util.isTel(tel)){
         this.$util.showToast('手机格式不正确','error').show();
         return;
      }
      let data = {phone:tel,model:this.mode}
      UserApi.sms(data).then(res=>{
        let time = 120;
        let interval = setInterval(() => {
            if (--time > 0) {
               this.captcha =  `重新发送(${time})`
               this.disable = true;
            } else {
                clearInterval(interval)
                this.captcha = '验证码'
                this.disable = false;
          
            }
        }, 1000)
      }).catch(err=>{
         this.disable = false;
      })
   
    }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/person/apply.less");
.tip{
  font-size: 15px;
  color: #333;
  padding: 8px 15px;
  background: #fff;
  padding-top: 20px;
}
</style>