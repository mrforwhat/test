import axios from "axios"
// import configs from '@/config/merchant.js'
import qs from 'querystring'

axios.defaults.baseURL = process.env.VUE_APP_DOYOO_URL

axios.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem(`jwt`)
    let merchantId = localStorage.getItem(`merchantId`)
        if (token) {
          config.headers.Authorization = token
          config.headers.merchantId = merchantId
        }
        config.headers.HostName = location.hostname
    return config
  },
  function (error) {
    // console.log("request error:" + error)
    return Promise.resolve({
      code: "-1",
      msg: "请求失败,请检查网络:" + error
    })
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    let data = response.data
    if (!data) {
      alert("返回数据异常")
    }

    if (data.status === 403) {
      localStorage.clear()
      // goLogin()
    }
    // 用户已登录，但是身份不匹配,跳转至首页
    if (data.status === 407) {
      location.replace(`${window.location.protocol}//${window.location.host}/#/`)
    }
    if (data) {
      return data
    }
    return response
  },
  function (error) {
    console.log('response error:' + error)
    return Promise.resolve({
      status: 500,
      error: error
    })
  }
)

let request = {}
request.install = function (Vue) {
  Vue.prototype.$get = axios.get
  Vue.prototype.$post = axios.post
}
request.get = axios.get
request.post = axios.post

export async function goLogin() {
  let thirdParam = sessionStorage.getItem('thirdParam')
  let param = {}
  if(thirdParam) {
    param = JSON.parse(thirdParam)
  }
  let rs = await request.post('/auth/free_login', {
    tel: param.tel,
    nickName: param.nickName,
    appId: param.appId,
    sign: param.sign
  })
  if(rs.status === 200) {
    localStorage.setItem('merchantId',rs.payload.merchantId)
    localStorage.setItem('jwt',rs.payload.jwt)
    localStorage.setItem('cust',JSON.stringify(rs.payload.custom))
    let queryStr = ''
    let targetUrl = ''
    queryStr = qs.stringify(param)
    targetUrl = `${window.location.protocol}//${window.location.host}/#/?${queryStr}`
    if(targetUrl === location.href) {
      location.reload()
    }else {
      location.replace(targetUrl)
    }
  }else {
    alert('登录失败')
  }
}
//
// export function gotoAuth () {
//   let path = qs.parse(location.search.replace('?',''))
//   let newpath = {}
//   // 过滤掉search中的code
//   Object.keys(path).forEach(item=>{
//     if(item === 'code') {
//       return true
//     }
//     newpath[item] = path[item]
//   })
//   let temppath = qs.stringify(newpath)
//   if(temppath){
//     temppath = '?' + temppath
//   }
//   let callbackurl = `${window.location.protocol}//${window.location.host}/${temppath}${location.hash}`
//   // let curUrl = encodeURIComponent(location.href);
//   let curUrl = encodeURIComponent(callbackurl);
//   location.replace(`${window.location.protocol}${process.env.VUE_APP_URL}/customer/oauth/login?merchantId=${configs.merchantId}&callbackUrl=${curUrl}`)
// }
export default request
