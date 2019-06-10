<template>
  <div class="mine">
    <div class="user">
      <img :src="info.avatar" alt>
      <p>{{info.nickname}}</p>
      <div class="invite_code">
        <span>邀请码：{{userInfo.code}}</span>
        <b v-clipboard:copy="userInfo.code" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</b>
      </div>
    </div>
    <div class="list wrap">
      <ul>
        <li class="price">
          <img src="../../assets/img/icon_money.png" alt>
          <p>
            可提现的余额
            <span v-if="info.price">￥{{info.price}}</span>
            <b class="btn" @click="withdraw">提取</b>
          </p>
        </li>
        <li class="price">
          <img src="../../assets/img/icon_money2.png" alt>
          <p>
            不可提现余额
            <span v-if="info.frozen_price">￥{{info.frozen_price}}</span>
            <b class="tip"></b>
          </p>
        </li>
        <router-link tag="li" to="/income" class="arrow">
          <img src="../../assets/img/icon_money3.png" alt>
          <p>我的收入</p>
        </router-link>
        <router-link tag="li" to="/retailSpread" class="arrow">
          <img src="../../assets/img/icon_code.png" alt>
          <p>推广二维码</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent, MyGetter } from "@/util/AbstractBaseVue";
import { RetailApi } from "@/api/retail";
import { UserApi } from "@/api/user";

@MyComponent({
  components: {}
})
export default class Retail extends AbstractBaseVue {
  @MyGetter("userInfo") public userInfo!: any;
  // data
  info: object = {};
  price: any = "";
  //   method
  getInfo() {
    RetailApi.info().then(res => {
      this.info = res.data;
      this.price = res.data.price;
    });
  }
  created() {
    this.getInfo();
  }
  withdraw() {
    if (this.price > 1) {
      UserApi.withdraw().then(res => {
        this.$util.showToast("提现成功", "correct").show();
        this.getInfo();
      });
    } else {
      this.$util.showToast("提现余额不能小于1元", "error").show();
    }
  }
  onCopy() {
    this.$util.showToast('复制成功','correct').show()
  }
  onError(){
    this.$util.showToast('复制失败，重新复制','warn').show()
  }
}
</script>
<style <style lang="less" scoped>
@import url("../../assets/css/person/mine.less");
.invite_code {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  span {
    font-size: 14px;
    color: #666;
  }
  b {
    font-size: 12px;
    color: #666;
    padding: 4px 10px;
    border-radius: 30px;
    background: #fed351;
    margin-left: 20px;
  }
}
</style>

