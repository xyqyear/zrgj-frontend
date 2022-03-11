import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
          {
            path:'/',
            name:'home',
            label:'主页',
            icon:'s-home',
            url:'Home/Home'
          },
          {
            path:'/table',
            name:'table',
            label:'桌台管理',
            icon:'video-play',//自己记得改icon
            url:'TableManage/TabelManage'//?
          },
          {
            path:'/case',
            name:'case',
            label:'订单管理',
            icon:'user',//自己记得改icon
            url:'CaseManage/CaseManage'
          },
          {
            path:'/food',
            name:'food',
            label:'菜品管理',
            icon:'user',//自己记得改icon
            url:'FoodManage/FoodManage'
          },
          {
            label:'其他',
            icon:'location',
            children:[
              {
                path:'/worker',
                name:'worker',
                label:'员工管理',
                icon:'setting',//自己记得改icon
                url:'WorkerManager/WorkerManager'
              },
              {
                path:'/perCen',
                name:'perCen',
                label:'个人中心',
                icon:'setting',//自己记得改icon
                url:'PersonCenter/PersonCenter'
              }
            ]
          }
          
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'chefchef' && password === 'chefchef') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/chef',
              name: 'chef',
              label: '订单查看与烹饪',
              icon: 'video-play',
              url: 'ChefManage/ChefManage'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}
