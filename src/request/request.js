import axios from 'axios'
// 配置项
const axiosOption={
  baseUrl:'',
  timeout:5000
}
// 创建单个实例
const instance=axios.create(axiosOption)

// 添加请求拦截器
instance.interceptors.request.use(function(config){
  return config
},function(error){
  // 处理请求错误
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function(response){
  return response.data
},function(error){
  return Promise.reject(error)
})

export default instance
