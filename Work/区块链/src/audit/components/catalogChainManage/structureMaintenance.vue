<template>
  <div class="structureMaintenance">
    <div class="structureMaintenance-content">
      <div class="structureMaintenance-nav">
        <div class="nav-search">
          <el-form ref="navForm" :inline="true">
            <el-form-item style="width:62%">
              <el-input size="small" v-model="filterText" placeholder="输入关键字进行过滤"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="list-nav-menu">
          <el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree"
          ></el-tree>
        </div>
      </div>
      <div class="structureMaintenance-main">
        <!-- 查询框 -->
        <div class="list-content-filter">
          <el-form ref="form" :model="form" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="节点名称：">
                  <el-input v-model="form.nodeName" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="节点编码：">
                  <el-input v-model="form.nodeCode" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="btn-item">
                <el-form-item>
                  <el-button type="primary" size="small" @click="subCondition">搜索</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="创建时间：">
                  <el-date-picker
                    v-model="form.creatTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions"
                    style="width:100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="更新人：">
                  <el-input v-model="form.updater" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="btn-item">
                <el-form-item>
                  <el-button type="primary" size="small" plain @click="subCondition">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="是否公开：">
                  <el-select v-model="form.publicStatus" placeholder="请选择">
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="状态：">
                  <el-select v-model="form.state" placeholder="请选择">
                    <el-option label="审批中" value="shanghai"></el-option>
                    <el-option label="已完成" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 用户列表 -->
        <div class="list-content-main">
          <div class="add-user">
            <el-button type="primary" @click="userEdit()">新增</el-button>
            <el-button type="primary" plain @click="userEdit()">编辑</el-button>
            <el-button type="primary" plain @click="userEdit()">删除</el-button>
          </div>
          <div class="list-content-table">
            <el-table :data="processList" stripe style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="proId" label="流水号" sortable show-overflow-tooltip></el-table-column>
              <el-table-column prop="eventId" label="节点名称" sortable></el-table-column>
              <el-table-column prop="eventName" label="节点编码" sortable></el-table-column>
              <el-table-column prop="status" label="创建时间" sortable></el-table-column>
              <el-table-column prop="auditor" label="更新人" sortable></el-table-column>
              <el-table-column prop="auditor" label="是否公开" sortable></el-table-column>
              <el-table-column prop="auditor" label="状态" sortable></el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    class="c-blue"
                    size="small"
                    @click="userEdit(scope.row,true)"
                  >编辑</el-button>
                  <el-button
                    type="text"
                    class="c-red"
                    size="small"
                    @click="userDelete(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="list-content-pagenation">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "structureMaintenance",
  data() {
    return {
      filterText: "",
      // 查询框字段
      form: {
        nodeName: "",
        nodeCode: "",
        creatTime: "",
        updater: "",
        regipublicStatuson: "",
        state: ""
      },
      currentPage: 4,
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    processList() {
      return this.$store.state.Process.processList;
    }
  },
  methods: {
    // 导航
    handleChange(val) {
      console.log(val);
    },
    // 搜索
    subCondition() {
      alert("查询");
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    userEdit(){

    }
  }
};
</script>
<style lang="less" scoped>
.structureMaintenance {
  height: 100%;
  display: flex;
  flex-direction: column;
  .structureMaintenance-content {
    flex: 1;
    margin: 24px;
    display: flex;
    .structureMaintenance-nav {
      width: 260px;
      background: #fff;
      margin-right: 20px;
      padding: 8px 0 8px 16px;
      box-sizing: border-box;
      overflow-y: auto;
    }
    .structureMaintenance-main {
      flex: 1 1 auto;
      background: #fff;
      .list-content-filter {
        background: #ffffff;
        text-align: left;
        padding: 10px 20px;
      }
      .list-content-main {
        padding: 10px 30px;
        background: #fff;
        .add-user {
          margin-bottom: 25px;
        }
        .list-content-pagenation {
          margin-top: 35px;
          text-align: right;
          padding: 0 60px;
        }
      }
    }
  }
}
</style>
