<template>
  <div>
    <div style="height: 180px"></div>
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-container"
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item
        label="员工号"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.username"
          autocomplete="off"
          placeholder="请输入员工号"
        >
        </el-input>
      </el-form-item>
      <!-- -------------------------------------- -->
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
          placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item class="login-submit">
        <el-button type="primary" @click="login" class="login_submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { postLogin } from '../../../api/data'

export default {
  name: 'login',
  token: '',
  data() {
    const checkNum = (rule, value, callback) => {
      const numReg = /^\d+$/
      if (!value) {
        callback(new Error('请输入数字'))
      } else {
        if (numReg.test(value)) {
          // 如果是数字
          sessionStorage.setItem('isNum', true)
          callback()
        } else {
          sessionStorage.setItem('isNum', false)
          callback(new Error('请输入数字'))
        }
      }
    }
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: '员工号不能为空', trigger: 'blur' },
          {
            max: 8,
            message: '员工号长度不能多于8位',
            trigger: 'blur'
          },
          // 必须是数字
          { validator: checkNum, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          // 必须是数字
          { validator: checkNum, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      console.log('sessionStorage.getItem', sessionStorage.getItem('isNum'))
      const numReg = /^\d+$/
      if (numReg.test(this.form.username) && numReg.test(this.form.password)) {
        // 数字则返回true
        // if(/^\d+$/.test(this.form.username)){
        localStorage.setItem('accountId', this.form.username)
        const account = {
          id: parseInt(this.form.username),
          password: this.form.password
        }
        postLogin(account)
          .then((res) => {
            localStorage.setItem('position', res.data.data.account.position)
            localStorage.setItem('accountId', res.data.data.account.id)
            localStorage.setItem('token', 'Bearer ' + res.data.data.token)
            localStorage.setItem(
              'restaurantId',
              res.data.data.account.restaurantId
            )
            this.$store.commit('setMenu', res.data.data.account.position)
            this.$router.push({
              name: { 0: 'home', 1: 'serFood', 2: 'chef' }[
                res.data.data.account.position
              ]
            })
          })
          .catch((error) => {
            this.$message.error(error.response.data.reason)
          })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login-submit {
  margin: 10px auto 0px auto;
}
</style>
