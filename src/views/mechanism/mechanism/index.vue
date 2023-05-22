<template>
  <!--
          作者：luoyiming
          时间：2019-10-25
          描述：商户-商户管理
      -->
  <div class="user clearfix">

    <div class="common-seach-wrap">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="机构名称">
          <el-input v-model="formInline.org_name" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item label="会员">
          <el-select v-model="formInline.vip_time" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="会员" value="1"></el-option>
            <el-option label="到期会员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mb16">
        <el-button size="small" type="primary" @click="addEditClick" icon="el-icon-plus">添加机构</el-button>
    </div>
    <!--内容-->
    <div class="product-content">
      <div class="table-wrap">
        <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="org_num" label="机构编号" width="90"></el-table-column>
          <el-table-column prop="org_name" label="机构名称"></el-table-column>
          <el-table-column prop="org_tel" label="机构电话"></el-table-column>
          <el-table-column prop="org_principal" label="机构负责人" width="90"></el-table-column>
          <el-table-column label="会员有效时间" width="150">
            <template slot-scope="scope">
              {{ scope.row.vip_time&&$moment(scope.row.vip_time*1).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="addPuthClick(scope.row)" type="text" size="small">机构数据</el-button>
              <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
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
       <!--添加机构-->
     <AddEdit v-if="open_addedit" :open_addedit="open_addedit" :addform="addform"
      @closeDialog="closeDialogFunc($event, 'addedit')"></AddEdit>
    </div>

  </div>
</template>

<script>
  import AddEdit from './component/AddEdit';
  import OrganizationApi from '@/api/Organization.js';
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
          id: '',
          org_name: '',
          vip_time:''
        },
        /*是否打开添加机构弹窗*/
        open_addedit:false,
        addform:{},
        /*是否打开添加弹窗*/
        open_add: false,
        /*是否打开编辑弹窗*/
        open_edit: false,
        /*当前编辑的对象*/
        userModel: {},
        logoImgs: [],
        businessImgs: []
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
        OrganizationApi.showOrganiztionVip(Params, true)
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
        this.curPage = 1;
        this.getTableList();
      },

      /*打开添加*/
      /**添加机构 */
      addEditClick(){
        this.open_addedit = true;
        this.addform = {};
      },
        /**机构数据 */
        addPuthClick(row){
        this.$router.push('/mechanism/mechanism/organization?id='+row.id);
      },
      /*打开编辑*/
      editClick(row) {
        this.open_addedit = true;
        this.addform = row;
      },
     
      closeDialogFunc(e,f){
        if (f == 'addedit') {
          this.open_addedit = e.openDialog;
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
          OrganizationApi.delOrganiztionVip({
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
