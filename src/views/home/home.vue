<template>
  <div class="home">
    <scroll-page @pullingUp='loadMore' :scrollData='list'>
      <div slot="content">
        <cube-slide :data="bannerList" class="banner" v-if='bannerList' >
           <cube-slide-item v-for="(item, index) in bannerList" :key="index">
            <a :href="item.url">
              <img :src="imgPre+item.img">
            </a>
          </cube-slide-item>
		</cube-slide>
        <div class="feature">
          <div class='wrap feature_list'> 
            <router-link tag="a" :to="'/song'">
            <img src="../../assets/img/bg_song.png" alt>
            </router-link>
            <router-link tag="a" :to="'/draw'">
                <img src="../../assets/img/bg_draw.png" alt>
            </router-link>
            <router-link tag="a" :to="'/cartoon'">
                <img src="../../assets/img/bg_pic.png" alt>
            </router-link>
            <router-link tag="a" :to="'/card'">
                <img src="../../assets/img/bg_card.png" alt>
            </router-link>    
            </div>
        </div>
        <div class="recommend">
          <h4>精彩推荐</h4>
          <ul>
            <li v-for='item in list' :key='item.id' @click="hotInfo(item)">
              <img :src="imgPre+item.img" alt>
              <p>{{item.title}}</p>
            </li>
          </ul>
        </div>
      </div>
    </scroll-page>
    <tab index="1"></tab>
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent,MyMixins } from "@/util/AbstractBaseVue";
import {FeatureMinix} from "@/util/mixins";
import tab from "@/components/tab.vue";
import {LessonApi} from '@/api/lesson'
import {otherApi} from '@/api/other'
@MyComponent({
  name:'Home',
  components: {
    tab
  }
})
export default class Home extends AbstractBaseVue.Mixins(FeatureMinix) {
  // data
  bannerList: object[] = [];
  // methods
  getBanner(){
    otherApi.banner().then(res=>{
      this.bannerList = res.data;
    })
  }
  mounted(){
      this.getList(LessonApi.hotLesson)
      this.getBanner()
  }
  hotInfo(item:any){
    if(item.tid == 2){
      this.$router.push('/songInfo/'+item.id)
    } else if(item.tid == 207){
      this.$router.push('/drawInfo/'+item.id)
    } else if(item.tid == 208){
      window.location.href = item.url
    } else if(item.tid == 209){
      this.$router.push('/card')
    }
  }
}
</script>
<style <style lang="less" scoped>
@import url("../../assets/css/home/home.less");

</style>


