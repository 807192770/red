<template>
  <div id="login">
    <header class="headers">
      <div class="headers-container">
        <div class="headers-title">
          <img src="../../assets/images/logo.png" alt="朗信logo" class="headers-logo" />
          <span class="headers-txt">朗信云平台</span>
        </div>
        <div class="headers-operate">
          <img src="../../assets/images/code.png" alt="APP-logo" class="APP-logo" />
        </div>
      </div>
    </header>
    <section class="container">
      <main class="carousel-container">
        <el-carousel :height="height+'px'">
          <el-carousel-item v-for="item in bannerList" :key="item.id" :class="item.class">
            <img ref="height" :src="item.img" class="banner-img" @load="heightInit" />
          </el-carousel-item>
        </el-carousel>
        <!-- 登陆框 -->
        <div class="login-container">
          <div class="courtesy-txt">
            <div class="txt1">您好，</div>
            <h2 class="txt2">欢迎登录朗信云平台。</h2>
            <hr class="txt3" />
          </div>
          <div class="main">
            <div class="item">
              <input v-model="account" type="text" placeholder="请输入登录账号" />
            </div>
            <div class="item">
              <input v-model="password" type="password" placeholder="请输入用户密码" @keyup.enter="login" />
            </div>
            <div class="item code">
              <input v-model="code" type="text" placeholder="请输入验证码" maxlength="4" @keyup.enter="login" />
              <img :src="codePath" class="code-img" @click="getCode()" />
            </div>
            <div class="btn">
              <a v-if="loading" @click.prevent="login">登 录</a>
              <span v-else>登 录 中...</span>
            </div>
            <div class="forget">
              <a @click="(()=>{this.$message('规划中,敬请期待！')})">找回密码</a>
            </div>
          </div>
        </div>
      </main>
      <footer class="footer">
        <main class="content">
          <ul class="items">
            <li v-for="(item) in itemList" :key="item.id" class="item">
              <img :src="item.icon" alt />
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </main>
      </footer>
    </section>
  </div>
