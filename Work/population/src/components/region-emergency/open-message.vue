<template>
<!-- 应急预警 -->
  <div class="danger-details">
    <div class="content-box">
      <div class="content" id="content">
        <div class="post-message">
          <h3 class="mes-title">发送紧急短信</h3>
          <div class="mes-list">
            <ul>
              <li>
                <span>事件类型：</span>
                <span class="input-text">
                  <el-select v-model="events_type" placeholder="请选择">
                    <el-option
                      v-for="item in emergency"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
              </li>
              <!-- <li>
                <span>预计位置：</span>
                <span>{{this.events_address}}</span>
              </li>
              <li>
                <span>预计时间：</span>
                <span>{{this.events_date}}</span>
              </li> -->
              <li>
                <span>发送范围：</span>
                <span class="input-text">
                  <el-select v-model="value" placeholder="请选择" @change="selectTrigger(value)">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
              </li>
              <li>
                <span>范围人数：</span>
                <span>{{this.msg_num}}人</span>
              </li>
              <li>
                <span>短信内容：</span>
                <span class="input-text">
                  <textarea name id cols="30" rows="6" v-model="msg_content"></textarea>
                </span>
              </li>
            </ul>
          </div>
          <div class="mes-btn">
            <button @click="closeDanger()">取消</button>
            <button @click="definePost()">立即发送</button>
          </div>
          <div class="close" @click="closeDanger">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div class="black-yarn" v-show="isDangerWarning">
          <div class="danger-warning" >
            <div class="warning-content">
              <div class="title">
                <span class="line"></span>
                <h3>短信发送</h3>
                <span class="line2"></span>
              </div>
              <div class="message">
                <p class="short-mes">短信发送成功!共发送{{this.msg_num}}条，发送时间为{{this.events_date}}。</p>
                <div class="btn">
                  <button @click="postMessage()">确认</button>
                </div>
              </div>
              <div class="close" @click="closeDanger">
                <i class="el-icon-close"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDangerWarning: false,
      isPostMessage: false,
      emergency: [
        {
          value: "地震",
          label: "地震"
        },
        {
          value: "台风",
          label: "台风"
        },
        {
          value: "泥石流",
          label: "泥石流"
        },
        {
          value: "暴雨",
          label: "暴雨"
        },
        {
          value: "高温",
          label: "高温"
        },
        {
          value: "火灾",
          label: "火灾"
        },
        {
          value: "洪涝",
          label: "洪涝"
        },
        {
          value: "拥堵",
          label: "拥堵"
        },
        {
          value: "踩踏",
          label: "踩踏"
        },
        {
          value: "暴徒",
          label: "暴徒"
        },
        {
          value: "事故",
          label: "事故"
        }
      ],
      options: [
        {
          value: "一公里内",
          label: "一公里内"
        },
        {
          value: "两公里内",
          label: "两公里内"
        },
        {
          value: "三公里内",
          label: "三公里内"
        }
      ],
      value: "一公里内",
      events_type: "火灾",
      events_address: "贵州省六盘水市水城县鸡场镇坪地村(北纬31.4度，东经105.2度)",
      events_date: "",
      msg_content: "灾情提示：8月30日21时20分，河北省石家庄市正定新区国际会展中心发生火灾，及时绕行避险。-------应急管理部 2019年9月1日",
      msg_num: "15000",
    };

  },
  props: ["title", "height", "count","content"],
  watch: {
    count(val) {
      this.isshowDetails = true;
    },
    // flag(){}
  },
  components: {},

  computed: {},

  mounted() {
    this.realTimeDate()
  },

  methods: {
    closeDanger() {
      this.isDangerWarning = false;
      this.isPostMessage = false;
      this.$emit("closeDanger", false);
      this.msg_content = "灾情提示：7月23日21时20分，贵州省六盘水市水城县鸡场镇坪地村岔沟组发生一起山体滑坡，目前道路正在抢修，请注意观察道路，及时绕行避险。-------应急管理部 2019年8月15日"
    },
    definePost() {
      // this.flag = true;
      this.isDangerWarning = true;
      this.isPostMessage = true;
      this.$parent.getMessage();
      this.$parent.showEarlyWarning(true);
    },
    postMessage() {
      this.isDangerWarning = false;
      this.isPostMessage = false;
      this.$emit("closeDanger", false);
    },
    selectTrigger(val){
      if(val == '一公里内'){
        this.msg_num = 15000
      }else if(val == '两公里内'){
        this.msg_num = 20000
      }else{
        this.msg_num = 25000
      }
    },
    realTimeDate() {
      // 时间处理
      Date.prototype.pattern = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
          "H+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds() //秒
        };
        var week = {
          "0": "星期日",
          "1": "星期一",
          "2": "星期二",
          "3": "星期三",
          "4": "星期四",
          "5": "星期五",
          "6": "星期六"
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        if (/(E+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? "" : "") : "") +
              week[this.getDay() + ""]
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      };
      this.events_date = new Date().pattern("yyyy-MM-dd HH:mm:ss");
      this.msgTime = new Date().pattern("HH:mm");
    },
  }
};
</script>
<style>
.danger-details .el-input--suffix .el-input__inner {
  background-color: transparent;
  border-radius: 0;
  border: 1px solid #999999;
  color: #ffffff;
}
</style>

