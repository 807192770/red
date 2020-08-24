<template>
  <div id="show-map" class="map">
    <!-- index 地图 -->
  </div>
</template>

<script>
export default {
  name: 'ShowMap',
  props: ['tableData', 'centerPoint'],
  data() {
    return {
      map: null,
      mapData: [],
      markers: [],
      mapIcon: {
        3: { width: 0, height: -21 }, // greenIcon
        1: { width: -46, height: -21 }, // redIcon
        2: { width: -23, height: -21 }, // blueIcon
        0: { width: -69, height: -21 } // yellowIcon
      }
    }
  },
  watch: {
    tableData: {
      handler(n, o) {
        this.mapData = n
        this.initData(this.mapData)
      },
      deep: true
    },
    centerPoint: {
      handler(n, o) {
        this.initMap()
      },
      deep: true
    }
  },
  mounted() {
    this.initData(this.mapData)
  },
  methods: {
    initData(data) {
      // 根据数据 遍历markers数组
      const that = this
      data.forEach((element) => {
        if (element.status == 1 || element.status == 2) {
          const item = {
            content: element.area,
            lineVoltage: element.lineVoltage, // 一次电压（kV）
            transfomerType: element.transfomerType, // 变压器型号
            transformerVolume: element.transformerVolume, // 变压器容量（kVA）
            title: element.name,
            id: element.id,
            imageOffset: that.mapIcon[element.status],
            position: { lat: element.latitude, lng: element.longitude }
          }
          this.markers.push(item)
        }
      })
      this.$nextTick(() => {
        this.initMap()
      })
    },
    initMap() {
      // 创建和初始化地图函数：
      this.$nextTick(() => {
        this.createMap() // 创建地图
        this.setMapEvent() // 设置地图事件
        this.addMapControl() // 向地图添加控件
        this.addMapOverlay() // 向地图添加覆盖物
      })
    },
    createMap() {
      this.map = new BMap.Map('show-map')
      this.map.centerAndZoom(
        new BMap.Point(this.centerPoint.longitude, this.centerPoint.latitude),
        15
      )
    },
    setMapEvent() {
      this.map.enableScrollWheelZoom()
      this.map.enableKeyboard()
      this.map.enableDragging()
      this.map.enableDoubleClickZoom()
    },
    addClickHandler(target, window) {
      const that = this
      target.addEventListener('click', function() {
        target.openInfoWindow(window)
        if (!window.isOpen()) {
          // 如果没有打开，则监听打开事件，获取按钮，添加事件
          window.addEventListener('open', function() {
            document.getElementById('details').onclick = function(e) {
              console.log(e.target.attributes.equipid.value)
            }
            document.getElementById('goTask').onclick = function(e) {
              console.log(e.target.attributes.taskID.value)
            }
          })
        } else {
          // 如果已经打开，直接获取按钮，添加事件
          document.getElementById('details').onclick = function(e) {
            console.log(e.target.attributes.equipid.value)
            that.$router.push({
              path: '/deviceManagementIndex',
              query: { id: e.target.attributes.equipid.value }
            })
          }
          document.getElementById('goTask').onclick = function(e) {
            console.log(e.target.attributes.taskID.value)
            that.$router.push({
              path: '/dataAnalysisIndex',
              query: { id: e.target.attributes.taskID.value }
            })
          }
        }
      })
    },
    addMapOverlay() {
      for (var index = 0; index < this.markers.length; index++) {
        var point = new BMap.Point(
          this.markers[index].position.lng,
          this.markers[index].position.lat
        )
        var marker = new BMap.Marker(point, {
          icon: new BMap.Icon(
            'http://api.map.baidu.com/lbsapi/createmap/images/icon.png',
            new BMap.Size(20, 25),
            {
              imageOffset: new BMap.Size(
                this.markers[index].imageOffset.width,
                this.markers[index].imageOffset.height
              )
            }
          )
        })
        // label
        var label = new BMap.Label(this.markers[index].title, {
          offset: new BMap.Size(25, 5)
        })
        label.setStyle({
          color: 'black',
          fontSize: '13px',
          backgroundColor: '#CCFFFF',
          border: '3px solid #1E90FF',
          padding: '2px',
          borderRadius: '50%',
          fontWeight: 'bold',
          display: 'none'
        })
        // 信息弹框
        var opts = {
          width: 300,
          height: 280,
          title: this.markers[index].title,
          enableMessage: true
        }
        var domStr = `<div class="content">
              <div class='item'>
                <span class="key">专变名称：</span>
                <span class="value">${this.markers[index].content}</span>
              </div>
              <div class='item'>
                <span class="key">一次电压：</span>
                <span class="value">${this.markers[index].lineVoltage} kV</span>
              </div>
              <div class='item'>
                <span class="key">变压器型号：</span>
                <span class="value">${this.markers[index].transfomerType}</span>
              </div>
              <div class='item'>
                <span class="key">变压器容量：</span>
                <span class="value">${this.markers[index].transformerVolume} kVA</span>
              </div>
            </div>
            <div class="handle">
              <input id="details" class="btn blue" type="button" value="设备详情" equipID="${this.markers[index].id}" οnclick="details()"/>
              <input id="goTask" class="btn txt" type="button" value="查看任务" taskID="${this.markers[index].id}" οnclick="GoTask()"/>
            </div> `
        var infoWindow = new BMap.InfoWindow(domStr, opts)
        marker.setLabel(label)
        this.addClickHandler(marker, infoWindow)
        this.map.addOverlay(marker)
      }
    },
    // 向地图添加控件
    addMapControl() {
      var scaleControl = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_LEFT
      })
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL)
      this.map.addControl(scaleControl)
      var navControl = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
      })
      this.map.addControl(navControl)
      var overviewControl = new BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: true
      })
      this.map.addControl(overviewControl)
    }
  }
}
</script>

<style scoped lang='scss'>
.map {
  width: 100%;
  height: 100%;
}
</style>
