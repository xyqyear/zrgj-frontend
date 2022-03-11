<template>
  <div>
    <el-button type="text" @click="dialogVisible1 = true" style="float: right">
      <el-row>
        <el-button type="primary" class="head">发布公告</el-button>
      </el-row>
    </el-button>

    <el-dialog
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="公告标题">
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="text"
            maxlength="20"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <div style="margin: 20px 0"></div>
        <el-form-item label="公告内容">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="60"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="设为置顶">
          <el-switch
            v-model="sticked"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">退 出</el-button>
        <!-- <el-button @click="dialogVisible1 = false">保存并退出</el-button> -->
        <el-button
          type="primary"
          @click="
            handleAdd();
            dialogVisible1 = false;
          "
          >发 布</el-button
        >
      </span>
    </el-dialog>

    <el-card
      class="box-card"
      v-for="(item, index) in notificationList"
      :key="index"
      body-style="padding: 0px"
    >
      <div slot="header" class="header">
        <div v-if="item.sticked" class="left">
          <el-button type="primary">置顶</el-button>
        </div>
        <div class="head">{{ item.title }}</div>
      </div>
      <div class="text item">
        {{ item.content }}
      </div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-row>
              <span style="float: left; margin-top: 16px; margin-left: 10px">
                {{ getCreatedTime(item.createTime) }}
              </span>
              <div class="right">
                <!-- <el-button @click="handleEdit(item)">编 辑</el-button> -->
                <el-button @click="openEditBox(item, index)" class="mybt"
                  >编辑
                </el-button>
                <el-button
                  class="mybt"
                  @click="changeStickSituation(item, index)"
                >
                  {{ item.sticked ? "取消置顶" : "置顶" }}
                </el-button>
                <el-button class="mybt" @click="handleDelete(item, index)"
                  >撤 销</el-button
                >
                <!-- @click="handleDelete(item.id)" -->
              </div>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="公告标题">
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="changeText"
            maxlength="20"
            show-word-limit
          >
          </el-input>
        </el-form-item>

        <div style="margin: 20px 0"></div>

        <el-form-item label="公告内容">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="changeTextarea"
            maxlength="60"
            show-word-limit
          >
          </el-input>
        </el-form-item>

        <el-form-item label="设为置顶">
          <el-switch
            v-model="sticked"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消修改</el-button>
        <!-- <el-button @click="dialogVisible = false">保存并退出</el-button> -->
        <el-button type="primary" @click="handleEdit(editId)"
          >确认修改</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addNotification,
  deleteNotification,
  updateNotification
} from '../../../api/data'
import { getReadableTime } from '../../store/notification'

export default {
  name: 'manageNotification',
  data() {
    return {
      text: '',
      textarea: '',
      sticked: true,
      dialogVisible1: false,
      dialogVisible2: false,
      changeText: '',
      changeTextarea: '',
      editId: null
    }
  },
  mounted() {},
  methods: {
    getCreatedTime(ts) {
      return `发布时间：${getReadableTime(ts)}`
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    handleAdd() {
      const body = {
        title: this.text,
        content: this.textarea,
        sticked: this.sticked
      }
      addNotification(body)
        .then((res) => {
          this.$store.dispatch('getNotificationListFromServer')
        })
        .catch((_) => {
        })
      this.text = ''
      this.textarea = ''
      this.sticked = true
    },
    handleDelete(notification, index) {
      this.$confirm('此操作将撤销该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteNotification({ id: notification.id })
            .then((_) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$store.commit('deleteNotification', index)
            })
            .catch((_) => {
              this.$message({
                type: 'warning',
                message: '网络故障，删除失败'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleEdit(id) {
      const body = {
        id: id,
        title: this.changeText,
        content: this.changeTextarea,
        sticked: this.sticked
      }
      updateNotification(body)
        .then((res) => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$store.dispatch('getNotificationListFromServer')
        })
        .catch((_) => {
        })
      this.dialogVisible2 = false
    },
    changeStickSituation(notification, index) {
      notification.sticked = !notification.sticked
      const sticked = notification.sticked
      console.log('CUNT:', sticked)
      updateNotification(notification).then((res) => {
        this.$store.commit('stickNotification', {
          index,
          sticked
        })
      })
    },
    openEditBox(notification, index) {
      this.dialogVisible2 = true
      this.editId = notification.id
      this.changeText = notification.title
      this.changeTextarea = notification.content
      this.sticked = notification.sticked
    }
  },
  computed: {
    notificationList() {
      return this.$store.getters.notificationList
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  margin-top: 18px;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;

  .left {
    margin-right: 10px;
  }

  .head {
    font-weight: bolder;
    font-size: 140%;
  }
}

.box-card {
  width: 100%;
  height: 100%;
  margin: 10px;
  padding: 5px;
  text-align: left;
}

.mybt {
  margin-left: 10px;
  margin-right: 20px;
  padding: 5px 10px;
  margin-top: 10px;
  margin-bottom: 4px;
}

.right {
  float: right;
  margin-right: 0px;
}

.nothead {
  font-weight: bolder;
  font-size: 140%;
  margin-left: 100px;
  margin-top: 8px;
}

.grid-content {
  border-radius: 4px;
  min-height: 47px;
}

.bg-purple-dark {
  background: #eae6e6;
}
</style>
