<!--  -->
<template>
  <div class="scroll_page">
    <cube-scroll
      ref="scroll"
      :options="options"
      @pulling-down="PullingDown"
      @pulling-up="PullingUp2"
      class="scroll_div"
    >   
        <slot name="content"></slot>
    </cube-scroll>
  </div>
</template>

<script  lang="ts">
import AbstractBaseVueMixins,{MyComponent,MyProp,MyEmit} from "@/util/AbstractBaseVue";
@MyComponent
export default class scrollPage extends AbstractBaseVueMixins {
    @MyProp({default:false,required:false}) pullDownRefresh !: boolean;
    @MyProp({default:true,required:false}) pullUpLoad !: boolean;
    @MyProp({
        type:Function,
        required:false,
        default:()=>{}
    }) PullingDown !: Function;
    @MyProp({
        type:Function,
        required:false
    }) PullingUp !: ()=>{};

    PullingUp2(){
        this.$emit('PullingUp')
        console.log(3333)
    }
    // @MyEmit('PullingUp') 
    // PullingUp2()
    
    options:any = {
        pullDownRefresh: this.pullDownRefresh?{
            threshold: 0,
            stopTime:600,
            txt:'刷新成功'
        }:false,
        pullUpLoad: this.pullUpLoad?{
            threshold: 0,
            txt: {
                more: "Load more",
                noMore: "No more data"
            }
        }:false
    };
    created() {}
    mounted() {
        console.log(this.options)
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