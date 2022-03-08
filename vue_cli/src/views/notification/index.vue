<template>
  <div>
    <el-card
      class="box-card"
      v-for="(notification, index) in notificationList"
      :label="index"
      :name="index"
      :key="index"
      body-style="padding: 0px"
    >
      <div slot="header" class="header">
        <div v-if="notification.sticked" class="left">
          <el-button type="primary">置顶</el-button>
        </div>
        <div class="head">{{ notification.title }}</div>
      </div>
      <div class="text item">
        {{ notification.content }}
      </div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-row>
              <span style="float: left; margin-top: 16px; margin-left: 10px">
                {{ getCreatedTime(notification.createTime) }}
              </span>
              <div class="right" v-if="!notification.confirmed">
                <el-button
                  class="mybt"
                  @click="handleConfirm(notification, index)"
                  >确认</el-button
                >
              </div>
              <span class="confirm-info" v-if="notification.confirmed"
                >已查看..</span
              >
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { confirmNotification } from '../../../api/data'
import { getReadableTime } from '../../store/notification'

export default {
  name: 'notification',
  data() {
    return {}
  },
  mounted() {},
  computed: {
    notificationList() {
      return this.$store.state.notificationList
    }
  },
  methods: {
    handleConfirm(notification, index) {
      confirmNotification({ id: notification.id }).then((res) => {
        this.$set(this.$store.state.notificationList[index], 'confirmed', true)
      })
    },
    getCreatedTime(ts) {
      return `发布时间：${getReadableTime(ts)}`
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 15px;
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
.confirm-info {
  float: right;
  margin-top: 15px;
  margin-right: 10px;
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
