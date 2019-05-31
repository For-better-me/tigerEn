<template>
  <div class="mine">
    <div class="user">
      <img :src="userInfo.avatar" alt>
      <p>{{userInfo.nickname}}</p>
    </div>
    <div class="list wrap">
      <ul>
        <router-link tag='li' to='/lessonRecord/1' class="arrow">
          <img src="../../assets/img/icon_lesson.png" alt>
          <p>我的课程</p>
        </router-link>
        <router-link tag='li' to='/lessonRecord/2'  class="arrow">
          <img src="../../assets/img/icon_record.png" alt>
          <p>浏览记录</p>
        </router-link>
        <router-link tag='li' to='/apply/1'  class="arrow"  v-if='!userInfo.is_bind|| !userInfo.name'>
          <img src="../../assets/img/icon_info.png" alt>
          <p>绑定个人资料 <span>（有好礼）</span></p>
        </router-link>
        <li class="arrow" @click='goRetail'>
          <img src="../../assets/img/icon_fx.png" alt>
          <p>分销中心</p>
        </li>
      </ul>
    </div>
    <div class="layer_wrap" v-show="layerShow">
      <div class="layer">
        <b class="close" @click="layerShow=false"></b>
        <h4>分销规则文字介绍</h4>
        <p>文字介绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字绍文字介绍文字介绍文字介绍文字介 文字介绍文字介绍文字介绍文字介绍文字介 文字介绍文字介绍文字介绍文字介绍文字介 文字介</p>
        <div class="btn" v-if='!applyStatus' @click="$router.push('/apply/2')">立即申请</div>
        <div class="btn wait" v-else>审核中</div>
      </div>
    </div>
    <tab index="3"></tab>
    <div class="save_pic" @click="savePoster">保存图片</div>
    <div class="canvas_test" ref='box'>
      <p>hello,world</p>
      <img src="../../assets/img/pic_card.png" alt="">
    </div>
    <div class="share-img" id="shareImg" style="height:500px"></div>
    
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent,MyAction,MyGetter} from "@/util/AbstractBaseVue";
import tab from "@/components/tab.vue";
import html2canvas from 'html2canvas';
import Canvas2image from 'canvas2image';
@MyComponent({
  components: {
    tab
  }
})
export default class Person extends AbstractBaseVue {
  layerShow:boolean = false;
  applyStatus:boolean = false;//false未通过/没申请 ，true审核中
  @MyGetter('userInfo') public userInfo!: any
  @MyAction('GetUserInfo') public getUserInfo!: any
  created(){
    this.getUserInfo()
  }
  mounted(){
    this.creatImg()
  }
  goRetail(){
    if(this.userInfo.is_distribution == 1){
      this.$router.push('/retailCenter')
    } else{
      this.layerShow = true
      if(this.userInfo.distribution == [] || this.userInfo.distribution.status == 2){
          this.applyStatus = false;
      } else if(this.userInfo.distribution.status == 1){
          this.applyStatus = true;
      }
    }
  }
  //////////--------------/////////////
    canvas:any = null
    creatImg(){
        let that = this;
        if(true){
            // 已经生成二维码
            interface optParam {
              allowTaint:boolean,
              taintTest:boolean
            }
            let opts:optParam = {allowTaint:true,taintTest: false}
            let element:any = that.$refs.box;
            html2canvas(element,opts).then(function(canvas:any) {
              (document.getElementById('shareImg') as Element).appendChild(Canvas2image.convertToPNG(canvas));
                
                that.canvas = canvas;
            console.log(that.$refs,canvas,Canvas2image)//refs获取不到的原因，dom元素还未生成，creatd里获取不到，mounted 须在这里使用
            });
        }else{
            
        }
    }
    savePoster(){
      Canvas2image.saveAsPNG(this.canvas,200,200)
    }
}
</script>
<style <style lang="less" scoped>
@import url("../../assets/css/person/mine.less");
</style>

