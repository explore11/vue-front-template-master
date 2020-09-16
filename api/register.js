import request from '@/utils/request'

export default {
  getValidatorCode(phone) {
    return request({
      url: '/eduSms/message/sendMessage/' + phone,
      method: 'get'
    })
  },

  registerUser(registerVO) {
    return request({
      url: '/eduUcenter/uCenterMember/register',
      method: 'post',
      data: registerVO
    })
  }
}
