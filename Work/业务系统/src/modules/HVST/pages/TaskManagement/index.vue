<template>
  <!-- 任务管理 -->
  <div class="task-box">
    <div class="total">
      <div class="task-total">
        <h3 class="title">
          <img :src="require('../../assets/images/total-1.png')" alt >
          任务统计
        </h3>
        <div class="content">
          <span v-for="(val,key,i) in taskCount" :key="i">
            {{ key }}
            <i>{{ val }}个</i>
          </span>
        </div>
      </div>
      <div class="onLine-total">
        <h3 class="title">
          <img :src="require('../../assets/images/total-2.png')" alt >
          设备统计
        </h3>
        <div class="content">
          <span v-for="item in statList" :key="item.id">
            {{ item.dname }}
            <i>{{ item.allCount }}个</i>
          </span>
        </div>
      </div>
    </div>
    <div :class="{'open':openMap}" class="task-management">
      <div class="tran-3 map-container">
        <!-- 地图区 -->
        <showMap ref="showMap" :key="timer" :table-data="pageTable" :center-point="centerPoint" />
        <!-- 操作按钮 -->
        <div class="ctrl-btn" @click="dragContent">
          <i :class="[ openMap ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right' ]"/>
        </div>
      </div>
      <div class="tran-3 content-container">
        <section class="section">
          <!-- 搜索区 -->
          <el-form
            ref="queryForm"
            :model="form"
            class="query-box"
            label-width="80px"
            label-position="left"
            size="small"
          >
            <el-row :gutter="20" class="row-item">
              <el-col :span="10">
                <el-form-item label="创建日期" prop="createTime">
                  <el-date-picker
                    v-model="form.createTime"
                    :picker-options="pickerOptions"
                    style="width:100%"
                    align="right"
                    type="date"
                    prefix-icon
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="任务名称" prop="taskName">
                  <el-select
                    v-model="form.taskName"
                    clearable
                    filterable
                    style="width:100%"
                    placeholder="请选择任务名称"
                  >
                    <el-option
                      v-for="(it,index) in taskNameList"
                      :label="it.name"
                      :value="it.name"
                      :key="index"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="tc">
                <el-button type="primary" size="small" @click="onSubmit">查 询</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="row-item">
              <el-col :span="10">
                <el-form-item label="任务状态" prop="taskStatus">
                  <el-select
                    v-model="form.taskStatus"
                    style="width:100%"
                    clearable
                    filterable
                    placeholder="请选择状态"
                  >
                    <el-option label="正在创建" value="0"/>
                    <el-option label="创建成功" value="1"/>
                    <el-option label="正在运行" value="2"/>
                    <el-option label="已结束" value="3"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="专变名称" prop="platformName">
                  <el-input v-model="form.platformName" placeholder="请输入专变名称" style="width:100%"/>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="tc">
                <el-button size="small" @click="resetForm('queryForm')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <!-- 操作区 -->
          <el-row class="operate-box">
            <el-col :span="24">
              <el-button type="primary" size="small" @click="handleTask('add',null)">新建任务</el-button>
            </el-col>
          </el-row>
          <!-- 内容区 -->
          <el-table
            :data="pageTable"
            class="table-box"
            size="medium"
            header-cell-class-name="custom-grey"
            @row-click="rowClick"
          >
            <el-table-column type="index" label="ID" width="50" align="center"/>
            <el-table-column prop="name" label="名称" show-overflow-tooltip sortable align="center"/>
            <el-table-column prop="area" label="专变" show-overflow-tooltip sortable align="center" />
            <el-table-column label="状态" width="90" sortable align="center">
              <template slot-scope="scope">{{ statusList['status'+scope.row.status] }}</template>
            </el-table-column>
            <el-table-column label="地区" show-overflow-tooltip sortable align="center">
              <template slot-scope="scope">{{ scope.row.province+scope.row.city }}</template>
            </el-table-column>
            <el-table-column label="日期" show-overflow-tooltip sortable align="center">
              <template slot-scope="scope">{{ scope.row.createTime.slice(0,10) }}</template>
            </el-table-column>
            <el-table-column label="操作" width="210" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button
                  v-if="statusPower.edit.includes(scope.row.status)"
                  type="text"
                  @click="handleTask('edit', scope.row)"
                >修改</el-button>
                <el-button
                  v-if="statusPower.see.includes(scope.row.status)"
                  type="text"
                  @click="goPage(scope.$index, scope.row,'/dataAnalysisIndex')"
                >查看</el-button>
                <el-button
                  v-if="statusPower.admin.includes(scope.row.status)"
                  type="text"
                  @click="goPage(scope.$index, scope.row,'/deviceManagementIndex')"
                >管理</el-button>
                <el-button
                  v-if="statusPower.end.includes(scope.row.status)"
                  type="text"
                  @click="endTask(scope.$index, scope.row)"
                >结束</el-button>
                <el-button
                  v-if="statusPower.del.includes(scope.row.status)"
                  type="text"
                  @click="delTask(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="currentPage"
            :total="tableData.length"
            class="pagination"
            background
            layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </section>
      </div>
    </div>
    <!-- 新建/编辑弹框 -->
    <div class="pop-container">
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        :close-on-click-modal="false"
        width="40%"
      >
        <div class="content">
          <el-steps :active="active" align-center finish-status="success">
            <el-step title="基本信息"/>
            <el-step title="设备信息"/>
            <el-step title="地理位置"/>
          </el-steps>
          <div class="show-box">
            <keep-alive>
              <div
                :is="currentView"
                :ref="currentView"
                :clear-flag="clearFlag"
                :all-info="allInfo"
                :dialog-title="dialogTitle"
                @save="next"
                @back="prev"
              />
            </keep-alive>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import showMap from './subView/showMap'
