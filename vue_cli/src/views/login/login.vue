<template>
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
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
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
        <el-button type="primary" @click="login" class="login_submit">登录</el-button>
         </el-form-item>
  </el-form>
</template>
<script>
import axios from 'axios'
import {postLogin} from '../../../api/data'
export default ({
    name:'login',
    token:'',
    data(){
        return {
            form:{

            },
            rules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:"blur"},
                    {    
                        min:3,
                        message:"用户名长度不能小于3位",
                        trigger:"blur"
                    }
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:"blur"}
                ]
            }
        }
    },
    methods:{
        login(){
          postLogin(this.form).then(res=>{
            console.log(res)
            if(res.status === 200){
              this.$store.commit('clearMenu')
              console.log(res.data.data.account.position)
              this.$store.commit('setMenu',res.data.data.account.position)
              this.$store.commit('setToken',res.data.data.token)
              //console.log(res.data.data.token)
              localStorage.setItem('position',res.data.data.account.position)
              localStorage.setItem('token','Bearer '+ res.data.data.token)
              axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
              //console.log(localStorage.getItem('token'))
              this.$store.commit('addMenu',this.$router)
              if(res.data.data.account.position==0){
                this.$router.push({name:'home'})
              }else if(res.data.data.account.position==2){
                this.$router.push({name:'chef'})
              }else if(res.data.data.account.position==1){
                this.$router.push({name:'serMain'})
              }
            }else{
              console.log('错误啦')
              this.$message.warning(res.reason)
            }
            this.token = res.data.data.token
          })
            this.$store.commit('setToken',this.token)
            // if(localStorage.getItem('position') == 0){
            //   console.log('position'+localStorage.getItem('position'))
            //   this.$router.push({name:'home'})
            // }else if(localStorage.getItem('position') == 2){
            //   console.log('position'+localStorage.getItem('position')) 
            //   this.$router.push({name:'chef'})
            // }else if(localStorage.getItem('position') == 1){
            //   this.$router.push({name:'serMain'})
            // }

        }
    }
})
</script>
<style lang="less" scoped>
    .login-container{
        border-radius:15px;
        background-clip: padding-box;
        margin:180px auto;
        width:350px;
        padding:35px 35px 15px 35px;
        background-color: #fff; 
        border:1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login-title{
        margin:0px auto 40px auto;
        text-align:center;
        color:#505458;
    }
    .login-submit{
        margin:10px auto 0px auto;
    }


</style>