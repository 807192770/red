<template>
  <!-- 产品列表 -->
  <div class="product-list">
    <header class="header">
      <div class="container">
        <div class="headers-title">
          <img src="../../assets/images/logo-1.png" alt="朗信logo" class="headers-logo" />
          <span class="headers-txt">朗信云平台</span>
        </div>
        <div class="headers-operate">
          <div class="business-container">
            <span class="user-container" @click="goPage('/personalCenter')">
              <img :src="icon.user" alt />
              用户中心
            </span>
            <span class="partition">丨</span>
            <span class="device-container" @click="goPage('/deviceManagement')">
              <img :src="icon.device" alt />
              我的设备
            </span>
            <span class="partition">丨</span>
            <span class="alert-container" @click="(()=>{this.$message('规划中,敬请期待！')})">
              <img :src="icon.alert" alt />
              报警中心
            </span>
          </div>
          <div class="quit-container" @click="quitOut('/login')">
            <img :src="icon.quit" alt />
            退出
          </div>
        </div>
      </div>
    </header>
    <main class="content">
      <div class="container">
        <div class="notice">
          <noticeList :noticeInfo="noticeInfo" />
        </div>
      </div>
      <div class="products-list">
        <div class="products">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item,index) in productList" :key="index">
              <a href="./HVST" class="item">
                <img :src="require(`../../assets/images/item/item-${index%4}.png`)" class="bgc" />
                <img :src="require(`../../assets/images/item/icon-${index%4}.png`)" class="icon" />
                <span class="txt">{{ item.fullName }}</span>
              </a>
            </swiper-slide>
            <div id="swiper-pagination" slot="pagination" class="swiper-pagination" />
          </swiper>
          <div
            class="swiper-button-prev"
            :style="{backgroundImage:'url('+require('../../assets/images/icon/prev.png')+')'}"
          ></div>
          <div
            class="swiper-button-next"
            :style="{backgroundImage:'url('+require('../../assets/images/icon/next.png')+')'}"
          ></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import noticeList from "./subView/carousel";
import { GetIndexInfo } from "../../api/login";
export default {
  name: "ProductList",
  data() {
    return {
      swiperOptions: {
        /* swiper3 API */

        // 自动切换图配置
        autoplay: false,
        // 箭头配置
        loop: true,
        // 一个屏幕展示的数量
        slidesPerView: 4,
        // 间距
        spaceBetween: 60,
        // 修改swiper自己或子元素时，自动初始化swiper
        observer: true,
        // 修改swiper的父元素时，自动初始化swiper
        observeParents: true,
        // 分页器
        pagination: ".swiper-pagination",
        paginationClickable: true,
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        // 滑动速度
        speed: 2000,
      },
      pages: [],
      icon: {
        user: require("../../assets/images/icon/user.png"),
        alert: require("../../assets/images/icon/alert.png"),
        device: require("../../assets/images/icon/device.png"),
        quit: require("../../assets/images/icon/quit.png"),
      },
      noticeInfo: [],
      productList: [],
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    cHeight: function () {
      return document.body.offsetHeight < 900
        ? document.body.offsetHeight * 0.45
        : null;
    },
  },
  components: {
    noticeList,
  },
  mounted() {
    // this.swiper.slideTo(0, 1000, false);
    this.getIndexInfo();
  },
  methods: {
    getIndexInfo() {
      GetIndexInfo()
        .then((r) => {
          this.noticeInfo = r.data.noticeList;
          this.productList = r.data.productList;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    goPage(path) {
      this.$router.push({ path });
    },
    quitOut() {
      this.$cookie.remove("Admin-Token");
      this.$cookie.remove("Admin-ID");
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style lang='scss' scoped>
.product-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 80px;
    background-color: #5d76e6; /* 不支持线性的时候显示 */
    background-image: linear-gradient(to right, #5d76e6, #5f75e6);
    .container {
      display: flex;
      justify-content: space-between;
      height: 100%;
      .headers-title {
        display: flex;
        align-items: center;
        .headers-logo {
          width: 53px;
          height: auto;
          margin-right: 10px;
        }
        .headers-txt {
          color: #fff;
          font-weight: 500;
          font-size: 26px;
        }
      }
      .headers-operate {
        display: flex;
        align-items: center;
        color: #fff;
        .business-container {
          .user-container,
          .device-container,
          .alert-container {
            cursor: pointer;
            font-size: 18px;
            img {
              vertical-align: sub;
            }
          }
          .partition {
            margin: 0 10px;
          }
        }
        .quit-container {
          margin-left: 65px;
          font-size: 18px;
          cursor: pointer;

          img {
            vertical-align: sub;
          }
        }
      }
    }
  }
  .content {
    overflow: hidden;
    flex: 1 1 auto;
    min-height: 0;
    background-color: #e3e4fb; /* 不支持线性的时候显示 */
    background-image: linear-gradient(to bottom right, #e3e4fb, #d2d8fa);
    .container {
      .notice {
        display: flex;
        margin: 65px 0 8% 0;
        justify-content: space-between;
        font-size: 16px;
      }
    }
    .products-list {
      .products >>> {
        position: relative;
        width: 80%;
        margin: 0 auto;
        .swiper-container {
          .swiper-wrapper {
            .swiper-slide {
              width: 300px;
              .item {
                display: block;
                cursor: pointer;
                text-align: center;
                position: relative;
                .icon {
                  display: inline-block;
                  width: 30%;
                  position: absolute;
                  margin-left: -15%;
                  left: 50%;
                  top: 16%;
                }
                img {
                  width: 100%;
                }
                span {
                  position: absolute;
                  width: 100%;
                  margin-left: -50%;
                  left: 50%;
                  top: 52%;
                  font-size: 1.2em;
                  color: #fff;
                  font-weight: 400;
                }
              }
            }
          }
          #swiper-pagination {
            top: 80%;
            bottom: auto;
            .swiper-pagination-bullet {
              width: 40px;
              height: 4px;
              border-radius: 2px;
              background: #ff9d00;
              opacity: 0.3;
              &.swiper-pagination-bullet-active {
                opacity: 1;
              }
            }
          }
        }
        .swiper-button-prev {
          left: -45px;
          top: 30%;
          width: 35px;
          background-size: 100% auto;
          transition: opacity 1s;
          -moz-transition: opacity 1s; /* Firefox 4 */
          -webkit-transition: opacity 1s; /* Safari and Chrome */
          -o-transition: opacity 1s; /* Opera */
          opacity: 0;
        }
        .swiper-button-next {
          right: -45px;
          top: 30%;
          width: 35px;
          background-size: 100% auto;
          transition: opacity 1s;
          -moz-transition: opacity 1s; /* Firefox 4 */
          -webkit-transition: opacity 1s; /* Safari and Chrome */
          -o-transition: opacity 1s; /* Opera */
          opacity: 0;
        }
      }
    }
    .products-list:hover {
      .swiper-button-prev,
      .swiper-button-next {
        opacity: 1;
      }
    }
  }
}
.container {
  margin: 0 auto;
  width: 80%;
}
</style>
