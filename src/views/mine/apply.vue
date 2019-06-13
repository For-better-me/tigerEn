<!--  -->
<template>
  <div class="apply">
    <p class="tip" v-if="mode == '2'">请填写相关信息，以便于快速审核通过</p>
    <ul>
      <li>
        <input type="text" v-model="formData.name" placeholder="请输入姓名">
      </li>
      <li class="tel">
        <input type="number" v-model="formData.phone" placeholder="请输入手机号">
        <b class="code_btn" @click="sendCode" v-if="!disable">{{captcha}}</b>
        <b class="code_btn disable" v-else>{{captcha}}</b>
      </li>
      <li>
        <input type="number" v-model="formData.code" placeholder="请输入验证码">
      </li>
      <li v-if="mode == '2'">
        <input type="text" v-model="user_code" placeholder="请输入推荐码（选填）">
      </li>
    </ul>
    <ul>
      <li class="chooseAddr" @click="chooseSite()">
        <input type="text" v-if="!province_name" placeholder="请选择地址" readonly>
        <p v-else>{{province_name}} - {{city_name}} - {{area_name}}</p>
      </li>
      <li>
        <textarea rows="6" v-model="formData.address" placeholder="请输入详细地址"></textarea>
      </li>
    </ul>
    <div class="submit_btn" @click="submitEvent">立即绑定</div>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import { UserApi } from "@/api/user";
import { AreaApi } from "@/api/other";
@MyComponent({
  components: {}
})
export default class Apply extends AbstractBaseVue {
  isShowMap: boolean = false; //地图是否显示
  center: any = { lng: 0, lat: 0 }; //经纬度
  disable: boolean = false;
  captcha: string = "验证码";
  mode: string = "1"; //1--个人资料 2--申请分销
  formData: any = {
    name: "",
    phone: "",
    code: "",
    province_id: "",
    city_id: "",
    area_id: "",
    address: ""
  };
  province_name: string = "";
  city_name: string = "";
  area_name: string = "";
  provice: any[] = [];
  city: any[] = [];
  area: any[] = [];
  indexArr: number[] = [0, 0, 0];
  updatePropsPicker: any = null;
  user_code: string = "";
  created() {
    this.mode = this.$route.params.mode; //1是个人资料，2是申请开通分销
    document.title = this.mode == "1" ? "个人资料" : "申请";
  }
  mounted() {
    this.getProvince();
  }
  chooseSite() {
    if (
      this.provice.length == 0 ||
      this.city.length == 0 ||
      this.area.length == 0
    ) {
      return;
    }
    if (!this.updatePropsPicker) {
      this.updatePropsPicker = this.$createPicker({
        title: "请选择",
        data: [this.provice, this.city, this.area],
        selectedIndex: this.indexArr,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle,
        onChange: this.change,
        alias: {
          text: "title",
          value: "id"
        }
      });
    }
    this.updatePropsPicker.show();
  }
  change(col: number, index: number) {
    let indexArr = this.indexArr;
    if (col == 0) {
      this.getCity(this.provice[index].id);
      indexArr = [index, 0, 0];
    } else if (col == 1) {
      indexArr = [this.indexArr[0], index, 0];
      this.getArea(this.city[index].id);
    } else {
      indexArr[col] = index;
    }
    this.indexArr = indexArr;
  }
  selectHandle(
    selectedVal: number[],
    selectedIndex: number[],
    selectedText: string[]
  ) {
    [
      this.formData.province_id,
      this.formData.city_id,
      this.formData.area_id
    ] = selectedVal;
    [this.province_name, this.city_name, this.area_name] = selectedText;
  }
  cancelHandle() {}
  getProvince() {
    AreaApi.getProvinceList().then(res => {
      this.provice = res.data;
      this.getCity(res.data[0].id);
    });
  }
  getCity(id: number) {
    AreaApi.getCityList({ id }).then(res => {
      this.city = res.data;
      this.getArea(this.city[0].id);
    });
  }
  getArea(id: number) {
    AreaApi.getAreaList({ id }).then(res => {
      this.area = res.data;
      this.updatePropsPicker.$updateProps({
        data: [this.provice, this.city, this.area],
        selectedIndex: this.indexArr
      });
    });
  }
  submitEvent(){
    if(this.mode == '2'){
      this.showBtn();
    } else{
      this.submitForm()
    }
  }
  //  表单提交
  submitForm() {
    let self = this;
    let mode = this.mode;
    this.$util
      .isFilled(this.formData)
      .then(() => {
        let data = self.formData;
        if (mode == "2") {
          data = Object.assign({}, self.formData, {
            user_code: this.user_code
          });
          UserApi.apply(data)
            .then(res => {
              this.$util.showToast("提交成功", "correct").show();
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            })
            .catch(err => {});
        } else {
          UserApi.fillInfo(data)
            .then(res => {
              this.$util.showToast("提交成功", "correct").show();
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            })
            .catch(err => {});
        }
      })
      .catch(() => {
        this.$createToast({
          type: "warn",
          txt: "请完善资料后再提交",
          time: 1000
        }).show();
      });
  }

  sendCode() {
    let tel = this.formData.phone;
    let model: string = this.mode == "2" ? "retail" : "bind";
    let self = this;
    if (!this.$util.isTel(tel)) {
      this.$util.showToast("手机格式不正确", "error").show();
      return;
    }
    let data = { phone: tel, model };
    UserApi.sms(data)
      .then(res => {
        let time = 120;
        let interval = setInterval(() => {
          if (--time > 0) {
            this.captcha = `重新发送(${time})`;
            this.disable = true;
          } else {
            clearInterval(interval);
            this.captcha = "重新获取";
            this.disable = false;
          }
        }, 1000);
      })
      .catch(err => {
        this.disable = false;
      });
  }
  showBtn() {
    let self = this
    this.$createDialog({
      type: "confirm",
      icon: "cubeic-alert",
      title: "",
      content: "您确定不填写推荐码吗？",
      confirmBtn: {
        text: "确定提交",
        active: false,
        disabled: false,
        href: "javascript:;"
      },
      cancelBtn: {
        text: "返回填写",
        active: true,
        disabled: false,
        href: "javascript:;"
      },
      onConfirm: () => {
        self.submitForm()
      },
      onCancel: () => {
        
      }
    }).show();
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/person/apply.less");
.tip {
  font-size: 15px;
  color: #333;
  padding: 8px 15px;
  background: #fff;
  padding-top: 20px;
}
</style>