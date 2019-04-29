import Vue from 'vue'
import http ,{RequestOptions} from '../util/myAxios'
export class UserApi {
    public static apply:any = (data?:{},params?:{})=>{
        return  http({
            url:'Apply/addRetail',
            method:'post',
            data
        })
    }
    public static sms:any = (data?:{},params?:{})=>{
        return  http({
            url:'Sms/sendSms',
            method:'post',
            data
        })
    }
    public static getUser:any = (data?:{},params?:{})=>{
        return  http({
            url:'/user/getUserInfo',
            method:'post',
            data
        })
    }
    public static login:any = (data?:{},params?:{})=>{
        return  http({
            url:'user/wechatLoginCallback',
            method:'get',
            data,
            params
        })
    }
}
