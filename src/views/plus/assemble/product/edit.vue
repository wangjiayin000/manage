<template>
  <!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-积分商城-商品设置-添加商品
  -->
  <div class="pb50">
    <el-form size="small" ref="form" :model="form" label-width="150px" v-if="!loading">
      <!--商品信息-->
      <Info></Info>

      <!--规格-->
      <Spec></Spec>

      <!--其它-->
      <Other></Other>

       <!--审核-->
    <Audit v-if="old_audit == 0 || old_audit == 20"></Audit>

     <!--提交-->
    </el-form>
    <div class="common-button-wrapper">
      <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
    </div>
  </div>
</template>
<script>
import AssembleApi from '@/api/assemble';
import Info from './part/Info.vue';
import Spec from './part/Spec.vue';
import Other from './part/Other.vue';
import Audit from './part/Audit.vue';
import { formatModel } from '@/utils/base.js';
export default {
  components: {
    /*产品基本信息*/
    Info,
    /*规格*/
    Spec,
    /*其它*/
    Other,
    /* 审核 */
    Audit
  },
  data() {
    return {
      /*是否正在加载*/
      loading: true,
      old_audit:0,
      /*表单*/
      form: {
        /*商品ID*/
        assemble_product_id: 0,
        /*商品状态*/
        status: 10,
        /* 审核备注*/
        remark:"",
        /*商品名称*/
        product_name: '',
        /*图片*/
        product_image:'',
        /*排序*/
        sort: 100,
        /*规格*/
        product_sku_id: 0,
        /*限购数量*/
        limit_num: 1,
        /*商品表格*/
        tableData: [],
        /*活动名称*/
        active_name:'',
      }
    };
  },
  provide: function() {
    return {
      form: this.form,
      type: 'add'
    };
  },
  created() {
    this.form.assemble_product_id = this.$route.query.assemble_product_id;
    this.form.assemble_activity_id = this.$route.query.assemble_activity_id;
    this.getData();
  },
  methods: {
    /*获取商品*/
    getData() {
      let self = this;
      AssembleApi.getAssembleedit(
        {
          assemble_product_id: self.form.assemble_product_id
        },
        true
      ).then(res => {
        self.form.product_name=res.data.detail.product.product_name;
        self.form.product_image=res.data.detail.product.image[0].file_path;
        self.form.product_id=res.data.detail.product.product_id;
        self.form.limit_num=res.data.detail.limit_num;
        self.form.assemble_num=res.data.detail.assemble_num;
        self.form.stock=res.data.detail.stock;
        self.form.active_name = res.data.detail.active.title;
        self.old_audit=res.data.detail.status;
        res.data.detail.assembleSku.forEach(item=>{
          item.product_name= self.form.product_name;
          item.spec_name=item.product_attr;
          item.spec_type=res.data.detail.product.spec_type;
        });
        self.form.tableData=res.data.detail.assembleSku;
        self.loading = false;
      });
    },

    /*提交表单*/
    onSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          let params = {
            product: {}
          };
          params.product_id = self.form.product_id;
          params.status = self.form.status;
          params.remark = self.form.remark;
          params.sort = self.form.sort;
          params.limit_num = self.form.limit_num;
          params.assemble_product_id=self.form.assemble_product_id;
          params.product_id=self.form.product_id;
          params.product.spec_list = self.tableFormet(self.form.tableData);
          self.loading = true;
          AssembleApi.postAssembleedit(params, true)
            .then(data => {
              self.loading = false;
              self.$message({
                message: '审核成功',
                type: 'success'
              });
              self.cancelFunc();
            })
            .catch(error => {
              self.loading = false;
            });
        }
      });
    },

    /*表格数据格式化*/
    tableFormet(list) {
      list.forEach(item=>{
        item.product_attr=item.spec_name;
      });
      return list;
    },

    /*取消*/
    cancelFunc() {
      this.$router.back(-1);
    }
  }
};
</script>
<style>
.edit_container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.ql-editor {
  height: 400px;
}
</style>
