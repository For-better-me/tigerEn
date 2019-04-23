import Vue from 'vue'
import http ,{RequestOptions} from '../util/myAxios'
export class LessonApi {
    public static hotLesson:any = (self:Vue,data:any)=>{
        console.log(self)
        return  http({
            url:'Info/getInfoList'
        },self)
    }
}