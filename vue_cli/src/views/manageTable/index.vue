<template>
  <div >
    <div style="text-align: right">
      <el-button @click="openAddingDialog" style="margin: 10px" type="primary">添加餐桌</el-button>
    </div>
    <el-collapse>
      <el-collapse-item v-for="(tableGroup, index) in tableCategories" :name="index" :key="index">
        <template slot="title">
          <div class="header" style="text-align: right; display: flex">
            <div style="width: 50px; font-size: 25px; color: #FFFFFF">
              {{ tableGroup.type }}
            </div>
            <div style="width: 70px; font-size: 10px;color: #FFFFFF">
              ( {{ tableGroup.headRange }} )
            </div>
            <div style="width: 300px; font-size: 15px;color: #FFFFFF">
              总计：{{ tableInfo.filter(table => table.size === tableGroup.size).length }}
            </div>
            <div style="width: 300px;color: #FFFFFF">
              展开
            </div>
          </div>
        </template>
        <el-table
          :data="tableInfo.filter(table => table.size === tableGroup.size)"
          style="width: 100%; margin-left: 30px"
        >
<!--          <el-table-column type="index" width="100"/>-->
          <el-table-column prop="id" label="餐桌序号" width="200px">
          </el-table-column>
          <el-table-column label="餐桌尺寸" width="300px">
            <template>
              <span>
                {{ tableGroup.type }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="tableName" label="餐桌名" width="300px">
          </el-table-column>
          <el-table-column label="操作" width="300px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="openEditDialog(scope.row, scope.row.id)"
              >修改
              </el-button>
              <el-button
                size="mini"
                @click="handleDelete(scope.row, scope.row.id)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>

    <!--  编辑餐桌 对话框  -->
    <el-dialog
      title="编辑餐桌"
      :visible.sync="isEditing"
      width="30%">
      <el-form ref="form" :model="curEditingTable" label-width="80px">
        <el-form-item label="餐桌名称">
          <el-input v-model="curEditingTable.tableName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="餐桌类型">
          <el-select v-model="curEditingTable.size" placeholder="请选择餐桌类型" style="width: 250px">
            <el-option v-for="tableOption in tableCategories"
                       :key="tableOption.size"
                       :label="tableOption.type"
                       :value="tableOption.size"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEditing = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定 修 改</el-button>
      </span>
    </el-dialog>
    <!--  添加餐桌 对话框  -->
    <el-dialog
      title="添加餐桌"
      :visible.sync="isAdding"
      width="30%">
      <el-form ref="form" :model="curEditingTable" label-width="80px">
        <el-form-item label="餐桌名称">
          <el-input v-model="curEditingTable.tableName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="餐桌类型">
          <el-select v-model="curEditingTable.size" placeholder="请选择餐桌类型" style="width: 250px">
            <el-option v-for="tableOption in tableCategories"
                       :key="tableOption.size"
                       :label="tableOption.type"
                       :value="tableOption.size"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAdding = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdding">确 定 添 加</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableCategories: [
        {
          size: 'A',
          headRange: '1~4人',
          type: '小桌'
        }, {
          size: 'B',
          headRange: '5~8人',
          type: '中桌'
        }, {
          size: 'C',
          headRange: '9~12人',
          type: '大桌'
        }, {
          size: 'D',
          headRange: '9~12人',
          type: '包间'
        }],
      tableInfo: [
        {
          id: 1,
          size: 'A',
          tableName: '阳春'
        },
        {
          id: 2,
          size: 'A',
          tableName: '白雪'
        },
        {
          id: 3,
          size: 'A',
          tableName: '下里'
        },
        {
          id: 4,
          size: 'A',
          tableName: '巴人'
        },
        {
          id: 5,
          size: 'A',
          tableName: '富贵'
        },
        {
          id: 6,
          size: 'A',
          tableName: '清闲'
        },
        {
          id: 7,
          size: 'A',
          tableName: '阳春'
        },
        {
          id: 8,
          size: 'A',
          tableName: '白雪'
        },
        {
          id: 9,
          size: 'B',
          tableName: '下里'
        },
        {
          id: 10,
          size: 'B',
          tableName: '巴人'
        },
        {
          id: 11,
          size: 'B',
          tableName: '富贵'
        },
        {
          id: 12,
          size: 'B',
          tableName: '清闲'
        },
        {
          id: 13,
          size: 'B',
          tableName: '富贵'
        },
        {
          id: 14,
          size: 'C',
          tableName: '清闲'
        },
        {
          id: 15,
          size: 'C',
          tableName: '阳春'
        },
        {
          id: 16,
          size: 'C',
          tableName: '白雪'
        },
        {
          id: 17,
          size: 'C',
          tableName: '下里'
        },
        {
          id: 18,
          size: 'D',
          tableName: '巴人'
        },
        {
          id: 19,
          size: 'D',
          tableName: '富贵'
        },
        {
          id: 20,
          size: 'D',
          tableName: '清闲'
        }
      ],
      curEditingTable: {},
      isEditing: false,
      isAdding: false
    }
  },
  name: 'manageTable',
  mounted() {
  },
  methods: {
    handleDelete(row, index) {
      this.$confirm('此操作将删除该餐桌, 并重新给其他餐桌编号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO: 生成删除后的餐桌信息
        const tableInfo = this.tableInfo.filter((table) => table.id !== row.id)
        for (const [i, table] of tableInfo.entries()) {
          table.id = i + 1
        }
        // TODO: 将生成的tableInfo传到服务器
        this.uploadTableInfo(tableInfo)

        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    openEditDialog(row, index) {
      this.curEditingTable = row
      this.isEditing = true
    },
    openAddingDialog() {
      this.isAdding = true
    },
    confirmEdit() {
      // TODO: 生成编辑后的餐桌信息
      this.tableInfo[this.curEditingTable.id - 1] = this.curEditingTable
      this.uploadTableInfo(this.tableInfo)
      this.isEditing = false
    },
    confirmAdding() {
      // TODO: 生成编辑后的餐桌信息
      this.tableInfo[this.curEditingTable.id - 1] = this.curEditingTable
      this.uploadTableInfo(this.tableInfo)
      this.isAdding = false
    },
    uploadTableInfo(tableInfo) {
    }
  }
}
</script>

<style scoped>
el-table {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

el-collapse-item {
  margin-top: 30px;
  margin-bottom: 50px;
  border-radius: 5px;
}

.header {
  width: 100%;
  height: 100%;
  padding-left: 20px;
  background: #5470ff;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;

  div {
    height: 100%;
    vertical-align: middle;
    line-height: 45px;
  }
}
</style>
