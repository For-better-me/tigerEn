<template>
  <div class="introduction" v-if="lessonBrief">
    <!-- <img :src="imgPre+lessonBrief.img" alt class="poster"> -->
    <div class="intro_con_wrap">
      <!-- <h4 class='wrap'>课程介绍</h4> -->
      <div class="con" v-html="lessonBrief.text"></div>
      <!-- <div class="btn_open">
        <p>展开</p>
      </div>-->
    </div>
    <div class="lesson_wrap">
     
      <div class="lesson_name">试听列表</div>
      <div>
        <div class="part_week wrap">
          <ul style="padding-bottom:20px">
            <li>
              <!-- <h2>试听</h2> -->
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
                <div class="try_btn">试听</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div v-if="lessonBrief.is_payment == 1">
        <div class="part_week wrap">
          <ul>
            <li>
              <h2 @click="toggleTry()">此处是试听课程的子段</h2>
              <div ref="try_lesson" class="days_lesson">
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
              </div>
            </li>
          </ul>
        </div>
      </div>-->
      <!-- <div v-if="lessonBrief.is_payment == 1">
        <div v-for="(week,q) in lessonBrief.week_list" :key="week.id">
          <div class="part_week wrap">
            <ul>
              <li>
                <h2 @click="toggle(q)" ref='arrow_lesson'>{{week.title}}  <b></b></h2>
                <div ref="days_lesson" class="days_lesson">
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
      </div>-->
    </div>
    <div class="pay_wrap">
      <div class="pay_price">
        <p>抢购价：￥{{lessonBrief.price}}</p>
        <h6>
          <s>售价：￥{{lessonBrief.primary_price}}</s>
        </h6>
      </div>
      <div class="btn-pay" @click="_getDistriId" v-if="lessonBrief.is_payment == 0">购买</div>
      <div class="btn-pay btn-pay-dis" v-else>已购买</div>
    </div>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import { LessonApi } from "@/api/lesson";
import { RetailApi } from "@/api/retail";
import wx from "wx-jssdk-ts";
@MyComponent({
  components: {}
})
export default class LessonBrief extends AbstractBaseVue {
  lessonBrief: any = null;
  isOpen: boolean = false;
  tryList: any[] = [];
  payCallbackTip:any = '啥也没返回呢'
  created(){
    
  }
  mounted() {
    this.init();
    this.lessonTry();
    this.recordId()
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
    // if (type == 1 && this.lessonBrief.is_payment == 0) {
    //   this.$util.showToast("请购买后再来看", "warn").show();
    //   return false;
    // }
    this.$router.push(`/detail/${id}/${type}`);
  }
  _getDistriId() {
    let data: object = { curriculum_id: this.lessonBrief.id };
    RetailApi.getId().then(res => {
      if (res.data != '') {
        // alert('该订单是分销订单')
        data = Object.assign({}, data, {
          distribution_user_id: res.data
        });
      }
      this.lessonBuy(data)
    });
  }
  recordId() {
    if (this.$route.query.id) {
      this.getDistriId(this.$route.query.id);
    }
  }
  getDistriId(distribution_user_id: any) {
    RetailApi.getId().then(res => {
      let data = res.data;//疑惑：ts里空数组居然--->boolean == true，number没有length属性，所以number.length == false
      if (data == '') {
        this.setDistriId(distribution_user_id);
      }
    });
  }
  setDistriId(distribution_user_id: any) {
    let data = { distribution_user_id };
    RetailApi.setId(data);
  }
  lessonBuy(data:any) {
    LessonApi.lessonPay(data).then(res => {
      this.wxPay(res.data);
    });
  }
  wxPay(data: any) {
    //配置支付路径params传参也可以（https://www.tjitfw.com/introduction/），query参数，路径可配置成https://www.tjitfw.com/introduction?lessonId/
    let self = this;
    wx.chooseWXPay({
      timestamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success: function(res) {
        self.$util.showToast("支付成功", "correct").show();
        self.init();
      },
      fail: function(err) {
        self.$util.showToast(err, "error").show();
      },
      complete:function(res){
      }
    });
  }
  toggle(index: number) {
    let daysLesson = this.$refs.days_lesson as HTMLElement[];
    let arrowLesson = this.$refs.arrow_lesson as HTMLElement[];
    if (daysLesson[index].style.display == "block") {
      daysLesson[index].style.display = "none";
      this.$util.removeClass(arrowLesson[index], "on");
    } else {
      daysLesson[index].style.display = "block";
      this.$util.addClass(arrowLesson[index], "on");
    }
  }
  toggleTry() {
    if ((this.$refs.try_lesson as HTMLElement).style.display == "block") {
      (this.$refs.try_lesson as HTMLElement).style.display = "none";
    } else {
      (this.$refs.try_lesson as HTMLElement).style.display = "block";
    }
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/lesson/introduction.less");
</style>