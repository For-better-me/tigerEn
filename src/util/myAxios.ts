import Vue from 'vue'
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import util from './utils'
import Toast from 'cube-ui'
import Vue2 from '../main'
import router from '../router/router';
// TODO 一些好用的类型声明
export interface BaseBean<T = any> {
    data: T;
    code: string | number;
    msg: string;
}

export interface RequestOptions {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    headers?: {};
    params?: {};
    data?: {};
    loading?: boolean
}

export type MyAxiosFunc = (option: RequestOptions) => AxiosPromise<BaseBean<any>>;


// 请求base url
// TODO 后来发现，凡是希望在打好的包中使用的  .evn 变量，都必须加上  VUE_APP_的开头
// axios.defaults.baseURL = process.env.CLIENT_BASE_API_URL;

// TODO 传入选项，创建axios实例
const axiosClient = axios.create({
    // baseURL: '/apis/api/',   // TIP API 的 BASE_URL
    baseURL: process.env.NODE_ENV == "development"?"/apis/api/":'https://www.tjitfw.com/api/',   // TIP API 的 BASE_URL
    timeout: 15000,        // TIP 请求的超时时间
    
});
var load:any
// TIP axios-request拦截器：在每个请求头中，都附带【token】，让后端对请求作出权限验证；
// request interceptor
axiosClient.interceptors.request.use((config) => {
            // TIP 对于【Request】的拦截。
    // Do something before request is sent
    if (config.url && config.url.indexOf('login') == -1) {
        if (localStorage.token != undefined) {              // TIP 从本地获取Token值。（若本地Token存在的话。）
            config.headers['token'] = localStorage.token; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        } else {
            // to login
        }
    }

    return config;
}, (error) => {   // TIP 若出错了，打印日志，Promise返回失败。
    console.log(error); // for debug
    Promise.reject(error);
});

// TIP axios-response拦截器：当服务端返回特殊的状态码，可以统一做处理。（比如，没权限、token失效，等等）
// axiosClient.interceptors.response.use(
//     // TIP 【Http-Status】，为【2xx】或【3xx】时。
//     (response:any) => {
//         console.log(`url--`, response.config.url)
//         console.log(`data--`, response.data)
        
        
//     },

//     // TIP 【Http-Status】，为【4xx】或【5xx】时。
//     (error:any) => {

//         // TIP 错误码为403的情况。（一般是没有权限访问。）
//         if (error.response.status === 403) {

//         }

//         return Promise.reject(error);

//     });

let _http = function (opt: RequestOptions):Promise<any> {
    return new Promise((resolve, reject) => {
        let defaultOpt: RequestOptions = {
            url:'',
            loading: true, // 是否显示Loading提示窗
            method: 'get', // 请求方法，必须大写！！
            data: {}, // 入参
            params:{},
            headers: {
                token:''
            }
        }
     
        opt = Object.assign({}, defaultOpt, opt)
        // load = util.showLoad()
        // if(opt.loading){
        //     load.show()
        // }
        axiosClient({
            url: opt.url,
            method: opt.method,
            data: opt.data,
            params: opt.params,
            headers: opt.headers,
        }).then((res:any)=>{
            // load.hide()
            if(res.data.code == 1001){
                router.push('/login')
                reject({
                    code: 1001,
                    msg: opt.url + '接口需要token参数，但系统中不存在token'
                })
            } else if(res.data.code == 0){
                resolve(res.data)
                console.log('请求成功',opt.url,res.data);
            }  else if(res.data.code == -1){
                util.showToast(res.data.msg,'error').show()
                reject(res.data)
            } else{
                reject(res.data)
            }
        }).catch(err=>{
            reject(err)
            console.log(err)
        })
    })


}

export default _http 
// export const myAxios: MyAxiosFunc = axiosClient as MyAxiosFunc;

