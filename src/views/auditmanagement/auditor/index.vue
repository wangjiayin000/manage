<template>
    <!--
            作者：wjy
            时间：2023-05-04
            描述：审核人员列表
        -->
    <div class="auditorlist">
      <!--搜索表单-->
      <div class="common-seach-wrap">
        <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="机构">
            <el-select v-model="formInline.grade_id" placeholder="请选择机构">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(item, index) in gradeList" :key="index" :label="item.name" :value="item.grade_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员名称">
            <el-input v-model="formInline.nick_name" placeholder="请输入人员名称"></el-input>
          </el-form-item>
          <el-form-item label="人员身份">
            <el-select v-model="formInline.reg_source" placeholder="请选择身份">
              <el-option label="全部" value=""></el-option>
              <el-option label="编写人" value="1"></el-option>
              <el-option label="初审人" value="2"></el-option>
              <el-option label="审核人" value="3"></el-option>
              <el-option label="批准人" value="4"></el-option>
            </el-select>
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
        <!-- <div class="mb16">
            <el-button type="primary">导出</el-button>
        </div> -->
      </div>
      <!--内容-->
      <div class="product-content">
        <div class="table-wrap">
          <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
            <!-- <el-table-column prop="user_id" label="编号" width="80"></el-table-column> -->
            <el-table-column prop="nickName" label="人员姓名"></el-table-column>
            <el-table-column prop="points" label="人员身份"></el-table-column>
            <el-table-column prop="balance" label="所处阶段"></el-table-column>
            <!-- <el-table-column prop="mobile" label="详细信息"></el-table-column> -->
            <el-table-column prop="status" label="是否禁用" width="80">
                <!-- <template slot-scope="scope">
                    <el-switch
                    v-model="scope.row.status"
                    :active-value="1"
                    :inactive-value="0"
                    @change="changeStatus(scope.row)"
                    active-color="#13ce66"
                    inactive-color="#cccccc"
                    ></el-switch>
                </template> -->
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="140"></el-table-column>
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
          pageSize: 20,
          /*一共多少条数据*/
          totalDataNumber: 0,
          /*当前是第几页*/
          curPage: 1,
          /*横向表单数据模型*/
          formInline: {
            nick_name: '',
            grade_id: '',
            reg_date: '',
            tag_id: 0,
            reg_source: ''
          },
          /*是否打开添加弹窗*/
          open_add: false,
          /*是否打开编辑弹窗*/
          open_edit: false,
          /*当前编辑的对象*/
          userModel: {},
          /*等级*/
          gradeList: [],
          open_tag: false,
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
          UserApi.userlist(Params, true)
            .then(data => {
              self.loading = false;
              self.tableData = data.data.list.data;
              self.totalDataNumber = data.data.list.total;
              self.gradeList = data.data.grade;
              self.allTag = data.data.allTag;
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
          this.userModel = item;
          this.open_add = true;
        },
        /*打开编辑*/
        editClick(item) {
          let self = this;
          let params = item.user_id;
          this.$router.push({
            path: '/user/user/edit',
            query: {
              user_id: params
            }
          });
        },
        /*打开编辑*/
        gradeClick(item) {
          this.userModel = item;
          this.open_edit = true;
        },
  
        tagClick(item) {
          this.userModel = item;
          this.open_tag = true;
        },
  
        /*关闭弹窗*/
        closeDialogFunc(e, f) {
          if (f == 'add') {
            this.open_add = e.openDialog;
            if (e.type == 'success') {
              this.getTableList();
            }
          }
          if (f == 'edit') {
            this.open_edit = e.openDialog;
            if (e.type == 'success') {
              this.getTableList();
            }
          }
          if (f == 'tag') {
            this.open_tag = e.openDialog;
            if (e.type == 'success') {
              this.getTableList();
            }
          }
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
              UserApi.deleteuser({
                    user_id: row.user_id
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
  