import Vue from 'vue'
import http ,{RequestOptions} from '../util/myAxios'
export class otherApi {
    public static banner(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'Focus/getList',
            method:'get',
            data
        })
    }
}