<style lang='scss' scoped>
.danger-details {
  background-color: rgba($color: #000000, $alpha: 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  .content-box {
    border: 3px solid rgba($color: #e60001, $alpha: 0.3);
    border-radius: 3px;
    width: 50%;
    .content {
      background-color: rgba($color: #000000, $alpha: 0.8);
      border: 1px solid #e60001;
      box-shadow: 0 0 20px #e60001 inset;
      border-radius: 3px;
      width: 100%;
      position: relative;
      .post-message {
        padding: 0.4rem;
        .mes-title {
          font-size: 0.24rem;
          color: #e60001;
        }
        .mes-list {
          padding: 0.4rem;
          font-size: 0.2rem;
          ul {
            li {
              padding: 0.1rem 0;
              display: flex;
              span {
                &:nth-child(1) {
                  color: rgba($color: #ffffff, $alpha: 0.5);
                }
                &:nth-child(2) {
                  flex: 1;
                  .el-select {
                    width: 100%;
                  }
                  textarea {
                    padding: 0.1rem;
                    width: 97%;
                    font-size: 0.2rem;
                    background-color: transparent;
                    color: #ffffff;
                  }
                }
              }
            }
          }
        }
        .mes-btn {
          display: flex;
          justify-content: center;
          margin-top: 0.1rem;
          button {
            font-size: 0.24rem;
            font-weight: 400;
            width: 1.8rem;
            height: 0.5rem;
            background-color: #830b0b;
            border-radius: 5px;
            border: none;
            color: #ffffff;
            cursor: pointer;
            &:nth-child(1) {
              color: #830b0b;
              background-color: transparent;
              border: 1px solid #830b0b;
              margin-right: 0.36rem;
            }
          }
        }
      }
      .close {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        cursor: pointer;
        i {
          font-size: 0.24rem;
        }
      }
    }
    .black-yarn {
      background-color: rgba($color: #000000, $alpha: 0.8);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      .danger-warning {
        position: absolute;
        top: -10%;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        border: 3px solid rgba($color: #e60001, $alpha: 0.3);
        border-radius: 3px;
        width: 50%;
        height: 50%;
        .warning-content {
          background-color: rgba($color: #000000, $alpha: 1);
          border: 1px solid #e60001;
          box-shadow: 0 0 20px #e60001 inset;
          border-radius: 3px;
          width: 100%;
          position: relative;
          .title {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.5rem 0;
            h3 {
              padding: 0 0.05rem;
              color: #f50000;
              font-size: 0.4rem;
            }
            .line {
              width: 50px;
              height: 1px;
              background: -webkit-linear-gradient(right, #01070d, #f50000);
              background: -o-linear-gradient(right, #01070d, #f50000);
              background: -moz-linear-gradient(right, #01070d, #f50000);
              background: linear-gradient(to right, #01070d, #f50000);
              display: block;
            }
            .line2 {
              width: 50px;
              height: 1px;
              background: -webkit-linear-gradient(left, #01070d, #f50000);
              background: -o-linear-gradient(left, #01070d, #f50000);
              background: -moz-linear-gradient(left, #01070d, #f50000);
              background: linear-gradient(to left, #01070d, #f50000);
              display: block;
            }
          }
          .message {
            padding: 0.05rem 0.25rem 0.15rem;
            .btn {
              display: flex;
              justify-content: center;
              margin-bottom: 0.4rem;
              // margin: 60px 0 60px 0;
              button {
                width: 2.6rem;
                height: 0.7rem;
                font-size: 0.28rem;
                background-color: #830b0b;
                border-radius: 5px;
                border: none;
                color: #ffffff;
              }
            }
            .short-mes {
              font-size: 0.24rem;
              line-height: 0.4rem;
              text-indent: 0.4rem;
              margin-bottom: 0.2rem;
            }
          }
          .close {
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;
            cursor: pointer;
            i {
              font-size: 0.24rem;
            }
          }
        }
      }
    }
  }
}
</style>