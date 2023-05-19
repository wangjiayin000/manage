<template>
    <!--
            作者：wjy
            时间：2023-05-04
            描述：模板管理
        -->
    <div class="user clearfix">
  
      <!--添加商户-->
      <div class="common-level-rail fl">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="addClick">添加模板</el-button>
      </div>
      <div class="common-seach-wrap fr">
        <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.template_name" placeholder="请输入模板名称"></el-input>
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
            <!-- <el-table-column prop="shop_supplier_id" label="商户ID" width="90"></el-table-column> -->
            <el-table-column prop="template_name" label="模板名称"></el-table-column>
            <el-table-column label="模板文件">
              <template slot-scope="scope">
                <el-link :href="scope.row.template_url" target="_blank">查看链接</el-link>
                <!-- {{scope.row.template_url}} -->
              </template>
            </el-table-column>
            <el-table-column prop="address" label="模板历史"></el-table-column>
            <el-table-column prop="create_time" label="上传时间"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <!-- <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button> -->
                <el-button @click="downloadClick(scope.row)" type="text" size="small">下载</el-button>
                <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
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
    import TemplateApi from '@/api/Template.js';
    import AddEdit from './component/AddEait.vue';
    import {deepClone} from '@/utils/base.js';
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
          /*门店列表数据*/
          storeList: [],
          /*一页多少条*/
          pageSize: 10,
          /*一共多少条数据*/
          totalDataNumber: 0,
          /*当前是第几页*/
          curPage: 1,
          /*横向表单数据模型*/
          formInline: {
            template_name: ''
          },
          /*是否打开添加弹窗*/
          open_add: false,
          /*是否打开编辑弹窗*/
          open_edit: false,
          logoImgs: [],
          businessImgs: [],
          /*是否打开添加弹窗*/
          open_add: false,
          open_type:0,
          userModel: {}
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
          let Params = this.formInline;
          Params.page = self.curPage;
          Params.list_rows = self.pageSize;
          TemplateApi.listsTemplate(Params, true)
            .then(res => {
              self.loading = false;
              self.tableData = res.data.file_list.data;
              self.totalDataNumber = res.data.file_list.total;
            })
            .catch(error => {
              self.loading = false;
            });
        },
        /*搜索查询*/
        onSubmit() {
          this.curPage = 1;
          this.getTableList();
        },
        
        /*打开添加*/
        addClick() {
          this.open_add = true;
          this.open_type = 0;
        },
  
        /*打开编辑*/
        editClick(item) {
          this.userModel = deepClone(item);
          this.open_type = 1;
          this.open_add = true;
        },
        downloadClick(row){
          const fileUrl = row.template_url;
          const link = document.createElement('a');
          link.href = fileUrl;
          link.setAttribute('download', row.template_name);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        closeDialogFunc(e,f){
          if (f == 'add') {
            this.open_add = e.openDialog;
            if (e.type == 'success') {
              this.getTableList();
            }
          }
        },
        /*删除*/
        deleteClick(row) {
          let self = this;
          self.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.loading = true;
            TemplateApi.deleteTemplate({
                id: row.id
              }, true)
              .then(data => {
                self.loading = false;
                if (data.code == 1) {
                  self.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  self.getTableList();
                }
              })
              .catch(error => {
                self.loading = false;
              });
  
          }).catch(() => {
            self.loading = false;
          });
        }
  
      }
    };
  </script>
  
  <style></style>
  