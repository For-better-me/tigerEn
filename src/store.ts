import Vue from 'vue'
import Vuex from 'vuex'
import {UserApi} from '@/api/user'
interface userParams {
  id?: number | string,
  nickname?: string,
  name?: string,
  groupid?: number | string,
  reg_time?: any,
  avatar?: string,
  last_login_time?: any,
  [propName: string]: any;
}
Vue.use(Vuex)

let user: userParams = {
 
}
let route:any[] = []
export default new Vuex.Store({
  state: {
    user: user,
    route:route
  },
  getters:{
    userInfo(state){
      if(state.user){
        return state.user
      } else{
        return JSON.parse(sessionStorage.userInfo)
      }
     
    },
    list(state){
      return state.route
     
    }
  },
  mutations: {
    SET_USERINFO: (state, info) => {
      state.user = info
    },
    SET_LIST: (state, info) => {
      state.route.push(info)
    }
  },
  actions: {
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        UserApi.getUser().then((response: any) => {
          commit('SET_USERINFO', response.data);
          sessionStorage.userInfo = JSON.stringify(response.data)
          resolve(response);
        }).catch((error: any) => {
          reject(error);
        });
      });
    },
  }
})
