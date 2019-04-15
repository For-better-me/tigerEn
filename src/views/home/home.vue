<template>
  <div class="home">
    <cube-scroll
      ref="scroll"
      :options="optionsScroll"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
      class="scroll_div"
    >
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
          <li>
            <img src="../../assets/img/bg_card.png" alt>
            <p>Daniel Lopez</p>
          </li>
          <li>
            <img src="../../assets/img/bg_card.png" alt>
            <p>Daniel Lopez</p>
          </li>
          <li>
            <img src="../../assets/img/bg_card.png" alt>
            <p>Daniel LopezLopezLopezLopez</p>
          </li>
          <li>
            <img src="../../assets/img/bg_card.png" alt>
            <p>Daniel Lopez</p>
          </li>
          <li>
            <img src="../../assets/img/bg_card.png" alt>
            <p>Daniel Lopez</p>
          </li>
        </ul>
      </div>
    </cube-scroll>
    <tab index="1"></tab>
  </div>
</template>

<script lang="ts">
import AbstractBaseVueMixins,{MyComponent} from "@/util/AbstractBaseVue";
import tab from "@/components/tab.vue";
@MyComponent({
  components: {
    tab
  }
})
export default class Home extends AbstractBaseVueMixins {
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
  optionsScroll: any = {
	pullDownRefresh:false,
    pullUpLoad: {
      threshold: 0,
      txt: {
        more: "Load more",
        noMore: "No more data"
      }
    }
  };
  onPullingDown() {
    // 模拟更新数据
    setTimeout(() => {
      if (Math.random() > 0.5) {
        // 如果有新数据
      } else {
        // 如果没有新数据
      }
    }, 1000);
  }
  onPullingUp() {
    // 模拟更新数据
    setTimeout(() => {
      if (Math.random() > 0.5) {
        // 如果有新数据
      } else {
        (this.$refs.scroll as any).forceUpdate();
        console.log(this, this.$refs.scroll);
      }
    }, 1000);
  }
}
</script>
<style <style lang="less" scoped>
@import url("../../assets/css/home/home.less");
</style>


