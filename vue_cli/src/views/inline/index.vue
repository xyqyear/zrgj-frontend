<template>
  <el-row :gutter="30">
    <el-col class="inline_header" :span="24">
      <el-card class="inline_header_card" shadow="never" width="200">
        <div class="inline_title">天天点餐电子排队系统</div>
      </el-card>
      <div class="level2">
        <el-button @click="addintoLine" type="primary" plain>排 号</el-button>
      </div>
    </el-col>

    <el-col
      v-for="item in queue"
      :key="item.size"
      class="inline_body"
      :span="6"
    >
      <div class="inline_tableType" width="45">
        <span class="firstfront">
          {{ { A: "小桌", B: "中桌", C: "大桌", D: "包厢" }[item.size] }}
        </span>
        <span class="secondfront">{{
          { A: "(1-4人)", B: "(5-8人)", C: "(9-12人)", D: "(9-12人)" }[
            item.size
          ]
        }}</span>
        <span class="thirdfront">剩</span>
        <span class="forthfront">{{ remainingTable[item.size] }}</span>
      </div>
      <div class="inline_info">
        <!-- miniTable的地方 -->
        <div
          v-for="element in item.currentLine"
          :key="element.id"
          class="infoDetail_top"
        >
          <div class="infoDetail">
            <div class="firstrow">
              <span class="firstfront">排队号：</span>
              <span class="secondfront">{{ item.size }}{{ element.id }}</span>
            </div>
            <div class="thirdrow">
              <span>人数：{{ element.headcount }}</span>
            </div>
          </div>
          <div class="infoDetail_footer">
            <div
              style="
                color: gray;
                font-size: 14px;
                margin-left: 10px;
                margin-top: 10px;
              "
            >
              已等待：{{ waitingTime[item.size][element.id] }}
            </div>
            <div class="operations" style="margin-top: 10px">
              <el-button
                size="medium"
                @click="cancleQueueItem(item.size, element.id)"
                >取消</el-button
              >
              <el-button type="primary">叫号</el-button>
              <el-popover
                placement="top"
                :value="selectingQueueId === `${item.size}${element.id}`"
                width="290"
                trigger="manual"
              >
                <div
                  v-for="(tableState, index) in occupied"
                  :key="index"
                  class="tableItem"
                >
                  <el-button
                    :type="['', 'success', 'primary'][tableState]"
                    :disabled="tableState === 2"
                    style="width: 60px"
                    @click="completeQueueItem(item.size, element.id, index + 1)"
                  >
                    {{ index + 1 }}
                  </el-button>
                </div>
                <el-button
                  slot="reference"
                  @click="setPopoverVisible(`${item.size}${element.id}`)"
                >
                  {{
                    selectingQueueId === `${item.size}${element.id}`
                      ? "关闭"
                      : "完成"
                  }}
                </el-button>
              </el-popover>
            </div>
          </div>
        </div>
      </div>
    </el-col>

    <el-dialog class="addtoline" :visible.sync="addLineVisible" width="30%">
      <div slot="title" class="dialog-title">
        <div>取号</div>
      </div>
      <el-form :model="form">
        <el-form-item label="就餐人数：">
          <el-input v-model="form.headcount" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="选择餐桌：">
          <el-select
            v-model="form.size"
            placeholder="餐桌规模"
            style="width: 70%"
          >
            <el-option
              label="小桌（1-4人）"
              value="A"
              :disabled="remainingTable['A'] === 0"
            ></el-option>
            <el-option
              label="中桌（5-8人）"
              value="B"
              :disabled="remainingTable['B'] === 0"
            ></el-option>
            <el-option
              label="大桌（9-12人）"
              value="C"
              :disabled="remainingTable['C'] === 0"
            ></el-option>
            <el-option
              label="包间（9-12人）"
              value="D"
              :disabled="remainingTable['D'] === 0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addQueueItem">确认</el-button>
          <el-button @click="onCancle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import { addOrder, updateQueueStatus } from '../../../api/data'
