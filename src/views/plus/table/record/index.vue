<template>
  <!--
        作者：luoyiming
        时间：2019-10-25
        描述：权限-管理员列表
    -->
  <div class="user">
    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="选择表单">
          <el-select size="small" v-model="searchForm.table_id" placeholder="所有表单">
            <el-option label="全部" value="0"></el-option>
            <el-option v-for="(item, index) in table_list" :key="index" :label="item.name" :value="item.table_id"></el-option>
          </el-select>
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
          <el-table-column prop="tableM.name" label="表单名称"></el-table-column>
          <el-table-column prop="user.user_id" label="用户ID"></el-table-column>
          <el-table-column prop="user.nickName" label="用户昵称"></el-table-column>
          <el-table-column prop="create_time" label="添加时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template slot-scope="scope">
              <el-button @click="detailClick(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="deleteClick(scope.row)" type="text" size="small" v-auth="'/plus/table/record/delete'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    <el-dialog title="表单详情" :visible.sync="dialogDetail" width="50%">
      <el-form size="small">
        <el-form-item label="表单名称：">
          <span class="gray">{{currentModel.tableM.name}}</span>
        </el-form-item>
        <el-form-item label="用户信息：">
          <span class="gray">{{currentModel.user.nickName}}({{currentModel.user.user_id}})</span>
        </el-form-item>
        <el-form-item :label="item.name + '：'" v-for="(item,index) in currentModel.tableData" :key="index">
          <span class="gray" v-if="item.type!='image'">{{item.value}}</span>
          <a :href="item.value" target="_blank">
            <img v-if="item.type=='image'" :src="item.value" width="160" height="160"></img>
          </a>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TableApi from '@/api/plus/table.js';
export default {
  data() {
    return {
      /*是否加载完成*/
      loading: false,
      /*列表数据*/
      tableData: [],
      /*一页多少条*/
      pageSize: 15,
      /*一共多少条数据*/
      totalDataNumber: 0,
      /*当前是第几页*/
      curPage: 1,
      searchForm: {},
      dialogDetail: false,
      currentModel: {
        tableM: {},
        user: {}
      },
      table_list: []
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
      let Params = self.searchForm;
      Params.page = self.curPage;
      Params.list_rows = self.pageSize;
      self.loading = true;
      TableApi.getRecordList(Params, true)
        .then(data => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
          self.table_list = data.data.table_list;
        })
        .catch(error => {});
    },

    onSubmit(){
      this.curPage = 1;
      this.getTableList();
    },

    /*打开编辑*/
    detailClick(row) {
      this.currentModel = row;
      this.dialogDetail = true;
    },

    /*删除*/
    deleteClick(row) {
      let self = this;
      self
        .$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          self.loading = true;
          TableApi.delRecord(
            {
              table_record_id: row.table_record_id
            },
            true
          )
            .then(data => {
              self.loading = false;
              if (data.code == 1) {
                self.$message({
                  message: '恭喜你，删除成功',
                  type: 'success'
                });
                //刷新页面
                self.getTableList();
              } else {
                self.loading = false;
              }
            })
            .catch(error => {
              self.loading = false;
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style></style>
