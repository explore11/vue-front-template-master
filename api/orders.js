import request from '@/utils/request'

export default {
  saveOrdersByCourseId(courseId) {
    return request({
      url: '/eduOrder/order/saveOrderInfo/' + courseId,
      method: 'post'
    })
  },
  getOrdersInfo(orderNo) {
    return request({
      url: '/eduOrder/order/getOrderInfoByOrderNo/' + orderNo,
      method: 'get'
    })
  }
}
