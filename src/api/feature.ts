import Vue from 'vue'
import http ,{RequestOptions} from '../util/myAxios'
export class SongApi {
    public static list(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'rhymes/getList',
            method:'post',
            data
        })
    }
    public static detail(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'rhymes/getInfo',
            method:'post',
            data
        })
    }
}
export class WordApi {
    public static list(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'Wordcard/getList',
            method:'post',
            data
        })
    }
    public static pageViews(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'Wordcard/getInfo',
            method:'post',
            data
        })
    }
}
export class CartoonApi {
    public static list(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'Animation/getList',
            method:'post',
            data
        })
    }
    public static pageViews(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'Animation/getInfo',
            method:'post',
            data
        })
    }
}
export class PictureApi {
    public static list(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'Painting/getList',
            method:'post',
            data
        })
    }
    public static detail(data?:{},params?:{}):Promise<any>{
        return  http({
            url:'/Painting/getInfo',
            method:'post',
            data
        })
    }
}
