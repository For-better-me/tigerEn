import Vue from 'vue'
import http ,{RequestOptions} from '../util/myAxios'
export class RetailApi {
    public static apply:any = (data?:{},params?:{})=>{
        return  http({
            url:'Apply/addRetail',
            method:'post',
            data
        })
    }
}
