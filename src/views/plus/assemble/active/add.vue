<template>
  <!--
      	作者：luoyiming
      	时间：2020-06-25
      	描述：插件中心-限时拼团-活动列表-添加活动
      -->
  <div>
    <div class="product-content">
      <el-form size="small" ref="form" :model="form" label-width="150px">
        <!--基础设置-->
        <Basic :form="form"></Basic>

        <!--时间设置-->
        <Datetime :form="form"></Datetime>

        <!--其它-->
        <Other :form="form"></Other>
      </el-form>
    </div>

    <!--提交-->
    <div class="common-button-wrapper">
      <el-button size="small" @click="cancelFunc">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit" :disabled="loading">提交</el-button>
    </div>
  </div>
</template>
<script>
import AssembleApi from '@/api/assemble.js';
import Basic from './part/Basic.vue';
import Datetime from './part/Datetime.vue';
import Other from './part/Other.vue';
export default {
  components: {
    /*基础设置*/
    Basic,
    /*时间设置*/
    Datetime,
    /*其它*/
    Other
  },
  data() {
    return {
      form: {
        /*活动名称*/
        title: '',
        /*广告图片ID*/
        image_id: 0,
        /*活动广告图*/
        file_path:'',
        /*活动时间*/
        active_time: '',
        /*报名截止日期*/
        join_end_time: '',
        /*是否生效，默认1为生效，0为不生效*/
        status: 1,
        /*拼团失败处理方式：0失败退款1自动拼团成功*/
        fail_type: 0,
        /*是否单团0否1是*/
        is_single: 0,
        /*默认排序*/
        sort: 100,
        /*凑团时间*/
        together_time: 24,
        /*商品源数据*/
        tableData: [],
        /*商品列表*/
        product_list: []
      },
      /*判断是否正在加载*/
      loading: false,
    };
  },
  created() {},
  methods: {

    /*提交表单*/
    onSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          let params = self.form;
          self.loading = true;
          AssembleApi.addActive(params, true)
            .then(data => {
              self.loading = false;
              self.$message({
                message: '恭喜你，添加成功',
                type: 'success'
              });
              self.$router.push('/plus/assemble/index');
            })
            .catch(error => {
              self.loading = false;
            });
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
