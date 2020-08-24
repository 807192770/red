<template>
  <div class="process">
    <div class="process-filter">
      <div class="filter-box">
        <label class="filter-label">流程ID</label>
        <el-select
          v-model="processId"
          filterable
          remote
          reserve-keyword
          :remote-method="remoteProcessId"
          :loading="processIdloading"
          placeholder="请选择">
          <el-option
            v-for="item in this.processOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="filter-box">
        <label class="filter-label">审批状态</label>
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in this.statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="filter-box">
        <label class="filter-label">分配给</label>
        <el-select
          v-model="auditor"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteAuditors"
          :loading="loading">
          <el-option
            v-for="item in auditorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" size="small" @click="getProcessList">搜索</el-button>
    </div>
    <div class="process-list">
      <el-table
        :data="processList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="proId"
          label="流程ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="eventId"
          label="事件ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="eventName"
          label="事件名称">
        </el-table-column>
        <el-table-column
          prop="status"
          label="当前状态">
        </el-table-column>
        <el-table-column
          prop="auditor"
          label="审批人">
        </el-table-column>
        <el-table-column
          prop="applicant"
          label="申请人">
        </el-table-column>
        <el-table-column
          prop="msg"
          label="信息">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button v-if="scope.row.auditor === 'wangxiaolong'" @click="handleClick(scope.row)" type="text" size="small">去审批</el-button>
            <el-button v-else type="text" size="small" @click="processDetail">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="process-pagenation">
      <el-pagination
        background
        :page-size="20"
        :currentPage="1"
        @current-change="pageChange"
        @prev-click="pagepreClick"
        @next-click="pagenextClick"
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
    <el-dialog
      title="流程详情"
      :visible.sync="dialogFormVisible"
      width="750px">
      <el-form :model="form">
        <el-form-item label="申请人" :label-width="formLabelWidth">
          <el-input v-model="form.applicant" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="审批内容" :label-width="formLabelWidth">
          <span>
            {{form.applyMsg}}
          </span>
        </el-form-item>
        <el-form-item>
          <div style="height: 400px; padding:0 50px;">
            <el-steps
              direction="vertical"
              :align-center=true
              :active="1">

              <el-step  v-for="step in form.steps" status="finish">
                <div slot="title" class="step-box">
                  <span>{{step.nodeName}}</span>
                  <span
                    v-bind:class="{'step-box-status-success': step.status===1 && step.auditCode===1,
                    'step-box-status-reject':step.status===1 && step.auditCode===2, 'step-box-status-wait':step.status===0}"
                  >{{step.auditCode === 1 ? '已通过': step.auditCode === 2? '已驳回': '待审批'}}</span>
                </div>
                <div slot="description">{{step.auditor}}/{{step.auditorMis}}</div>
              </el-step>
            </el-steps>
          </div>
        </el-form-item>
        <el-form-item  v-if="form.applicantMis === 'wangxiaolong'" label="申请意见">
          <el-input v-model="form.auditMsg" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div v-if="form.applicantMis === 'wangxiaolong'" slot="footer" class="dialog-footer">
        <el-button @click="confirmMsg(2)">驳回</el-button>
        <el-button
          type="primary"
          @click="confirmMsg(1)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'process',
    data() {
      console.error('this.store in process》》', this.$store);
      return {
        processId: '',
        auditor: '',
        status: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: JSON.parse(JSON.stringify(this.$store.state.Process.currentListDetail)),
        currentPage: 1,
        total: 0,
        processIdloading: false,
        list: [],
        loading: false,
      }
    },
    props: {
      // msg: String,
    },
    computed: {
      processOptions() {
        return this.$store.state.Process.processOptions;
      },
      statusOptions() {
        return this.$store.state.Process.statusOptions;
      },
      auditorOptions() {
        return this.$store.state.Process.auditorOptions;
      },
      processList() {
        return this.$store.state.Process.processList;
      },
    },
    mounted(){
      console.log(this.$store)
    },
    methods: {
      remoteAuditors(query) {
        if (query !== '') {
          this.loading = true;
          this.$store.dispatch('Process/getAuditors', {query});
        } else {
          this.auditorOptions = [];
        }
      },
      remoteProcessId(query) {
        this.processIdloading = true;
        if(query === ''){
          this.processIdloading = false;
          return;
        };
        this.$store.dispatch('Process/getProcessIds', {query});
      },
      getProcessList() {
        const payload = {
          processId: this.processId,
          status: this.status,
          auditor: this.auditor,
          pageSize: 20,
          currentPage: this.currentPage,
        };
        this.$store.dispatch('Process/getProcessList', payload);
      },
      processDetail(id) {
        const payload ={
          id,
        }
        // 根据ID去查询该条数据
        this.$store.dispatch('Process/getProcessListDetal', payload)/*.then((res) => {
          // 成功后的处理
          this.dialogFormVisible = true;
          // 将数据显示到框里
        });*/
        this.dialogFormVisible = true;
      },
      confirmMsg(code) {
        this.dialogFormVisible = false;
        const payload ={
          eventId: this.form.eventId,
          id: this.form.id,
          currentNode: this.form.currentNode,
          status: 1,
          auditCode: code, //1：通过，2：驳回
          auditMsg: this.form.auditMsg,
        }
        this.$store.dispatch('Process/confirmProcessNode', payload)
    },
      handleClick(row) {
        console.error(row);
      },
      pageChange(ev) {
        console.error('currentpage change', ev);
      },
      pagepreClick() {
        console.error('pre click');
      },
      pagenextClick() {
        console.error('next click');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .el-step.is-vertical .el-step__head{
    height: 80px;
  }
 .process {
   padding: 1px 5px;

   .process-filter {
     background: #ffffff;
     text-align: left;
     padding: 10px 20px;

     .filter-label {
       margin-right: 10px;
       display: inline-block;

     }
   ;

     .filter-box {
       display: inline-block;
     }

     .filter-box:not(：last-child) {
       margin-right: 20px;
     }
   }

   .process-list {
     background: #ffffff;
     margin-top: 20px;
   }

   .process-pagenation {

     margin-top: 20px;
   }
   .step-box{
     display: inline-block;
     width: 100%;
     overflow: hidden;
     .step-box-status-success{
       color: green;
     }
     .step-box-status-reject{
       color: red;
     }
     .step-box-status-wait{
       color: gray;
     }
     span{
       float: left;
     }
     span:last-child{
       float: right;
     }
   }
 }
</style>
