import request from '@/utils/request'

export default {
  createNativeCode(orderNo) {
    return request({
      url: '/eduOrder/payLog/createNativeCode/' + orderNo,
      method: 'get'
    })
  },
  queryPayStatusByOrderNo(orderNo) {
    return request({
      url: '/eduOrder/payLog/queryPayStatus/' + orderNo,
      method: 'get'
    })
  }
}
