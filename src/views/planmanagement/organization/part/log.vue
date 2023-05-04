<template>
  <!--
          作者 wjy
          时间：2023-05-04
          描述：计划管理-上传记录
      -->
  <div class="user">
    <!--搜索表单-->
    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="文件名称">
          <el-input v-model="formInline.search" placeholder="请输入文件名称"></el-input>
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
          <el-table-column prop="" label="文件名称">
            <template slot-scope="scope" v-if="scope.row.user">
              <span>{{scope.row.user.nickName}}</span>
              <span class="gray9">(用户ID：{{scope.row.user.user_id}})</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="remark" label="备注"></el-table-column> -->
          <el-table-column prop="create_time" label="上传时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template slot-scope="scope">
              <el-button @click="viewClick(scope.row)" type="text" size="small" v-auth="'/user/grade/edit'" >查看</el-button>
              <el-button @click="downloadClick(scope.row)" type="text" size="small" v-if="scope.row.is_default == 0"  v-auth="'/user/grade/delete'">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="curPage"
          :page-size="pageSize" layout="total, prev, pager, next, jumper"
          :total="totalDataNumber">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import UserApi from '@/api/user.js';
  export default {
    components: {},
    data() {
      return {
        /*是否加载完成*/
        loading: true,
        /*列表数据*/
        tableData: [],
        /*一页多少条*/
        pageSize: 10,
        /*一共多少条数据*/
        totalDataNumber: 0,
        /*当前是第几页*/
        curPage: 1,
        /*横向表单数据模型*/
        formInline: {
          search: ''
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
        self.loading = true;
        let Params = self.formInline;
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        UserApi.gradelog(Params, true).then(data => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
        }).catch(error => {

        });
      },

      /*搜索查询*/
      onSubmit() {
        let self = this;
        self.curPage = 1;
        self.getTableList();
      },
      viewClick(){

      },
      downloadClick(){

      }
      
    }
  };
</script>
<style></style>
