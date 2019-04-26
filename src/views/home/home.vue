<template>
  <div class="home">
    <scroll-page @pullingUp='loadMore'>
      <div slot="content">
        <cube-slide :data="items" class="banner" v-if='items' />
        <div class="feature wrap">
          <router-link tag="a" :to="''">
            <img src="../../assets/img/bg_song.png" alt>
          </router-link>
          <router-link tag="a" :to="''">
            <img src="../../assets/img/bg_draw.png" alt>
          </router-link>
          <router-link tag="a" :to="''">
            <img src="../../assets/img/bg_pic.png" alt>
          </router-link>
          <router-link tag="a" :to="''">
            <img src="../../assets/img/bg_card.png" alt>
          </router-link>
        </div>
        <div class="recommend">
          <h4>精彩推荐</h4>
          <ul>
            <li v-for='item in list' :key='item.id'>
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
@MyComponent({
  name:'Home',
  components: {
    tab
  }
})
export default class Home extends AbstractBaseVue.Mixins(FeatureMinix) {
  items: object[] = [];
  mounted(){
    this.getList(LessonApi.hotLesson)
  }
}
</script>
<style <style lang="less" scoped>
@import url("../../assets/css/home/home.less");
</style>


