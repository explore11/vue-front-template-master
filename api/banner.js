import request from '@/utils/request'

export default {
  getBannerList() {
    return request({
      url: '/eduCms/crmBannerFront/queryAllBanner',
      method: 'get'
    })
  }
}
