<template>
  <div>
    <el-card class="box-card" v-for="(notification, index) in notificationList"
             :label="index"
             :name="index"
             :key="index">
      <div slot="header" class="clearfix">
        <div v-if="notification.sticked" class="left">
          <el-button type="primary">顶置</el-button>
        </div>
        <div class="head">{{ notification.title }}</div>
      </div>
      <div class="text item">
        {{ notification.content }}
      </div>
      <div  >
        <span style="float: left">
          {{ getCreatedTime(notification.createTime) }}
        </span>
        <el-row v-if="!notification.confirmed" class="right">
          <el-button class="mybt" @click="handleConfirm(notification, index)">确认</el-button>
        </el-row>
      </div>
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
  margin-bottom: 10px;
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
  width: 98%;
  height: 100%;
  margin: 10px;
  padding: 5px;
  text-align: left;
}

.head {
  margin-top: 10px;
  margin-left: 90px;
  font-weight: bolder;
  font-size: 140%;
}

.mybt {
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px 10px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.right {
  float: right;
  margin-right: 0px;
}

.left {
  float: left;
  margin-left: 0px;
}
</style>
