<template>
    <div class="common_record wrap">
        <img :src="imgPre+item.img" alt="">
        <div class="lesson_info">
            <h4>{{item.title}}</h4>
            <p>2018年12月25日</p>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractBaseVueMixins,{MyComponent,MyProp} from "@/util/AbstractBaseVue";
@MyComponent
export default class LessonRecord extends AbstractBaseVueMixins {
    @MyProp() private item!: any;
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../assets/css/common/common.less');
    .common_record{
        display: flex;
        align-items: top;
        box-sizing: border-box;
        padding:12px 15px;
        background: #fff;
        border-radius: 2px;
        border:#FC5E64 solid 0.5px;
        margin-top: 15px;
        img{
            width: 75px;
            height: 50px;
        }
        .lesson_info{
            width: 250px;
            margin-left: 10px;
            h4{
                font-size: 16px;
                color: #000;
                line-height: 1.4;
                .ellipsis;
            }
            p{
                font-size: 14px;
                color: #999;
                line-height: 1.6;
            }
        }
    }
    
</style>
