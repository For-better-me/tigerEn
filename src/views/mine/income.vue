<!--  -->
<template>
  <div class="income">
    <cube-tab-bar
      v-model="selectedLabel"
      show-slider
      :use-transition="disabled"
      ref="tabNav"
      :data="tabLabels"
    ></cube-tab-bar>
    <div class="tab-slide-container">
      <cube-slide
        ref="slide"
        :loop="loop"
        :initial-index="initialIndex"
        :auto-play="autoPlay"
        :show-dots="showDots"
        :options="slideOptions"
        @scroll="scroll"
        @change="changePage"
      >
        <!-- 关注 -->
        <cube-slide-item>
          <cube-scroll  :options="scrollOptions">
            <ul class="list-wrapper">{{selectedLabel}}</ul>
          </cube-scroll>
        </cube-slide-item>
        <!-- 推荐 -->
        <cube-slide-item>
          <cube-scroll :options="scrollOptions">
            <ul class="list-wrapper">222{{selectedLabel}}</ul>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll  :options="scrollOptions">
            <ul class="list-wrapper">333{selectedLabel}}</ul>
          </cube-scroll>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVueMixins, { MyComponent } from "@/util/AbstractBaseVue";
@MyComponent({
  components: {},
  
})
export default class Income extends AbstractBaseVueMixins {
    mounted() {}
    selectedLabel: string = "推荐";
    disabled: boolean = false;
    tabLabels: any = [
        {
        label: "关注"
        },
        {
        label: "推荐"
        },
        {
        label: "热榜"
        }
    ];
    loop: boolean = false;
    autoPlay: boolean = false;
    showDots: boolean = false;
    slideOptions: any = {
        listenScroll: true,
        probeType: 3,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
    };
    scrollOptions: any = {
        /* lock x-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
    };
    changePage (current:number) {
        this.selectedLabel = this.tabLabels[current].label
        console.log(current)
    }
    scroll (pos:any) {
        // const x = Math.abs(pos.x)
        // const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        // const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
        // const deltaX = x / slideScrollerWidth * tabItemWidth
        // (this.$refs.tabNav as any).setSliderTransform(deltaX)
        // },
        // resolveTitle (item) {
        // return `${item.name}关注了问题 · ${item.postTime} 小时前`
    }
    // resolveQuestionFollowers (item) {
    //     return `${item.answers} 赞同 · ${item.followers} 评论`
    // }

    get initialIndex () {
        let index = 0
        index = this.$util.findIndex(this.tabLabels, (item:any) => item.label === this.selectedLabel)
        return index
     
    }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/person/income.less");
</style>