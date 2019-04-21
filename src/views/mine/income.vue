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
            <ul class="list-wrapper income_list">
              <li>
                <img src="../../assets/img/pic_card.png" alt="">
                <div class="income_info">
                  <h5>一根小竹子</h5>
                  <span>2018年3月5日</span>
                </div>
                <p>消费：¥168.00</p>
              </li>
            </ul>
          </cube-scroll>
        </cube-slide-item>
        <!-- 推荐 -->
        <cube-slide-item>
          <cube-scroll :options="scrollOptions">
            <ul class="list-wrapper income_list">
              
              <li>
                <img src="../../assets/img/pic_card.png" alt="">
                <div class="income_info">
                  <h5>一根小竹子</h5>
                  <span>2018年3月5日</span>
                </div>
                <p>消费：¥168.00</p>
              </li>
            </ul>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll  :options="scrollOptions">
            <ul class="list-wrapper income_list">
              <li>
                <img src="../../assets/img/bg_song.png" alt="">
                <div class="income_info">
                  <h5>一根小竹子</h5>
                  <span>2018年3月5日</span>
                </div>
                <p>消费：¥168.00</p>
              </li>
            </ul>
          </cube-scroll>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
@MyComponent({
  components: {},
  
})
export default class Income extends AbstractBaseVue {
    mounted() {}
    selectedLabel: string = "一级分销";
    disabled: boolean = false;
    tabLabels: any = [
        {
        label: "一级分销"
        },
        {
        label: "二级分销"
        },
        {
        label: "三级分销"
        }
    ];
    loop: boolean = false;
    autoPlay: boolean = false;
    showDots: boolean = false;
    slideOptions: any = {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
    };
    scrollOptions: any = {
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