<template>
  <el-row class="home" :gutter="20">
    <div class="operation">
      <div>
        <p style="margin-left: 20px; color: #545c64">查找到{{ find }}条</p>
      </div>
      <div style="margin-right: 20px; display: flex">
        <el-input placeholder="请输入内容" v-model="searchInput" @input="onSearchInput" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button plain style="margin-left: 20px" @click="activeAddFoodDialog"
          >上架菜品</el-button
        >
        <el-dialog title="上架菜品" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="addRules">
            <el-form-item label="菜品名称" prop="name">
              <el-input v-model="form.name" autocomplete="off"></el-input>
              <!-- <el-alert
                v-show="alertBlankVisible"
                title="菜名不能为空！"
                type="error"
                show-icon
                :closable="false"
              ></el-alert>
              <el-alert
                v-show="alertAgainVisible"
                title="与已有菜名重复，请更改！"
                type="error"
                show-icon
                :closable="false"
              ></el-alert>
              <el-alert
                v-show="alertContentVisible"
                title="输入内容不满足格式，必须包含汉字、英文字母中至少一种！"
                type="error"
                show-icon
                :closable="false"
              ></el-alert> -->
            </el-form-item>
            <el-form-item label="价格" prop="price">
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
            <el-form-item label="图片" prop="iamge">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
              <!-- <el-upload
                class="avatar-uploader"
                action=" "
                :show-file-list="false"
                :auto-upload="false"
                :on-preview="handlePreview"
                :limit="1"
                :file-list="fileList"
                :on-change="uploadFiles"
                :before-remove="beforeRemove"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
              </el-upload> -->
            </el-form-item>
            <el-form-item>
              <div style="justify-content: left">个性化设置</div>
              <el-card v-for="item in perSet" :key="item.id">
                <el-row justify="end">
                  <el-col :span="5">
                    <el-input v-model="item.key" placeholder="属性名">
                    </el-input>
                  </el-col>
                  <el-col :span="19">
                    <el-row>
                      <el-input
                        v-model="item.value1"
                        placeholder="属性值1"
                        style="width: 30%"
                      >
                      </el-input>
                      <el-input
                        v-model="item.value2"
                        placeholder="属性值2"
                        style="width: 30%"
                      >
                      </el-input>
                      <el-input
                        v-model="item.value3"
                        placeholder="属性值3"
                        style="width: 30%"
                      >
                      </el-input>
                    </el-row>
                    <el-row>
                      <el-input
                        v-model="item.value4"
                        placeholder="属性值4"
                        style="width: 30%"
                      >
                      </el-input>
                      <el-input
                        v-model="item.value5"
                        placeholder="属性值5"
                        style="width: 30%"
                      >
                      </el-input>
                      <el-input
                        v-model="item.value6"
                        placeholder="属性值6"
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
            <el-button type="primary" @click="handleAdd()">确定添加</el-button>
            <el-button @click="dialogFormVisible = false">保存并退出</el-button>
            <el-button @click="clearForm">退 出</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <el-col :span="24">
      <el-card style="margin-top: 20px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="name" label="菜品名称" width="150">
          </el-table-column>
          <el-table-column label="菜品图片" width="150">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <img :src="scope.row.img" style="width: 150px; height: 150px" />
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" style="color: #3a96ff">查看图片</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="菜品类别" width="150" sortable>
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
                    <el-card v-for="item in perChange" :key="item.id">
                      <el-row justify="end">
                        <el-col :span="5">
                          <el-input v-model="item.key" placeholder="属性名">
                          </el-input>
                        </el-col>
                        <el-col :span="19">
                          <el-row>
                            <el-input
                              v-model="item.value1"
                              placeholder="属性值1"
                              style="width: 30%"
                            >
                            </el-input>
                            <el-input
                              v-model="item.value2"
                              placeholder="属性值2"
                              style="width: 30%"
                            >
                            </el-input>
                            <el-input
                              v-model="item.value3"
                              placeholder="属性值3"
                              style="width: 30%"
                            >
                            </el-input>
                          </el-row>
                          <el-row>
                            <el-input
                              v-model="item.value4"
                              placeholder="属性值4"
                              style="width: 30%"
                            >
                            </el-input>
                            <el-input
                              v-model="item.value5"
                              placeholder="属性值5"
                              style="width: 30%"
                            >
                            </el-input>
                            <el-input
                              v-model="item.value6"
                              placeholder="属性值6"
                              style="width: 30%"
                            >
                            </el-input>
                          </el-row>
                        </el-col>
                        <el-col>
                          <i class="el-icon-delete" @click="delChange()"></i>
                        </el-col>
                      </el-row>
                    </el-card>
                    <el-button type="primary" @click="addChange()"
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

import pinyin from "pinyin";

