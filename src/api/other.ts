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
    public static jsConfig(data?:{},params?:{}):Promise<any>{
        return  http({
            loading:false,
            url:'Share/getShareConfig',
            method:'post',
            data
        })
    }
    public static getCodeSpread(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'Code/getCodeImg',
            method:'post',
            data
        })
    }

    
}
export class AreaApi {
    public static getProvinceList(data?:{},params?:{}):Promise<any>{
        return  http({
            loading:false,
            url:'Area/getProvinceList',
            method:'post',
            data
        })
    }
    public static getCityList(data?:{},params?:{}):Promise<any>{
        return  http({
            loading:false,
            url:'Area/getCityList',
            method:'post',
            data
        })
    }
    public static getAreaList(data?:{},params?:{}):Promise<any>{
        return  http({
            loading:false,
            url:'Area/getAreaList',
            method:'post',
            data
        })
    }
    
}
