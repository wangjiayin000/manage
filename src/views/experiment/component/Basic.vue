<template>
    <div class="basic">
        <el-form-item label="项目名称：" :rules="[{required: true,message: '请输入项目名称',trigger: ['blur']}]" prop="model.name">
            <el-input v-model="form.model.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="试验类型：" :rules="[{required: true,message: '请选择试验类型',trigger: ['blur', 'change']}]" prop="model.category_id">
            <el-select v-model="form.model.category_id" filterable style="width:100%">
                <!-- <el-option label="全部" value="0"></el-option> -->
                <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
    </div>
</template>
<script>
import CategoryApi from '@/api/Category.js';
export default{
    data(){
        return{
            categoryList:[],
            curPage: 1,
            pageSize: 999,
        }
    },
    inject: ['form'],
    created(){
        this.getTableList()
    },
    methods:{
        /*获取列表*/
        getTableList() {
          let self = this;
          let Params = {};
          Params.page = self.curPage;
          Params.list_rows = self.pageSize;
          CategoryApi.categoryList(Params, true)
            .then(data => {
              self.categoryList = data.data.list.data;
            })
            .catch(error => {
  
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.basic{
    width: 500px;
}
</style>