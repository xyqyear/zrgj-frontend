<template>
  <el-row class="home" :gutter="20">
    <div class="operation">
      <div style="margin-right: 20px; display: flex">
        <el-input
          placeholder="请输入内容"
          v-model="searchInput"
          @input="onSearchInput"
          clearable
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-button
        plain
        style="margin-left: 20px"
        @click="dialogFormVisible = true"
      >添加人员
      </el-button
      >
      <el-dialog title="添加员工" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="addRules">
          <el-form-item
            label="员工姓名"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="身份证号"
            :label-width="formLabelWidth"
            prop="idCardNo"
          >
            <el-input v-model="form.idCardNo" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生年月" :label-width="formLabelWidth">
            <el-input v-model="form.birth" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号码"
            :label-width="formLabelWidth"
            prop="telephone"
          >
            <el-input v-model="form.telephone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-radio v-model="radio1" label="1">服务员</el-radio>
            <el-radio v-model="radio1" label="2">厨师</el-radio>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              v-model="form.password"
              autocomplete="off"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            :label-width="formLabelWidth"
            prop="passwordSure"
          >
            <el-input
              v-model="form.passwordSure"
              auto-complete="off"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">退 出</el-button>
          <el-button @click="dialogFormVisible = false">保存并退出</el-button>
          <el-button
            type="primary"
            @click="handleAdd()"
            :disabled="
              !Object.values(this.isok).reduce((acc, cur) => acc && cur, true)
            "
          >确 定
          </el-button
          >
        </div>
      </el-dialog>
    </div>
    <el-col :span="24">
      <el-card style="margin-top: 20px">
        <el-table :data="tableData"  style="width: 100%">
          <el-table-column prop="index" label="序号">
          </el-table-column>
          <el-table-column prop="id" label="员工号"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="type" label="员工类型" sortable></el-table-column>
          <el-table-column prop="telephone" label="手机号码"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)"
              >修改
              </el-button
              >

              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="修改员工信息" :visible.sync="dialogChangeVisible">
          <el-form :model="formChange" :rules="changeRules">
            <el-form-item
              label="员工姓名"
              :label-width="formLabelWidth"
              prop="username"
            >
              <el-input
                v-model="formChange.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="身份证号"
              :label-width="formLabelWidth"
              prop="idCardNo"
              style="width: 280px"
            >
              {{ formChange.idCardNo }}
            </el-form-item>
            <el-form-item label="出生年月" :label-width="formLabelWidth">
              <el-input
                v-model="formChange.birth"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="手机号码"
              :label-width="formLabelWidth"
              prop="telephone"
            >
              <el-input
                v-model="formChange.telephone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
              <el-radio v-model="radio2" label="1">服务员</el-radio>
              <el-radio v-model="radio2" label="2">厨师</el-radio>
            </el-form-item>
            <el-form-item
              label="密码"
              :label-width="formLabelWidth"
              prop="password"
            >
              <el-input
                v-model="formChange.password"
                autocomplete="off"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码"
              :label-width="formLabelWidth"
              prop="passwordSure"
            >
              <el-input
                v-model="formChange.passwordSure"
                auto-complete="off"
                type="password"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChangeVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="handleEditSure()"
              :disabled="
                !Object.values(this.ischaok).reduce(
                  (acc, cur) => acc && cur,
                  true
                )
              "
            >确 定
            </el-button
            >
          </div>
        </el-dialog>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import {
  getUserlist,
  chaAccount,
  addAccount,
  deAccount
} from '../../../api/data.js'
import pinyin from 'pinyin'

