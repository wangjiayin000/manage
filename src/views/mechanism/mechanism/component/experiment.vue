<template>
        <!--
        作者 wjy
        时间：2020-05-06
        描述：会员-机构数据-试验
    -->
    <div class="experiment">
         <!--搜索表单-->
        <div class="common-seach-wrap">
        <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="样品编号">
                <el-input v-model="searchForm.experiment_id" placeholder="请输入样品编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        </div>
            <!--内容-->
       <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="model_id" label="样品编号"></el-table-column>
                    <el-table-column prop="model_name" label="样品型号"></el-table-column>
                    <el-table-column prop="" label="试验员"></el-table-column>
                    <el-table-column prop="experiment_name" label="试验名称"></el-table-column>
                    <el-table-column prop="" label="试验进度"></el-table-column>
                    <el-table-column prop="" label="样品进度"></el-table-column>
                    <el-table-column prop="" label="样品报告"></el-table-column>
                </el-table>
            </div>
        </div>
        <!--分页-->
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="curPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="totalDataNumber"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
  import OrganizationApi from '@/api/Organization.js';
    export default{
        components:{},
        data(){
            return{
                 /*是否正在加载*/
                loading: true,
                /*一页多少条*/
                pageSize: 10,
                /*一共多少条数据*/
                totalDataNumber: 0,
                /*当前是第几页*/
                curPage: 1,
                /*搜索参数*/
                searchForm:{
                    experiment_id:'',
                    org_id:''
                },
                 /*列表数据*/
                tableData: [],
                /*全部分类*/
                categoryList: [],
            }
        },
        inject:['form'],
        created() {
            this.searchForm.org_id = this.form.id;
            /*获取列表*/
            this.getData();
        },
        methods:{
            /*获取列表*/
            getData() {
                let self = this;
                let Params = self.searchForm;
                Params.page = self.curPage;
                self.loading = true;
                OrganizationApi.OrgExperimentLists(Params, true)
                    .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;
                    })
                    .catch(error => {
                    self.loading = false;
                    });
            },
             /*搜索查询*/
            onSubmit() {
                this.curPage = 1;
                this.getData();
            },
            /*选择第几页*/
            handleCurrentChange(val) {
                let self = this;
                self.loading = true;
                self.curPage = val;
                self.getData();
            },

            /*每页多少条*/
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },

        }
    }
</script>
<style lang="scss" scoped>
.experiment{

}
</style>