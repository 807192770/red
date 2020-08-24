<template>
  <div class="alarm-management-details">
    <!-- 告警日志 -->
    <div class="main">
      <div class="list">
        <div class="search-box">
          <el-form :label-position="labelPosition" label-width="100px">
            <el-form-item label="起止时间：" class="item">
              <div class="date-box">
                <el-date-picker
                  v-model="dateValue"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
              <el-button class="sub-btn" type="primary">导出</el-button>
            </el-form-item>
            <el-form-item label="事件类型：">
              <el-checkbox-group v-model="typeList">
                <el-checkbox label="类型一"></el-checkbox>
                <el-checkbox label="类型二"></el-checkbox>
                <el-checkbox label="类型三"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
        <div class="item-list">
          <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column property="ID" label="标签ID" show-overflow-tooltip></el-table-column>
            <el-table-column property="date" label="告警时间"></el-table-column>
            <el-table-column property="reason" label="告警事由" width="90"></el-table-column>
            <el-table-column label="详情查看" width="90">
              <template slot-scope="scope">
                <el-button type="text" @click="handleEdit(scope.$index, scope.row)">详情地图</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                <el-select v-model="value" placeholder="更多" >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-list">
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
      </div>
      <div class="map">
        <div class="map-content">
          <!-- 寅时地图 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "left",
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
      dateValue: "",
      typeList: ["类型一", "类型二", "类型三"],
      tableData: [
        {
          ID: "标签0201060505405225",
          date: "2016/05/02/13:08",
          reason: "出界",
          ctrl: "更多",
          address: "详情地图"
        },
        {
          ID: "标签0201060505405225",
          date: "2016/05/02/13:08",
          reason: "出界",
          ctrl: "更多",
          address: "详情地图"
        },
        {
          ID: "标签0201060505405225",
          date: "2016/05/02/13:08",
          reason: "出界",
          ctrl: "更多",
          address: "详情地图"
        },
        {
          ID: "标签0201060505405225",
          date: "2016/05/02/13:08",
          reason: "出界",
          ctrl: "更多",
          address: "详情地图"
        }
      ],
      currentRow: null,
      options: [
        {
          value: "操作1",
          label: "操作1"
        },
        {
          value: "操作2",
          label: "操作2"
        },
        {
          value: "操作3",
          label: "操作3"
        }
      ],
      value: ""
    };
  },

  components: {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.alarm-management-details {
  display: flex;
  justify-content: center;
  .main {
    width: 80%;
    display: flex;
    .list /deep/ {
      flex: 0.6;
      background: white;
      padding: 20px 25px;
      .search-box {
        .el-form-item__label {
          padding-bottom: 0;
        }
        .item {
          .el-form-item__content {
            display: flex;
            .date-box {
              flex: 1;
              .el-date-editor {
                width: 90% !important;
                .el-range-separator {
                  width: 8% !important;
                }
              }
            }
            .sub-btn {
              margin-right: 60px;
            }
          }
        }
      }
      .item-list {
        table {
          th,
          td {
            text-align: center;
          }
        }
      }
      .page-list {
        text-align: center;
        margin-top: 25px;
      }
    }
    .map {
      margin-left: 25px;
      flex: 0.48;
      height: 700px;
    }
  }
}
</style>
