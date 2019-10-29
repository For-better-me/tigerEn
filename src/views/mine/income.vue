<!--  -->
<template>
  <div class="income">
    <scroll-page @pullingUp="loadMore">
      <div slot="content">
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
              <cube-scroll :options="scrollOptions" v-if="list_1.length>0">
                <ul class="list-wrapper income_list">
                  <li v-for="(item,i) in list_1" :key="i">
                    <h6>
                      <span>分销者：{{item.name}}</span>
                      <span>购买者：{{item.nickname}}</span>
                    </h6>
                    <h5>{{item.curriculum_title}}</h5>
                    <div class="income_info">
                      <span>{{item.time}}</span>
                      <p>消费：¥{{item.type == 1?"+":"-"}}{{item.price}}</p>
                    </div>
                  </li>
                </ul>
              </cube-scroll>
              <no-data v-else tip-text="暂无记录"></no-data>
            </cube-slide-item>
            <!-- 推荐 -->
            <cube-slide-item>
              <cube-scroll :options="scrollOptions" v-if="list_2.length>0">
                <ul class="list-wrapper income_list">
                  <li v-for="(item,i) in list_2" :key="i">
                    <h6>
                      <span>分销者：{{item.name}}</span>
                      <span>购买者：{{item.nickname}}</span>
                    </h6>
                    <h5>{{item.curriculum_title}}</h5>
                    <div class="income_info">
                      <span>{{item.time}}</span>
                      <p>消费：¥{{item.type == 1?"+":"-"}}{{item.price}}</p>
                    </div>
                  </li>
                </ul>
              </cube-scroll>
              <no-data v-else tip-text="暂无记录"></no-data>
            </cube-slide-item>
            <cube-slide-item>
              <cube-scroll :options="scrollOptions" v-if="list_3.length>0">
                <ul class="list-wrapper income_list">
                  <li v-for="(item,i) in list_3" :key="i">
                    <h6>
                      <span>分销者：{{item.name}}</span>
                      <span>购买者：{{item.nickname}}</span>
                    </h6>
                    <h5>{{item.curriculum_title}}</h5>
                    <div class="income_info">
                      <span>{{item.time}}</span>
                      <p>消费：¥{{item.type == 1?"+":"-"}}{{item.price}}</p>
                    </div>
                  </li>
                </ul>
              </cube-scroll>
              <no-data v-else tip-text="暂无记录"></no-data>
            </cube-slide-item>
          </cube-slide>
        </div>
      </div>
    </scroll-page>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import { RetailApi } from "@/api/retail";
@MyComponent({
  components: {}
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
  list_1: any[] = [];
  list_2: any[] = [];
  list_3: any[] = [];
  limit: number = 10;
  page_1: number = 1;
  page_2: number = 1;
  page_3: number = 1;
  totalPage: number = 0;
  totalPage_2: number = 0;
  totalPage_3: number = 0;
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
  changePage(current: number) {
    this.selectedLabel = this.tabLabels[current].label;
    console.log(current);
  }

  loadMore(scroll: any, api: any): void {
    if (this.initialIndex == 1) {
      this.page_1 = this.page_1 + 1;
      if (this.page_1 <= this.totalPage) {
        this.getList_1(this.page_1);
      } else {
        scroll.forceUpdate();
      }
    } else if (this.initialIndex == 2) {
      this.page_2 = this.page_2 + 1;
      if (this.page_2 <= this.totalPage_2) {
        this.getList_2(this.page_2);
      } else {
        scroll.forceUpdate();
      }
    } else {
      this.page_3 = this.page_3 + 1;
      if (this.page_3 <= this.totalPage_3) {
        this.getList_3(this.page_3);
      } else {
        scroll.forceUpdate();
      }
    }
  }
  getList_1(page: number = 1, limit: number = this.limit) {
    let data = { level: 1, page, limit };
    RetailApi.income(data).then((res: any) => {
      if (page == 1) {
        this.list_1 = res.data;
        this.totalPage = res.total_page;
      } else {
        this.list_1 = this.list_1.concat(res.data);
      }
    });
  }
  getList_2(page: number = 1, limit: number = this.limit) {
    let data = { level: 2, page, limit };
    RetailApi.income(data).then((res: any) => {
      if (page == 1) {
        this.list_2 = res.data;
        this.totalPage = res.total_page;
      } else {
        this.list_2 = this.list_2.concat(res.data);
      }
    });
  }
  getList_3(page: number = 1, limit: number = this.limit) {
    let data = { level: 3, page, limit };
    RetailApi.income(data).then((res: any) => {
      if (page == 1) {
        this.list_3 = res.data;
        this.totalPage_3 = res.total_page;
      } else {
        this.list_3 = this.list_3.concat(res.data);
      }
    });
  }
  scroll(pos: any) {
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

  get initialIndex() {
    let index = 0;
    index = this.$util.findIndex(
      this.tabLabels,
      (item: any) => item.label === this.selectedLabel
    );
    return index;
  }
  created() {
    this.getList_1();
    this.getList_2();
    this.getList_3();
  }
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/person/income.less");
</style>