<template>
  <div>
    <el-card class="box-card" v-for="(notification, index) in notificationList"
             :label="index"
             :name="index"
             :key="index">
      <div slot="header" class="clearfix">
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
        <span style="float: left; margin-top: 16px; margin-left:10px">
          {{ getCreatedTime(notification.createTime) }}
        </span>
              <div class="right" v-if="!notification.confirmed">
                <el-button class="mybt" @click="handleConfirm(notification, index)">确认</el-button>
              </div>
              <span class="confirm-info" v-if="notification.confirmed">已查看..</span>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script>
import {confirmNotification} from '../../../api/data'
import {getReadableTime} from '../../store/notification'

export default {
  name: "notification",
  data() {
    return {}
  },
  mounted() {
  },
  computed: {
    notificationList() {
      return this.$store.state.notificationList
    }
  },
  methods: {
    handleConfirm(notification, index) {
      confirmNotification({"id": notification.id})
        .then(res => {
          this.$set(this.$store.state.notificationList[index], "confirmed", true);
        })
        .catch(err => {
        })
    },
    getCreatedTime(ts) {
      return `发布时间：${getReadableTime(ts)}`;
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 15px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  height: 100%;
  margin: 10px;
  padding: 5px;
  text-align: left;
}

.head {
  font-weight: bolder;
  font-size: 140%;
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

.left {
  float: left;
  margin-left: 0px;
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
  background: #99a9bf;
}
</style>
