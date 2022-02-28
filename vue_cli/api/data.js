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

///////////////////////账号///////////////////////

//登录
export const postLogin = (param) => {//这个接口名称需要改
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/account/login',
    method: 'post',
    data: param
  })
  // return axios.post('http://www.muzi.fun:5678/api/v1/account/login'
  //   , param, {
  //   headers: {
  //     "Authorization": localStorage.getItem("token")
  //   }
  // })
}
//添加账号
/*
Body:
{
    "username": "cook0",
    "password": "123456",
    "position": 2,
    "avatarUrl": "https://portrait.gitee.com/uploads/avatars/user/2959/8878759_muzi-lh_1616823767.png!avatar200"
}
*/
export const addAccount = (param) => {//这个接口名称需要改
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/account',
    method: 'post',
    data: param
  })
}
//删除账号
/*
Body:
{
    "username": "test1"
}
*/
export const deAccount = (param) => {//这个接口名称需要改
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/account',
    method: 'DELETE',
    data: param
  })
}
//更改用户信息
/*
Body:
{
    "username": "manager0",
    "position": 0,
    "avatarUrl": "http://1122334.com/hello.png"
}
*/
export const chaAccount = (param) => {//这个接口名称需要改
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/account',
    method: 'PUT',
    data: param
  })
}
//获取帐号信息
/*
Body:
{
    "username": "manager0"
}
*/
export const getAccount = (param) => {//这个接口名称需要改
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/account',
    method: 'post',
    data: param
  })
}
//获取用户列表
/*
Body:
{
    "restaurantId":1
}
*/
export const getUserlist = () => {//这个接口名称需要改
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/account/list',
    method: 'post',
  })
}


//////////////////订单管理/////////////////////////
//创建新订单
/*
Body:
{
    "tableId": 10,
    "orderItems": [
        {
            "dishId": 4,
            "amount": 1,
            "note": ""
        },
        {
            "dishId": 5,
            "amount": 2,
            "note": "加一斤香菜"
        }
    ]
  
}
*/
export const createOrders = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/order',
    method: 'post',
    data: param
  })
}
//结账
/*
Body:
{
    "orderId": 8
}
*/
export const payOrders = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/order/checkout',
    method: 'post',
    data: param
  })
}
//获取当前进行中的订单
/*
无参数
*/
export const getCurrOrders = () => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/order/ongoing',
    method: 'post',
  })
}
//获取给定时间段内的订单
/*
Body:
{
    "from": 0,
    "to": 1745779979
}
*/

export const getGivenTimeOrders = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/order/range',
    method: 'post',
    data: param
  })
}
//////////////////////订单项///////////////////////////////
//获取未完成的订单项
/*
Body: None
*/
export const getNotFinishedOrders = () => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/order_item/uncompleted',
    method: 'post',
  })
}
//更新订单项
/*
Body:
{
    "id": 12,
    "dishId": 4,
    "state": 0,
    "amount": 1,
    "note": ""
}
*/
export const updateOrders = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/order_item',
    method: 'put',
    data: param
  })
}
// 取消订单项
/*
Body:
{
    "id": 0
}
*/
export const cancleOrders = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/order_item',
    method: 'DELETE',
    data: param
  })
}
///////////////////////菜品//////////////////////////

// 添加新菜品
/*
Body:
{
    "name": "阿根达斯",
    "price": 15,
    "imageUrl": "http://img.dllipin.com/img/p3.ssl.qhimgs1.com/t01a501e9f4eac513c3.jpg",
    "category": "甜点"
}
*/
export const addFood = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/dish',
    method: 'POST',
    data: param
  })
}

// 删除菜品
/*
Body:
{
    "id": 5
}
*/
export const deleteFood = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/dish',
    method: 'DELETE',
    data: param
  })
}

// 更新菜品信息
/*
Body:
{
    "id": 1,
    "name": "麻辣香锅",
    "price": 35,
    "imageUrl": "https://inews.gtimg.com/newsapp_bt/0/12051210429/1000",
    "category": "干锅"
}
*/
export const updateFood = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/dish',
    method: 'PUT',
    data: param
  })
}

// 获取当前帐号所属餐厅的所有菜品
/*
Body:none
*/
export const getAllFood = () => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/dish/list',
    method: 'post',
  })
}

//////////////////////文件///////////////////////////
//上传文件
/*
Body:见文档
*/
export const Upload = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/upload',
    method: 'post',
    data: param
  })
}
