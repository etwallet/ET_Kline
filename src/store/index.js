import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

/*
 *  无模块归属的全局getters/actions/mutations
 */

// getters
const getters = {

}

// actions
const actions = {

}

// mutations
const mutations = {

}

export default new Vuex.Store({
  getters,
  actions,
  mutations,
  modules: {
    user
  }
})

