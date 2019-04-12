import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

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
}

export type MyAxiosFunc = (option: RequestOptions) => AxiosPromise<BaseBean<any>>;


// 请求base url
// TODO 后来发现，凡是希望在打好的包中使用的  .evn 变量，都必须加上  VUE_APP_的开头
// axios.defaults.baseURL = process.env.CLIENT_BASE_API_URL;

// TODO 传入选项，创建axios实例
const axiosClient = axios.create({
    baseURL: '',   // TIP API 的 BASE_URL
    timeout: 15000,        // TIP 请求的超时时间
});


// TIP axios-request拦截器：在每个请求头中，都附带【token】，让后端对请求作出权限验证；
// request interceptor
axiosClient.interceptors.request.use((config) => {            // TIP 对于【Request】的拦截。
    // Do something before request is sent
    if (sessionStorage.token != undefined) {              // TIP 从本地获取Token值。（若本地Token存在的话。）
        config.headers.Authorization = sessionStorage.token; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
}, (error) => {   // TIP 若出错了，打印日志，Promise返回失败。
    console.log(error); // for debug
    Promise.reject(error);
});

// TIP axios-response拦截器：当服务端返回特殊的状态码，可以统一做处理。（比如，没权限、token失效，等等）
axiosClient.interceptors.response.use(
    // TIP 【Http-Status】，为【2xx】或【3xx】时。
    (response) => {      
        const res = response.data;
        // TIP 判断，返回的结果，是否【业务成功】。
        if (res.code && res.code !== 0) {

                return Promise.reject(res);    // 不弹默认网络msg弹窗。
           

            // TIP 如果之前都没有Return。则在代码块的最后末尾，弹出【网络错误对话框】，并提示出错原因。
        

            return Promise.reject('error');    // 为网络请求的发起者，返回reject。

        } else {            // 【返回正常】的情况，则进行正常返回。

            // TIP 成功：判断res对象中，是否存在data这一字段。若有，则返回【data对象】；若无，则返回【原res对象】。
            if (typeof res.data !== 'undefined' && res.data != null) {
                return res.data;
            } else {
                return res;
            }

        }
    },

    // TIP 【Http-Status】，为【4xx】或【5xx】时。
    (error) => {

        // TIP 错误码为403的情况。（一般是没有权限访问。）
        if (error.response.status === 403) {
          
        }

        // TIP 不管是，或者不是403的情况，都一概，弹出Message，提示用户。
      

        // 此时，返回给业务层，视为【网络请求错误】
        return Promise.reject(error);

    });




export const myAxios: MyAxiosFunc = axiosClient as MyAxiosFunc;

