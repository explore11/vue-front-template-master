import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9001', // api的base_url
  timeout: 20000 // 请求超时时间
})

// 拦截器  设置token
service.interceptors.request.use(
  config => {
    if (cookie.get('guLi_token')) {
      config.headers['token'] = cookie.get('guLi_token')
    }
    return config
  },
  error => {
    return Promise.reject(err);
  }
)
export default service
