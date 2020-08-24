<template>
  <div class="addPatrolManagement">
    <!-- 新建巡检 -->
    <div class="item">
      <h4 class="subTitle">
        新增巡检任务
        <el-button type="primary" size="medium">提交任务</el-button>
      </h4>
      <div class="key-box">
        <div class="item-key">
          <h5>巡检任务</h5>
          <div class="form">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="任务名称：">
                <el-input v-model="formInline.user" style="width:320px;"></el-input>
              </el-form-item>
              <el-form-item label="起止时间：">
                <div class="date-box">
                  <el-date-picker
                    v-model="formInline.dateValue"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="item-key">
          <h5>
            巡检标签
            <div class="btn-box">
              <el-button
                type="primary"
                size="medium "
                @click="dialogFormVisible = true"
                icon="el-icon-plus"
              >添加</el-button>
              <el-button type="primary" size="medium " plain icon="el-icon-download">导入</el-button>
            </div>
          </h5>
          <div class="form">
            <el-form
              :model="formInline"
              class="demo-form-inline"
              :label-position="labelPosition"
            >
              <el-col :span="7">
                <el-form-item label="标签ID：">
                  <el-input placeholder="请输入搜索内容" v-model="searchKey" class="search-box">
                    <a slot="suffix" class="el-input__icon el-icon-search"></a>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="按类型选择：">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="按区域选择：">
                  <el-select v-model="formInline.building" style="width:32%">
                    <el-option label="京东亦庄" value="shanghai"></el-option>
                    <el-option label="京东亦庄" value="beijing"></el-option>
                  </el-select>
                  <el-select v-model="formInline.floor" style="width:32%">
                    <el-option label="一层" value="shanghai"></el-option>
                    <el-option label="二层" value="beijing"></el-option>
                  </el-select>
                  <el-select v-model="formInline.office" style="width:32%">
                    <el-option label="办公室" value="shanghai"></el-option>
                    <el-option label="办公室" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </div>
      </div>
      <div class="table-box">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @select-all="cli"
        >
          <el-table-column type="selection" ></el-table-column>
          <el-table-column type="index" label="序号" ></el-table-column>
          <el-table-column label="标签ID" >
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="标签类型" ></el-table-column>
          <el-table-column prop="address" label="标签区域" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button  type="text" @click="deleteRow(scope.$index, tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="ctrl">
          <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
          <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
          <div class="all-box">
            <el-checkbox v-model="checked" class="allChecked">全选</el-checkbox>
            <el-button @click>批量删除</el-button>
          </div>
          <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="新增巡检标签" :visible.sync="dialogFormVisible" width="450px" class="pop">
      <el-form :model="form" :label-position="subLabelPosition">
        <div class="subForm-item">
          <h5>逐个添加</h5>
          <el-form-item label="标签ID：" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="subForm-item">
          <h5>批量添加</h5>
          <el-form-item label="按类型添加：" :label-width="formLabelWidth" style="margin-bottom:0">
            <el-select v-model="form.region" style="width:100%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按区域添加：" :label-width="formLabelWidth">
            <el-select v-model="form.region" style="margin-right:2%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" style="margin-right:2%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      subLabelPosition: "top",
      formInline: {
        user: "",
        dateValue: "",
        building:"",
        floor:"",
        office:''
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchKey: "",
      options: [
        {
          value: "选项1",
          label: "选项1"
        },
        {
          value: "选项2",
          label: "选项2"
        },
        {
          value: "选项3",
          label: "选项3"
        },
        {
          value: "选项4",
          label: "选项4"
        },
        {
          value: "选项5",
          label: "选项5"
        }
      ],
      value: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      checked: false,
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "80px"
    };
  },

  components: {},

  mounted() {},

  methods: {
    cli(){
      alert(3)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  }
};
</script>
<style lang='scss' scoped>
.addPatrolManagement {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  .item {
    .subTitle {
      width: 100%;
      font-size: 22px;
      color: #a0a0a0;
      line-height: 55px;
      border-bottom: 1px solid #e2e2e2;
      padding-left: 25px;
      padding-bottom: 15px;
      button {
        float: right;
        // width: 125px;
        //       height: 40px;
        //       line-height: 10px;
      }
    }
    .key-box {
      padding: 0 25px;
      .item-key {
        padding: 20px 0 5px 0;
        &:nth-child(2n + 1) {
          border-bottom: 1px solid #e2e2e2;
        }
        h5 {
          font-size: 20px;
          margin-bottom: 20px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          .btn-box {
            button {
              // width: 125px;
              // height: 40px;
              // line-height: 10px;
            }
          }
        }
        .form {
          .demo-form-inline {
            display: flex;
            justify-content: space-between;
            .date-box /deep/ {
              .el-range-separator {
                width: 8%;
              }
            }
            .el-form-item {
              margin-right: 0;
              .el-select {
                // width: 130px;
              }
              .el-input {
                // width: 200px;
              }
            }
          }
        }
      }
    }
    .table-box {
      .ctrl {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .allChecked {
          margin: 0 18px;
        }
      }
    }
  }
  .pop {
    .subForm-item {
      h5 {
        font-weight: 600;
        font-size: 20px;
      }
      .el-form-item /deep/ {
        .el-form-item__label {
          padding: 0;
          margin-top: 10px;
        }
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
