import Vue from 'vue'
import http, { RequestOptions } from '../util/myAxios'
export class UserApi {
    public static apply(data?: {}, params?: {}): Promise<any> {
        return http({
            url: 'Apply/addRetail',
            method: 'post',
            data
        })
    }
    public static fillInfo(data?: {}, params?: {}): Promise<any> {
        return http({
            url: 'Binduser/bindMeans',
            method: 'post',
            data
        })
    }
    public static sms(data?: {}, params?: {}): Promise<any> {
        return http({
            url: 'Sms/sendSms',
            method: 'post',
            data
        })
    }
    public static getUser(data?: {}, params?: {}): Promise<any> {
        return http({
            loading: false,
            url: '/user/getUserInfo',
            method: 'post',
            data
        })
    }
    public static login(params?: {}, data?: {}): Promise<any> {
        return http({
            url: 'user/wechatLoginCallback',
            method: 'get',
            params
        })
    }
    public static withdraw(params?: {}, data?: {}): Promise<any> {
        return http({
            url: '/Withdraw/extract',
            method: 'post',
        })

    }
    public static getConfig(data?: {}, params?: {}): Promise<any> {
        return http({
            loading: false,
            url: 'Share/getShareConfig',
            method: 'post',
            data
        })
    }

}
