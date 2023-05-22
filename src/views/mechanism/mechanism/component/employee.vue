<template>
     <!--
        作者 wjy
        时间：2020-05-06
        描述：会员-机构数据-员工
    -->
    <div class="employee">
         <!--搜索表单-->
        <div class="common-seach-wrap">
        <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="员工编号">
                <el-input v-model="searchForm.staff_num" placeholder="请输入员工编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        </div>
        <!-- <div class="common-level-rail">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="addClick">添加员工</el-button>
        </div> -->
            <!--内容-->
       <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                <el-table-column prop="staff_name" label="员工姓名"></el-table-column>
                <el-table-column prop="staff_num" label="员工编号"></el-table-column>
                <el-table-column prop="staff_tel" label="手机号"></el-table-column>
                <el-table-column prop="staff_birth" label="出生年月日"></el-table-column>
                <el-table-column prop="staff_permission" label="角色权限"></el-table-column>
                <el-table-column prop="staff_job" label="职务"></el-table-column>
                <el-table-column prop="base_name" label="基地"></el-table-column>
                <el-table-column prop="create_time" label="录入时间"></el-table-column>
                <!-- <el-table-column fixed="right" label="操作" width="80">
                    <template slot-scope="scope">
                    <div class="table-btn-column">
                        <el-button @click="editClick(scope.row)" type="text" size="small" >编辑</el-button>
                        <el-button @click="delClick(scope.row)" type="text" size="small" >删除</el-button>
                    </div>
                    </template>
                </el-table-column> -->
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
                    org_id:'',
                    staff_num:''
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
                OrganizationApi.OrgStaffLists(Params, true)
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
            addClick(){
                this.$router.push('/experiment/add');
            },
            editClick(){
                this.$router.push({
                    path: '/experiment/add',
                    query: {
                    product_id: row.product_id,
                    scene: 'edit'
                    }
                });
            },
             /*删除*/
            delClick: function(row) {
            let self = this;
            let msg = '删除后不可恢复，确认删除该记录吗?';
            self.$confirm(msg, '提示', {
                type: 'warning'
                })
                .then(() => {
                    // PorductApi.delProduct({
                    //     product_id: row.product_id
                    // }).then(data => {
                    //     self.$message({
                    //     message: '删除成功',
                    //     type: 'success'
                    //     });
                    //     self.getData();
                    // });
                });
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
.employee{

}
</style>