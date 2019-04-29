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
}
Vue.use(Vuex)

let user: userParams = {}
export default new Vuex.Store({
  state: {
    user: user
  },
  mutations: {
    SET_USERINFO: (state, info) => {
      state.user = info
    }
  },
  actions: {
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        UserApi.getUser().then((response: any) => {
          commit('SET_USERINFO', response.data);
          resolve(response);
        }).catch((error: any) => {
          reject(error);
        });
      });
    },
  }
})
