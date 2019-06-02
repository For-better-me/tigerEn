<template>
  <div class="common_feature">
    <scroll-page @pullingUp="loadMore" :scrollData="list" v-if="list.length>0">
      <div slot="content" class="wrap content">
        <div
          class="common_gif"
          @click="posterShow(imgPre+item.img)"
          v-for="item in list"
          :key="item.id"
        >
          <img :src="imgPre+item.img" alt>
          <div class="lead">
            <h4>{{item.title}}</h4>
            <p>生成推广海报</p>
          </div>
        </div>
      </div>
    </scroll-page>
    <no-data v-else :tip-text="noDataTip"></no-data>
    <div class="poster" v-show="show">
      <div class="poster_box">
        <div class="poster_img" ref="box">
          <img :src="poster" alt>
        </div>
        <button class="save_pic" @click="savePoster" type="button">保存图片</button>
      </div>
    </div>

    <div class="share-img" id="shareImg" v-show="false"></div>
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent, MyMixins } from "@/util/AbstractBaseVue";
import lesson from "@/components/baseLesson.vue";
import { LessonApi } from "@/api/lesson";
import { FeatureMinix } from "@/util/mixins";
import html2canvas from "html2canvas";
// import Canvas2Image from "canvas2image";
@MyComponent({
  components: { lesson }
})
export default class LessonSpread extends AbstractBaseVue.Mixins(FeatureMinix) {
  // data
  noDataTip: string = "暂无可推广课程~";
  show: boolean = false;
  poster: string = "";
  // method
  init() {
    this.getList(LessonApi.lessonList);
  }
  mounted() {
    this.init();
  }
  canvas: any = null;
  posterShow(imgStr: string) {
    if (imgStr) {
      this.show = true;
      this.poster = imgStr;
    }
  }
  savePoster() {
    let that = this;
    let Canvas2Image =  that.$util.Canvas2Image()
    interface optParam {
      allowTaint: boolean;
      taintTest: boolean;
    }
    let opts: optParam = { allowTaint: true, taintTest: false };
    let element: any = that.$refs.box;
    html2canvas(element, opts).then(function(canvas: any) {
        (document.getElementById("shareImg") as Element).appendChild(
              Canvas2Image.convertToPNG(canvas)
      );
    console.log(element,canvas,22222222); //refs获取不到的原因，dom元素还未生成，creatd里获取不到，mounted 须在这里使用
     Canvas2Image.saveAsPNG(canvas, 200, 200);
    //   that.show = false
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url("../../assets/css/common/common.less");
.common_gif {
  width: 100%;
  height: 55vw;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
  margin-bottom: 8vw;
  box-shadow: 0 0 4vw 1.46667vw #ddd;
  img {
    width: 100%;
    height: 100%;
  }
  .lead {
    padding: 0.3rem;
    color: #fff;
    position: absolute;
    left: 0.3rem;
    top: 0.5rem;
    h4 {
      font-size: 20px;
    }
    p {
      font-size: 14px;
      margin-top: 15px;
      margin-bottom: 10px;
    }
  }
}
.poster {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  .poster_box {
    width: 80%;
    background: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    margin: 1rem auto;
    position: relative;
  }
  button {
    width: 120px;
    height: 30px;
    background: #fed351;
    font-size: 14px;
    color: #626469;
    margin: 10px auto;
    border-radius: 100px;
    display: block;
  }
}
</style>
