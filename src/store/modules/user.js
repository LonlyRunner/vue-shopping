import { getInfo, setInfo } from '@/utils/storage'

const state = {
  userInfo: getInfo() // ✅ 从本地取
}

const mutations = {
  // ✅ ESLint 必须加空格
  setUserInfo (state, info) {
    state.userInfo = info
    setInfo(info) // ✅ 存到本地
  }
}

const actions = {
  logout (context) {
    context.commit('setUserInfo', { userId: '', token: '' })
    context.commit('cart/setCartList', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