export default {
  name: 'inline',
  data() {
    return {
      addLineVisible: false,
      selectingQueueId: null,
      // this is updated by setInterval in mounted.
      // {'A': {1: '59秒'}}
      waitingTime: {},
      form: {
        headcount: '',
        size: ''
      }
    }
  },
  computed: {
    orderList() {
      return this.$store.getters.orderList
    },
    restaurantInfo() {
      return this.$store.getters.restaurantInfo
    },
    // 0: 空桌子  1: 空订单  2: 占用中
    occupied() {
      const occupied = new Array(this.restaurantInfo.tableNum).fill(0)
      for (let i = 0; i < this.orderList.length; i++) {
        if (this.orderList[i].orderItems.length === 0) {
          occupied[this.orderList[i].tableId - 1] = 1
        } else {
          occupied[this.orderList[i].tableId - 1] = 2
        }
      }
      return occupied
    },
    // 剩余桌子数量
    // {'A': 1, 'B': 2, 'C': 1, 'D': 2}
    remainingTable() {
      return this.restaurantInfo.tableInfo.reduce(
        (acc, cur, index) => {
          if (this.occupied[index] === 0) {
            acc[cur.size]++
          }
          return acc
        },
        { A: 0, B: 0, C: 0, D: 0 }
      )
    },
    queue() {
      return this.$store.getters.queue
    }
  },
  mounted() {
    this.updateWaitingTime()
    setInterval(this.updateWaitingTime, 1000)
  },
  methods: {
    onCancle() {
      this.addLineVisible = false
    },
    addintoLine() {
      this.addLineVisible = true
    },
    // util function to calculate time elapsed
    elapsedTime(startSeconds) {
      // get time delta
      let delta = Math.floor(Date.now() / 1000) - startSeconds
      const h = Math.floor((delta / 3600) % 24)
      const m = Math.floor((delta / 60) % 60)
      const s = Math.floor(delta % 60)
      delta = s + '秒'
      if (m > 0) {
        delta = m + '分' + delta
      }
      if (h > 0) {
        delta = h + '时' + delta
      }
      return delta
    },
    setPopoverVisible(queueId) {
      if (this.selectingQueueId) {
        this.selectingQueueId = null
      } else {
        this.selectingQueueId = queueId
      }
    },
    cancleQueueItem(size, id) {
      const queue = this.queue
      const sizeIndex = queue.findIndex((item) => item.size === size)
      queue[sizeIndex].runningCount++
      queue[sizeIndex].currentLine = queue[sizeIndex].currentLine.filter(
        (item) => item.id !== id
      )
      updateQueueStatus(queue)
    },
    completeQueueItem(size, id, tableId) {
      this.selectingQueueId = null
      this.cancleQueueItem(size, id)
      this.addEmptyOrder(tableId)
    },
    addQueueItem() {
      this.addLineVisible = false
      const queue = this.queue
      const sizeIndex = queue.findIndex((item) => item.size === this.form.size)
      queue[sizeIndex].runningCount++
      queue[sizeIndex].currentLine.push({
        id: queue[sizeIndex].runningCount,
        headcount: Number(this.form.headcount),
        createTime: Math.floor(Date.now() / 1000)
      })
      updateQueueStatus(queue)
    },
    addEmptyOrder(tableId) {
      const order = {
        tableId,
        orderItems: []
      }
      addOrder(order)
    },
    updateWaitingTime() {
      this.waitingTime = this.queue.reduce((acc, cur) => {
        acc[cur.size] = cur.currentLine.reduce((acc, cur) => {
          acc[cur.id] = this.elapsedTime(cur.createTime)
          return acc
        }, {})
        return acc
      }, {})
    }
  }
}
</script>

<style lang="less" scoped>
//////////////排队//////////////////
div /deep/ .el-dialog__header {
  background-color: #2682b7;
}

.addtoline {
  .dialog-title {
    height: 50px;
    div {
      padding-top: 5px;
      height: 100%;
      line-height: 100%;
      font-size: 36px;
      font-weight: normal;
      color: white;
    }
  }
}
.infoDetail_top {
  background: #fff;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border: 2px solid #2682b7;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.infoDetail_footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  .operations {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  div /deep/ .el-button--primary {
    background-color: #2682b7;
    border: 0;
  }
}
.inline_header {
  background: #fff;
}
.inline_header_card {
  background: #2682b7;
  .inline_title {
    color: #fff;
    font-size: 30px;
    word-spacing: 10px;
    letter-spacing: 5px;
    font-weight: normal;
  }
}
.inline_tableType {
  background: #2682b7;
  height: 60px;
  position: relative;
  margin-top: 20px;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /////小桌
  .firstfront {
    font-size: 28px;
    color: white;
    position: absolute;
    bottom: 10px;
    left: 15px;
  }
  /////(1-4人)
  .secondfront {
    color: white;
    position: absolute;
    bottom: 10px;
    left: 75px;
  }
  /////剩
  .thirdfront {
    color: white;
    position: absolute;
    bottom: 10px;
    right: 55px;
  }
  /////10
  .forthfront {
    font-size: 36px;
    color: white;
    position: absolute;
    bottom: 5px;
    right: 10px;
  }
}
.level2 {
  width: 100%;
  display: flex;
  justify-content: right;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-right: 20px;
}
.tableInfo {
  height: 200px;
  width: 250px;
  margin: 10px 5px;
  border-radius: 10px;
}

.cardTop {
  border-radius: 5px;
  overflow: hidden;
  height: 40%;
  width: 100%;
}
.cardBottom {
  width: 100%;
  height: 60%;
}

.tables {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.inline_info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .infoDetail {
    width: 100%;
    color: #303133;
    padding-left: 10px;
    font-weight: normal;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 22px;
    float: left;
    border-bottom: 1px dashed rgb(#bbbbbb);
    .firstrow {
      margin-top: 15px;
      .secondfront {
        font-size: 30px;
      }
    }
  }
}

.tableItem {
  display: inline-block;
  margin: 3px;
  width: 60px;
}
</style>