import baseInfo from './subView/baseInfo'
import majorInfo from './subView/majorInfo'
import locationMap from './subView/locationMap'
import {
  GetTaskIndex,
  GetFinishTask,
  GetTaskList,
  GetQuery,
  GetTaskInfo,
  GetTaskDel
} from '../../api/taskManagement'
import { assign } from '@/utils/validate'
export default {
  name: 'TaskBox',
  components: {
    showMap,
    locationMap,
    baseInfo,
    majorInfo
  },
  data() {
    return {
      form: {
        taskName: '',
        taskStatus: '',
        createTime: '',
        platformName: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      tableData: [],
      taskNameList: [],
      dialogVisible: false,
      dialogTitle: '新建任务',
      currentPage: 1,
      pagesize: 10,
      active: 0,
      // 全屏
      openMap: false,
      timer: '',
      currentView: 'baseInfo',
      statList: [],
      clearFlag: false,
      // 设备统计
      taskCount: {},
      // 任务统计
      centerPoint: {
        latitude: '',
        longitude: ''
      },
      allInfo: {},
      statusList: {
        status0: '创建中',
        status1: '创建完成',
        status2: '运行中',
        status3: '已结束'
      },
      statusPower: {
        edit: [0, 1, 2],
        see: [2, 3],
        admin: [0, 1, 2],
        end: [2],
        del: [0, 1, 3]
      }
    }
  },
  computed: {
    pageTable() {
      // 数据前端分页及查询
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      )
    }
  },
  mounted() {
    this.getTaskIndex()
    this.geolocation()
    this.getTaskList()
  },
  methods: {
    onSubmit() {
      const par = {}
      assign(par, 'status', this.form.taskStatus)
      assign(par, 'name', this.form.taskName)
      assign(par, 'ct', this.form.createTime)
      assign(par, 'area', this.form.platformName)
      this.currentPage = 1
      this.pagesize = 10
      GetQuery(par)
        .then((r) => {
          this.tableData = r || []
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getTaskIndex() {
      // 获取首页信息
      GetTaskIndex({ uid: this.$cookie.get('Admin-ID') })
        .then((r) => {
          this.statList = r.data.statList
          this.taskCount = r.data.taskCount
          this.tableData = r.data.taskList || []
          this.rowClick(r.data.taskList[0])
          this.$cookie.set('Alert-GYFZ', r.data.hasAlert)
          this.$store.commit('CHANGE_NAV_STATUS', r.data.hasAlert)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    handleTask(flag, row) {
      // 新建、编辑任务
      console.log(flag)
      this.clearFlag = true
      this.dialogVisible = true
      this.active = 0
      this.currentView = 'baseInfo'
      this.$store.commit('CLEAR_TSAK_INFO', true)
      if (flag == 'edit') {
        this.dialogTitle = '编辑任务'
        this.getTaskInfo(row.id)
        // 回显
      } else {
        this.dialogTitle = '新建任务'
      }
    },
    goPage(index, row, path) {
      // 管理设备、查看数据
      this.$router.push({ path: path, query: { id: row.id }})
    },
    endTask(index, row) {
      // 结束任务
      this.$confirm('此操作将结束任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          GetFinishTask(row.id)
            .then((res) => {
              if (res.code == 200) {
                this.getTaskIndex()
                this.$confirm(
                  '任务结束成功，是否需要按照当前任务配置新建任务?',
                  '提示',
                  {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }
                )
                  .then(() => {
                    handleTask('edit', row)
                  })
                  .catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    })
                  })
              }
            })
            .catch((e) => {
              console.log(e)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    delTask(index, row) {
      // 删除任务
      this.$confirm('此操作将删除任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          GetTaskDel(row.id)
            .then((res) => {
              if (res.code == 200) {
                this.getTaskIndex()
              }
            })
            .catch((e) => {
              console.log(e)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    resetForm(formName) {
      // 清空表格
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      // 分页相关
      this.pagesize = val
    },
    handleCurrentChange(val) {
      // 分页相关
      this.currentPage = val
    },
    next({ cur, name }) {
      // 保存
      this.active = cur
      switch (cur) {
        case 1:
          this.currentView = 'majorInfo'
          break
        case 2:
          this.currentView = 'locationMap'
          break
        case 3:
          console.log('最终保存')
          this.dialogVisible = false
          this.$store.commit('CLEAR_TSAK_INFO', false)
          this.getTaskIndex()
          break
      }
    },
    prev({ cur, name }) {
      // 上一步
      this.active = cur
      switch (cur) {
        case 0:
          this.currentView = 'baseInfo'
          break
        case 1:
          this.currentView = 'majorInfo'
          break
      }
    },
    dragContent() {
      // 地图全屏显示
      this.openMap = !this.openMap
      // this.timer = new Date().getTime();
    },
    rowClick(row) {
      // 点击行 地图中心跟随移动
      if (row.status == 1 || row.status == 2) {
        this.centerPoint.latitude = row.latitude
        this.centerPoint.longitude = row.longitude
      }
    },
    geolocation() {
      // 获取当前位置
      const that = this
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            that.$cookie.set(
              'point',
              JSON.stringify({ lng: r.point.lng, lat: r.point.lat })
            )
          } else {
            alert('failed' + this.getStatus())
          }
        },
        { enableHighAccuracy: true }
      )
    },
    getTaskList() {
      // 获取任务名称下拉
      GetTaskList()
        .then((r) => {
          this.taskNameList = r
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getTaskInfo(id) {
      // 获取任务详情
      GetTaskInfo(id)
        .then((r) => {
          this.allInfo = r.data
        })
        .catch((e) => {
          console.log(e)
        })
    },
    handleClose(done) {
      // 确认关闭
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
          this.clearFlag = false
          this.$store.commit('CLEAR_TSAK_INFO', false)
        })
        .catch((_) => {})
    }
  }
}
</script>
<style lang='scss' scoped>
.task-box {
  height: 100%;
  display: flex;
  flex-direction: column;

  .total {
    height: 70px;
    background: #fff;
    margin-bottom: 10px;
    padding: 0 20px 0 20px;
    display: flex;
    .task-total,
    .onLine-total {
      flex: 0.5;
      display: flex;
      align-items: center;
      .title {
        margin-right: 10%;
        display: flex;
        align-items: center;
        img {
          margin-right: 5px;
        }
      }
      .content {
        span {
          margin-right: 20px;
          color: #838383;
          i {
            color: #5d77e4;
            margin-left: 10px;
          }
        }
      }
    }
  }

  .task-management {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    overflow: hidden;
    &.open {
      .map-container {
        width: 100%;
        height: 100%;
        flex: 1;
      }
      .content-container {
        display: none;
      }
    }
    .map-container {
      position: relative;
      flex: 0.5;
      padding: 20px;
      background: #fff;
      margin-right: 10px;
      .ctrl-btn {
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 30px;
        background: #fff;
        text-align: center;
        line-height: 30px;
        right: 0;
        top: 50%;
        cursor: pointer;
        border-radius: 3px 0 0 3px;
      }
    }
    .content-container {
      position: relative;
      flex: 0.5;
      padding: 20px 20px 20px 2%;
      overflow-y: auto;
      background: #fff;
      .section {
        // overflow-y: auto;
        .operate-box {
          margin: 5px 0 20px 0;
        }
        .table-box /deep/ {
          .el-table__row {
            cursor: pointer;
          }
        }
      }
    }
    .pop-container {
      .show-box {
        margin-top: 20px;
      }
    }
  }
}
</style>
