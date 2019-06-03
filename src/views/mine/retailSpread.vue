<template>
  <div class="common_feature">
    <scroll-page @pullingUp="loadMore" :scrollData="list" v-if="list.length>0">
      <div slot="content" class="wrap content">
        <div
          class="common_gif"
          @click="posterShow(imgPre+item.poster_img)"
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
    <div class="poster" v-show="show" @click.self="closePoster">
      <div class="poster_box">
        <div class="poster_img" id="shareImg"></div>
        <div class="share-img" ref="box"  v-if="exam_show">
          <img :src="poster" alt>
          <div class="user_info">
            <img src="../../assets/img/pic_card.png" alt class="avatar">
            <p>随心所欲</p>
            <img src="../../assets/img/code.png" alt class="code">
          </div>
        </div>
        <button class="save_pic" @click="savePoster" type="button">长按图片保存</button>
      </div>
    </div>
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
  exam_show: boolean = true;
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
      this.$nextTick(()=>{
        this.savePoster();
      })
    }
  }
  savePoster() {
    let that = this;
    let Canvas2Image = that.$util.Canvas2Image();
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
      that.exam_show = false;
      console.log(element, canvas, 22222222); //refs获取不到的原因，dom元素还未生成，creatd里获取不到，mounted 须在这里使用
      //  Canvas2Image.saveAsPNG(canvas, 200, 200);
      //   that.show = false
    });
  }
  closePoster(){
    (document.getElementById("shareImg") as Element).innerHTML = ''
    this.show = false
    this.exam_show = true
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
    margin: 1.4rem auto;
    position: relative;
    max-height: 500px;
    overflow: hidden;
  }
  .poster_img {
    max-height: 480px;
    img {
      overflow-y: auto;
    }
  }
  button {
    width: 120px;
    height: 30px;
    background: #fed351;
    font-size: 14px;
    color: #626469;
    border-radius: 100px;
    display: block;
    // position: absolute;
    // left: 0;
    // right: 0;
    // bottom: 20px;
    margin: 10px auto;
    margin-bottom: 0;
  }
}
.share-img {
  width: 100%;
  position: relative;
  & > img {
    width: 100%;
  }
  .user_info {
    height: 80px;
    width: 92.5%;
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0 auto;
    img.avatar {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      margin: 0 15px;
    }
    p {
      font-size: 14px;
      color: #333;
    }
    img.code {
      width: 50px;
      height: 50px;
      margin-left: 80px;
    }
  }
}
</style>
<style  lang="less">

.poster_img {
    height: 480px;
    img {
      overflow-y: auto;
    }
  }
</style>
