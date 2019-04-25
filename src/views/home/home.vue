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
            <li v-for='(item,i) in list' :key='item.id'>
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
  items: object[] = [];
  list: object[] = [];
  totalPage:number = 0
  limit:number =  1
  page:number = 1
  loadMore(scroll:any) {
      if(this.page<this.totalPage){
        this.page++
        this.getList(this.page)
      } else{
        scroll.forceUpdate();
      }
      
  }
  getList(page:number = 1,limit:number=this.limit){
    let data = {page,limit}
    LessonApi.hotLesson(data).then(res=>{
      console.log(this)
      if(page == 1){
        this.list = res.data
        this.totalPage = res.total_page
      } else{
        this.list = this.list.concat(res.data)
      }
      console.log(this.list,333333333,res)
      
    })
  }
  mounted(){
    this.getList()
  }
}
</script>
<style <style lang="less" scoped>
@import url("../../assets/css/home/home.less");
</style>


