<template>
  <div>
    <!-- <div class="p2">
            <el-row type="flex" justify="center" align="bottom" style="text-align:center">
                <el-col :span="24">
                    <p class="t1">联系我们</p>
                </el-col>
            </el-row>
            <el-row style="text-align:center;margin-bottom:12px">
                <el-col :span="24">
                    <el-amap vid="amapDemo" :zoom="zoom" :center="center" :plugin="plugin" style="width:60%;height:200px;margin:0 auto">
                        <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
                    </el-amap>
                </el-col>
            </el-row>
        </div>
        <div class="p3">
            <el-row>
                <el-col :span="24">
                    <p class="t2">Copyright © 2018-2020 BIGD</p>
                </el-col>
            </el-row>
        </div> -->
    <div class="p2">
      <span class="t2">大连必格设计有限公司</span>
      <span class="t2" style="margin-left:24px">辽ICP备15008114号-1</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer",
  data() {
    return {
      zoom: 15,
      center: [121.5261268616, 38.8569705195],
      marker: {
        position: [121.5261268616, 38.8569705195],
        events: {
          click: () => {
            if (this.mywindow.visible === true) {
              this.mywindow.visible = false;
            } else {
              this.mywindow.visible = true;
            }
          },
          dragend: e => {
            this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
          }
        },
        visible: true,
        draggable: false
      },
      plugin: [
        {
          pName: "ToolBar",
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        },
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        }
      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.t1 {
  font-family: FZLTZHK--GBK1-0;
  font-size: 24px;
  letter-spacing: 1px;
  color: #feffff;
}
.t2 {
  font-family: FZLTZHK--GBK1-0;
  font-size: 12px;
  letter-spacing: 1px;
  color: #feffff;
  line-height: 60px;
}
.t3 {
  font-size: 20px;
  color: #feffff;
}
.t4 {
  font-size: 16px;
  color: #feffff;
}
.p2 {
  background-color: #2e3337;
  height: 60px;
  margin-top: 20px;
  text-align: center;
}
.p3 {
  text-align: center;
  background-color: #1c1d1f;
}
// @media screen and (min-width: 1200px) {
//   .t1 {
//     font-size: 38px;
//   }
//   .t2 {
//     font-size: 24px;
//   }
// }

// @media screen and (max-width: 1200px) and (min-width: 992px) {
//   .t1 {
//     font-size: 38px;
//   }
//   .t2 {
//     font-size: 24px;
//   }
// }

// @media screen and (max-width: 992px) and (min-width: 768px) {
//   .t1 {
//     font-size: 38px;
//   }
//   .t2 {
//     font-size: 24px;
//   }
//   .t3 {
//     font-size: 16px;
//   }
// }

// @media screen and (max-width: 768px) and (min-width: 576px) {
//   .t1 {
//     font-size: 38px;
//   }
//   .t2 {
//     font-size: 24px;
//   }
//   .t3 {
//     font-size: 12px;
//   }
// }

// @media screen and (max-width: 576px) and (min-width: 476px) {
//   .t1 {
//     font-size: 24px;
//   }
//   .t2 {
//     font-size: 10px;
//   }
//   .t3 {
//     font-size: 12px;
//   }
// }

// @media screen and (max-width: 476px) {
//   .t1 {
//     font-size: 24px;
//   }
//   .t2 {
//     font-size: 10px;
//   }
//   .t3 {
//     font-size: 12px;
//   }
// }
</style>


