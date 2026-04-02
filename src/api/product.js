import request from '@/utils/request'

// 获取搜索商品列表的数据
export const getProductList = (obj) => {
  const { categoryId, goodsName, pages } = obj
  return request({
    url: '/goods/list',
    method: 'get',
    params: {
      categoryId,
      goodsName,
      pages
    }
  })
}
// 获取商品详情的数据
export const getProductDetail = (goodsId) => {
  return request({
    url: '/goods/detail',
    method: 'get',
    params: {
      goodsId
    }
  })
}
// 获取商品评价的数据
export const getProductComment = (goodsId, limit) => {
  return request({
    url: '/comment/listRows',
    method: 'get',
    params: {
      goodsId,
      limit
    }
  })
}
