<template>
  <div class="major-info">
    <!-- 设备信息 -->
    <el-form
      ref="majorForm"
      :model="majorInfo"
      :rules="rules"
      class="details-box"
      label-position="top"
      size="small"
    >
      <el-row :gutter="20" class="row-item">
        <el-col :span="12">
          <el-form-item :required="majorInfo.HPTHLM==2?true:false" label="抄表采集器设备编号" prop="ENOMRC">
            <el-select
              v-model="majorInfo.ENOMRC"
              clearable
              filterable
              style="width:100%"
              placeholder="请选择抄表采集器设备编号"
              @change="changeList"
            >
              <el-option
                v-for="(item,index) in ENOMRC"
                :label="item.deviceNo"
                :value="item.deviceNo"
                :key="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="环境温度测量装置编号" prop="SNOATMD">
            <el-select
              v-model="majorInfo.SNOATMD"
              clearable
              filterable
              style="width:100%"
              placeholder="请选择环境温度测量装置编号"
              @change="changeList2"
            >
              <el-option
                v-for="(item,index) in SNOATMD"
                :label="item.deviceNo"
                :value="item.deviceNo"
                :key="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-item">
        <el-col :span="24">
          <el-form-item label="变压器表面温度测量装置编号列表" prop="SLOTSTMD">
            <el-select
              v-model="majorInfo.SLOTSTMD"
              multiple
              style="width:100%"
              placeholder="请选择变压器表面温度测量装置编号"
              @change="changeList3"
            >
              <el-option
                v-for="(item,index) in SLOTSTMD"
                :label="item.deviceNo"
                :value="item.deviceNo"
                :key="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-item">
        <el-col :span="12">
          <el-form-item label="高压钳头链接模式" prop="HPTHLM">
            <el-select
              v-model="majorInfo.HPTHLM"
              filterable
              clearable
              style="width:100%"
              placeholder="请选择高压钳头链接模式"
              @change="majorInfo.NOHVBE=''"
            >
              <el-option label="高压电流采集器" value="1"/>
              <el-option label="低压抄表器" value="2"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="majorInfo.HPTHLM==1" :span="12">
          <el-form-item label="高压电流采集器编号" prop="NOHVBE">
            <el-select
              v-model="majorInfo.NOHVBE"
              filterable
              clearable
              style="width:100%"
              placeholder="请选择高压电流采集器编号"
              @change="changeList4"
            >
              <el-option
                v-for="(item,index) in NOHVBE"
                :label="item.deviceNo"
                :value="item.deviceNo"
                :key="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-item">
        <el-col :span="24" class="tr">
          <el-button size="small" @click="goBack">上一步</el-button>
          <el-button type="primary" size="small" @click="detailsInfoSave">保 存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { AddTaskSecond } from '../../../api/taskManagement'

