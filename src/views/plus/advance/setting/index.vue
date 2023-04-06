<template>
  <!--
    作者：luoyiming
    时间：2020-06-25
    描述：插件中心-限时秒杀-基础设置
  -->
  <div class="user">
    <el-form size="small" ref="form" :model="form" label-width="150px">
      <!--添加门店-->
      <div class="common-form">预售活动设置</div>
      <el-form-item label=" 未支付定金订单" prop="end_time" :rules="[{ required: true, message: ' ' }]">
        <div style="width: 500px;">
          <el-input placeholder="请输入" v-model="form.end_time" type="number">
            <template slot="append">
              分钟后自动关闭
            </template>
          </el-input>
          <p class="gray">预售订单下单未付款，n分钟后自动关闭，设置0则不自动关闭</p>
        </div>
      </el-form-item>
      <el-form-item label="未支付尾款订单" prop="pay_time" :rules="[{ required: true, message: ' ' }]">
        <div style="width: 500px;">
          <el-input placeholder="请输入" v-model="form.pay_time" type="number">
            <template slot="append">
              小时后自动关闭
            </template>
          </el-input>
          <p class="gray">预售订单下单未付款，n小时后自动关闭，设置0则不自动关闭</p>
        </div>
      </el-form-item>
      <el-form-item label="是否允许退定金" prop="money_return">
        <el-switch v-model="form.money_return"></el-switch>
      </el-form-item>
      <el-form-item label="是否开启分销" prop="is_agent">
        <el-switch v-model="form.is_agent"></el-switch>
        <p>注：如需使用分销功能必须在 [分销中心 - 分销设置] 中开启</p>
      </el-form-item>
      <el-form-item label="活动图片：" :rules="[{ required: true, message: '请上传活动图片' }]" prop="image">
        <div class="draggable-list">
          <draggable class="wrapper" v-model="form.image">
            <transition-group>
              <div class="item" v-for="(item, index) in form.image" :key="item.file_path">
                <img v-img-url="item.file_path" />
                <a href="javascript:void(0);" class="delete-btn" @click.stop="deleteImg(index)"><i
                    class="el-icon-close"></i></a>
              </div>
            </transition-group>
          </draggable>
          <div class="item img-select" @click="openUpload()"><i class="el-icon-plus"></i></div>
        </div>
      </el-form-item>
    </el-form>

    <!--提交-->
    <div class="common-button-wrapper">
      <el-button size="small" type="primary" @click="onSubmit" :disabled="loading">保存</el-button>
    </div>
    <!--商品图片组件-->
    <Upload v-if="isUpload" :config="config" :isupload="isUpload" @returnImgs="returnProductImgsFunc">上传图片
    </Upload>
  </div>
</template>
<script>
  import AdvanceApi from '@/api/advance.js';
  import Upload from '@/components/file/Upload';
  import draggable from 'vuedraggable';
  export default {
    components: {
      Upload,
      draggable
    },
    data() {
      return {
        form: {
          end_time: 10,
          pay_time: 10,
          image: [],
          money_return: 0,
          is_coupon: false,
          is_agent: false,
          is_point: false
        },
        setting: [],
        loading: false,
        isUpload: false,
        config: {
          total: 9,
          file_type: 'image'
        },
      };
    },
    created() {
      /*获取列表*/
      this.getSetting();
    },
    methods: {
      /*打开上传图片*/
      openUpload() {
        this.isUpload = true;
      },

      /*上传商品图片*/
      returnProductImgsFunc(e) {
        console.log(e);
        if (e != null) {
          let imgs = this.form.image.concat(e);
          this.$set(this.form, 'image', imgs);
        }
        this.isUpload = false;
      },

      /*删除商品图片*/
      deleteImg(index) {
        this.form.image.splice(index, 1);
      },
      /*获取设置*/
      getSetting() {
        let self = this;
        let Params = {};
        AdvanceApi.getSetting(Params, true)
          .then(data => {
            self.loading = false;
            self.form = data.data.vars.values;
          })
          .catch(error => {});
      },
      /*点击保存*/
      onSubmit() {
        let self = this;
        let params = self.form;
        if (!(params.end_time > -1) || !params.end_time) {
          self.$message({
            message: '未支付定金时间有误',
            type: 'error'
          });
          return false;
        }
        if (!(params.pay_time > -1) || !params.pay_time) {
          self.$message({
            message: '未支付尾款时间有误',
            type: 'error'
          });
          return false;
        }
        self.loading = true;
        AdvanceApi.saveSetting(params, true)
          .then(data => {
            self.loading = false;
            if (data.code == 1) {
              self.$message({
                message: '恭喜你，保存成功',
                type: 'success'
              });
              self.getSetting();
            } else {
              self.loading = false;
            }
          })
          .catch(error => {
            self.loading = false;
          });
      }
    }
  };
</script>

<style>
  .draggable-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .draggable-list .wrapper>span {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .draggable-list .item {
    position: relative;
    width: 110px;
    height: 110px;
    margin-top: 10px;
    margin-right: 10px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #dddddd;
  }

  .draggable-list .delete-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    background: red;
    line-height: 16px;
    font-size: 16px;
    color: #ffffff;
    display: none;
  }

  .draggable-list .item:hover .delete-btn {
    display: block;
  }

  .draggable-list .item img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    max-height: 100%;
    max-width: 100%;
  }

  .draggable-list .img-select {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #dddddd;
    font-size: 30px;
  }

  .draggable-list .img-select i {
    color: #409eff;
  }
</style>
