import Vue from 'vue'
import http ,{RequestOptions} from '../util/myAxios'
export class LessonApi {
    public static  hotLesson = (data?:{},params?:{}):Promise<any>=>{
        return  http({
            url:'Info/getList',
            method:'get'
        })
    }
    public static lessonList = (data?:{},params?:{}):Promise<any>=>{
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
