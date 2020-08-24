<template>
  <div class="manageUser">
    <!-- 管理用户 -->
    <div class="table-box">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'num', order: 'descending'}"
        header-row-class-name="table-header"
      >
        <el-table-column prop="username" label="账号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="姓名" width="100px"></el-table-column>
        <el-table-column prop="staff_id" label="工号" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="roles" label="权限" sortable width="90px">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.roles" :key="index">
              <span v-for="(val,key) in item.menus" :key="key">{{val.name}}，</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="150px">
          <template slot-scope="scope">
            <el-switch
              style="display: block"
              v-model="scope.row.status"
              active-color="#52C41A"
              inactive-color="#F5222D"
              active-text="启用中"
              inactive-text="停用"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button @click.native.prevent="dialog = true" type="text" size="small">修改密码</el-button>
            <el-button
              @click.native.prevent="dialogFormVisible = true"
              type="text"
              size="small"
            >修改权限</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btn-box">
      <el-button type="primary" size="small">完成</el-button>
    </div>
    <!-- 权限设置弹框 -->
    <el-dialog title="权限设置" :visible.sync="dialogFormVisible" class="dialogForm" width="450px">
      <div class="form-content">
        <Tree :data="dataTree" show-checkbox></Tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="manageUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码弹框 -->
    <el-dialog title="密码修改" :visible.sync="dialog" class="dialog" width="450px">
      <div class="form-content">
        <el-form
          :model="subRuleForm"
          :label-position="labelPosition"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="subRuleForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="subRuleForm.confirmPassword"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="submitSubForm('subRuleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { manageUser, delUser, getList } from '../../api/privilege-management'
export default {
  data () {
    return {
      tableData: [
        {
          ID: '0001013012010',
          date: '2016-05-02',
          name: '王小虎',
          num: 'LP000121312124',
          Authorization: '实时监控 历史轨迹',
          status: false
        },
        {
          ID: '0001013012010',
          date: '2016-05-04',
          name: '王小虎',
          num: 'LP000121312124',
          Authorization: '实时监控 历史轨迹',
          status: false
        },
        {
          ID: '0001013012010',
          date: '2016-05-01',
          name: '王小虎',
          num: 'LP000121312124',
          Authorization: '实时监控 历史轨迹',
          status: false
        },
        {
          ID: '0001013012010',
          date: '2016-05-03',
          name: '王小虎',
          num: 'LP000121312124',
          Authorization: '实时监控 历史轨迹',
          status: true
        }
      ],
      dataTree: [
        {
          title: '实时监控',
          expand: true
        },
        {
          title: '告警管理',
          expand: true,
          children: [
            {
              title: '告警日志',
              expand: true
            },
            {
              title: '告警设置',
              expand: true
            }
          ]
        },
        {
          title: '历史轨迹',
          expand: true
        },
        {
          title: '权限管理',
          expand: true,
          children: [
            {
              title: '新建用户',
              expand: true
            },
            {
              title: '管理用户',
              expand: true
            },
            {
              title: '信息维护',
              expand: true
            }
          ]
        },
        {
          title: '巡检管理',
          expand: true,
          children: [
            {
              title: '新建巡检',
              expand: true
            },
            {
              title: '已有巡检',
              expand: true
            }
          ]
        },
        {
          title: '全局盘点',
          expand: true
        }
      ],
      dialogFormVisible: false,
      dialog: false,
      checked: '',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      value2: true,
      labelPosition: 'left',
      subRuleForm: {
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    }
  },

  components: {},

  mounted () {
    this.init()
    this.getList()
  },

  methods: {
    init () {
      var data = [
        {
          id: 5,
          name: '张三2号',
          staff_id: '000001',
          phone: '13112345678',
          username: 'zhangsan@163.com',
          roles: [
            {
              title: '巡检人员05',
              menus: [
                {
                  id: 8,
                  name: '新建巡检',
                  key: null
                },
                {
                  id: 6,
                  name: '巡检管理',
                  key: null
                },
                {
                  id: 7,
                  name: '已有巡检',
                  key: null
                }
              ]
            }
          ]
        },
        {
          id: 6,
          name: '李四',
          staff_id: '000002',
          phone: '13112355678',
          username: 'lisi@163.com',
          roles: [
            {
              title: '巡检人员05',
              menus: [
                {
                  id: 8,
                  name: '新建巡检',
                  key: null
                },
                {
                  id: 6,
                  name: '巡检管理',
                  key: null
                },
                {
                  id: 7,
                  name: '已有巡检',
                  key: null
                }
              ]
            }
          ]
        },
        {
          id: 7,
          name: '王五',
          staff_id: '000003',
          phone: '13112455678',
          username: 'wangwu@163.com',
          roles: [
            {
              title: '巡检人员05',
              menus: [
                {
                  id: 8,
                  name: '新建巡检',
                  key: null
                },
                {
                  id: 6,
                  name: '巡检管理',
                  key: null
                },
                {
                  id: 7,
                  name: '已有巡检',
                  key: null
                }
              ]
            }
          ]
        }
      ]
      this.tableData = data
      // console.log(data)
    },
    getList () {
      // 获取用户列表
      var params = {
        'token': window.localStorage.getItem('TOKEN')
      }
      getList(params).then(res => {
        const data = res.data
        console.log(res)
      })
    },
    manageUser () {
      // 修改权限
      var params = {
        roles: [6, 8],
        token: window.localStorage.getItem('TOKEN')
      }
      manageUser(params).then(res => {
        const data = res.data
        console.log(res)
      })
      this.dialogFormVisible = false
    },
    deleteRow (index, rows) {
      // 删除用户
      var params = {
        name: '王五',
        staff_id: '000003',
        phone: '13112455678',
        role_id: 5,
        username: 'wangwu@163.com',
        password: '123456',
        re_password: '123456',
        token: window.localStorage.getItem('TOKEN')
      }
      delUser(params).then(res => {
        const data = res.data
        console.log(data)
        rows.splice(index, 1)
      })
    },
    submitSubForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改密码
          var params = {
            name: this.subRuleForm.newPassword,
            username: this.subRuleForm.confirmPassword,
            token: window.localStorage.getItem('TOKEN')
          }
          modify_pwd(params).then(res => {
            const data = res.data
            if (data.code == 0) {
              this.$message.success(data.msg)
              this.$refs[formName].resetFields()
              this.dialog = false
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('请填写必要信息。')
          return false
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.manageUser {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  .table-box /deep/ {
    padding: 0 35px;
    .table-header {
      th > div.cell {
        color: #000;
        font-weight: bold;
      }
    }
    .el-table__row {
      .el-switch {
        .el-switch__label--left {
          // color: #F5222D;
        }
        .el-switch__label--right {
          //  color: #52C41A;
        }
      }
    }
  }
  .btn-box {
    margin: 50px 0;
    text-align: center;
    button {
      width: 400px;
    }
  }
  .dialogForm /deep/ {
    .el-dialog__body {
      padding: 0 20px;
      .form-content {
        width: 200px;
        margin: 0 auto;
        .ivu-tree > {
          .ivu-tree-children {
            margin: 15px 0;
          }
        }
      }
    }
  }
}
</style>
