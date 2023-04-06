<template>
  <!--
          作者：luoyiming
          时间：2019-10-25
          描述：会员-用户列表
      -->
  <div class="user">
    <!--搜索表单-->
    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formInline.search" placeholder="请输入昵称|手机号|姓名"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select size="small" v-model="formInline.status" placeholder="请选择">
            <el-option label="全部" :value="-1"></el-option>
            <el-option label="已兑换" :value="1"></el-option>
            <el-option label="未兑换" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker v-model="formInline.reg_date" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="user_id" label="ID" width="80"></el-table-column>
          <el-table-column prop="user.nickName" label="昵称"></el-table-column>
          <el-table-column prop="user.user_name" label="姓名"></el-table-column>
          <el-table-column prop="nickName" label="微信头像">
            <template slot-scope="scope" v-if="scope.row.avatarUrl">
              <img :src="scope.row.avatarUrl" width="30px" height="30px" />
            </template>
          </el-table-column>
          <el-table-column prop="user.mobile" label="手机号"></el-table-column>
          <el-table-column prop="record_name" label="中奖内容"></el-table-column>
          <el-table-column prop="lottery_type_text" label="中奖类型"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">已兑换</span>
              <span class="red" v-if="scope.row.status==0">未兑换</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="抽奖时间" width="140"></el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
          :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
          :total="totalDataNumber"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import LotteryApi from '@/api/lottery.js';
  export default {
    components: {},
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
          search: '',
          reg_date: '',
          status:''
        },
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
        let Params = self.formInline;
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        LotteryApi.recordList(Params, true)
          .then(res => {
            self.loading = false;
            self.tableData = res.data.list.data;
            self.totalDataNumber = res.data.list.total;
          })
          .catch(error => {
            self.loading = false;
          });
      },
      /*搜索查询*/
      onSubmit() {
        let self = this;
        self.loading = true;
        self.curPage = 1;
        self.getTableList();
      },
    }
  };
</script>
<style></style>
