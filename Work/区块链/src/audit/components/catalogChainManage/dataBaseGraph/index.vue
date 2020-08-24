<template>
 <div class="treeGraph">
    <div class="treeGraphBox">
        <div  class="treeGraphsearch">
            <div>xx市区/公安局33</div>
            <h3>业务单位管理页面</h3>
            <div class="searchInput">
                <el-input type="text" size="small" placeholder="名称或描述"/>
                <el-button type="primary" size="small" @click="applyfor">搜索</el-button>
            </div>
        </div>
      <treeGraph :treetype="pagetype"/>
    </div>
  <div class="treeGraphFoot">
    <div class="btnBox">
      <el-button type="success" @click="cancel">暂 存</el-button>
      <el-button type="primary" @click="applyfor">提 交</el-button>
    </div>
  </div>
  <el-dialog
  :title="titlehead"
  :visible.sync="dialogVisible"
  width="600px"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  >
  <div>
    <el-form :model="formData" v-if="formtype===0">
        <el-form-item label="备注：">
         <el-input v-model="formData.postscript" show-word-limit maxlength="100" type="textarea" :rows="8" />
        </el-form-item>
         <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      :show-header="false"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）">
      </el-table-column>
    </el-table>
    </el-form>
    <el-form :model="formData" v-if="formtype===1" label-position="left"  label-width="80px">
        <el-form-item label="有效期：" >
          <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
         </el-date-picker>
        </el-form-item>
        <el-form-item label="备注：" label-width="60px">
         <el-input v-model="formData.postscript" show-word-limit maxlength="100" type="textarea" :rows="8" />
        </el-form-item>
        <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      :show-header="false"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）">
      </el-table-column>
    </el-table>
    </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">提 交</el-button>
  </span>
</el-dialog>
 </div>
</template>
<script>
import treeGraph from "../../common/treegraph"
export default {
  data(){
    return {
    pagetype:'adit',
      dialogVisible:false,
      formtype:null,
      titlehead:null,
      value1:'',
      formData:{
        postscript:''
      },
       tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
    }
  },
  components:{
    treeGraph
  },
  mounted(){
    console.log(this.pagetype)
  },
  methods:{
      cancel(){
        this.dialogVisible=true
        this.formtype=0
        this.titlehead='取消权限'
      },
      applyfor(){
        this.dialogVisible=true
        this.formtype=1
        this.titlehead='权限申请'
      },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 5,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
  }
}
</script>
<style lang="less" scoped>
.treeGraph{
  .treeGraphFoot{
    width: 100%;
    height: 64px;
    background: #FAFAFA;
    // display: flex;
    // align-items: center;
    position: relative;
    .btnBox{
      width: 246px;
      position: absolute;
      right: 24px;
      top: 12px;
    }
  }
  .treeGraphBox{
    margin: 24px;
    .treeGraphsearch{
        height:46px;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #E2E2E2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div{

                padding: 0 20px;
            }
        h3{
            font-size: 16px;
            font-weight: bold;
        }
        .searchInput{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-input{
                margin-right: 10px;
            }
        }
    }
  }
}
</style>
