import request from '@/utils/request'

// 订单结算
export const checkOrder = (mode, obj) => {
  return request({
    url: '/checkout/order',
    method: 'get',
    params: {
      mode,
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}
// 提交订单
export const submitOrder = (mode, obj) => {
  return request({
    url: '/checkout/submit',
    method: 'post',
    params: {
      mode,
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      payType: 10,
      ...obj
    }
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request({
    url: '/order/list',
    method: 'get',
    params: {
      dataType,
      page
    }
  })
}
