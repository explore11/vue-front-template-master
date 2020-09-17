import request from '@/utils/request'

export default {
  getPageListByFront(currentPage, limit, queryCourse) {
    return request({
      url: `/eduService/eduCourse/getPageListByFront/${currentPage}/${limit}`,
      method: 'post',
      data: queryCourse
    })
  },
  // 获取课程二级分类
  getAllSubject() {
    return request({
      url: `/eduService/eduSubject/getAllSubjectByOneAndTwo`,
      method: 'get'
    })
  },
  getCourseDetails(courseId) {
    return request({
      url: `/eduService/eduCourse/getFrontCourseDetails/${courseId}`,
      method: 'get'
    })
  }
}
