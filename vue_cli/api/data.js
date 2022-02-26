import axios from './axios'

// export const getMenu = () => {
//   return axios.request({
//     url: 'menu',
//     method: 'get'
//   })
// }

export const getHome = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}

export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}

export const getData = () => {
  return axios.request({
    url: '/home/getData'
  })
}

export const getMenu = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/account/login',
    method: 'post',
    data: param
  })
}