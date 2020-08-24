<template>
  <div class="map-container">
    <!-- 地理信息 -->
    <el-form ref="form" :model="localForm" label-position="top" size="small">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="省份">
            <el-select
              v-model="localForm.province"
              placeholder="请选择省份"
              filterable
              clearable
              value-key="properties"
              @change="getCityMap"
            >
              <el-option
                :label="it.properties.name"
                :value="it"
                v-for="(it,index) in provinceMapList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="市区">
            <el-select
              v-model="localForm.city"
              placeholder="请选择市区"
              clearable
              filterable
              value-key="properties"
              @change="getCityCoordinate"
            >
              <el-option
                :label="it.properties.name"
                :value="it"
                v-for="(it,index) in cityMapList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="点选坐标">
            <el-input v-model="coordinate" disabled placeholder="请点选坐标" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div id="geo-map" class="map"></div>
    <el-row class="row-item">
      <el-col :span="24" class="tr mt15">
        <el-button size="small" @click="goBack">上一步</el-button>
        <el-button type="primary" size="small" @click="detailsInfoSave">保 存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  AddTaskThird,
  GetCountryMap,
  GetrCityMap,
} from "../../../api/taskManagement";
export default {
  name: "geo-map",
  data() {
    return {
      map: null,
      localForm: {
        province: {},
        city: "",
      },
      centerPoint: {
        lng: 116.405285,
        lat: 39.904989,
      },
      provinceMapList: [],
      cityMapList: [],
    };
  },
  props: ["allInfo"],
  computed: {
    coordinate() {
      return `${this.centerPoint.lng},${this.centerPoint.lat}`;
    },
    taskId() {
      return this.$store.state.index.taskID;
    },
    taskInfo() {
      return this.$store.state.index.taskInfo;
    },
  },
  watch: {
    taskInfo(n, o) {
      if (n) {
        this.localForm.province = {};
        this.localForm.city = "";
        // this.$nextTick(() => {
        //   this.init();
        // });
      }
    },
    allInfo(n, o) {
      this.$nextTick(() => {
        this.init();
      });
    },
  },
  mounted() {
    this.getCountryMap();
    this.$nextTick(() => {
      this.init();
    });
  },

  methods: {
    initMap() {
      //创建和初始化地图函数：
      let that = this;
      console.log(that.centerPoint);
      this.createMap(that.centerPoint.lng, that.centerPoint.lat); //创建地图
      this.setMapEvent(); //设置地图事件
      this.setMarker(); //向地图添加标注
      this.addMapControl(); //向地图添加控件
    },
    createMap(lng, lat) {
      console.log(lng, lat);
      let that = this;
      that.map = new BMap.Map("geo-map");
      that.map.centerAndZoom(new BMap.Point(lng, lat), 20);
    },
    setMapEvent() {
      let that = this;
      this.map.enableScrollWheelZoom();
      this.map.enableKeyboard();
      this.map.enableDragging();
      this.map.enableDoubleClickZoom();
      this.map.addEventListener("click", function (e) {
        that.centerPoint.lng = e.point.lng;
        that.centerPoint.lat = e.point.lat;
        that.map.clearOverlays();
        that.setMarker();
      });
    },
    //向地图添加标注
    setMarker() {
      var marker = new BMap.Marker(
        new BMap.Point(this.centerPoint.lng, this.centerPoint.lat)
      ); // 创建标注
      this.map.addOverlay(marker);
    },
    //向地图添加控件
    addMapControl() {
      var scaleControl = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_LEFT,
      });
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
      this.map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE,
      });
      this.map.addControl(navControl);
    },
    detailsInfoSave() {
      // 保存
      var province = this.localForm.province.properties
        ? this.localForm.province.properties.name
        : "";
      var city = this.localForm.city.properties
        ? this.localForm.city.properties.name
        : "";
      let par = {
        province:
          typeof this.localForm.province != "string"
            ? province
            : this.localForm.province,
        city:
          typeof this.localForm.city != "string" ? city : this.localForm.city,
        latitude: this.centerPoint.lat,
        longitude: this.centerPoint.lng,
        taskId: this.taskId.taskId,
      };
      console.log(par);
      AddTaskThird(par)
        .then((r) => {
          if (r.code == 200) {
            this.$message.success("任务保存成功");
            let goPage = {
              cur: 3,
              name: "save",
            };
            this.$emit("save", goPage);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    goBack() {
      // 上一步
      let backPage = {
        cur: 1,
        name: "majorInfo",
      };
      this.$emit("back", backPage);
    },
    getCountryMap() {
      // 获取省份下拉
      GetCountryMap()
        .then((r) => {
          this.provinceMapList = r.features;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCityMap(value) {
      // 获取城市下拉
      this.getCityCoordinate(value);
      GetrCityMap(value.properties.name)
        .then((r) => {
          this.cityMapList = r.features;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCityCoordinate(value) {
      // 根据坐标重置地图中心点
      this.centerPoint.lng = value.properties.center[0];
      this.centerPoint.lat = value.properties.center[1];
      this.initMap();
    },
    init() {
      // 回显
      this.centerPoint.lat = JSON.parse(this.$cookie.get("point")).lat;
      this.centerPoint.lng = JSON.parse(this.$cookie.get("point")).lng;
      if (this.allInfo.third) {
        // 编辑
        this.localForm.province = this.allInfo.third.province
          ? this.allInfo.third.province
          : "";
        this.localForm.city = this.allInfo.third.city
          ? this.allInfo.third.city
          : "";
        this.centerPoint.lat = this.allInfo.third.latitude
          ? this.allInfo.third.latitude
          : JSON.parse(this.$cookie.get("point")).lat;
        this.centerPoint.lng = this.allInfo.third.longitude
          ? this.allInfo.third.longitude
          : JSON.parse(this.$cookie.get("point")).lng;
      } else {
        // 新增
      }
      this.initMap();
    },
  },
};
</script>

<style scoped lang='scss'>
.map {
  width: 100%;
  height: 300px;
}
</style>
