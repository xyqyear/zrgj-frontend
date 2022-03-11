<template>
  <el-row class="VIP" :gutter="20">
    <div class="operation">
      <div>
        <p style="margin-left: 20px; color: #545c64">查找到{{ find }}条</p>
      </div>
      <div style="margin-right: 20px; display: flex">
        <el-input
          placeholder="请输入内容"
          v-model="searchInput"
          @input="onSearchInput"
          clearable
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button plain style="margin-left: 20px" @click="activeAddFoodDialog"
          >注册会员</el-button
        >
        <el-dialog title="注册会员" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="addRules">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="form.name"
                autocomplete="off"
                placeholder="请输入您的姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="telephone">
              <el-input
                v-model="form.telephone"
                autocomplete="off"
                type="text"
                maxlength="11"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="请输入您的手机号"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleAdd()">确定添加</el-button>
            <el-button @click="clearForm">退 出</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <el-col :span="24">
      <el-card style="margin-top: 20px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="会员序号" width="200">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="250">
          </el-table-column>
          <el-table-column prop="telephone" label="手机号码" width="300">
          </el-table-column>
          <el-table-column prop="score" label="积分" width="200">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleEdit(scope.row)"
                >修改</el-button
              >
              <el-dialog
                title="更新会员信息"
                :visible.sync="dialogChangeVisible"
              >
                <el-form :model="form">
                  <el-form-item label="姓名">
                    <el-input
                      v-model="formChange.name"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="电话号码">
                    <br />
                    <el-text autocomplete="off">
                      {{ formChange.telephone }}</el-text
                    >
                  </el-form-item>
                  <el-form-item label="积分">
                    <el-input
                      v-model="formChange.score"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogChangeVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="handleEditSure()"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import pinyin from 'pinyin'
