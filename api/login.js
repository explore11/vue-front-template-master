import request from '@/utils/request'

export default {
  submitLoginUser(userInfo) {
    return request({
      url: '/eduUcenter/uCenterMember/login',
      method: 'post',
      data: userInfo
    })
  },

  getUserInfoByToken() {
    return request({
      url: '/eduUcenter/uCenterMember/getMemberInfoByToken',
      method: 'get'
    })
  }
}
