<!--  -->
<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import AbstractBaseVueMixins, { MyComponent,MyProp,MyWatch } from "@/util/AbstractBaseVue";
@MyComponent({
  components: {}
})
export default class Slider extends AbstractBaseVueMixins {
  btnWidth:number = 0
  touchInfo :any ={
    initiated: false
  }
  @MyProp({type: Number,default: 0}) percent!:number
  @MyProp() percentChange!:Function
 
   // 点击按钮
      progressTouchStart(e:any) {
        // 记录touch事件已经初始化
        this.touchInfo.initiated = true
        // 点击位置
        this.touchInfo.startX = e.touches[0].pageX
        // 点击时进度条长度
        this.touchInfo.left =( this.$refs.progress as HTMLElement).clientWidth
      }
      // 开始移动
      progressTouchMove(e:any) {
        if (!this.touchInfo.initiated) {
          return
        }
        // 计算移动距离
        const moveX = e.touches[0].pageX - this.touchInfo.startX
        // 设置偏移值
        const offsetWidth = Math.min(Math.max(0, this.touchInfo.left + moveX),
          (this.$refs.progressBar as HTMLElement).clientWidth - this.btnWidth)
        this._setOffset(offsetWidth)
      }
      // 移动结束
      progressTouchEnd(e:any) {
        this.touchInfo.initiated = false
        // 向父组件派发事件,传递当前百分比值
        this._triggerPercent()
      }
      // 进度条点击事件
      progressClick(e:any) {
        console.log('clikc')
        // 设置进度条及按钮偏移
        this._setOffset(e.offsetX)
        // 通知父组件播放进度变化
        this._triggerPercent()
      }
      _triggerPercent() {
        const barWidth =(this.$refs.progressBtn as HTMLElement).clientWidth - this.btnWidth
        const percent = Math.min(1, (this.$refs.progress as HTMLElement).clientWidth / barWidth)
        this.$emit('percentChange', percent)
      }
      // 设置偏移
      _setOffset(offsetWidth:any) {
        // 设置进度长度随着百分比变化
        (this.$refs.progress as HTMLElement).style.width = `${offsetWidth}px`;
        (this.$refs.progressBtn as HTMLElement).style.transform = `translate3d(${offsetWidth}px, 0, 0)`
      }
    @MyWatch('percent')
    watchPercent(newPercent:number, oldPercent:number){
      if (newPercent > 0 && !this.touchInfo.initiated) {
          // 进度条总长度
          const barWidth = (this.$refs.progressBar as HTMLElement).clientWidth - this.btnWidth
          const offsetWidth = barWidth * newPercent
          // 设置进度条及按钮偏移
          this._setOffset(offsetWidth)
      }
    }
    
}
</script>
<style lang='less' scoped>
.progress-bar, .bar-inner {
  position: relative;
  height: 1px;
  background: rgba(0, 0, 0, 0.3);

  .progress {
    position: absolute;
    height: 100%;
    background:#FC5E64;
  }

  .progress-btn-wrapper {
    position: absolute;
    left: -0.25rem;
    top: -0.25rem;
    width: 0.5rem;
    height: 0.5rem;

    .progress-btn {
      position: relative;
      top: 5px;
      left: 0px;
      box-sizing: border-box;
      width: 10px;
      height: 10px;
      border: 3px solid #FC5E64;
      border-radius: 50%;
      background: #fff;
    }
  }
}
</style>