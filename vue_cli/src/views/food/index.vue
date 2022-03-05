<template>
  <el-row class="home" :gutter="20">
    <div class="operation">
      <div>
        <p style="margin-left: 20px; color: #545c64">查找到{{ find }}条</p>
      </div>
      <div style="margin-right: 20px; display: flex">
        <el-input placeholder="请输入内容" v-model="input" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button plain style="margin-left: 20px" @click="activeAddFoodDialog"
          >上架菜品</el-button
        >
        <el-dialog title="上架菜品" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="菜品名称">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="form.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-select
                @change="handleChange"
                v-model="selectVal"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                action=" "
                :show-file-list="false"
                :auto-upload="false"
                :on-change="uploadFiles"
                :on-success="handle_success"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <div style="justify-content: left">个性化设置</div>
              <el-card v-for="item in perSet" :key="item.id">
                <el-row justify="end">
                  <el-col span="5">
                    <el-input v-model="inputMemo" placeholder="请输入内容">
                    </el-input>
                  </el-col>
                  <el-col span="19">
                    <el-row>
                      <el-input
                        v-model="inputMemo"
                        placeholder="请输入内容"
                        style="width: 30%"
                      >
                      </el-input>
                      <el-input
                        v-model="inputMemo"
                        placeholder="请输入内容"
                        style="width: 30%"
                      >
                      </el-input>
                      <el-input
                        v-model="inputMemo"
                        placeholder="请输入内容"
                        style="width: 30%"
                      >
                      </el-input>
                    </el-row>
                    <el-row>
                      <el-input
                        v-model="inputMemo"
                        placeholder="请输入内容"
                        style="width: 30%"
                      >
                      </el-input>
                      <el-input
                        v-model="inputMemo"
                        placeholder="请输入内容"
                        style="width: 30%"
                      >
                      </el-input>
                      <el-input
                        v-model="inputMemo"
                        placeholder="请输入内容"
                        style="width: 30%"
                      >
                      </el-input>
                    </el-row>
                  </el-col>
                  <el-col>
                    <i class="el-icon-delete" @click="delSet()"></i>
                  </el-col>
                </el-row>
              </el-card>
              <el-button type="primary" @click="addSet()">增加属性</el-button>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAdd()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <el-col :span="24">
      <el-card style="margin-top: 20px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号" width="100" sortable="true">
          </el-table-column>
          <el-table-column prop="name" label="菜品名称" width="150">
          </el-table-column>
          <el-table-column label="菜品图片" width="200">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <img :src="scope.row.img" style="width: 150px; height: 150px" />
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" style="color: #3a96ff">查看图片</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="菜品类别" width="150">
          </el-table-column>
          <el-table-column prop="price" label="菜品价格" width="150">
          </el-table-column>
          <el-table-column prop="flavour" label="菜品描述" width="200">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-dialog title="更新菜品" :visible.sync="dialogChangeVisible">
                <el-form :model="form">
                  <el-form-item label="菜品名称">
                    <el-input
                      v-model="formChange.name"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="价格">
                    <el-input
                      v-model="formChange.price"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="类别">
                    <el-select
                      @change="handleChange"
                      v-model="selectVal"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="图片">
                    <el-upload
                      class="avatar-uploader"
                      action=" "
                      :show-file-list="false"
                      :auto-upload="false"
                      :on-change="uploadFiles"
                      :on-success="handle_success"
                    >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item>
                    <div style="justify-content: left">个性化设置</div>
                    <el-card v-for="item in perSet" :key="item.id">
                      <el-row justify="end">
                        <el-col span="5">
                          <el-input
                            v-model="inputMemo"
                            placeholder="请输入内容"
                          >
                          </el-input>
                        </el-col>
                        <el-col span="19">
                          <el-row>
                            <el-input
                              v-model="inputMemo"
                              placeholder="请输入内容"
                              style="width: 30%"
                            >
                            </el-input>
                            <el-input
                              v-model="inputMemo"
                              placeholder="请输入内容"
                              style="width: 30%"
                            >
                            </el-input>
                            <el-input
                              v-model="inputMemo"
                              placeholder="请输入内容"
                              style="width: 30%"
                            >
                            </el-input>
                          </el-row>
                          <el-row>
                            <el-input
                              v-model="inputMemo"
                              placeholder="请输入内容"
                              style="width: 30%"
                            >
                            </el-input>
                            <el-input
                              v-model="inputMemo"
                              placeholder="请输入内容"
                              style="width: 30%"
                            >
                            </el-input>
                            <el-input
                              v-model="inputMemo"
                              placeholder="请输入内容"
                              style="width: 30%"
                            >
                            </el-input>
                          </el-row>
                        </el-col>
                        <el-col>
                          <i class="el-icon-delete" @click="delSet()"></i>
                        </el-col>
                      </el-row>
                    </el-card>
                    <el-button type="primary" @click="addSet()"
                      >增加属性</el-button
                    >
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
import { getAllFood } from "../../../api/data.js";
import { addFood } from "../../../api/data.js";
import { upload } from "../../../api/data.js";
import { updateFood } from "../../../api/data.js";
import { deleteFood } from "../../../api/data.js";
export default {
  name: "home",
  data() {
    return {
      perSet: [],
      inputMemo: "",
      selectVal: this.value || "",
      input: "",
      find: "",
      dialogFormVisible: false,
      dialogChangeVisible: false,
      form: {
        name: "",
        price: "",
      },
      formChange: {
        name: "",
        price: "",
        imageUrl: "",
        type: "",
        id: "",
      },
      imageUrl: "",
      tableData: [
        // {
        //   index: "1",
        //   name: "麻婆豆腐",
        //   img: require("../../assets/images/logo.png"),
        //   type: "素菜",
        //   price: "12",
        //   describe: "好吃！",
        //   operation: "哇哩哇",
        // },
        // {
        //   index: "0",
        //   name: "麻婆豆腐",
        //   img: require("../../assets/images/logo.png"),
        //   type: "素菜",
        //   price: "12",
        //   describe: "好吃！",
        //   operation: "哇哩哇",
        // },
      ],
      options: [
        {
          value: "选项1",
          label: "荤菜",
        },
        {
          value: "选项2",
          label: "素菜",
        },
        {
          value: "选项3",
          label: "汤类",
        },
        {
          value: "选项4",
          label: "小吃",
        },
        {
          value: "选项5",
          label: "饮品",
        },
      ],
      value: "",
      fileList: [],
      flavour: [],
    };
  },
  mounted() {
    this.getFoodData();
  },
  methods: {
    delSet() {
      this.perSet.splice(this.perSet.length - 1, 1);
    },
    ///////////////////////上架菜品的dialog打开事件
    activeAddFoodDialog() {
      this.dialogFormVisible = true;
      this.perSet.length = 0;
    },
    addSet() {
      console.log(this.perSet);
      var a = this.perSet.length;
      var body = {
        id: a + 1,
      };
      this.perSet.push(body);
      console.log(this.perSet);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将删除该菜品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var body = {
            id: "",
          };
          body.id = row.id;
          console.log(body.id);
          deleteFood(body).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.tableData.length = 0;
              this.getFoodData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEdit(index, row) {
      this.dialogChangeVisible = true;
      this.formChange.name = row.name;
      this.formChange.price = row.price;
      this.imageUrl = row.img;
      this.formChange.id = row.id;
      this.selectVal = row.type;
    },
    handleEditSure() {
      this.dialogChangeVisible = false;
      var body = {
        id: this.formChange.id,
        name: this.formChange.name,
        price: this.formChange.price,
        imageUrl: this.imageUrl,
        category: this.selectVal,
      };
      console.log(body);
      updateFood(body).then((res) => {
        console.log(res);
        this.tableData.length = 0;
        this.getFoodData();
      });
    },
    uploadFiles(file, _) {
      const fd = new FormData();
      fd.append("file", file.raw);
      upload(fd).then((res) => {
        console.log(res);
        this.imageUrl = res.data.data.fileUrl;
      });
    },
    handle_success(res) {
      console.log(res);
      this.$message.success("图片上传成功");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(data) {
      //如果上面:value赋的是对象，则可以将返回的对象赋予其他变量，这里的data是选中的对象，那么data.label则是reasonTypes中的label值，如果下拉中选中美国，那么this.selectVal 值为“美国”
      this.selectVal = data.label;
    },
    handleAdd() {
      var body = {
        name: "",
        price: "",
        imageUrl: "",
        category: "",
      };
      body.name = this.form.name;
      body.price = this.form.price;
      body.imageUrl = this.imageUrl;
      body.category = this.selectVal;
      addFood(body).then((res) => {
        console.log(res);
        this.dialogFormVisible = false;
        this.tableData.length = 0;
        this.getFoodData();
      });
    },
    getFoodData() {
      getAllFood()
        .then((res) => {
          console.log(res);
          this.find = res.data.data.length;

          for (let i = 0; i <= res.data.data.length; i++) {
            var flavour = "";
            for (let j = 0; j < res.data.data[i].flavour.length; j++) {
              flavour =
                flavour + (j == 0)
                  ? res.data.data[i].flavour[j].key + ":"
                  : ";" + res.data.data[i].flavour[j].key + ":";
              for (
                let k = 0;
                k < res.data.data[i].flavour[j].value.length;
                k++
              ) {
                if (k == res.data.data[i].flavour[j].value.length - 1) {
                  flavour =
                    flavour + res.data.data[i].flavour[j].value[k] + ";";
                } else {
                  flavour =
                    flavour + res.data.data[i].flavour[j].value[k] + ",";
                }
              }
            }
            this.flavour.push(flavour);
            var item = {
              id: res.data.data[i].id,
              name: res.data.data[i].name,
              type: res.data.data[i].category,
              price: res.data.data[i].price,
              img: res.data.data[i].imageUrl,
              flavour: this.flavour[i],
            };

            this.tableData.push(item);
          }
        })
        .catch((error) => {
          console.log(error.response.data.reason);
        });
    },
  },
};
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
