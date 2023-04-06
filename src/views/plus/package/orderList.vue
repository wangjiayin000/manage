<template>
    <!--
            作者：luoyiming
            时间：2019-10-25
            描述：用户列表
        -->
    <div class="user">
        <!--搜索表单-->
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="formInline.user_name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="user_id" label="ID"></el-table-column>
                    <el-table-column prop="user.nickName" label="昵称"></el-table-column>
                    <el-table-column prop="create_time" label="购买时间"></el-table-column>
                    <el-table-column prop="pay_price" label="支付金额"></el-table-column>
                </el-table>
            </div>

            <!--分页-->
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                               :current-page="curPage"
                               :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalDataNumber">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import GiftPackageApi from '@/api/giftpackage.js';
    export default {
        data() {
            return {
                /*是否加载完成*/
                loading: true,
                /*列表数据*/
                tableData: [],
                /*一页多少条*/
                pageSize: 20,
                /*一共多少条数据*/
                totalDataNumber: 0,
                /*当前是第几页*/
                curPage: 1,
                /*横向表单数据模型*/
                formInline: {
                    user_name: '',
                    grade_id: '',
                    value1: ''
                },
                /*是否打开添加弹窗*/
                open_add: false,
                /*是否打开编辑弹窗*/
                open_edit: false,
                /*当前编辑的对象*/
                userModel: {},
                /*等级*/
                gradeList: [],
                /*时间*/
                value1: '',
            };
        },
        created() {

            /*获取列表*/
            this.getTableList();

        },
        methods: {

            /*选择第几页*/
            handleCurrentChange(val) {
                let self = this;
                self.curPage = val;
                self.loading = true;
                self.getTableList();
            },

            /*每页多少条*/
            handleSizeChange(val) {
                this.curPage = 1;
                this.pageSize = val;
                this.getTableList();
            },

            /*获取列表*/
            getTableList() {
                let self = this;
                let Params = {};
                Params.page = self.curPage;
                Params.list_rows = self.pageSize;
                Params.id = self.$route.query.gift_package_id;
                Params.user_name = self.formInline.user_name;
                GiftPackageApi.orderlist(Params, true).then(data =>
                {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;
                    self.gradeList = data.data.grade;
                }).catch(error =>
                {
                    self.loading = false;
                });
            },

            /*搜索查询*/
            onSubmit() {
                let self = this;
                self.loading = true;
                self.getTableList();
            },


        }
    };
</script>
<style></style>
