<template>
  <div class="main">
    <my-header></my-header>
    <div class="topBodyclass">
      <div>
        <!-- <el-carousel :interval="3000" type="card">
          <el-carousel-item v-for="item in items" :key="item.key">
            <img class="imgCss" :src="item.value">
          </el-carousel-item>
        </el-carousel> -->
        <el-carousel height="350px">
          <el-carousel-item v-for="item in items" :key="item.key">
            <img class="imgCss" :src="item.value">
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="bottomBodyclass1111">
        <component1/>
      </div>

      <!-- <div style="margin-top:2%; width:100%">
        <div style="margin-top:2%;width:30%;margin:0 auto; text-align:center">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">首页推荐</el-menu-item>
            <el-menu-item index="2">最新发布</el-menu-item>
            <el-menu-item index="3">上升最快</el-menu-item>
          </el-menu>
        </div>
      </div> -->
    </div>

    <div class="bottomBodyclass">
      <div style="width:241px;height:191px;border-radius: 10px;border: 1px solid rgb(245, 4, 4);margin-right:10px;display:inline-block">
        <div style="width:241px;height:147px;" @click="testVideo">

        </div>
        <div style="width:241px;height:44px;background:#ffffff;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px">
          <span style="font-size:16px;margin-left:12px;line-height:44px">PS-软件入门</span>
        </div>
      </div>

      <div style="width:241px;height:147px;border-radius: 10px;border: 1px solid rgb(245, 4, 4);margin-right:10px;display:inline-block"></div>
      <div style="width:241px;height:147px;border-radius: 10px;border: 1px solid rgb(245, 4, 4);margin-right:10px;display:inline-block"></div>
      <div style="width:241px;height:147px;border-radius: 10px;border: 1px solid rgb(245, 4, 4);display:inline-block"></div>
    </div>

    <!-- <el-row style="margin-bottom:3%">
        <el-col :span="4" v-for="(o, index) in 5" :key="o" :offset="index > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../assets/images/bigd.gif" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <el-row style="margin-bottom:5%">
                  <el-col :span="8">
                    <i class="el-icon-view"></i>
                    <span>2.2万</span>
                  </el-col>
                  <el-col :span="8">
                    <i class="el-icon-edit"></i>
                    <span>56</span>
                  </el-col>
                  <el-col :span="8">
                    <i class="el-icon-star-on"></i>
                    <span>347</span>
                  </el-col>
                </el-row>
                <el-button type="text" class="button" @click="testVideo">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row> -->
    <!-- <el-row style="margin-bottom:3%">
        <el-col :span="4" v-for="(o, index) in 5" :key="o" :offset="index > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../assets/images/hamburger.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <el-row style="margin-bottom:5%">
                  <el-col :span="8">
                    <i class="el-icon-view"></i>
                    <span>2.2万</span>
                  </el-col>
                  <el-col :span="8">
                    <i class="el-icon-edit"></i>
                    <span>56</span>
                  </el-col>
                  <el-col :span="8">
                    <i class="el-icon-star-on"></i>
                    <span>347</span>
                  </el-col>
                </el-row>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row> -->
    <!-- <el-row>
        <el-col :span="4" v-for="(o, index) in 5" :key="o" :offset="index > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../assets/images/hamburger.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <el-row style="margin-bottom:5%">
                  <el-col :span="8">
                    <i class="el-icon-view"></i>
                    <span>2.2万</span>
                  </el-col>
                  <el-col :span="8">
                    <i class="el-icon-edit"></i>
                    <span>56</span>
                  </el-col>
                  <el-col :span="8">
                    <i class="el-icon-star-on"></i>
                    <span>347</span>
                  </el-col>
                </el-row>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row> -->
    <div style="margin-top:20px;text-align:center ">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
    <my-footer></my-footer>
    <BackTop></BackTop>
  </div>
</template>

<script>
import MyHeader from "./components/header";
import p1 from "../../assets/index/1.png";
import p2 from "../../assets/index/2.jpg";
import p4 from "../../assets/index/3.png";
import p5 from "../../assets/index/4.jpg";
import component1 from "./components/component1";
import component2 from "./components/component2";
import MyFooter from "./components/footer";

export default {
  name: "indexPage",
  components: {
    MyHeader,
    component1,
    component2,
    MyFooter
  },
  data() {
    return {
      items: [
        { key: "1", value: p1 },
        { key: "2", value: p2 },
        { key: "4", value: p4 },
        { key: "5", value: p5 }
      ]
      // currentDate: new Date()
    };
  },
  methods: {
    testVideo() {
      this.$router.push({ path: "/videoList" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main {
  // border: 1px solid rgb(245, 4, 4);
}
.topBodyclass {
  // padding-left: 60px;
  // padding-right: 60px;
  background: #fff;
}
.el-carousel__item {
  // border-radius: 10px;
}
.bottomBodyclass {
  padding-top: 20px;
  padding-left: 215px;
  padding-right: 215px;
  background: #eeeeee;
  padding-bottom: 20px;
  // border: 1px solid rgb(245, 4, 4);
}

.bottomBodyclass1111 {
  padding-top: 20px;
  padding-left: 215px;
  padding-right: 215px;
  background: #fff;
  padding-bottom: 20px;
  // border: 1px solid rgb(245, 4, 4);
}

.el-menu {
  list-style-type: none;
  position: relative;
  margin: 0;
  display: inline;
}

.el-menu--horizontal .el-menu-item {
  float: none;
  // height: 60px;
  line-height: 60px;
  margin: 0;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  color: #909399;
  list-style-type: none;
  display: inline;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

// .el-carousel__arrow--left {
//   font-size: 24px;
// }
// .el-carousel__arrow{
//   font-size: 24px;
// }

// /* ul li以横排显示 */

// /* 所有class为menu的div中的ul样式 */
// div.menu ul {
//   list-style: none; /* 去掉ul前面的符号 */
//   margin: 0px; /* 与外界元素的距离为0 */
//   padding: 0px; /* 与内部元素的距离为0 */
//   width: auto; /* 宽度根据元素内容调整 */
// }
// /* 所有class为menu的div中的ul中的li样式 */
// div.menu ul li {
//   float: left; /* 向左漂移，将竖排变为横排 */
// }
// /* 所有class为menu的div中的ul中的a样式(包括尚未点击的和点击过的样式) */
// div.menu ul li a,
// div.menu ul li a:visited {
//   // background-color: #465c71; /* 背景色 */
//   // border: 1px #4e667d solid; /* 边框 */
//   color: #dde4ec; /* 文字颜色 */
//   display: block; /* 此元素将显示为块级元素，此元素前后会带有换行符 */
//   // line-height: 1.35em; /* 行高 */
//   padding: 4px 20px; /* 内部填充的距离 */
//   text-decoration: none; /* 不显示超链接下划线 */
//   white-space: nowrap; /* 对于文本内的空白处，不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
// }
// /* 所有class为menu的div中的ul中的a样式(鼠标移动到元素中的样式) */
// div.menu ul li a:hover {
//   background-color: #bfcbd6; /* 背景色 */
//   color: #465c71; /* 文字颜色 */
//   text-decoration: none; /* 不显示超链接下划线 */
// }
// /* 所有class为menu的div中的ul中的a样式(鼠标点击元素时的样式) */
// div.menu ul li a:active {
//   background-color: #465c71; /* 背景色 */
//   color: #cfdbe6; /* 文字颜色 */
//   text-decoration: none; /* 不显示超链接下划线 */
// }
</style>


