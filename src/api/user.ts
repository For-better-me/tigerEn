import Vue from 'vue'
import http ,{RequestOptions} from '../util/myAxios'
export class UserApi {
    public static apply(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'Apply/addRetail',
            method:'post',
            data
        })
    }
    public static sms(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'Sms/sendSms',
            method:'post',
            data
        })
    }
    public static getUser(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'/user/getUserInfo',
            method:'post',
            data
        })
    }
    public static login(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'user/wechatLoginCallback',
            method:'get',
            data,
            params
        })
    }
}
