import Vue from 'vue'
import http ,{RequestOptions} from '../util/myAxios'
export class SongApi {
    public static list:any = (data?:{},params?:{})=>{
        return  http({
            url:'ARhymes/getList',
            method:'post',
            data
        })
    }
    public static detail:any = (data?:{},params?:{})=>{
        return  http({
            url:'rhymes/getInfo',
            method:'post',
            data
        })
    }
}
export class WordApi {
    public static list:any = (data?:{},params?:{})=>{
        return  http({
            url:'Wordcard/getList',
            method:'post',
            data
        })
    }
    public static pageViews:any = (data?:{},params?:{})=>{
        return  http({
            url:'Wordcard/getInfo',
            method:'post',
            data
        })
    }
}
export class CartoonApi {
    public static list:any = (data?:{},params?:{})=>{
        return  http({
            url:'Animation/getList',
            method:'post',
            data
        })
    }
    public static pageViews:any = (data?:{},params?:{})=>{
        return  http({
            url:'Animation/getInfo',
            method:'post',
            data
        })
    }
}
export class PictureApi {
    public static list:any = (data?:{},params?:{})=>{
        return  http({
            url:'Painting/getList',
            method:'post',
            data
        })
    }
    public static detail:any = (data?:{},params?:{})=>{
        return  http({
            url:'/Painting/getInfo',
            method:'post',
            data
        })
    }
}
