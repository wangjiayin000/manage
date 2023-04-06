<template>
  <!--
      作者：luoyiming
      时间：2020-07-10
      描述：插件中心-砍价-活动列表-添加砍价活动
    -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">

      <!--基本信息-->
      <Basic></Basic>

      <!--活动时间-->
      <Datetime></Datetime>

      <!--其它设置-->
      <Other></Other>

    </el-form>

    <!--提交-->
    <div class="common-button-wrapper">
      <el-button size="small" @click="cancelFunc">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit" :disabled="loading">提交</el-button>
    </div>

  </div>
</template>

<script>
import BargainApi from '@/api/bargain.js';
import Basic from './part/Basic.vue';
import Datetime from './part/Datetime.vue';
import Other from './part/Other.vue';
export default {
  components: {
    Basic,
    Datetime,
    Other
  },
  data() {
    return {
      /*是否正在加载*/
      loading:false,
      /*form表单对象*/
      form: {
        /*活动名称*/
        title: '',
        /*广告图片ID*/
        image_id: 0,
        /*活动广告图*/
        file_path: '',
        /*活动时间*/
        active_time: '',
        /*报名截止日期*/
        join_end_time: '',
        /*砍价有效期*/
        together_time: 24,
        /*状态*/
        status: 1,
        /*购买条件*/
        conditions: 1,
        /*活动排序*/
        sort: 1,
      }
    };
  },
  provide: function() {
    return {
      form: this.form,
      type:''
    };
  },
  created() {},
  methods: {

    /*添加*/
    onSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          let params = self.form;
          self.loading = true;
          BargainApi.addActive(params, true)
            .then(data => {
              self.$message({
                message: '恭喜你，砍价活动添加成功',
                type: 'success'
              });
              self.$router.push('/plus/bargain/index');
            })
            .catch(error => {});
        }
      });
    },
    /*取消*/
    cancelFunc() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.product-add {
  padding-bottom: 50px;
}

.tips {
  color: #ccc;
}

.img {
  margin-top: 10px;
}
</style>
