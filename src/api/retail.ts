import Vue from 'vue'
import http ,{RequestOptions} from '../util/myAxios'
export class RetailApi {
    public static apply(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'Apply/addRetail',
            method:'post',
            data
        })
    }
}
