  <!--  前台视频相关 -->
<template>
    <div>
        <!-- <a href="https://in-20180228122221756-x7yd423zjk.oss-cn-shanghai.aliyuncs.com/video/439155b1-161dad47eb9-0005-26fa-666-cab13.mp4?Expires=1523159231&OSSAccessKeyId=LTAIXduujLCSSEHS&Signature=En6Lz7H%2B65YJYVOPHvjUyFnBurM%3D">
            <span style="font-size:24px">
                播放视频
            </span>
        </a> -->
        <my-header/>
        <!-- 视频 -->
        <div style="padding:24px;    background: #303036;  height:500px">
            <el-row style="height:100%">
                <el-col :span="18" style="height:100%">
                    <ali-player @play="play" :source="getSource" style="height:100%" ref="player"></ali-player>
                </el-col>
                <el-col :span="6" style="height:100%">
                    <el-row type="flex" justify="center" align="middle">
                        <el-col :span="4">
                            <Avatar icon="person" size="large" />
                        </el-col>
                        <el-col :span="16">
                            <p style="font-size:18px;color: #fff">讲师：张小碗</p>
                            <p style="font-size:18px;color: #C0C0C0">关注人数：426</p>
                        </el-col>
                    </el-row>

                    <el-row type="flex" justify="center" align="middle" :gutter="16" style="margin-top:12px;">
                        <el-col :span="10">
                            <el-button type="warning" icon="el-icon-download" style="width:100%">源文件</el-button>
                        </el-col>
                        <el-col :span="10">
                            <el-button type="warning" icon="el-icon-download" style="width:100%">本课素材</el-button>
                        </el-col>
                    </el-row>

                    <el-row type="flex" justify="center" align="middle" style="margin-top:12px;">
                        <el-col :span="20">
                            <p style="font-size:18px;color: #C0C0C0">使用软件：C4D R18</p>
                            <p style="font-size:18px;color: #C0C0C0">难度等级：中级</p>
                            <p style="font-size:18px;color: #C0C0C0">视频时长：23分35秒</p>
                            <p style="font-size:18px;color: #C0C0C0">浏览人数：33390</p>
                            <p style="font-size:18px;color: #C0C0C0">学习人数：7114</p>
                            <p style="font-size:18px;color: #C0C0C0">更新时间：2017/07/13</p>
                            <p style="margin-top:12px; font-size:18px; color: #C0C0C0">工具和快捷键：</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <!-- 互动 -->
        <div style="padding:24px">
            <el-row :gutter="16">
                <el-col :span="18">
                    <el-tabs :tab-position="tabPosition" style="height: 200px;">
                        <el-tab-pane label="学员评价">
                            <div style="padding-left:24px;padding-right:24px">
                                <el-row type="flex" justify="center" align="middle" style="margin-bottom:12px">
                                    <el-col :span="24">
                                        <span style="font-size:16px">本次课程评分：</span>
                                        <el-rate v-model="value1" style="display:inline;line-height:100%"></el-rate>
                                    </el-col>
                                </el-row>

                                <span style="font-size:16px">课程难易程度：</span>
                                <Tag :checked="checked" checkable color="blue">太简单</Tag>
                                <Tag :checked="checked" checkable color="green">简单</Tag>
                                <Tag :checked="checked" checkable color="red">适中</Tag>
                                <Tag :checked="checked" checkable color="yellow">有点难</Tag>
                                <Tag :checked="checked" checkable color="#EF6AFF">太难了</Tag>

                                <el-row style="margin-top:12px">
                                    <el-col :span="24">
                                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="textarea3">
                                        </el-input>
                                    </el-col>
                                </el-row>

                                <el-row style="margin-top:6px">
                                    <el-col :span="24" style="text-align:right">
                                        <el-button type="warning">发表评论</el-button>
                                    </el-col>
                                </el-row>

                                <div style="margin-top:24px;margin-bottom:24px;border: 1px solid #e4e7ed;"></div>

                                <el-row type="flex" align="middle" style="">
                                    <el-col :span="2" style="">
                                        <Avatar icon="person" size="large" />
                                    </el-col>
                                    <el-col :span="16" style="">
                                        <span style="font-size:18px">133****8888</span>
                                        <span style="font-size:18px;margin-left:12px">5分钟</span>
                                        <span style="font-size:18px;margin-left:12px">18小时前</span>
                                        <el-rate v-model="value1" style="font-size:18px;margin-top:6px"></el-rate>
                                        <Tag type="border" :checked="checked" checkable color="red" style="margin-top:6px">适中</Tag>
                                        <p style="margin-top:6px">
                                            6666666666
                                        </p>
                                    </el-col>
                                </el-row>

                                <div style="margin:12px;border: 1px solid #e4e7ed;"></div>

                                <el-row type="flex" align="middle" style="">
                                    <el-col :span="2" style="">
                                        <Avatar icon="person" size="large" />
                                    </el-col>
                                    <el-col :span="16" style="">
                                        <span style="font-size:18px">133****8888</span>
                                        <span style="font-size:18px;margin-left:12px">5分钟</span>
                                        <span style="font-size:18px;margin-left:12px">18小时前</span>
                                        <el-rate v-model="value1" style="font-size:18px;margin-top:6px"></el-rate>
                                        <Tag type="border" :checked="checked" checkable color="red" style="margin-top:6px">适中</Tag>
                                        <p style="margin-top:6px">
                                            6666666666
                                        </p>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="font-size:18px">推荐教程</span>
                            <el-button style="float: right; padding: 3px 0" type="text">换一批</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import MyHeader from "../indexPage/components/header";
import VueAliplayer from "vue-aliplayer";
import MyFooter from "../indexPage/components/footer";
export default {
  name: "index",
  components: {
    MyHeader,
    "ali-player": VueAliplayer,
    MyFooter
  },
  data() {
    return {
      tabPosition: "top",
      value1: null,
      checked: false,
      path: ""
    };
  },
  mounted() {
    this.$store
      .dispatch("GetAliInfo", {
        videoid: "92b0b585-f6cf-4f75-814f-f6562f63acb2"
      })
      .then(response => {
        this.path = response.PlayInfoList.PlayInfo[1].PlayURL;
      })
      .catch(error => {
        this.$notify({
          title: "失败",
          message: error,
          type: "error"
        });
      });
  },
  methods: {
    play() {
      console.log(this.path);
      const player = this.$refs.player.instance;
      player && player.play();
    }
  },
  computed: {
    getSource() {
      return this.path;
    }
  }
};
</script>



