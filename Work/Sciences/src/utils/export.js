/**
 * excel导出
 */
function exportTable() {
  // this.DefaultData.exportExcelMax限制一下导出的总条数
  if (this.totals <= this.DefaultData.exportExcelMax) {
    this.$confirm('确定要导出当前<strong>' + this.totals + '</strong>条数据？', '提示', {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      this.getExpportData()
    }).catch(() => { })
  } else {
    this.$confirm('当前要导出的<strong>' + this.totals + '</strong>条数据，数据量过大，不能一次导出！<br/>建议分时间段导出所需数据。', '提示', {
      dangerouslyUseHTMLString: true,
      showCancelButton: false
    }).then(() => { }).catch(() => { })
  }
};
/**
 * 对导出数据格式处理
 */
function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
};

/**
 * 导出的列表数据
 */
function getExpportData() {
  const loading = this.$loading({
    lock: true,
    text: '正在导出，请稍等......',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  const data = {
    phoneNo: this.formInline.phoneNo,
    userName: this.formInline.userName,
    amount: this.formInline.amount,
    fee: this.formInline.fee,
    currentPage: this.currentPage,
    pageSize: this.DefaultData.exportExcelMax
  }
  // 这里封装了axios，根据自身情况修改即可
  this.http(
    this.ApiSetting.orderExport,
    data
  ).then((res) => {
    // handleDataList这里可以对导出的数据根据需求做下处理
    const handleDataList = res.data.list
    for (let i in res.data.list) {
      handleDataList[i].amount = res.data.list[i].amount * 100
      handleDataList[i].fee = res.data.list[i].fee + '%'
    }
    if (res.data.list.length > 0) {
      require.ensure([], () => {
        /* eslint-disable */
        // 这里的径路要修改正确
        const {
          export_json_to_excel
        } = require('../../vendor/Export2Excel')
        /* eslint-enable  */
        // 导出的表头
        const tHeader = ['手机号码', '用户姓名', '交易金额', '手续费']
        // 导出表头要对应的数据
        const filterVal = ['phoneNo', 'userName', 'amount', 'fee']
        // 如果对导出的数据没有可处理的需求，把下面的handleDataList换成res.data.list即可，删掉上面相应的代码
        const data = this.formatJson(filterVal, handleDataList)
        // this.DefaultData.formatLongDate.getNow()自己写的一个获取当前时间，方便查找导出后的文件。根据需求自行可处理。
        export_json_to_excel(tHeader, data, '订单查询列表-' + this.DefaultData.formatLongDate.getNow())
        this.$message({
          message: '导出成功',
          duration: 2000,
          type: 'success'
        })
      })
    } else {
      this.$message({
        message: '数据出錯，请联系管理员',
        duration: 2000,
        type: 'warning'
      })
    }
    loading.close()
  }, error => {
    console.log(error)
    loading.close()
  })
}
