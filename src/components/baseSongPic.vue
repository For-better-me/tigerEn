<template>
    <div class="common_song"  @click='goDetail(item.id)'>
        <div class="poster">
            <img :src="imgPre+item.img" alt="">
        </div>
        <h4>{{item.title}}</h4>
        <div class="text">
            <span>{{item.time}}</span>
            <img src="../assets/img/icon_eye.png" alt="">
            <span>{{item.hits}}</span>
        </div>
        
    </div>
</template>

<script lang="ts">
import AbstractBaseVueMixins,{MyComponent,MyProp} from "@/util/AbstractBaseVue";
@MyComponent
export default class LessonRecord extends AbstractBaseVueMixins {
    @MyProp() item!: any;
    @MyProp({type:Function}) infoEvent!: ()=>{};

    goDetail(id:string|number){
        this.$emit('infoEvent',id)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../assets/css/common/common.less');
    .common_song{
        width: 165px;
        margin-left: 15px;
        margin-top: 15px;
        float: left;
        .poster{
            width: 165px;
            height: 110px;
            overflow: hidden;
            img{
                width:100%;
                min-height: 110px;
            };
        }
        h4{
            font-size: 14px;
            color: #333;
            margin-top: 10px;
            margin-bottom: 6px;
            .ellipsis;
        }
        .text{
            display: flex;
            align-items: center;
            span{
                font-size: 12px;
                color: #A6A6A6;

            }
            img{
                width: 15px;
                height: 15px;
                margin-left: 10px;
                margin-right: 4px;
                display: block;
            }
        }

    }
    
</style>
