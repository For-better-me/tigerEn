<template>
  <div class="pic_info" v-if="infoContent">
    <div class="wrap">
      <h4>{{infoContent.title}}</h4>
      <p>{{infoContent.time}}</p>
      <div v-if='infoContent.music'>
        <player
          :src="imgPre+infoContent.music"
          :time="infoContent.music_time"
          ref="player"
        ></player>
      </div>
      <div class="con" v-html="infoContent.text"></div>
    </div>
  </div>
</template>

<script  lang='ts'>
import AbstractBaseVue, { MyComponent, MyMixins } from "@/util/AbstractBaseVue";
import { PictureApi } from "@/api/feature";
import Player from "@/components/player.vue";
@MyComponent({
  components: { Player }
})
export default class PicInfo extends AbstractBaseVue {
  //生命周期 - 创建完成（可以访问当前this实例）
  infoContent: any = null; //详情页面得内容
  created() {}
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
  }
  // methods

  init() {
    let id = this.$route.params.id;
    let data = { id };
    PictureApi.detail(data).then(res => {
      this.infoContent = res.data;
    });
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/home/info.less"); //@import url(); 引入公共css类
</style>