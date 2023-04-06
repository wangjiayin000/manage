<template>
  <!--
      作者：luoyiming
      时间：2020-06-25
      描述：插件中心-砍价-砍价设置
    -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <el-form-item label="是否开启优惠券抵扣" prop="is_coupon">
        <el-switch v-model="form.is_coupon"></el-switch>
        <!-- <p>注：如需使用分销功能必须在 [分销中心 - 分销设置] 中开启</p> -->
      </el-form-item>
      <el-form-item label="是否开启分销" prop="is_distribution">
        <el-switch v-model="form.is_agent"></el-switch>
        <!-- <p>注：如需使用分销功能必须在 [分销中心 - 分销设置] 中开启</p> -->
      </el-form-item>
      <el-form-item label="是否开启积分抵扣" prop="is_distribution">
        <el-switch v-model="form.is_point"></el-switch>
        <!-- <p>注：如需使用分销功能必须在 [分销中心 - 分销设置] 中开启</p> -->
      </el-form-item>

      <el-form-item label="砍价规则">
        <div class="edit_container">
          <Uediter  v-if="!loading"   v-model="form.bargain_rules" :text="ueditor.text" :config="ueditor.config" ref="ue"></Uediter>
        </div>
      </el-form-item>

      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import BargainApi from '@/api/bargain.js';
import Uediter from '@/components/UE.vue';
import Upload from '@/components/file/Upload';
export default {
  components: {
    /*编辑器*/
    Uediter,
    /*图片上传*/
    Upload: Upload
  },
  data() {
    return {
      /*是否加载完成*/
      loading: true,
      /*form表单数据*/
      form: {
        is_agent: 'false',
        is_coupon: 'false',
        is_point: 'false'
      },
      /*富文本配置*/
      ueditor: {
        text: '',
        config: {
          initialFrameWidth: 400,
          initialFrameHeight: 500
        }
      },
    };
  },
  created() {
    this.getData();
  },

  methods: {

    /*获取数据*/
    getData() {
      let self = this;
      BargainApi.settingDetail({}, true)
        .then(data => {
          self.form = data.data.vars.values;
          self.ueditor.text=self.form.bargain_rules;
          if (self.form.is_coupon == 'true') {
            self.form.is_coupon = true;
          }
          if (self.form.is_agent == 'true') {
            self.form.is_agent = true;
          }
          if (self.form.is_point == 'true') {
            self.form.is_point = true;
          }
          self.loading = false;
        })
        .catch(error => {});
    },

    /*提交表单*/
    onSubmit() {
      let self = this;
      self.form.bargain_rules = this.$refs.ue.getUEContent();
      let params = this.form;
      BargainApi.editSetting(params, true)
        .then(data => {
          self.$message({
            message: '恭喜你，设置成功',
            type: 'success'
          });
          this.getData();
        })
        .catch(error => {});
    }
  }
};
</script>

<style></style>
