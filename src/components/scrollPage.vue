<!--  -->
<template>
  <div class="scroll_page">
    <cube-scroll
      ref="scroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
      class="scroll_div"
    ></cube-scroll>
  </div>
</template>

<script  lang="ts">
import AbstractBaseVueMixins,{MyComponent,MyProp,MyEmit} from "@/util/AbstractBaseVue";
@MyComponent
export default class scrollPage extends AbstractBaseVueMixins {
    @MyProp({default:false}) pullDownRefresh !: boolean;
    @MyProp({default:true}) pullUpLoad !: boolean;
    options:any = {
        pullDownRefresh: this.pullDownRefresh?{
            threshold: 0,
            stopTime:600,
            txt:'刷新成功'
        }:false,
        pullUpLoad: this.pullDownRefresh?{
            threshold: 0,
            txt: {
                more: "Load more",
                noMore: "No more data"
            }
        }:false
    };
    created() {}
    mounted() {}
}
</script>
<style lang='scss' scoped>
    .scroll_div {
        position: absolute;
        left: 0;
        top: 0;
        height: 70%;
        width: 100%;
        background: #f8f8f8;
    }
</style>