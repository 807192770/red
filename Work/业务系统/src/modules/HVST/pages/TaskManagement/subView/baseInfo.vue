<template>
  <div class="base-info">
    <!-- 基本信息 -->
    <el-form
      ref="baseForm"
      :model="baseInfo"
      :rules="rules"
      class="details-box"
      label-position="top"
      size="small"
    >
      <el-row :gutter="20" class="row-item">
        <el-col :span="12">
          <el-form-item label="任务名称" prop="taskName">
            <el-input v-focus v-model="baseInfo.taskName" placeholder="请输入任务名称" maxlength=20 style="width:100%"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专变名称" prop="platformName">
            <el-input v-model="baseInfo.platformName" placeholder="请输入专变名称" maxlength=20 style="width:100%"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-item">
        <el-col :span="12">
          <el-form-item label="一次电压(kV)" prop="primaryVol">
            <el-select
              v-model="baseInfo.primaryVol"
              style="width:100%"
              clearable
              filterable
              placeholder="请选择一次电压"
            >
              <el-option label="10" value="10"/>
              <el-option label="35" value="35"/>
              <el-option label="110" value="110"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="温升校正参数(°)" prop="temRise">
            <el-input v-model="baseInfo.temRise" placeholder="请输入温升校正参数" style="width:100%"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-item">
        <el-col :span="12">
          <el-form-item label="变压器型号" prop="transModel">
            <el-select
              v-model="baseInfo.transModel"
              style="width:100%"
              clearable
              filterable
              placeholder="请选择变压器型号"
            >
              <el-option label="S7" value="S7"/>
              <el-option label="S9" value="S9"/>
              <el-option label="S11" value="S11"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="变压器容量(kVA)" prop="KVAR">
            <el-select
              v-model="baseInfo.KVAR"
              style="width:100%"
              clearable
              filterable
              placeholder="请选择变压器容量"
            >
              <el-option label="30" value="30"/>
              <el-option label="50" value="50"/>
              <el-option label="63" value="63"/>
              <el-option label="80" value="80"/>
              <el-option label="100" value="100"/>
              <el-option label="125" value="125"/>
              <el-option label="160" value="160"/>
              <el-option label="200" value="200"/>
              <el-option label="250" value="250"/>
              <el-option label="315" value="315"/>
              <el-option label="400" value="400"/>
              <el-option label="500" value="500"/>
              <el-option label="630" value="630"/>
              <el-option label="800" value="800"/>
              <el-option label="1000" value="1000"/>
              <el-option label="1250" value="1250"/>
              <el-option label="1600" value="1600"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-item">
        <el-col :span="12">
          <el-form-item label="变压器电压比" prop="gears">
            <el-input v-model="baseInfo.gears" placeholder="请输入变压器电压比" style="width:100%"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-item">
        <el-col :span="24" class="tr">
          <el-button type="primary" size="small" @click="detailsInfoSave">保 存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { AddTaskFirst } from '../../../api/taskManagement'
import { assign } from '@/utils/validate'
export default {
  name: 'DataAlarm',
  props: ['clearFlag', 'allInfo', 'dialogTitle'],
  data() {
    var patten = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
    var validateGears = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入变压器电压比'))
      } else {
        if (!patten.test(value)) {
          callback(new Error('请输入正确的变压器电压比（保留2位小数）'))
          return false
        }
        callback()
      }
    }
    return {
      baseInfo: {
        taskName: '',
        platformName: '',
        transModel: '',
        KVAR: '',
        primaryVol: '',
        temRise: '',
        gears: '25'
      },
      rules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        platformName: [
          { required: true, message: '请输入专变名称', trigger: 'blur' }
        ],
        transModel: [
          { required: true, message: '请选择变压器型号', trigger: 'change' }
        ],
        KVAR: [
          { required: true, message: '请选择变压器容量', trigger: 'change' }
        ],
        primaryVol: [
          { required: true, message: '请选择一次电压', trigger: 'change' }
        ],
        gears: [{ required: true, validator: validateGears, trigger: 'blur' }]
      }
    }
  },
  computed: {
    taskInfo() {
      return this.$store.state.index.taskInfo
    }
  },
  watch: {
    clearFlag(n, o) {
      if (n) {
        this.$refs.baseForm.resetFields()
      }
    },
    allInfo(n, o) {
      if (Object.keys(n).length) {
        this.init()
      }
    },
    taskInfo(n, o) {
      if (n) {
        this.$refs.baseForm.resetFields()
      }
    },
    dialogTitle(n, o) {}
  },
  mounted() {},
  methods: {
    detailsInfoSave() {
      // 保存
      const par = {
        name: this.baseInfo.taskName,
        area: this.baseInfo.platformName,
        transfomerType: this.baseInfo.transModel,
        transformerVolume: this.baseInfo.KVAR, // 变压器容量
        lineVoltage: this.baseInfo.primaryVol, // 一次电压
        gears: this.baseInfo.gears // 变压器电压比
      }
      assign(par, 'temperatureAdjust', this.baseInfo.temRise)
      if (this.dialogTitle == '编辑任务') {
        par.id = this.allInfo.first.id
        par.account = this.allInfo.first.account
      }
      this.$refs.baseForm.validate((valid) => {
        if (valid) {
          AddTaskFirst(par)
            .then((r) => {
              if (r.code == 200) {
                this.$store.commit('SET_TSAK_ID', r.data)
                this.$message.success('保存成功')
                const goPage = {
                  cur: 1,
                  name: 'majorInfo'
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
    init() {
      // 回显
      this.baseInfo.taskName = this.allInfo.first.name
      this.baseInfo.platformName = this.allInfo.first.area
      this.baseInfo.transModel = this.allInfo.first.transfomerType
      this.baseInfo.KVAR = this.allInfo.first.transformerVolume
      this.baseInfo.primaryVol = this.allInfo.first.lineVoltage
      this.baseInfo.temRise = this.allInfo.first.temperatureAdjust
      this.baseInfo.gears = this.allInfo.first.gears
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
