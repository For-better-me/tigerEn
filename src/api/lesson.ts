import Vue from 'vue'
import http ,{RequestOptions} from '../util/myAxios'
export class LessonApi {
    public static hotLesson:any = (data?:{},params?:{})=>{
        return  http({
            url:'Info/getInfoList'
        })
    }
    public static lessonList:any = (data?:{},params?:{})=>{
        return  http({
            url:'Curriculum/getList',
            method:'post',
            data
        })
    }
    public static lessonBrief:any = (data?:{},params?:{})=>{
        return  http({
            url:'Curriculum/getWeek',
            method:'post',
            data
        })
    }
    public static lessonInfo:any = (data?:{},params?:{})=>{
        return  http({
            url:'Curriculum/getDaysInfo',
            method:'post',
            data
        })
    }
}
