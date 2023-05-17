<template>
    <!--
            作者：wjy
            时间：2023-05-04
            描述：样品列表
        -->
    <div class="samplelist">
      <!--搜索表单-->
      <div class="common-seach-wrap">
        <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="型品编号">
            <el-input v-model="formInline.samplemodel_id" placeholder="请输入型品编号"></el-input>
          </el-form-item>
          <el-form-item label="型品名称">
            <el-input v-model="formInline.sample_name" placeholder="请输入型品名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="录入时间">
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker v-model="formInline.reg_date" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </div>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="mb16">
          <el-button size="small" type="primary" @click="addClick" icon="el-icon-plus">添加型号</el-button>
          <!-- <el-button type="primary">导出</el-button> -->
        </div>
      </div>
      <!--内容-->
      <div class="product-content">
        <div class="table-wrap">
          <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="id" label="编号" width="80"></el-table-column>
            <el-table-column prop="sample_name" label="型品名称"></el-table-column>
            <el-table-column prop="points" label="试验进度"></el-table-column>
            <el-table-column prop="balance" label="试验结果"></el-table-column>
            <el-table-column prop="mobile" label="详细信息"></el-table-column>
            <el-table-column prop="create_time" label="录入时间" width="140"></el-table-column>
            <el-table-column fixed="right" label="操作" width="170">
              <template slot-scope="scope">
                <el-button @click="editClick(scope.row)" type="text" size="small">编辑
                </el-button>
                <el-button @click="deleteClick(scope.row)" type="text" size="small">删除
                </el-button>
              </template>
            </el-table-column>
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
    import SampleApi from '@/api/Sample.js';
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
            sample_name: '',
            samplemodel_id: ''
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
          SampleApi.sampleShowSampleModel(Params, true)
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
          let self = this;
          self.loading = true;
          let Params = self.formInline;
          self.getTableList();
        },
  
        /*打开添加*/
        addClick(item) {
          this.$router.push('/sample/samplemodel/add');
        },
         /*打开编辑*/
         editClick(item) {
          this.$router.push({
            path:'/sample/samplemodel/add',
            query:{
              cample_id:item.id
            }
          });
        },
        /*删除用户*/
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
              SampleApi.sampleDelSampleModel({
                samplemodel_id: row.id
                  },
                  true
                )
                .then(data => {
                  self.loading = false;
                  if (data.code == 1) {
                    self.$message({
                      message: '恭喜你，用户删除成功',
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
        }
      }
    };
  </script>
  <style></style>
  