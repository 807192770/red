<template>
  <div class="history-track">
    <!-- 历史轨迹 -->
    <div class="main">
      <div class="main-header">
        <div class="left">
          <el-select v-model="bindingState" placeholder="应用类型" class="left-select" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-model="keyWords"
            placeholder="请输入名称/工牌ID/设备ID进行搜索"
            class="left-input"
            size="small"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" icon="el-icon-search" class="left-btn" size="small">搜索</el-button>
        </div>
      </div>
      <div class="main-content">
        <div class="table-data">
          <el-table class="table" :data="tableData" stripe style="width: 100%" size="mini">
            <el-table-column type="index" label="序号" width="70"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="id" label="工牌ID/设备ID"></el-table-column>
            <el-table-column prop="goodsId" label="工号/物品编号"></el-table-column>
            <el-table-column prop="depart" label="部门"></el-table-column>
            <el-table-column prop="subDepart" label="子部门"></el-table-column>
            <el-table-column prop="isDel" label="里程（m）"></el-table-column>
            <el-table-column label="操作" width="150" class="operate">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-map-location"
                  class="operate-btn"
                  @click="review(scope.row)"
                >追溯</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="40"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "resource-management-goods",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      bindingState: "",
      keyWords: "",
      currentPage: 4
    };
  },
  computed: {
    tableData() {
      return this.$store.getters.ResourceManagementIndexTable;
    }
  },
  mounted() {},

  methods: {
    // 追溯
    review(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang='scss' scoped>
.history-track {
  height: 100%;
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
    .main-header {
      padding: 10px 20px;
      background: #fff;
      border-bottom: 1px solid #dbdde1;
      display: flex;
      justify-content: space-between;
      .left {
        .left-select {
          width: 120px;
        }
        .left-input /deep/ {
          width: 280px;
          input::-webkit-input-placeholder {
            color: #9da8ce !important;
          }
          input::-moz-input-placeholder {
            color: #9da8ce !important;
          }
          input::-ms-input-placeholder {
            color: #9da8ce !important;
          }
        }
      }
    }
    .main-content {
      flex: 1;
      width: 100%;
      position: relative;
      .table-data {
        position: absolute;
        width: 100%;
        padding: 10px 20px;
        .table {
          .operate-btn {
            font-size: 12px;
            color: #333;
          }
        }
        .pagination {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>