import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: '没有的别想了',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1请求拦截的作用
  // instance.interceptors.request.use(config => {
  //   return config
  // }, err => {
  //   console.log(err);
  // })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 发送真正的请求
  return instance(config)
}