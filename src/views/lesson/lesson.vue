<template>
  <div class="lesson">
    <scroll-page @pullingUp='loadMore' :scrollData='list'>
      <div slot="content"  class='wrap content'>
        <item-lesson text='课程' v-for='item in list' :key='item.id' :item = 'item'></item-lesson>
      </div>
      
    </scroll-page>
    
    <tab index='2'></tab>
  </div>
</template>

<script lang="ts">
import AbstractBaseVue,{MyComponent} from "@/util/AbstractBaseVue";
import tab from "@/components/tab.vue";
import itemLesson from '@/components/baseLesson.vue'
import {LessonApi} from '@/api/lesson'
import {FeatureMinix} from "@/util/mixins";
@MyComponent({
  components: {
    tab,itemLesson
  }
})
export default class lesson extends AbstractBaseVue.Mixins(FeatureMinix) {
  
  created(){
	  this.getList(LessonApi.lessonList)
  }
}
</script>
<style scoped lang="less">
    @import url('../../assets/css/home/common_feature.less');
    
</style>