</template>
<script>
import { GetCode, Login } from "../../api/login";
export default {
  name: "Login",
  data() {
    return {
      bannerList: [
        {
          id: 1,
          class: "img1",
          img: require("../../assets/images/banner/banner-1.png"),
        },
        {
          id: 2,
          class: "img2",
          img: require("../../assets/images/banner/banner-2.png"),
        },
        {
          id: 3,
          class: "img3",
          img: require("../../assets/images/banner/banner-3.png"),
        },
        {
          id: 4,
          class: "img4",
          img: require("../../assets/images/banner/banner-4.png"),
        },
      ],
      itemList: [
        {
          title: "关于我们",
          link: "",
          icon: require("../../assets/images/index/aboutUs.png"),
        },
        {
          title: "产品中心",
          link: "",
          icon: require("../../assets/images/index/productCenter.png"),
        },
        {
          title: "新闻动态",
          link: "",
          icon: require("../../assets/images/index/newsInfo.png"),
        },
        {
          title: "联系我们",
          link: "",
          icon: require("../../assets/images/index/contactUs.png"),
        },
      ],
      loading: true,
      account: "wzj",
      password: "123456",
      code: "",
      uuid: "",
      height: "",
      codePath: "",
    };
  },
  mounted() {
    this.heightInit();
    window.addEventListener(
      "resize",
      () => {
        this.height = document.body.clientHeight - 80;
        this.heightInit();
      },
      false
    );
    this.getCode();
  },
  methods: {
    getCode() {
      GetCode()
        .then((response) => {
          this.codePath = `data:image/png;base64,${response.img}`;
          this.uuid = response.uuid;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    heightInit() {
      this.$nextTick(() => {
        this.height = document.body.clientHeight - 80;
      });
    },
    login() {
      if (!this.account) {
        this.$message.error("请输入登录账号");
        return false;
      }
      if (!this.password) {
        this.$message.error("请输入用户密码");
        return false;
      }
      if (!this.code) {
        this.$message.error("请输入验证码");
        return false;
      }

      const param = {
        username: this.account,
        password: this.password,
        grant_type: "password",
        scope: "server",
        client_id: "web",
        client_secret: "123456",
        code: this.code,
        uuid: this.uuid,
      };
      this.loading = false;
      Login(param)
        .then((response) => {
          this.loading = true;
          if (response.code == 500) {
            this.$message.error(
              "登录失败,请检查登录账号/用户密码/验证码是否正确"
            );
            this.getCode();
          } else {
            this.$cookie.set("Admin-Token", response.access_token);
            this.$cookie.set("Admin-ID", response.id);
            this.$router.push({ path: "/productList" });
          }
        })
        .catch((error) => {
          this.loading = true;
          this.getCode();
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#login {
  .headers {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
    height: 80px;
    border-bottom: 1px solid #e6eaf5;
    .headers-container {
      width: 75%;
      margin: 0 auto;
      line-height: 80px;
      display: flex;
      justify-content: space-between;
      .headers-title {
        display: flex;
        align-items: center;
        .headers-logo {
          width: 53px;
          height: auto;
          margin-right: 10px;
        }
        .headers-txt {
          color: #4960ce;
          font-weight: 500;
          font-size: 28px;
        }
      }
      .headers-operate {
        display: flex;
        align-items: center;
        .APP-logo {
          &:hover {
            transform: scale(1.2);
            -ms-transform: scale(1.2);
            -moz-transform: scale(1.2);
            -webkit-transform: scale(1.2);
            -o-transform: scale(1.2);
          }
          transition: all 0.5s;
          -webkit-transition: all 0.5s;
          color: #666;
          cursor: pointer;
        }
      }
    }
  }
  .container {
    overflow: hidden;
    min-height: 100vh;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    display: flex;
    display: -webkit-flex;
    .footer {
      background: #5b74e7;
      width: 100%;
      // z-index: 999;
      // position: fixed;
      // bottom: 0;
      // left: 0;
      .content {
        width: 75%;
        margin: 0 auto;
        .items {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          li {
            height: 80px;
            display: flex;
            align-items: center;
            span {
              margin-left: 15px;
              font-size: 20px;
              color: #fff;
            }
            img {
              width: 40px;
            }
          }
        }
      }
    }
    .carousel-container {
      flex-grow: 1;
      position: relative;
      .el-carousel /deep/ {
        background: #f5f6f8;
        .el-carousel__item {
          text-align: center;
          &.img4 {
            background-image: linear-gradient(to bottom, #f6faff, #dceaff);
          }
          &.img3 {
            background-image: linear-gradient(to bottom, #eef5ff, #dceaff);
          }
          &.img2 {
            background-image: linear-gradient(to bottom, #eef5ff, #dcebff);
          }
          &.img1 {
            background-image: linear-gradient(to bottom, #f5f6f8, #f5f7f9);
          }
          img {
            height: 100% !important;
          }
          background: #eee;
        }
        .el-carousel__indicators {
          bottom: 10%;
          .el-carousel__indicator {
            button {
              width: 60px;
              height: 4px;
              background: rgba(93, 119, 228, 1);
              opacity: 0.2;
              border-radius: 2px;
            }
            &.is-active {
              button {
                opacity: 1;
              }
            }
          }
        }
      }
      .login-container {
        position: fixed;
        right: 12.5%;
        z-index: 99;
        top: 50%;
        margin-top: -285px;
        background: #fff;
        padding: 2.2% 1.6% 4% 1.6%;
        .courtesy-txt {
          font-size: 24px;
          color: #100249;
          .txt1 {
            font-weight: 100;
          }
          .txt2 {
            font-weight: 800;
            margin: 10px 0 15px 0;
          }
          .txt3 {
            width: 2em;
            height: 4px;
            background: #ffc720;
          }
        }
        .main {
          margin-top: 13%;
          .item {
            margin-bottom: 10%;
            width: 320px;
            background: #f4f4f4;
            input {
              height: 40px;
              border: none;
              width: 100%;
              background: #f4f4f4;
              outline: none;
              text-indent: 30px;
            }
            &.code {
              display: flex;
              justify-content: space-between;
              img {
                height: 42px;
              }
            }
          }
          .btn {
            margin-top: 13%;
            a,
            span {
              display: block;
              height: 40px;
              text-align: center;
              line-height: 40px;
              background: #566fe0;
              color: #fff;
            }
            span {
              opacity: 0.8;
            }
          }
          .forget {
            margin-top: 7%;
            text-align: center;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