export default {
  name: 'DataAlarm',
  props: ['allInfo'],
  data() {
    var validateSLOTSTMD = (rule, value, callback) => {
      if (value.length) {
        callback()
      } else {
        callback(new Error('请输入变压器表面温度测量装置编号列表'))
      }
    }
    var validateENOMRC = (rule, value, callback) => {
      if (this.majorInfo.HPTHLM == 2) {
        if (!value) {
          callback(new Error('请输入抄表采集器设备编号'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      majorInfo: {
        ENOMRC: '',
        SNOATMD: '',
        SLOTSTMD: [],
        HPTHLM: '1',
        NOHVBE: ''
      },
      rules: {
        ENOMRC: [
          {
            validator: validateENOMRC,
            trigger: 'change'
          }
        ],
        SNOATMD: [
          // {
          //   required: true,
          //   message: "请输入环境温度测量装置编号",
          //   trigger: "change",
          // },
        ],
        SLOTSTMD: [
          // {
          //   required: true,
          //   validator: validateSLOTSTMD,
          //   trigger: "change",
          // },
        ],
        HPTHLM: [
          {
            required: true,
            message: '请选择高压钳头链接模式',
            trigger: 'change'
          }
        ],
        NOHVBE: [
          {
            required: true,
            message: '请输入高压电流采集器编号',
            trigger: 'change'
          }
        ]
      },
      ENOMRC: [], // 抄表采集器设备编号
      SNOATMD: [], // 环境温度测量装置编号
      SLOTSTMD: [], // 变压器表面温度测量装置编号列表
      NOHVBE: [] // 高压电流采集器编号
      // cbqList: [],
      // tempList: [],
    }
  },

  computed: {
    taskId() {
      return this.$store.state.index.taskID
    },
    taskInfo() {
      return this.$store.state.index.taskInfo
    }
  },
  watch: {
    taskInfo(n, o) {
      if (n) {
        this.$refs.majorForm.resetFields()
      }
    },
    allInfo(n, o) {
      this.init()
    }
  },
  mounted() {
    this.initList()
    this.init()
  },
  methods: {
    detailsInfoSave() {
      // 保存
      const par = {
        taskId: this.taskId.taskId,
        cbq: this.majorInfo.ENOMRC,
        condition: this.majorInfo.SNOATMD,
        surface: this.majorInfo.SLOTSTMD,
        highJawLink: this.majorInfo.HPTHLM
      }
      if (this.majorInfo.HPTHLM == 1) {
        par.gyfz = this.majorInfo.NOHVBE
      }
      this.$refs.majorForm.validate((valid) => {
        if (valid) {
          AddTaskSecond(par)
            .then((r) => {
              console.log(r)
              if (r.code == 200) {
                this.$message.success('保存成功')
                const goPage = {
                  cur: 2,
                  name: 'locationMap'
                }
                this.$emit('save', goPage)
              }
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goBack() {
      // 上一步
      const backPage = {
        cur: 0,
        name: 'baseInfo'
      }
      this.$emit('back', backPage)
    },
    initList() {
      // 获取下拉
      // this.cbqList = this.taskId.cbq;
      // this.tempList = this.taskId.temp;
      this.ENOMRC = this.taskId.cbq
      this.NOHVBE = this.taskId.cbq
      this.SNOATMD = this.taskId.temp
      this.SLOTSTMD = this.taskId.temp
    },
    // changeList1 2 3 4 过滤下拉
    changeList() {
      this.NOHVBE = this.taskId.cbq.filter(
        (item) => item.deviceNo != this.majorInfo.ENOMRC
      )
    },
    changeList4() {
      this.ENOMRC = this.taskId.cbq.filter(
        (item) => item.deviceNo != this.majorInfo.NOHVBE
      )
    },
    changeList2() {
      this.SLOTSTMD = this.taskId.temp.filter(
        (item) => item.deviceNo != this.majorInfo.SNOATMD
      )
    },
    changeList3() {
      this.SNOATMD = this.taskId.temp.filter(
        (item) => !this.majorInfo.SLOTSTMD.includes(item.deviceNo)
      )
    },
    init() {
      // 回显
      console.log(this.allInfo.second)
      if (this.allInfo.second) {
        // 编辑
        this.majorInfo.ENOMRC = this.allInfo.second.cbq
          ? this.allInfo.second.cbq
          : ''
        this.majorInfo.SNOATMD = this.allInfo.second.condition
          ? this.allInfo.second.condition
          : ''
        this.majorInfo.SLOTSTMD = this.allInfo.second.surface
          ? this.allInfo.second.surface
          : ''
        this.majorInfo.NOHVBE = this.allInfo.second.gyfz
          ? this.allInfo.second.gyfz
          : ''
        this.majorInfo.HPTHLM = this.allInfo.second.highJawLink
          ? this.allInfo.second.highJawLink.toString()
          : ''
      } else {
        // 新增
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.major-info {
  .ctrlBtn {
    float: right;
    margin-top: 6px;
  }
}
</style>
