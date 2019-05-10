<template>
  <div class="no_data">
    <img src="../assets/img/no_data.png" alt="">
    <p>{{tipText}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NoData extends Vue {
  @Prop() private tipText!: string;
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import url('../assets/css/common/common.less');
    .no_data{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        img{
            width: 120px;
            display: block;
            margin: 40% auto;
            margin-bottom: 30px;
        }
        p{
            font-size:16px;
            color:#999;
            text-align: center;
            margin-top: 20px;
        }
    }
</style>
