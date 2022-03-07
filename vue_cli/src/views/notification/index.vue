<template>
  <div>

    <el-card class="box-card" v-for="(notification, index) in notificationList"
             :label="index"
             :name="index"
             :key="index">
      <div slot="header" class="clearfix">
        <div>{{ notification.title }}</div>
      </div>
      <div class="text item">
        {{ notification.content }}
      </div>
      <div>
        <el-container>
          <el-main>
            <el-row v-if="!notification.confirmed">
              <el-button @click="handleConfirm(notification, index)">确认</el-button>
            </el-row>
          </el-main>
        </el-container>
      </div>
    </el-card>
  </div>

</template>

<script>
import {confirmNotification} from '../../../api/data'

export default {
  name: "notification",
  data() {
    return {
      value: true,
      text: "",
      textarea: "",
      dialogVisible: false,
    }
  },
  mounted() {
  },
  computed: {
    notificationList() {
      return this.$store.state.notificationList
    }
  },
  methods: {
    handleConfirm(notification, index){
      confirmNotification({"id": notification.id})
      .then(res=>{
        this.$set(this.$store.state.notificationList[index], "confirmed", true);
      })
      .catch(err =>{
      })
    }
  }
}
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
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
}
</style>
