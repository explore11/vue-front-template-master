import request from '@/utils/request'

export default {
  getIndexData() {
    return request({
      url: '/eduService/index/getData',
      method: 'get'
    })
  }
}
