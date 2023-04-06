<template>
  <!--
    作者：luoyiming
    时间：2020-06-25
    描述：插件中心-限时秒杀-秒杀活动-添加活动
  -->
  <div class="pb50">
    <el-form size="small" ref="form" :model="form" label-width="150px">
      <!--基础-->
      <Basic :form="form"></Basic>
      <!--字段-->
      <Fields :form="form"></Fields>
    </el-form>

    <!--提交-->
    <div class="common-button-wrapper">
      <el-button size="small" @click="cancelFunc">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
    </div>
  </div>
</template>
<script>
import TableApi from '@/api/plus/table.js';
import Basic from './part/Basic.vue';
import Fields from './part/Fields.vue';
import { formatModel } from '@/utils/base.js';
export default {
  components: {
    /*基础设置*/
    Basic,
    /*活动商品*/
    Fields
  },
  data() {
    return {
      /*表单对象*/
      form: {
        table_id: 0,
        name: '',
        /*默认排序*/
        sort: 100,
        /*商品源数据*/
        tableData: []
      },
      /*是否正在加载*/
      loading: false
    };
  },
  created() {
    /*获取列表*/
    this.form.table_id = this.$route.query.table_id;
    this.getData();
  },
  methods: {
    getData(){
      let self = this;
      self.loading = true;
      TableApi.toEdit({table_id:self.form.table_id}, true)
        .then(res => {
          self.form = formatModel(self.form, res.data.model);
          self.form.tableData.forEach(item=>{
            if(item['is_required'] == 'true'){
              item['is_required'] = true;
            }else{
              item['is_required'] = false;
            }
          });
          self.loading = false;
        })
        .catch(error => {});
    },
    /*提交表单*/
    onSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          let params = self.form;
          self.loading = true;
          TableApi.edit(params, true)
            .then(data => {
              self.loading = false;
              self.$message({
                message: '恭喜你，添加成功',
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
    /*取消*/
    cancelFunc() {
      this.$router.back(-1);
    }
  }
};
</script>
