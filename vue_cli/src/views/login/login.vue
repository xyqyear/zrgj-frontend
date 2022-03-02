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
import axios from "axios";
import { postLogin } from "../../../api/data";
export default {
  name: "login",
  token: "",
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入员工号", trigger: "blur" },
          // {
          //   min: 3,
          //   message: "用户名长度不能小于3位",
          //   trigger: "blur",
          // },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      localStorage.setItem('accountId', this.form.username);
      var account = {
        id: parseInt(this.form.username),
        password: this.form.password,
      };
      postLogin(account)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$store.commit("clearMenu");
            console.log(res.data.data.account.position);
            this.$store.commit("setMenu", res.data.data.account.position);
            this.$store.commit("setToken", res.data.data.token);
            //console.log(res.data.data.token)
            localStorage.setItem("position", res.data.data.account.position);
            localStorage.setItem("token", "Bearer " + res.data.data.token);
            //访问接口，加请求头
            axios.defaults.headers.common["Authorization"] =
              localStorage.getItem("token");
            //console.log(localStorage.getItem('token'))
            this.$store.commit("addMenu", this.$router);
            if (res.data.data.account.position == 0) {
              console.log("position0");
              this.$router.push({ name: "home" });
            } else if (res.data.data.account.position == 2) {
              this.$router.push({ name: "chef" });
            } else if (res.data.data.account.position == 1) {
              this.$router.push({ name: "serFood" });
            }
          } else {
            console.log("错误啦");
            //this.$message.warning(res.reason);
          }
          this.token = res.data.data.token;
        })
        .catch((error) => {
          console.log("status" + error.response.status);
          if (error.response.status === 400) {
            console.log("???" + error.response.data.reason);
            this.$store.commit("setToken", this.token);
            this.$message.error(error.response.data.reason);
          }
        });
    },
  },
};
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