export default {
  name: 'home',
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        this.isok.username = false
        this.ischaok.username = false
        callback()
      } else {
        if (/^[\u4e00-\u9fa5]{0,}$/.test(value)) {
          this.isok.username = true
          this.ischaok.username = true
          callback()
        } else {
          this.isok.username = false
          this.ischaok.username = false
          callback(new Error('该姓名存在非法字符！'))
        }
      }
    }
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        this.isok.telephone = false
        this.ischaok.telephone = false
        callback()
      } else {
        if (
          /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
            value
          )
        ) {
          this.isok.telephone = true
          this.ischaok.telephone = true
          callback()
        } else {
          this.isok.telephone = false
          this.ischaok.telephone = false
          callback(new Error('电话号码格式不正确！'))
        }
      }
    }
    const checkPass = (rule, value, callback) => {
      if (!value) {
        this.isok.password = false
        this.ischaok.password = true
        callback()
      } else {
        if (/^(\w){6,20}$/.test(value)) {
          this.isok.password = true
          this.ischaok.password = true
          if (
            (value === this.form.passwordSure) |
            (value === this.formChange.passwordSure)
          ) {
            this.isok.password = true
            this.ischaok.password = true
            callback()
          } else {
            this.isok.password = false
            this.ischaok.password = false
            callback(new Error('两次输入密码不一致！'))
          }
        } else {
          this.isok.password = false
          this.ischaok.password = false
          callback(new Error('密码必须为6-20个字母、数字、下划线！'))
        }
      }
    }
    const checkPassSure = (rule, value, callback) => {
      if (!value) {
        this.isok.passwordSure = false
        this.ischaok.passwordSure = true
        callback()
      } else {
        if (
          (value === this.form.password) |
          (value === this.formChange.password)
        ) {
          this.isok.passwordSure = true
          this.ischaok.passwordSure = true
          callback()
        } else {
          this.isok.passwordSure = false
          this.ischaok.passwordSure = false
          callback(new Error('两次输入密码不一致！'))
        }
      }
    }
    return {
      changeRules: {
        username: [
          {
            required: true,
            message: '员工姓名不能为空！',
            trigger: 'blur'
          },
          {
            validator: checkName,
            trigger: 'blur'
          }
        ],
        telephone: [
          {
            required: true,
            message: '员工电话号码不能为空！',
            trigger: 'blur'
          },
          {
            validator: checkPhone,
            trigger: 'blur'
          }
        ],
        password: [{
          validator: checkPass,
          trigger: 'blur'
        }],
        passwordSure: [{
          validator: checkPassSure,
          trigger: 'blur'
        }]
      },
      addRules: {
        idCardNo: [
          {
            required: true,
            message: '身份证号不能为空！',
            trigger: 'blur'
          },
          {
            validator: this.checkCard,
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '员工姓名不能为空！',
            trigger: 'blur'
          },
          {
            validator: checkName,
            trigger: 'blur'
          }
        ],
        telephone: [
          {
            required: true,
            message: '员工电话号码不能为空！',
            trigger: 'blur'
          },
          {
            validator: checkPhone,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空！',
            trigger: 'blur'
          },
          {
            validator: checkPass,
            trigger: 'blur'
          }
        ],
        passwordSure: [
          {
            required: true,
            message: '确认密码不能为空！',
            trigger: 'blur'
          },
          {
            validator: checkPassSure,
            trigger: 'blur'
          }
        ]
      },
      Wi: [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      ValideCode: [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2],
      input: '',
      find: '22',
      tableData: [],
      fullTableData: [],
      radio1: '1',
      radio2: '',
      dialogFormVisible: false,
      dialogChangeVisible: false,
      searchInput: '',
      isok: {
        idCardNo: false,
        username: false,
        telephone: false,
        password: false,
        passwordSure: false
      },
      ischaok: {
        username: true,
        telephone: true,
        password: true,
        passwordSure: true
      },
      form: {
        username: '',
        password: '',
        telephone: '',
        idCardNo: '',
        birth: '',
        passwordSure: ''
      },
      formChange: {
        id: '',
        username: '',
        telephone: '',
        password: '',
        idCardNo: '',
        birth: '',
        passwordSure: ''
      },
      formOrigin: {
        username: '',
        telephone: '',
        position: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    handleCancel() {
      this.form = {
        username: '',
        password: '',
        telephone: '',
        idCardNo: '',
        birth: '',
        passwordSure: ''
      }
      this.dialogFormVisible = false
    },
    checkCard() {
      if (!this.form.idCardNo) {
        this.isok.idCardNo = false
        return
      }
      const CardId = this.form.idCardNo
      if (CardId.length === 15) {
        if (this.is15Card(CardId)) {
          this.go(CardId.length)
        } else {
          this.isok.idCardNo = false
          return this.$message({
            type: 'error',
            message:
              '您的身份证号有误！请输入你真实的身份证号，确保你的利益得到保障！'
          })
        }
      } else if (CardId.length === 18) {
        const idSplit = CardId.split('')
        console.log(idSplit)
        if (this.is18Card(CardId) && this.is18CardEnd(idSplit)) {
          // && this.is18CardEnd(idSplit)
          this.go(CardId.length)
          if (this.is18Card(CardId)) {
            this.isok.idCardNo = true
            return true
          }
        } else {
          this.isok.idCardNo = false
          return this.$message({
            type: 'error',
            message:
              '您的身份证号有误！请输入你真实的身份证号，确保你的利益得到保障！'
          })
        }
      } else {
        this.isok.idCardNo = false
        return this.$message({
          type: 'error',
          message:
            '您的身份证号有误！请输入你真实的身份证号，确保你的利益得到保障！'
        })
      }
    },
    is18CardEnd(idSplit) {
      let sum = 0
      if (idSplit[17].toLowerCase() === 'x') {
        idSplit[17] = 10
      }
      for (let i = 0; i < 17; i++) {
        sum += this.Wi[i] * Number(idSplit[i])
      }
      const valCodePosition = sum % 11
      if (idSplit[17] === this.ValideCode[valCodePosition]) {
        return true
      } else {
        return false
      }
    },
    is18Card(idCard18) {
      const year = idCard18.substring(6, 10)
      const month = idCard18.substring(10, 12)
      const day = idCard18.substring(12, 14)
      const tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day))
      if (
        tempDate.getFullYear() !== parseFloat(year) ||
        tempDate.getMonth() !== parseFloat(month) - 1 ||
        tempDate.getDate() !== parseFloat(day)
      ) {
        return false
      } else {
        return true
      }
    },

    is15Card(idCard15) {
      const year = idCard15.substring(6, 8)
      const month = idCard15.substring(8, 10)
      const day = idCard15.substring(10, 12)
      const tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day))
      if (
        tempDate.getYear() !== parseFloat(year) ||
        tempDate.getMonth() !== parseFloat(month) - 1 ||
        tempDate.getDate() !== parseFloat(day)
      ) {
        return false
      } else {
        return true
      }
    },
    go(val) {
      const iden = this.form.idCardNo
      let sex = null
      let birth = null
      const myDate = new Date()
      const month = myDate.getMonth() + 1
      const day = myDate.getDate()
      let age = 0

      if (val === 18) {
        age = myDate.getFullYear() - iden.substring(6, 10) - 1
        sex = iden.substring(16, 17)
        birth =
          iden.substring(6, 10) +
          '-' +
          iden.substring(10, 12) +
          '-' +
          iden.substring(12, 14)
        if (
          iden.substring(10, 12) < month ||
          (iden.substring(10, 12) === month && iden.substring(12, 14) <= day)
        ) {
          age++
        }
      }
      if (val === 15) {
        age = myDate.getFullYear() - iden.substring(6, 8) - 1901
        sex = iden.substring(13, 14)
        birth =
          '19' +
          iden.substring(6, 8) +
          '-' +
          iden.substring(8, 10) +
          '-' +
          iden.substring(10, 12)
        if (
          iden.substring(8, 10) < month ||
          (iden.substring(8, 10) === month && iden.substring(10, 12) <= day)
        ) {
          age++
        }
      }

      if (sex % 2 === 0) {
        sex = '女'
      } else {
        sex = '男'
      }
      this.form.sex = sex
      this.form.age = age
      this.form.birthday = birth

      this.form.birth = birth
    },
    getUserData() {
      getUserlist()
        .then((res) => {
          for (let i = 0; i <= res.data.data.length; i++) {
            const item = {
              index: i + 1,
              id: res.data.data[i].id,
              username: res.data.data[i].username,
              position: res.data.data[i].position,
              type: '',
              telephone: res.data.data[i].telephone,
              idCardNo: res.data.data[i].idCard,
              password: '',
              passwordSure: '',
              birth: ''
            }
            if (item.position === 1) {
              item.type = '服务员'
            } else {
              item.type = '厨师'
            }
            item.birth =
              item.idCardNo.substring(6, 10) +
              '-' +
              item.idCardNo.substring(10, 12) +
              '-' +
              item.idCardNo.substring(12, 14)
            this.tableData.push(item)
          }
          this.fullTableData = this.tableData
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleEditSure() {
      if (
        this.formChange.username === this.formOrigin.username &&
        this.formChange.telephone === this.formOrigin.telephone &&
        this.radio2 === this.formOrigin.position
      ) {
        this.$message.error('未对员工信息进行更改！')
      } else {
        this.dialogChangeVisible = false
        const body = {
          id: '',
          username: '',
          position: '',
          avatarUrl: '',
          telephone: '',
          password: ''
        }
        body.id = this.formChange.id
        body.username = this.formChange.username
        body.position = this.radio2
        body.telephone = this.formChange.telephone
        body.password = this.formChange.password
        chaAccount(body).then((res) => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.tableData.length = 0
          this.getUserData()
        })
      }
    },
    handleAdd() {
      if (Object.values(this.isok).reduce((acc, cur) => acc && cur, true)) {
        this.dialogFormVisible = false
        const body = {
          username: '',
          password: '',
          position: '',
          avatarUrl: '',
          telephone: '',
          idCard: ''
        }
        body.username = this.form.username
        body.password = this.form.password
        body.position = this.radio1
        body.telephone = this.form.telephone
        body.idCard = this.form.idCardNo
        addAccount(body).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.tableData.length = 0
            this.getUserData()
          }
        })
      }
    },
    handleEdit(index, row) {
      this.dialogChangeVisible = true
      this.formOrigin.username = row.username
      this.formOrigin.position = '' + row.position
      this.formOrigin.telephone = row.telephone
      this.radio2 = '' + row.position
      this.formChange.username = row.username
      this.formChange.telephone = row.telephone
      this.formChange.id = row.id
      this.tableData.forEach((element) => {
        if (element.id === row.id) {
          this.formChange.birth = element.birth
          this.formChange.idCardNo = element.idCardNo
          this.formChange.password = element.password
          this.formChange.passwordSure = element.passwordSure
        }
      })
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const body = {
            id: ''
          }
          body.id = row.id
          deAccount(body).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.tableData.length = 0
              this.getUserData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    onSearchInput(value) {
      if (value === '') {
        this.tableData = this.fullTableData
      } else if (/^[\u4e00-\u9fa5]+$/.test(value)) {
        this.tableData = this.fullTableData.filter((item) => {
          return item.username.includes(value)
        })
      } else if (/^[a-zA-Z]+$/.test(value)) {
        this.tableData = this.fullTableData
          .filter((item) => {
            return pinyin(item.username, {
              style: pinyin.STYLE_FIRST_LETTER
            })
              .reduce((acc, cur) => acc + cur[0], '')
              .startsWith(value)
          })
          .concat(
            this.fullTableData.filter((item) => {
              const py = pinyin(item.username, {
                style: pinyin.STYLE_FIRST_LETTER
              }).reduce((acc, cur) => acc + cur[0], '')
              return !py.startsWith(value) && py.includes(value)
            })
          )
      } else if (/^\d+$/.test(value)) {
        this.tableData = this.fullTableData.filter((item) => {
          return item.id === Number(value)
        })
      } else {
        this.tableData = []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.operation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
