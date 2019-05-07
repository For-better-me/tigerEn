<!--  -->
<template>
  <div class="scroll_page">
    <cube-scroll
      ref="scroll"
      :options="options"
      :data="scrollData"
      @pulling-down="refresh"
      @pulling-up="loadMore"
      class="scroll_div"
    >   
        <slot name="content"></slot>
    </cube-scroll>
  </div>
</template>

<script  lang="ts">
import AbstractBaseVueMixins,{MyComponent,MyProp,MyEmit,MyWatch} from "@/util/AbstractBaseVue";
@MyComponent
export default class scrollPage extends AbstractBaseVueMixins {
    @MyProp({default:false,required:false}) pullDownRefresh !: boolean;
    @MyProp({default:true,required:false}) pullUpLoad !: boolean;
    @MyProp({required:false}) scrollData !: any[];
    @MyProp({
        type:Function,
        required:false,
        default:()=>{
        }
    }) pullingDown !: Function;
    @MyProp({
        type:Function,
        required:false
    }) pullingUp !: ()=>{};

    loadMore(){
        this.$emit('pullingUp',this.$refs.scroll)
        console.log('loadMore')
    }
    refresh(){
        this.$emit('pullingDown',this.$refs.scroll)
        console.log('refresh')
    }
    // @MyEmit('PullingUp') 
    // PullingUp2()
    
    options:any = {
        pullDownRefresh: this.pullDownRefresh?{
            threshold: 60,
            stopTime:600,
            txt:'刷新成功'
        }:false,
        pullUpLoad: this.pullUpLoad?{
            threshold: 60,
            txt: {
                more: "上拉加载更多",
                noMore: "— 这是我的底线了 —"
            }
        }:false
    };
    created() {}
    mounted() {
        // console.log(this.options)
    }
}
</script>
<style lang='less' scoped>
    .scroll_div{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: #f8f8f8;
    }
</style>