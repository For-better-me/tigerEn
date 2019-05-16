<template>
    <div class="lesson_info">
        <div class="common_box">
            <div class="common_tit"></div>
            <div class="common_con words">
                 <ul>
                     <li>
                         <img src="" alt="">
                         <div class="text">
                             <h4>手指</h4>
                             <p>finger</p>
                         </div>
                     </li>
                     <li>
                         <img src="" alt="">
                         <div class="text">
                             <h4>手指</h4>
                             <p>finger</p>
                         </div>
                     </li>
                 </ul>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
@MyComponent({
    components: {}
})
export default class LessonInfo extends AbstractBaseVue {
    mounted() {}
}
</script>
<style lang='less' scoped>
    .common_box{
        position: relative;
        padding: 15px;
        border-radius: 8px;
        box-sizing: border-box;
        background: #fff;
        .common_tit{
            margin:0 auto;
        }
        .common_con{
           
        }
    }
    .words{
        ul{
            li{
                width: 150px;
                height: 75px;
                box-sizing: border-box;
                border:#FC686D solid 0.7px;
                padding: 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                &:nth-of-type(odd){
                    margin-right: 0.3rem;
                }
                img{
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                }
                .text{
                    font-size: 0.28rem;
                    color: #333;
                }
            }
        }
    }
    // @import url("../../assets/css/.less");
</style>