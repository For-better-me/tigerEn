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
    public static info(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'user/showPrice',
            method:'post',
            data
        })
    }
    public static income(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'Profit/getList',
            method:'post',
            data
        })
    }
    public static getId(data?: {}, params?: {}): Promise<any> {
        return http({
            url: 'Distributionageing/showAgeing',
            method: 'post',
            data
        })
    }
    public static setId(data?: {}, params?: {}): Promise<any> {
        return http({
            url: 'Distributionageing/addAgeing',
            method: 'post',
            data
        })
    }
    public static getTip(): Promise<any> {
        return http({
            url: 'config/getcooperation',
            method: 'get'
        })
    }

}
