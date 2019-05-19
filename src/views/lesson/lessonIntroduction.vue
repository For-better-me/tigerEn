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
      <div class="part_week wrap">
        <ul>
          <li>周一：儿歌词汇学习 & 逐句学唱</li>
          <li>周二：儿歌词汇复习 & 场景应用</li>
          <li>周三：社群纠音</li>
          <li>周四：儿歌拓展 & 尤克里里弹唱</li>
        </ul>
      </div>
      <div v-for="week in lessonBrief.week_info" :key='week.id'>
        <div class="try_part wrap">
          <img src="../../assets/img/bg_song.png" alt>
          <div class="try_word">
            <h4>{{week.title}}</h4>
            <p>{{week}}</p>
          </div>
        </div>
        <!-- <div class="part_week wrap">
          <ul>
            <li v-for='day in week.days_list' :key='day.id'>{{day.title}}</li>
          </ul>
        </div> -->
      </div>
    </div>
    <div class="pay_wrap" v-if="lessonBrief.is_payment == 0">
      <div class="pay_price">
        <h6>
          <s>售价：￥{{lessonBrief.primary_price}}</s>
        </h6>
        <p>实付：￥{{lessonBrief.price}}</p>
      </div>
      <div class="btn-pay">购买</div>
    </div>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import { LessonApi } from "@/api/lesson";
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
    let id = this.$route.params.id;
    LessonApi.lessonBrief({ id }).then(res => {
      this.lessonBrief = res.data;
    });
  }
  lessonTry() {
    let curriculum_id = this.$route.params.id;
    LessonApi.lessonTry({ curriculum_id }).then(res => {
      this.tryList = res.data;
    });
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/lesson/introduction.less");
</style>