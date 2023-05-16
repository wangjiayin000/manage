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
            <el-input v-model="formInline.search" placeholder="请输入商户名称"></el-input>
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
            <el-table-column prop="name" label="样品名称"></el-table-column>
            <el-table-column label="模板文件">
              <template slot-scope="scope">
                {{scope.row.superUser.user_name}}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="模板历史"></el-table-column>
            <el-table-column prop="create_time" label="上传时间"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteClick(scope.row.shop_supplier_id)" type="text" size="small">删除</el-button>
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
    import SupplierApi from '@/api/supplier.js';
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
          pageSize: 20,
          /*一共多少条数据*/
          totalDataNumber: 0,
          /*当前是第几页*/
          curPage: 1,
          /*横向表单数据模型*/
          formInline: {
            shop_id: '',
            search: ''
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
          Params.list_rows = self.pageSize;
          SupplierApi.supplierList(Params, true)
            .then(res => {
              self.loading = false;
              self.tableData = res.data.list.data;
              self.totalDataNumber = res.data.list.total;
              self.tableData.forEach(function(item) {
                if(item.business){
                  self.businessImgs.push(item.business.file_path);
                }
                if(item.logo){
                  self.logoImgs.push(item.logo.file_path);
                }
              });
            })
            .catch(error => {
              self.loading = false;
            });
        },
        getLogoList(index){
          return this.logoImgs.slice(index).concat(this.logoImgs.slice(0,index))
        },
        getBusinessList(index){
          return this.businessImgs.slice(index).concat(this.businessImgs.slice(0,index))
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
        closeDialogFunc(e,f){
          if (f == 'add') {
            this.open_add = e.openDialog;
            if (e.type == 'success') {
              this.getTableList();
            }
          }
        },
        // /*打开添加*/
        // showBatchDelivery() {
        //   this.$router.push('/supplier/supplier/add');
        // },
  
        // /*打开编辑*/
        // editClick(row) {
        //   let self = this;
        //   let params = row.shop_supplier_id;
        //   this.$router.push({
        //     path: '/supplier/supplier/edit',
        //     query: {
        //       shop_supplier_id: params
        //     }
        //   })
        // },
        /* 强制下架上架*/
        recycle(row,state){
          let self = this;
          let war="";
          if(state==1){
            war="禁止"
          }else if(state==0){
            war="开启"
          }
          self
            .$confirm("确认要"+war+"吗?", '提示', {
              type: 'warning'
            })
            .then(() => {
              SupplierApi.supplierRecycle({
                shop_supplier_id: row.shop_supplier_id,
                is_recycle:state
              }).then(data => {
                self.$message({
                  message: war+'成功',
                  type: 'success'
                });
                self.getTableList();
              });
            });
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
            SupplierApi.deleteSupplier({
                shop_supplier_id: row
              }, true)
              .then(data => {
                self.loading = false;
                if (data.code == 1) {
                  self.$message({
                    message: '恭喜你，商户删除成功',
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
  