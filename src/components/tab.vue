<template>
  <div class="tab">
    <ul>
        <li :class="index== '1'?'on':''">
            <router-link tag='a' :to="'/'" >
                <img src="../assets/img/bg_card.png" alt="">
                <p>首页</p>
            </router-link>
        </li>
        <li :class="index== '2'?'on':''">
            <router-link tag='a' :to="'/lesson'" >
                <img src="../assets/img/bg_card.png" alt="">
                <p>课程</p>
            </router-link>
        </li>
        <li :class="index== '3'?'on':''">
            <router-link tag='a' :to="'/person'" >
                <img src="../assets/img/bg_card.png" alt="">
                <p>我的</p>
            </router-link>
        </li>
    </ul>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private index!: number;
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../assets/css/common/common.less');
    .tab{
        .border_1px(top);
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 49px;
        left: 0;
        background: #fff;
        z-index: 999;
        ul{
            width: 230px;
            display: -webkit-flex;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin:0 auto;
            margin-top: 9px;
            li{
                img{
                    width: 20px;
                }
                p{
                    font-size: 10px;
                    color: #CDCDCD;
                    text-align: center;
                    margin-top: 4px;
                }
                &.on{
                    p{
                        color: #FC5E64;
                    }
                }
            }
        }

    }
</style>