import { addVip, getVipList, deleteVip, updateVip } from '../../../api/data.js'
export default {
  name: 'VIP',
  data() {
    const checkName = (rule, value, callback) => {
      if (!/^[\u4e00-\u9fa5]/.test(value) && !/^[a-zA-Z]/.test(value)) {
        callback(
          new Error('输入内容不满足格式，必须包含汉字、英文字母中至少一种！')
        )
      } else {
        this.tableData.forEach((element) => {
          if (element.name === value) {
            callback(new Error('与已有会员姓名重复，请更改！'))
          }
        })
        callback()
      }
    }
    const checkNum = (rule, value, callback) => {
      const numReg = /^\d+$/
      if (!value) {
        callback(new Error('请输入数字'))
      } else {
        if (numReg.test(value)) {
          // 如果是数字
          callback()
        } else {
          callback(
            new Error('输入内容不满足格式，必须是非负，小数点后最多保留一位')
          )
        }
      }
    }
    return {
      addRules: {
        name: [
          { required: true, message: '该内容不能为空！', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '该内容不能为空！', trigger: 'blur' },
          { validator: checkNum, trigger: 'blur' }
        ]
      },
      perChange: [],
      perSet: [],
      selectVal: this.value || '',
      find: '',
      dialogFormVisible: this.$route.query.dialogFormVisible,
      dialogChangeVisible: false,
      alertBlankVisible: false,
      alertAgainVisible: false,
      alertContentVisible: false,
      form: {
        name: '',
        telephone: this.$route.query.telephone
      },
      formChange: {
        telephone: '',
        name: '',
        score: null
      },
      searchInput: '',
      imageUrl: '',
      value: '',
      fileList: [],
      flavour: [],
      tableData: [],
      fullTableData: [],
      allVip: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    /// //////////////////////清空表单////////////////////
    clearForm() {
      this.form.name = ''
      this.form.telephone = ''
      this.dialogFormVisible = false
    },
    // blur() {
    //   if (this.form.name === "") {
    //     this.alertBlankVisible = true;
    //   } else {
    //     this.alertBlankVisible = false;
    //   }
    //   for (let i = 0; i < this.tableData.length; i++) {
    //     if (this.form.name === this.tableData[i].name) {
    //       this.alertAgainVisible = true;
    //       break;
    //     } else {
    //       this.alertAgainVisible = false;
    //     }
    //   }
    //   if (
    //     !/^[\u4e00-\u9fa5]/.test(this.form.name) &&
    //     !/^[a-zA-Z]/.test(this.form.name)
    //   ) {
    //     this.alertContentVisible = true;
    //   } else {
    //     this.alertContentVisible = false;
    //   }
    // },
    delChange() {
      this.perChange.splice(this.perChange.length - 1, 1)
    },
    addChange() {
      const a = this.perChange.length
      const body = {
        id: a
      }
      this.perChange.push(body)
    },
    delSet() {
      this.perSet.splice(this.perSet.length - 1, 1)
    },
    /// ////////////////////上架菜品的dialog打开事件
    activeAddFoodDialog() {
      this.dialogFormVisible = true
      this.perSet = []
    },
    addSet() {
      const a = this.perSet.length
      const body = {
        id: a + 1
      }
      this.perSet.push(body)
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除该会员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const body = {
            telephone: ''
          }
          body.telephone = row.telephone
          console.log(body.telephone)
          deleteVip(body).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.tableData = []
              this.getList()
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
    handleEdit(row) {
      this.dialogChangeVisible = true
      this.formChange.name = row.name
      this.formChange.telephone = row.telephone
      this.formChange.score = row.score
    },

    handleEditSure() {
      this.dialogChangeVisible = false
      const body = {
        telephone: this.formChange.telephone,
        name: this.formChange.name,
        score: this.formChange.score
      }

      console.log(body)
      updateVip(body).then((res) => {
        console.log(res)
        this.tableData = []
        this.getList()
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleAdd() {
      console.log(this.perSet)
      const body = {
        name: '',
        telephone: ''
      }
      body.name = this.form.name
      body.telephone = this.form.telephone
      addVip(body).then((res) => {
        console.log(res)
        this.dialogFormVisible = false
        this.tableData = []
        this.getList()
      })
    },
    getList() {
      getVipList()
        .then((res) => {
          console.log(res)
          this.allVip = res.data.data
          res.data.data = res.data.data.filter((i) => {
            return !i.deleted
          })

          console.log(this.allVip)

          this.find = res.data.data.length

          for (let i = 0; i < res.data.data.length; i++) {
            const item = {
              id: res.data.data[i].id,
              name: res.data.data[i].name,
              telephone: res.data.data[i].telephone,
              score: res.data.data[i].score
            }
            this.tableData.push(item)
          }
          this.fullTableData = this.tableData
        })
        .catch((error) => {
          console.log(error.response.data.reason)
        })
    },

    onSearchInput(value) {
      if (value === '') {
        this.tableData = this.fullTableData
      } else if (/^[\u4e00-\u9fa5]+$/.test(value)) {
        this.tableData = this.fullTableData.filter((item) => {
          return item.name.includes(value)
        })
      } else if (/^[a-zA-Z]+$/.test(value)) {
        this.tableData = this.fullTableData
          .filter((item) => {
            return pinyin(item.name, {
              style: pinyin.STYLE_FIRST_LETTER
            })
              .reduce((acc, cur) => acc + cur[0], '')
              .startsWith(value)
          })
          .concat(
            this.fullTableData.filter((item) => {
              const py = pinyin(item.name, {
                style: pinyin.STYLE_FIRST_LETTER
              }).reduce((acc, cur) => acc + cur[0], '')
              return !py.startsWith(value) && py.includes(value)
            })
          )
      } else if (/^\d+$/.test(value)) {
        this.tableData = this.fullTableData.filter((item) => {
          return (
            item.id === Number(value) ||
            `${item.telephone}`.includes(`${value}`)
          )
        })
      } else {
        this.tableData = []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.noteClass {
  display: flex;
  flex-direction: column;
  justify-content: left;
  justify-items: left;
}
.operation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
