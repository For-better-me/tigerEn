<template>
  <div class="common_feature">
      <scroll-page @pullingUp="loadMore" :scrollData="list"  v-if='list.length>0 && false'>
        <div slot="content" class="wrap content">
          <lesson v-for="item in list" :key="item.id" :item="item"></lesson>
        </div>
      </scroll-page>
      <no-data v-else :tip-text='noDataTip'></no-data>
  </div>
</template>

<script lang="ts">
import AbstractBaseVue, { MyComponent, MyMixins } from "@/util/AbstractBaseVue";
import lesson from "@/components/baseRecordL.vue";
import { LessonApi } from "@/api/lesson";
import { FeatureMinix } from "@/util/mixins";
@MyComponent({
  components: { lesson }
})
export default class LessonRecord extends AbstractBaseVue.Mixins(FeatureMinix) {
  // data
  noDataTip:string = ''
  // method
  init() {
    const type: any = this.$route.params.type;
    document.title = type == 1 ? "我的课程" : "浏览记录";
    this.noDataTip =  type == 1 ? "还没有购买课程哦~" : "还没有浏览记录哦~";
    if (type == 1) {
      //我的课程
      this.getList(LessonApi.lessonMy);
    } else {
      //浏览记录
      this.getList(LessonApi.lessonRecord);
    }
  }
  created() {
    this.init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url("../../assets/css/home/common_feature.less");
</style>
