<template>
  <!--
          作者 wjy
          时间：2023-05-04
          描述：计划管理-上传记录
      -->
  <div class="user">
    <div class="common-level-rail fl">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addClick">添加模板</el-button>
    </div>
    <!--搜索表单-->
    <div class="common-seach-wrap fr">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="模板名称">
          <el-input v-model="formInline.file_name" placeholder="请输入模板名称"></el-input>
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
          <el-table-column prop="file_name" label="文件名称"></el-table-column>
          <el-table-column prop="create_time" label="上传时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template slot-scope="scope">
              <!-- <el-button @click="viewClick(scope.row)" type="text" size="small">查看</el-button> -->
              <el-button @click="downloadClick(scope.row)" type="text" size="small">下载</el-button>
              <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
       <!--添加编辑-->
       <AddEdit v-if="open_add" :open_add="open_add" :type="open_type" :form="userModel" @closeDialog="closeDialogFunc($event, 'add')"></AddEdit>
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
  import AddEdit from './AddEait.vue';
  import TemplateManagementApi from '@/api/TemplateManagement.js';
  export default {
    components: {
      AddEdit
    },
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
          file_name: ''
        },
        open_add:false,
        open_type:0,
        userModel:{}
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
        TemplateManagementApi.showTemplate(Params, true).then(data => {
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
      downloadClick(row){
        const fileUrl = row.template_url;
          const link = document.createElement('a');
          link.href = fileUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      },
      delClick(row){
        let self = this;
        self
            .$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              self.loading = true;
              TemplateManagementApi.delTemplate({
                id: row.id
                  },
                  true
                )
                .then(data => {
                  self.loading = false;
                  if (data.code == 1) {
                    self.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                    self.getTableList();
                  } else {
                    self.loading = false;
                  }
                })
                .catch(error => {
                  self.loading = false;
                });
            })
            .catch(() => {
              self.loading = false;
            });
      },
      addClick(){
        this.open_add = true;
        this.open_type = 0;
      },
      closeDialogFunc(e,f){
        if (f == 'add') {
          this.open_add = e.openDialog;
          if (e.type == 'success') {
            this.getTableList();
          }
        }
      },
    }
  };
</script>
<style></style>
