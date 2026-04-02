import { getCartList, changeCount, delSelect as delSelectAPI } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      if (goods) goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      if (goods) goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 确保数据格式正确
      if (data.list) {
        data.list.forEach(item => {
          item.isChecked = true
        })
        context.commit('setCartList', data.list)
      }
    },

    async changeCountAction (context, data) {
      const { goodsId, goodsNum, goodsSkuId } = data
      // 这里可以加一个乐观更新，先改界面，再请求接口，体验更好
      context.commit('changeCount', { goodsId, goodsNum })
      try {
        await changeCount(goodsId, goodsNum, goodsSkuId)
      } catch (error) {
        // 如果请求失败，回滚数据或者提示用户
        console.error('数量更新失败', error)
        context.dispatch('getCartAction') // 失败则重新拉取
      }
    },

    // 删除购物车数据
    async delSelect (context) {
      const selectedList = context.getters.selectedCartList

      // 防御性编程
      if (!selectedList || selectedList.length === 0) return

      const cartIds = selectedList.map(item => item.goods_id)

      // 过滤掉无效 ID
      const validIds = cartIds.filter(id => id)
      if (validIds.length === 0) return

      try {
        // 1. 调用API删除服务器数据
        await delSelectAPI(validIds)

        // 2. 立即从本地列表中移除选中的商品（优化用户体验，避免闪烁）
        const remainingList = context.state.cartList.filter(item => !item.isChecked)
        context.commit('setCartList', remainingList)

        // 3. 移除了 context.dispatch('getCartAction')
        // 原因：本地已经准确移除了数据，再次拉取会导致页面闪烁，且浪费请求
      } catch (error) {
        console.error('删除失败:', error)
        // 抛出错误让组件层处理（例如弹出提示）
        throw error
      }
    }
  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((pre, cur) => pre + cur.goods_num, 0)
    },
    selectedCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    selectedTotal (state, getters) {
      return getters.selectedCartList.reduce((pre, cur) => pre + cur.goods_num, 0)
    },
    selectedTotalPrice (state, getters) {
      return getters.selectedCartList.reduce((pre, cur) => pre + cur.goods.goods_price_min * cur.goods_num, 0).toFixed(2)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
