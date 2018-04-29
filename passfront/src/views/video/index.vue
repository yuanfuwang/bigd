<!-- 后台视频仓库 -->
<template>
  <div style="margin:24px">
    <el-row style="margin-bottom:2%">
      <el-col :span="12">
        <h2>课程</h2>
      </el-col>
      <el-col :span="12" style="text-align:right">
        <el-button type="primary" plain @click="handleAddVideosClick">添加课程</el-button>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="24">
      <el-col :span="6" v-for="(item, index) in data" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/images/hamburger.png" style="width:100%">
          <div style="padding: 14px;">
            <p>
              <span>课程名称：</span>
              <span>{{item.title}}</span>
            </p>
            <p>
              <span>课程负责人：</span>
              <span>{{item.createby}}</span>
            </p>
            <p>
              <span>创建时间：</span>
              <span>{{item.createon}}</span>
            </p>
            <div>
              <el-button type="text" class="button" @click="handleVideosDetailClick(item)">课程详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row> -->
    <el-table :data="data" style="width: 100%" @row-click="handleVideosDetailClick" v-loading="this.$store.state.video.loading">
      <el-table-column prop="title" label="课程名称" />
      <el-table-column prop="createby" label="创建人" />
      <el-table-column prop="createon" label="创建时间" />
      <el-table-column prop="status" label="状态" :formatter="formatter" />
    </el-table>

    <el-dialog :title="dialogType==='create'?'新建课程':'课程详情'" :visible="visiable" width="80%" :before-close="closeDialog">
      <el-form :model="createVideosForm" :rules="createVideosRules" ref="createVideosForm" label-width="auto">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="课程名称:" prop="title">
              <el-input v-model="createVideosForm.title" :disabled="dialogType==='detail'?true:false"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程说明:" prop="remarks">
              <el-input v-model="createVideosForm.remarks" :disabled="dialogType==='detail'?true:false"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="课程封面:" prop="picture">
              <el-input v-model="createVideosForm.picture" :disabled="dialogType==='detail'?true:false"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程分类:" prop="category" v-if="dialogType==='detail'?false:true">
              <el-cascader :options="this.$store.state.dic.tempData" v-model="createVideosForm.category" @active-item-change="handleItemChange" :props="props" style="width:100%">
              </el-cascader>
            </el-form-item>
            <el-form-item label="课程分类:" prop="categoryName" v-if="dialogType==='detail'?true:false">
              <el-input v-model="createVideosForm.categoryName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="float:right" v-if="dialogType==='detail'">
        <el-button type="primary" plain @click="handleAddVideoClick">添加视频</el-button>
      </div>
      <el-table :data="videos" style="width: 100%" v-if="dialogType==='detail'" v-loading="this.$store.state.video.videoLoading">
        <el-table-column prop="videoName" label="视频名称" />
        <el-table-column prop="lecturer" label="讲师" />
        <el-table-column prop="userType" label="类型" />
      </el-table>
      <span slot="footer" class="dialog-footer" v-if="dialogType==='create'">
        <el-button @click="videocloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加视频" :visible="videovisiable" width="50%" :before-close="videocloseDialog">
      <el-form :model="createVideoForm" :rules="createVideoRules" ref="createVideoForm" label-width="auto">
        <el-form-item label="阿里服务器的视频ID:" prop="aliid">
          <el-input v-model="createVideoForm.aliid"></el-input>
        </el-form-item>
        <el-form-item label="视频名称:" prop="videoName">
          <el-input v-model="createVideoForm.videoName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="视频存放URL:" prop="videoUrl">
          <el-input v-model="createVideoForm.videoUrl"></el-input>
        </el-form-item> -->
        <el-form-item label="可查看视频人员的类型:" prop="userType">
          <el-input v-model="createVideoForm.userType"></el-input>
        </el-form-item>
        <el-form-item label="讲师:" prop="lecturer">
          <el-input v-model="createVideoForm.lecturer"></el-input>
        </el-form-item>
        <el-form-item label="难度:" prop="difficulty">
          <el-input v-model="createVideoForm.difficulty"></el-input>
        </el-form-item>
        <el-form-item label="视频播放时长:" prop="duration">
          <el-input v-model="createVideoForm.duration"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="videocloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleVideoSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      data: [], // 所有课程数据
      videos: [], //指定课程下所有视频

      visiable: false, //dialog显示隐藏
      videovisiable: false,

      dialogType: "", //dialog 新建 详情状态
      info: "", // 当前选中卡片info
      options2: [], //课程分类字典数据
      props: {
        value: "key",
        children: "child"
      },
      createVideosForm: {
        title: "", // 名称
        remarks: "", // 说明
        picture: "", // 封面
        category: "", // 分类
        categoryName: ""
      },
      createVideosRules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      createVideoForm: {
        aliid: "", //阿里服务器的视频ID
        lecturer: "", //讲师
        sourceurl: "", //源文件地址
        soft: "", //软件
        matterurl: "", //素材地址
        difficulty: "", //难度
        follow: "", //关注人数
        pageview: "", //浏览量
        learn: "", //学习人数
        videoName: "", //视频名称
        videoUrl: "", //视频存放URL
        category: "", //视频分类
        userType: "", //可查看视频人员的类型
        duration: "", //视频播放时长
        collectionid: "" //视频合集分类ID
      },
      createVideoRules: {
        aliid: [{ required: true, message: "请输入aliid", trigger: "blur" }],
        lecturer: [{ required: true, message: "请输入讲师", trigger: "blur" }],
        videoName: [
          { required: true, message: "请输入视频名称", trigger: "blur" }
        ],
        videoUrl: [
          { required: true, message: "请输入视频存放地址", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请输入视频分类", trigger: "blur" }
        ],
        duration: [
          { required: true, message: "请输入播放时长", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // 查询所有课程
    this.selectVideos();
    // 获取顶级字典
    this.selectDics();
  },
  methods: {
    // 查询所有课程
    selectVideos() {
      this.$store
        .dispatch("SelectVideos")
        .then(response => {
          this.data = response;
        })
        .catch(error => {
          this.$notify({
            title: "失败",
            message: error,
            type: "error"
          });
        });
    },
    // 查询课程分类字典
    selectDics(name) {
      this.$store
        .dispatch("SelectByParentId", name)
        .then(response => {
          this.options2 = response;
        })
        .catch(error => {
          this.$notify({
            title: "失败",
            message: error,
            type: "error"
          });
        });
    },
    // 查询课程下视频
    selectVideo(id) {
      this.$store
        .dispatch("SelectVideoList", { collectionid: id })
        .then(response => {
          this.videos = response;
        })
        .catch(error => {
          this.$notify({
            title: "失败",
            message: error,
            type: "error"
          });
        });
    },
    // 点击新建按钮
    handleAddVideosClick() {
      this.dialogType = "create";
      this.visiable = true;
    },
    // 点击添加视频按钮
    handleAddVideoClick() {
      this.videovisiable = true;
    },
    // 点击table row
    handleVideosDetailClick(row, event, column) {
      //获取id下所有视频
      this.$store
        .dispatch("SelectVideoList", { collectionid: row.id })
        .then(response => {
          this.videos = response;
          this.createVideosForm = row;
          this.dialogType = "detail";
          this.visiable = true;
        })
        .catch(error => {
          this.$notify({
            title: "失败",
            message: error,
            type: "error"
          });
        });
    },
    // 关闭dialog
    closeDialog() {
      this.$refs["createVideosForm"].resetFields();
      this.createVideosForm.category = [];
      this.visiable = false;
      this.selectVideos();
    },
    videocloseDialog() {
      this.videovisiable = false;
      this.selectVideo();
    },
    // 根据父ID查下级分类
    handleItemChange(val) {
      this.selectDics(val[0]);
    },
    // 点击确定按钮
    handleSubmit() {
      this.$refs["createVideosForm"].validate(valid => {
        if (valid) {
          // 取最下级分类id
          this.createVideosForm.category = this.createVideosForm.category[
            this.createVideosForm.category.length - 1
          ];
          // 创建视频仓库
          this.$store
            .dispatch("CreateVideos", this.createVideosForm)
            .then(response => {
              this.$message({
                message: response,
                type: "success"
              });
              this.closeDialog();
            })
            .catch(error => {
              this.$notify({
                title: "失败",
                message: error,
                type: "error"
              });
            });
        }
      });
    },
    handleVideoSubmit() {
      this.$refs["createVideoForm"].validate(valid => {
        if (valid) {
          // collectionid
          this.createVideoForm.collectionid = this.createVideosForm.id;
          // 添加视频
          this.$store
            .dispatch("CreateVideo", this.createVideoForm)
            .then(response => {
              this.$message({
                message: response,
                type: "success"
              });
              this.videocloseDialog();
            })
            .catch(error => {
              this.$notify({
                title: "失败",
                message: error,
                type: "error"
              });
            });
        }
      });
    },
    formatter(row, column) {
      if (column.property === "status") {
        if (row[column.property] === "0") {
          return <el-tag type="success">启用</el-tag>;
        }
        if (row[column.property] === "1") {
          return <el-tag type="danger">暂停</el-tag>;
        }
      }
      if (column.property === "createon") {
        return this.fmtDate(row[column.property]);
      }
    }
  }
};
</script>

