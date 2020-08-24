<template>
<div>
    <div class="search-box">
        <div class="area-box">
            <div class="area-box-city">
              <i class="el-icon-location-outline icon"></i>
                <!-- <img src="../../assets/images/qurt_center_location.png" alt=""> -->
                <div class="area">凤凰古镇</div>
            </div>
            <div class="area-box-time icon">
              <i class="el-icon-date icon"></i>
                <!-- <img src="../../assets/images/qurt_center_calender.png" alt=""> -->
                <!-- <div class="time">{{time}}</div> -->
                <div class="time">2016-06-17 11:45:00</div>
            </div>
        </div>
    </div>
    <div class="population-all">
        <div class="population-all-box">
            <div class="population-all-city">凤凰古镇</div>
            <div class="population-all-people">当前区域人口总量</div>
        </div>
        <div class="population-all-number">{{totalNumber}}</div>
    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      time:'',
    };
  },
  props: ["totalNumber"],
  watch:{
  },
  components: {},

  computed: {

  },

  mounted() {
      function dateFtt(fmt,date)   
        { //author: meizz   
          var o = {   
            "M+" : date.getMonth()+1,                 //月份   
            "d+" : date.getDate(),                    //日   
            "h+" : date.getHours(),                   //小时   
            "m+" : date.getMinutes(),                 //分   
            "s+" : date.getSeconds(),                 //秒   
            "q+" : Math.floor((date.getMonth()+3)/3), //季度   
            "S"  : date.getMilliseconds()             //毫秒   
          };   
          if(/(y+)/.test(fmt))   
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
          for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
          return fmt;   
        } 
        this.time = dateFtt("yyyy-MM-dd",new Date())

        function format (num) {  
            var reg=/\d{1,3}(?=(\d{3})+$)/g;   
            return (num + '').replace(reg, '$&,');  
        }
        this.number = format(this.number)
  },
  methods: {}
};
</script>
<style>
.search-box .el-input__icon {
  color: #3fd9ff;
  line-height: 36px;
}
.search-box .el-date-editor.el-input {
  width: 160px;
}
.search-box .el-input__inner {
  color: #3fd9ff;
  height: 36px;
  border-radius: 0;
  background-color: #213044;
  border: 1px solid #213044;
  padding-left: 40px;
  padding-right: 30px;
}
input::-webkit-input-placeholder {
  color: red;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: red;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: red;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
}
</style>

<style lang='scss' scoped>
.search-box {
  display: flex;
  justify-content:flex-end;
  .area-box{
     justify-content:flex-start;
    //  width: 315px;
     .area-box-city{
        display: flex;
        float: left;
        margin-left: 10px;
        align-items: center;
        img{
            width:15px;
            height: 22px;
            vertical-align: '10px'
        }
        .icon{
          font-size: 22px;
          color: #3fd9ff;
        }
     }
     .area-box-time{
        display: flex;
        float: left;
        margin-left: 10px;
        align-items: center;
        img{
            width:15px;
            height: 22px;
            vertical-align: '10px'
        }
        .icon{
          font-size: 18px;
          color: #3fd9ff;
        }
     }
  }
  .area{
      // width: 106px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #12213f;
      color: #3fd9ff;
      margin-left: 10px;
      padding: 0 15px;
  }
  .time{
      // width: 106px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #12213f;
      color: #3fd9ff;
      margin-left: 10px;
      padding: 0 15px;
  }
  .tabs {
    display: flex;
    font-size: 12px;
    align-items: center;
    li {
      padding: 10px 20px;
      border: 1px solid #1c3a66;
      color: #5976a1;
      margin-right: 10px;
      border-radius: 2px;
      cursor: pointer;
      &.current {
        background-color: #2181ea;
        border: 1px solid #2181ea;
        color: #ffffff;
      }
    }
  }
}
.population-all{
    margin-left: 32px;
    height: 120px;
    padding-top: 20px;
    .population-all-box{
        float: left;
    }
    .population-all-city{
        font-size: 40px;
        margin-bottom: 12px;
    }
    .population-all-people{
        
        font-size: 20px;
    }
    .population-all-number{
        float: left;
        font-size: 77px;
        margin-left: 20px;
    }
}
</style>