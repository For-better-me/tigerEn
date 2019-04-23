import Vue from 'vue'
import http ,{RequestOptions} from '../util/myAxios'
export class LessonApi {
    public static hotLesson:any = (data?:{},params?:{})=>{
        return  http({
            url:'Info/getInfoList'
        },self)
    }
}