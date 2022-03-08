import axios from './axios'

// export const getMenu = () => {
//   return axios.request({
//     url: 'menu',
//     method: 'get'
//   })
// }

export const apiPrefix = 'http://www.muzi.fun:5678';
// export const apiPrefix = 'http://localhost:5678';

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
    url: `${apiPrefix}/api/v1/account/login`,
    method: 'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
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
    url: `${apiPrefix}/api/v1/account/add`,
    method: 'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
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
    url: `${apiPrefix}/api/v1/account/delete`,
    method: 'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
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
    url: `${apiPrefix}/api/v1/account/update`,
    method: 'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
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
export const changePassword = (param) => {//这个接口名称需要改
  return axios.request({
    url: `${apiPrefix}/api/v1/account/change_password`,
    method: 'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
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
    url: `${apiPrefix}/api/v1/account/get`,
    method: 'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
//获取用户列表
/*
Body:
{
    "restaurantId":1
}
*/
export const getUserlist = (param) => {//这个接口名称需要改
  return axios.request({
    url: `${apiPrefix}/api/v1/account/list`,
    method: 'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
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
export const addOrder = (param) => {
  return axios.request({
    url: `${apiPrefix}/api/v1/order/add`,
    method: 'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
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
    url: `${apiPrefix}/api/v1/order/checkout`,
    method: 'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
//获取当前进行中的订单
/*
无参数
*/
export const getCurrOrders = () => {
  return axios.request({
    url: `${apiPrefix}/api/v1/order/ongoing`,
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token')
    }
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
    url: `${apiPrefix}/api/v1/order/range`,
    method: 'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
//////////////////////订单项///////////////////////////////
//获取未完成的订单项
/*
Body: None
*/
export const getUncompletedOrderItems = () => {
  return axios.request({
    url: `${apiPrefix}/api/v1/order_item/uncompleted`,
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
//添加新的订单项
// Body:
// {
//   "orderId": 92,
//   "dishId": 2,
//   "amount": 1,
//   "note": "可恶妈的"
// }
export const addNewOrderItem = (param) => {
  return axios.request({
    url: `${apiPrefix}/api/v1/order_item/add`,
    method: 'POST',
    data:param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
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
export const updateOrderItem = (param) => {
  return axios.request({
    url: `${apiPrefix}/api/v1/order_item/update`,
    method:'POST',
    data:param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
// 取消订单项
/*
Body:
{
    "id": 0
}
*/
export const deleteOrderItem = (param) => {
  return axios.request({
    url: `${apiPrefix}/api/v1/order_item/delete`,
    method:'POST',
    data:param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
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
    url: `${apiPrefix}/api/v1/dish/add`,
    method:'POST',
    data:param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
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
    url: `${apiPrefix}/api/v1/dish/delete`,
    method:'POST',
    data:param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
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
    url: `${apiPrefix}/api/v1/dish/update`,
    method:'POST',
    data:param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

// 获取当前帐号所属餐厅的所有菜品
/*
Body:none
*/
export const getAllFood = () => {
  return axios.request({
    url: `${apiPrefix}/api/v1/dish/list`,
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export const getObjectMap = (objList) => {
  return objList.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});
}

//////////////////////文件///////////////////////////
//上传文件
/*
Body:见文档
*/
export const upload = (param) => {
  return axios.request({
    url: `${apiPrefix}/api/v1/upload`,
    method: 'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

//////////////////////餐厅///////////////////////////
//获取餐厅信息
/*
Body:见文档
*/
export const getRestaurant = () => {
  return axios.request({
    url: `${apiPrefix}/api/v1/restaurant/get`,
    method:'POST',
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
//修改餐厅信息
/*
Body:见文档
*/
export const updateRestaurant = (param) => {
  return axios.request({
    url: `${apiPrefix}/api/v1/restaurant/update`,
    method:'POST',
    data:param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

// 获取推送列表
export const getNotificationList = () => {
  return axios.request({
    url: `${apiPrefix}/api/v1/notification/get`,
    method:'POST',
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

// 新建推送列表
export const addNotification = (notification) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/notification/add',
    method:'POST',
    data: notification,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

// 删除推送列表
export const deleteNotification = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/notification/delete',
    method:'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

// 修改推送列表
export const updateNotification = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/notification/update',
    method:'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

// 确认推送
export const confirmNotification = (param) => {
  return axios.request({
    url: 'http://www.muzi.fun:5678/api/v1/notification/confirm',
    method:'POST',
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
