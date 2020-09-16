import request from '@/utils/request'

export default {
  getTeacherPageListByFront(currentPage, limit) {
    return request({
      url: `/eduService/eduTeacher/getTeacherPageListByFront/${currentPage}/${limit}`,
      method: 'get'
    })
  },
  getTeacherDetail(teacherId) {
    return request({
      url: `/eduService/eduTeacher/getTeacherDetail/${teacherId}`,
      method: 'get'
    })
  }

}
