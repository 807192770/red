import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 5000 // 响应时间
axios.defaults.baseURL = '/devApi' // 配置接口地址

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('TOKEN')
  // if (token && token !== 'undefined') {
  //     config.headers = {
  //       'token': token,
  //     }
  //   }
  // 在发送请求之前做某件事
  if (config.method === 'get') {
    config.data = true
    console.log(config)
  }
  if (config.method === 'post' || config.method === 'put') {
    // config.data = qs.stringify(config.data);
    config.data = config.data
  }

  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (!res.data.success) {
    return Promise.resolve(res)
  }
  return res
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// 返回一个Promise(发送put请求)
export function fetchPut(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/// /返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: param,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/// /返回一个Promise(发送delete请求)
export function fetchDelete(url, param) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
        params: param,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  fetchPost,
  fetchPut,
  fetchGet,
  fetchDelete
}
