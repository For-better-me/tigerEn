<template>
  <div class="introduction" v-if="lessonBrief">
    <img :src="imgPre+poster_img" alt class="poster">
    <div class="lesson_wrap">
      <div class="lesson_name">课程表</div>
      <div>
        <div v-for="(week,q) in lessonBrief" :key="week.id">
          <div class="part_week wrap">
            <ul>
              <li>
                <h2 @click="toggle(q)" ref='arrow_lesson'>{{week.title}}  <b></b></h2>
                <div ref="days_lesson" class="days_lesson">
                  <div
                    class="try_part wrap"
                    v-for="day in week._child"
                    :key="day.id"
                    @click="lessonRouter(day.id,1)"
                  >
                    <img :src="imgPre+day.img" alt>
                    <div class="try_word">
                      <h4>{{day.title}}</h4>
                      <P>{{day.desc}}</P>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script lang='ts'>
import AbstractBaseVue, { MyComponent } from "@/util/AbstractBaseVue";
import { LessonApi } from "@/api/lesson";
@MyComponent({
  components: {}
})
export default class LessonBrief extends AbstractBaseVue {
  lessonBrief: any = null;
  isOpen: boolean = false;
  tryList: any[] = [];
  poster_img:string = ''
  mounted() {
    this.init();
  }
  init() {
    let curriculum_id = this.$route.params.lessonId;
    LessonApi.lessonMyWeek({ curriculum_id }).then(res => {
      this.lessonBrief = res.data;
      this.poster_img = res.img;
    });
  }
 
  lessonRouter(id: number, type: number) {
    
    this.$router.push(`/detail/${id}/${type}`);
  }

  toggle(index: number) {
    let daysLesson = this.$refs.days_lesson as HTMLElement[]
    let arrowLesson = this.$refs.arrow_lesson as HTMLElement[]
    if (
      daysLesson[index].style.display == "block"
    ) {
      daysLesson[index].style.display = "none";
      this.$util.removeClass(arrowLesson[index],'on')
    } else {
      daysLesson[index].style.display = "block";
      this.$util.addClass(arrowLesson[index],'on')
    }
  }
 
}
</script>
<style lang='less' scoped>
@import url("../../assets/css/lesson/introduction.less");
.lesson_name{
    font-weight: 600;
}
</style>