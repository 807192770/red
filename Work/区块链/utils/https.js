import axios from "axios";
import { Message } from "element-ui";
import qs from 'qs'
// import { getToKen, getUserName } from "@/utils/app";

const service = axios.create({
  // baseURL: BASEURL,
  // baseURL: 'http://192.168.105.197:9696',
  baseURL: 'http://10.20.23.30:9696',
  timeout: 15000,   // 超时
});
/**
 * 请求接口前，做一些数据处理（请求拦截器）
 */
service.interceptors.request.use(function (config) {
  // config.headers['Tokey'] = getToKen()
  // config.headers['UserName'] = getUserName()
  if (config.method == 'post') {
    // config.data = qs.stringify(config.data);
  }
  const token = window.localStorage.getItem('TOKEN')
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


/**
 * 请求接口后，返回数据进行拦截（响应拦截器）
 */
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response.data;
  // 业务需求
  return data;
  /** 
   *
     if (data.resCode !== 0) {
       Message.error(data.message);
       return Promise.reject(data);
     } else {
       return response;
       // return Promise.reject(data);
     }
   */

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service;

