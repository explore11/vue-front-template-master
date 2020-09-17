import request from '@/utils/request'

export default {
  // 根据视频小结id获取凭证
  getVideoPlayAuth(videoSourceId) {
    return request({
      url: `/eduVideo/video/getVideoPlayAuth/${videoSourceId}`,
      method: 'get'
    })
  }
}
