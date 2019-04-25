<template>
  <div class="home">
    <scroll-page @pullingUp='loadMore'>
      <div slot="content">
        <cube-slide :data="items" class="banner"/>
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
            <li>
              <img src="../../assets/img/bg_card.png" alt>
              <p>Daniel LopezLopezLopezLopez</p>
            </li>
          </ul>
        </div>
      </div>
    </scroll-page>
    <tab index="1"></tab>
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import tab from "@/components/tab.vue";
import {LessonApi} from '@/api/lesson'
@MyComponent({
  name:'Home',
  components: {
    tab
  }
})
export default class Home extends AbstractBaseVue {
  items: object[] = [
    {
      url: "http://www.didichuxing.com/",
      image:
        "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png"
    },
    {
      url: "http://www.didichuxing.com/",
      image:
        "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png"
    },
    {
      url: "http://www.didichuxing.com/",
      image:
        "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png"
    }
  ];
  loadMore(scroll:any) {
    // 模拟更新数据
      
      scroll.forceUpdate();
  }
  getLesson(){
    LessonApi.hotLesson().then((res:any)=>{
      
    })
  }
  mounted(){
    this.getLesson()
  }
}
</script>
<style <style lang="less" scoped>
@import url("../../assets/css/home/home.less");
</style>


