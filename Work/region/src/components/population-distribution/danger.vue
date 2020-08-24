<template>
  <div class="danger-details">
    <div class="content-box">
      <div class="content" id="content">
        <div class="danger-warning" v-show="isDangerWarning">
          <div class="title">
            <span class="line"></span>
            <h3>地震预警</h3>
            <span class="line2"></span>
          </div>
          <div class="message">
            <p class="short-mes">湖南省湘西土家族苗族自治州(北纬31.4度，东经105.2度)将于29日1时27分发生3.3级地震，震源深度预计为16千米！！！</p>
            <div class="time">
              <p>地震波还有</p>
              <h1>10分20秒</h1>
              <p>到达</p>
            </div>
            <div class="btn">
              <button @click="postMessage()">立即发送短信</button>
            </div>
          </div>
          <div class="close" @click="closeDanger">
            <i class="el-icon-close"></i>
          </div>
          <div class="content-chart" :class="{mt:title=='国际漫游人员来源地'}">
            <slot></slot>
          </div>
        </div>
        <div class="post-message" v-show="isPostMessage">
          <h3 class="mes-title">发送紧急短信</h3>
          <div class="mes-list">
            <ul>
              <li>
                <span>预计地震位置：</span>
                <span>湖南省湘西土家族苗族自治州(北纬31.4度，东经105.2度)</span>
              </li>
              <li>
                <span>预计地震时间：</span>
                <span>2019-6-29 13:27</span>
              </li>
              <li>
                <span>选择发送范围：</span>
                <span class="input-text">
                  <el-select v-model="value" placeholder="请选择">
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
                <span>编辑短信内容：</span>
                <span class="input-text">
                  <textarea name id cols="30" rows="6" v-model="textarea"></textarea>
                </span>
              </li>
            </ul>
          </div>
          <div class="mes-btn">
            <button @click="cancelPostMessage()">取消</button>
            <button @click="definePost()">立即发送</button>
          </div>
          <div class="close" @click="closeDanger">
            <i class="el-icon-close"></i>
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
      isDangerWarning:true,
      isPostMessage:false,
      options: [
        {
          value: "选项1",
          label: "一公里内"
        },
        {
          value: "选项2",
          label: "两公里内"
        },
        {
          value: "选项3",
          label: "三公里内"
        }
      ],
      value: "一公里内",
      textarea:"【地震预警】湖南省湘西土家族苗族自治州将于29日1时27分发生3.3级地震，震源深度预计为16千米！湘西土家族苗族自治州震感轻微，请合理避险。地震波还有10分20秒到达！-------湘西州防震减灾局大陆地震预警中心"
    };
  },
  props: ["title", "height", "count"],
  watch: {
    count(val) {
      this.isshowDetails = true;
    }
  },
  components: {},

  computed: {},

  mounted() {
   
  },

  methods: {
    closeDanger() {
      this.isDangerWarning = true
      this.isPostMessage = false
      this.$emit("closeDanger", false);
    },
    definePost() {
      this.isDangerWarning = true
      this.isPostMessage = false
      alert('短信发送成功')
      this.$emit("closeDanger", false);
    },
    postMessage() {
      this.isDangerWarning = false
      this.isPostMessage = true
    },
    cancelPostMessage() {
      this.isDangerWarning = true
      this.isPostMessage = false
    }
  }
};
</script>
<style>
.danger-details .el-input--suffix .el-input__inner{
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
        .mes-btn{
            display: flex;
            justify-content: center;
            margin-top: 0.1rem;
          button{
            font-size: 0.24rem;
            font-weight: 400;
            width: 1.8rem;
            height: 0.5rem;
            background-color: #830b0b;
            border-radius: 5px;
            border: none;
            color: #ffffff;
            &:nth-child(1) {
              color:#830b0b;
              background-color: transparent;
              border: 1px solid #830b0b;
              margin-right: 0.36rem;
            }
          }
        }
      }
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
          width: 200px;
          height: 1px;
          background: -webkit-linear-gradient(right, #01070d, #f50000);
          background: -o-linear-gradient(right, #01070d, #f50000);
          background: -moz-linear-gradient(right, #01070d, #f50000);
          background: linear-gradient(to right, #01070d, #f50000);
          display: block;
        }
        .line2 {
          width: 200px;
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
        .time {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.5rem 0 0.65rem;
          p {
            font-size: 0.2rem;
            color: rgba($color: #ffffff, $alpha: 0.5);
          }
          h1 {
            font-size: 0.8rem;
            padding: 0 0.2rem;
            color: #f50000;
          }
        }
        .btn {
          display: flex;
          justify-content: center;
          margin-bottom:0.7rem;
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
      .content-chart {
        overflow-y: scroll;
        padding: 0 0.1rem;
        &::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        &::-webkit-scrollbar-track {
          box-shadow: 0px 0px 3px #038fb2 inset;
          border-radius: 0.05rem;
          background: #038fb2;
          width: 2px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 0.05rem;
          background: #038fb2;
        }
        &.mt {
          margin-top: -15px;
        }
      }
    }
  }
}
</style>