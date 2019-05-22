<template>
  <div class="introduction" v-if="lessonBrief">
    <img :src="imgPre+lessonBrief.img" alt class="poster">
    <div class="intro_con_wrap wrap">
      <h4>课程介绍</h4>
      <div class="con" :class="isOpen?'open':''" v-html="lessonBrief.text"></div>
      <div class="btn_open" @click="isOpen = true" v-if="!isOpen">
        <p>展开</p>
      </div>
    </div>
    <div class="lesson_wrap">
      <h4 class="wrap">
        课程表
        <span>40首儿歌课，每周更新1首</span>
      </h4>
      <div class="lesson_name">{{lessonBrief.title}}</div>

      <div class="try_part wrap">
        <img src="../../assets/img/bg_song.png" alt>
        <div class="try_word">
          <h4>Rain, Rain, Go Away儿歌课程</h4>
          <p>学习跟天气相关的单词、句式及表达学习跟天气相关…</p>
        </div>
        <div class="try_btn">试听</div>
      </div>
      <div>
        <div class="part_week wrap">
          <ul>
            <li>
              <h2>试听</h2>
              <div
                class="try_part wrap"
                v-for="day in tryList"
                :key="day.id"
                @click="lessonRouter(day.id,2)"
              >
                <img :src="imgPre+day.img" alt>
                <div class="try_word">
                  <h4>{{day.title}}</h4>
                  <P>{{day.desc}}</P>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-for="week in lessonBrief.week_list" :key="week.id">
        <div class="part_week wrap">
          <ul>
            <li>
              <h2>{{week.title}}</h2>
              <div>
                <div
                  class="try_part wrap"
                  v-for="day in week.days_list"
                  :key="day.id"
                  @click="lessonRouter(day.id,1)"
                >
                  <img :src="imgPre+day.img" alt>
                  <div class="try_word">
                    <h4>{{day.title}}</h4>
                    <P>{{day.desc}}</P>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pay_wrap" v-if="lessonBrief.is_payment == 0">
      <div class="pay_price">
        <h6>
          <s>售价：￥{{lessonBrief.primary_price}}</s>
        </h6>
        <p>实付：￥{{lessonBrief.price}}</p>
      </div>
      <div class="btn-pay" @click="lessonBuy">购买</div>
    </div>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import { LessonApi } from "@/api/lesson";
import wx, { chooseWXPay } from "wx-sdk-ts";
@MyComponent({
  components: {}
})
export default class LessonBrief extends AbstractBaseVue {
  lessonBrief: any = null;
  isOpen: boolean = false;
  tryList: any[] = [];
  mounted() {
    this.init();
    this.lessonTry();
  }
  init() {
    let id = this.$route.params.lessonId;
    LessonApi.lessonBrief({ id }).then(res => {
      this.lessonBrief = res.data;
    });
  }
  lessonTry() {
    let curriculum_id = this.$route.params.lessonId;
    LessonApi.lessonTry({ curriculum_id }).then(res => {
      this.tryList = res.data;
    });
  }
  lessonRouter(id: number, type: number) {
    if (type == 1 && this.lessonBrief.is_payment == 0) {
      this.$util.showToast("请购买后再来看", "warn").show();
      return false;
    }
    this.$router.push(`/detail/${id}/${type}`);
  }
  lessonBuy() {
    let data = { curriculum_id: this.lessonBrief.id };
    LessonApi.lessonPay(data).then(res => {
      this.wxPay(res.data)
    });
  }
  wxPay(data: any) {//配置支付路径params传参也可以（https://www.tjitfw.com/introduction/），query参数，路径可配置成https://www.tjitfw.com/introduction?lessonId/
    let self = this;
    wx.chooseWXPay({
      timestamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success:function(){
        self.$util.showToast('支付成功','correct')
      },
      fail:function(err){
        self.$util.showToast('支付失败','error')
      }
    })
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/lesson/introduction.less");
</style>