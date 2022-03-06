<template>
  <div>
    <p>this is notification page</p>
    <div v-for="notification of notificationList">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ '列表内容 ' + o }}
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
import {getNotificationList} from '../../../api/data'

export default {
  name: "notification",
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
    notificationList(){
      return this.$store.state.notificationList
    }
  },
  methods: {}
}
</script>

<style scoped>
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
  clear: both
}

.box-card {
  width: 480px;
}
</style>
