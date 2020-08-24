<template>
    <el-table stripe :data="tableProps.tableData" :border="tableProps.border" class="c_el_table" :header-cell-style="getRowClass" @sort-change="sortchange">
        <el-table-column  :show-overflow-tooltip="true"  :label="item.keyName" :min-width="item.width" v-for="(item,index) in tableProps.dictionary" :key="index" sortable="custom" >
            <template slot-scope="scope">
                <div>
                    <span class="item" :style="{color:item.color,cursor: item.cursor,height:item.height}" v-html="scope.row[item.key]"></span>
                </div>
            </template>
        </el-table-column>

        <el-table-column  :show-overflow-tooltip="true" style="border:1px solid red;" :label="tableProps.operateTitle" :min-width="tableProps.operateWidth" v-if="tableProps.operateTitle != undefined" >
            <template slot-scope="scope">
                <span  class="operate-table" 
                @click="handleDetails(scope.$index,subIndex ,scope.row)" 
                v-for="(subItem, subIndex) in tableProps.operate" 
                :key="subIndex" :style="{color:subItem.operateWordColor}" 
                style="margin-right:5px;">
                    {{subItem.operateWord}}
                </span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'commonTable',
  data () {
    return {
      cellname:'',
    }
  },
  props: ['tableProps'],
  computed:{
  },
  created() {
    // console.log(this.tableProps.checkedTitle == undefined)
  },
  methods: {
    sortchange(param) {
      if(param.order) {
        this.cellname = param.column.label
      }else {
        this.cellname = ''
      }
      var obj = {};
      obj.label = param.column.label;
      if(param.order == 'ascending') {
        obj.status = 'asc'
      }else if(param.order == 'descending') {
        obj.status = 'desc'
      }else {
        obj.status = ''
      }
      this.$emit('sortchange', obj)
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if(this.cellname) {
        var flag;
        if(column.label == this.cellname) {
          flag = columnIndex
        }
        console.log(columnIndex == flag)
        if(columnIndex == flag) {
          return {color:'#409eff',background:'#dcedf5'}
        }
      }
      if (rowIndex == 0) {
          return {color:'#333333',background:'#dcedf5'}
      } else {
          return ''
      }
      
    },
    handleDetails (index,subIndex, row) {
      // console.log(index,subIndex, row)
      this.$emit('tableClick', index,subIndex, row)
    },
  }
}
</script>

<style>
.el-table th{
  padding: 2px 0;
}
.el-table td{
  padding: 11px 0;
  border-bottom: 1px solid #d7ebf5;
}
.el-table tr{
  background-color: #f5f8fa;
}
.el-table--striped .el-table__body tr.el-table__row--striped td{
  background-color: #edf6fa;
}
.el-table__row{
  border: 1px solid red;
}
</style>

<style scoped>
.operate-table{
    cursor: pointer;
    vertical-align: middle;
}
.el-table th, .el-table tr{
	background-color:#f5f8fa
}
</style>
