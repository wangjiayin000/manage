<template>
  <!--
          作者 wjy
          时间：2023-05-04
          描述：计划管理-上传记录
      -->
  <div class="user">
    <!-- <div class="common-level-rail fl">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addClick">选择机构</el-button>
    </div> -->
    <!--搜索表单-->
    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="机构">
          <el-select v-model="formInline.org_id" filterable placeholder="请选择机构">
            <el-option label="全部" value="0"></el-option>
            <el-option v-for="item in orgList" :key="item.id" :label="item.org_name" :value="item.id">
            </el-option>
          </el-select>
         </el-form-item>
        <!-- <el-form-item label="机构名称">
          <el-input v-model="formInline.search" placeholder="请输入机构名称"></el-input>
        </el-form-item> -->
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
            <template slot-scope="scope">
              <span>{{scope.row.org_name}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="remark" label="备注"></el-table-column> -->
          <el-table-column prop="create_time" label="上传时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template slot-scope="scope">
              <!-- <el-button @click="viewClick(scope.row)" type="text" size="small" >查看</el-button> -->
              <el-button @click="downloadClick(scope.row)" type="text" size="small">下载</el-button>
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
  import TemplateManagementApi from '@/api/TemplateManagement.js';

  export default {
    components: {},
    data() {
      return {
        /*是否加载完成*/
        loading: true,
        /*列表数据*/
        tableData: [],
        /**机构数据 */
        orgList:[],
        /*一页多少条*/
        pageSize: 10,
        /*一共多少条数据*/
        totalDataNumber: 0,
        /*当前是第几页*/
        curPage: 1,
        /*横向表单数据模型*/
        formInline: {
          org_id: ''
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
        self.loading = true;
        TemplateManagementApi.getOrgLists(Params, true).then(res => {
          self.loading = false;
          let {data} = res;
          self.orgList = data.org;
          self.tableData = data.list.data;
          self.totalDataNumber = data.list.total;
        }).catch(error => {
          self.loading = false;
        });
      },
      /*搜索查询*/
      onSubmit() {
        let self = this;
        self.curPage = 1;
        self.getTableList();
      },
      /**选择机构 */
      addClick(){

      },
      viewClick(){

      },
      downloadClick(){

      }
      
    }
  };
</script>
<style></style>
