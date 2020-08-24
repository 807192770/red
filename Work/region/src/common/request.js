import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/common/auth'
import qs from 'qs'
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000, // request timeout
  // headers: {
  //   post: {        // can be common or any other method
  //     header1: 'value1'
  //   }
  // },
  transformRequest: [function (data) {
    // data.Authorization = getToken()
    if (data instanceof FormData) {
      return data
    }
    data = qs.stringify(data)
    return data
    
  }]
})
// request interceptor
// service.interceptors.request.use(
//   config => {
//     // Do something before request is sent
//     if (store.getters.token) {
//       // 让每个请求携带token-- ['X-Litemall-Admin-Token']为自定义key 请根据实际情况自行修改
//       config.headers['Authorization'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // Do something with request error
//     console.log(error) // for debug
//     Promise.reject(error)
//   }
// )

// response interceptor
service.interceptors.response.use(
  response => {
      return response
    // }
  }, error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  })

export default service