export default {
  name: "home",
  data() {
    var checkName = (rule, value, callback) => {
      if (!/^[\u4e00-\u9fa5]/.test(value) && !/^[a-zA-Z]/.test(value)) {
        callback(
          new Error("输入内容不满足格式，必须包含汉字、英文字母中至少一种！")
        );
      } else {
        this.tableData.forEach((element) => {
          if (element.name === value) {
            callback(new Error("与已有菜名重复，请更改！"));
          }
        });
        callback();
      }
    };
    var checkNum = (rule, value, callback) => {
      let numReg = /^\d+$/;
      if (!value) {
        callback(new Error("请输入数字"));
      } else {
        if (numReg.test(value)) {
          //如果是数字
          callback();
        } else {
          callback(
            new Error("输入内容不满足格式，必须是非负，小数点后最多保留一位")
          );
        }
      }
    };
    var checkImage = (rule, value, callback) => {
      console.log("value", value);
      let numReg = /^\d+$/;
      if (!value) {
        callback(new Error("请输入数字"));
      } else {
        if (numReg.test(value)) {
          //如果是数字
          callback();
        } else {
          callback(
            new Error("输入内容不满足格式，必须是非负，小数点后最多保留一位")
          );
        }
      }
    };
    return {
      addRules: {
        name: [
          { required: true, message: "该内容不能为空！", trigger: "blur" },
          { validator: checkName, trigger: "blur" },
        ],
        price: [
          { required: true, message: "该内容不能为空！", trigger: "blur" },
          { validator: checkNum, trigger: "blur" },
        ],
        image: [
          { required: true, message: "该内容不能为空！", trigger: "blur" },
          { validator: checkImage, trigger: "blur" },
        ],
      },
      perChange: [],
      perSet: [],
      selectVal: this.value || "",
      find: "",
      dialogFormVisible: false,
      dialogChangeVisible: false,
      alertBlankVisible: false,
      alertAgainVisible: false,
      alertContentVisible: false,
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
      searchInput: "",
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
      fullTableData: [],
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
        {
          value: "选项6",
          label: "主食",
        },
      ],
      value: "",
     fileList: [],
      flavour: [],
      /////////////////////////allfood///////////
      allFood: [],
    };
  },
  mounted() {
    this.getFoodData();
  },
  methods: {
    /////////////////////////清空表单////////////////////
    clearForm() {
      this.form.name = "";
      this.form.price = "";
      this.fileList.length = 0
      this.selectVal = ''
      this.dialogFormVisible = false;
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
      this.perChange.splice(this.perChange.length - 1, 1);
    },
    addChange() {
      var a = this.perChange.length;
      var body = {
        id: a,
      };
      this.perChange.push(body);
    },
    delSet() {
      this.perSet.splice(this.perSet.length - 1, 1);
    },
    ///////////////////////上架菜品的dialog打开事件
    activeAddFoodDialog() {
      this.dialogFormVisible = true;
      this.perSet.length = 0;
    },
    addSet() {
      var a = this.perSet.length;
      var body = {
        id: a + 1,
      };
      this.perSet.push(body);
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
      let id = row.id;
      console.log(id);
      this.perChange.length = 0;
      if (this.allFood[id - 1].flavour != null) {
        for (let i = 0; i < this.allFood[id - 1].flavour.length; i++) {
          let body = {
            id: i,
            key: this.allFood[id - 1].flavour[i].key,
            value1: null,
            value2: null,
            value3: null,
            value4: null,
            value5: null,
            value6: null,
          };
          if (this.allFood[id - 1].flavour[i].value[0] != null) {
            body.value1 = this.allFood[id - 1].flavour[i].value[0];
          }
          if (this.allFood[id - 1].flavour[i].value[1] != null) {
            body.value2 = this.allFood[id - 1].flavour[i].value[1];
          }
          if (this.allFood[id - 1].flavour[i].value[2] != null) {
            body.value3 = this.allFood[id - 1].flavour[i].value[2];
          }
          if (this.allFood[id - 1].flavour[i].value[3] != null) {
            body.value4 = this.allFood[id - 1].flavour[i].value[3];
          }
          if (this.allFood[id - 1].flavour[i].value[4] != null) {
            body.value5 = this.allFood[id - 1].flavour[i].value[4];
          }
          if (this.allFood[id - 1].flavour[i].value[5] != null) {
            body.value6 = this.allFood[id - 1].flavour[i].value[5];
          }
          console.log(body);
          this.perChange.push(body);
        }
        console.log(this.perChange);
      }
    },
    handleEditSure() {
      this.dialogChangeVisible = false;
      var body = {
        id: this.formChange.id,
        name: this.formChange.name,
        price: this.formChange.price,
        imageUrl: this.imageUrl,
        category: this.selectVal,
        flavour: [],
      };
      for (let i = 0; i < this.perChange.length; i++) {
        var body1 = {
          key: this.perChange[i].key,
          value: [],
        };
        if (this.perChange[i].value1 != null) {
          body1.value.push(this.perChange[i].value1);
        }
        if (this.perChange[i].value2 != null) {
          body1.value.push(this.perChange[i].value2);
        }
        if (this.perChange[i].value3 != null) {
          body1.value.push(this.perChange[i].value3);
        }
        if (this.perChange[i].value4 != null) {
          body1.value.push(this.perChange[i].value4);
        }
        if (this.perChange[i].value5 != null) {
          body1.value.push(this.perChange[i].value5);
        }
        if (this.perChange[i].value6 != null) {
          body1.value.push(this.perChange[i].value6);
        }
        body.flavour.push(body1);
      }
      console.log(body);
      updateFood(body).then((res) => {
        console.log(res);
        this.tableData.length = 0;
        this.getFoodData();
      });
    },
    uploadFiles(file, _) {
      let fileTest = file.name.substring(file.name.lastIndexOf(".") + 1);
      let allowFile = ["png", "jpg", "jpeg", "js", "css", "html"];
      console.log("fileTest", fileTest);
      if (allowFile.indexOf(fileTest) === -1) {
        this.$message.error("文件格式不符合要求，请重新上传。");
        return false;
      }

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
      console.log("????");
      //sessionStorage.setItem
    },
    handleExceed(files, fileList) {
      //原来这么简单就可以弹框啊
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
      console.log(this.perSet);
      var body = {
        name: "",
        price: "",
        imageUrl: "",
        category: "",
        flavour: [],
      };
      body.name = this.form.name;
      body.price = this.form.price;
      body.imageUrl = this.imageUrl;
      body.category = this.selectVal;
      for (let i = 0; i < this.perSet.length; i++) {
        var body1 = {
          key: this.perSet[i].key,
          value: [],
        };
        if (this.perSet[i].value1 != null) {
          body1.value.push(this.perSet[i].value1);
        }
        if (this.perSet[i].value2 != null) {
          body1.value.push(this.perSet[i].value2);
        }
        if (this.perSet[i].value3 != null) {
          body1.value.push(this.perSet[i].value3);
        }
        if (this.perSet[i].value4 != null) {
          body1.value.push(this.perSet[i].value4);
        }
        if (this.perSet[i].value5 != null) {
          body1.value.push(this.perSet[i].value5);
        }
        if (this.perSet[i].value6 != null) {
          body1.value.push(this.perSet[i].value6);
        }
        body.flavour.push(body1);
      }
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
          this.allFood = res.data.data;
          res.data.data = res.data.data.filter((i) => {
            return !i.deleted;
          });

          console.log(this.allFood);

          this.find = res.data.data.length;

          for (let i = 0; i < res.data.data.length; i++) {
            let flavour = "";
            if (res.data.data[i].flavour !== null) {
              for (let j = 0; j < res.data.data[i].flavour.length; j++) {
                flavour = flavour + res.data.data[i].flavour[j].key + "：";
                for (
                  let k = 0;
                  k < res.data.data[i].flavour[j].value.length;
                  k++
                ) {
                  if (k == res.data.data[i].flavour[j].value.length - 1) {
                    flavour =
                      flavour + res.data.data[i].flavour[j].value[k] + "；";
                  } else {
                    flavour =
                      flavour + res.data.data[i].flavour[j].value[k] + "，";
                  }
                }
              }
            }
            if (res.data.data[i].deleted === false) {
              let item = {
                id: res.data.data[i].id,
                name: res.data.data[i].name,
                type: res.data.data[i].category,
                price: res.data.data[i].price,
                img: res.data.data[i].imageUrl,
                flavour: flavour,
              };
              this.tableData.push(item);
            }
          }
          this.fullTableData = this.tableData;
        })
        .catch((error) => {
          console.log(error.response.data.reason);
        });
    },

    onSearchInput(value) {
      if (value === "") {
        this.tableData = this.fullTableData;
      } else if (/^[\u4e00-\u9fa5]+$/.test(value)) {
        this.tableData = this.fullTableData.filter((item) => {
          return item.name.includes(value);
        });
      } else if (/^[a-zA-Z]+$/.test(value)) {
        this.tableData = 
          this.fullTableData.filter((item) => {
            return pinyin(item.name, {
              style: pinyin.STYLE_FIRST_LETTER,
            }).reduce((acc, cur) => acc + cur[0], '').startsWith(value);
          }).concat(
          this.fullTableData.filter((item) => {
            const py = pinyin(item.name, {
              style: pinyin.STYLE_FIRST_LETTER,
            }).reduce((acc, cur) => acc + cur[0], '');
            return !py.startsWith(value) && py.includes(value);
          }));
      } else if (/^\d+$/.test(value)) {
        this.tableData = this.fullTableData.filter((item) => {
          return item.id === Number(value);
        });
      } else {
        this.tableData = [];
      }
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
