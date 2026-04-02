import request from '@/utils/request'

// 获取地址列表
export function getAddressList () {
  return request({
    url: '/address/list',
    method: 'get'
  })
}
