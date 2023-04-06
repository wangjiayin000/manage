<template>
  <div class="user">
    <!--搜索表单-->
    <div class="common-seach-wrap">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="活动名称">
          <el-input v-model="formInline.search" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-level-rail">
      <el-button type="primary" @click="addClick" v-auth="'/plus/invitation/add'">添加活动</el-button>
    </div>
    <div class="common-form">活动列表</div>
    <div class="product-content point-list">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="table-wrap">
          <el-table :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="活动名称" width="200"></el-table-column>
            <el-table-column prop="start_time" label="开始时间"></el-table-column>
            <el-table-column prop="end_time" label="结束时间"></el-table-column>
            <el-table-column prop="partake_num" label="参与人数" width="150"></el-table-column>
            <el-table-column prop="text" label="状态">

            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button v-auth="'/plus/invitation/edit'" @click="editClick(scope.row.invitation_gift_id)" type="text"
                  size="small">
                  编辑
                </el-button>

                <el-button v-if="scope.row.status==0" v-auth="'/plus/invitation/send'" @click="sendClick(scope.row.invitation_gift_id)"
                  type="text" size="small"> 发布
                </el-button>


                <el-button v-else="" v-auth="'/plus/invitation/end'" @click="endClick(scope.row.invitation_gift_id)"
                  type="text" size="small"> 终止
                </el-button>

                <el-button v-auth="'/plus/invitation/partake'" @click="partakeClick(scope.row.invitation_gift_id)"
                  type="text" size="small"> 参与记录
                </el-button>

                <!--   <el-button
                                           @click="editClick(scope.row.invitation_gift_id)" type="text"
                                           size="small"> 推广
                                </el-button> -->


                <el-popover placement="bottom" title="推广码" width="200px" @show="popoverFunc(scope.row.invitation_gift_id)"
                  trigger="click">
                  <div><img width="200px" :src="path"></div>
                  <el-button slot="reference" v-auth="'/plus/invitation/pushs'" type="text" size="small">推广</el-button>
                </el-popover>




                <el-button v-auth="'/plus/invitation/del'" @click="deleteClick(scope.row.invitation_gift_id)" type="text"
                  size="small"> 删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <!--分页-->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="curPage"
          :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalDataNumber">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import InvitationGiftApi from '@/api/invitationgift.js';
  export default {
    data() {
      return {
        formInline: {
          search: '',
        },
        form: {},
        tableData: [],
        /*一页多少条*/
        pageSize: 20,
        /*一共多少条数据*/
        totalDataNumber: 0,
        /*当前是第几页*/
        curPage: 1,
        /*是否加载完成*/
        loading: true,
        path: '',
      };
    },
    created() {
      /*获取列表*/
      this.getTableList();
    },
    methods: {
      /*获取列表*/
      getTableList() {
        let self = this;
        let Params = {};
        Params.search = self.formInline.search;
        Params.page = self.curPage;
        InvitationGiftApi.InvitationList(Params, true)
          .then(data => {
            self.loading = false;
            self.tableData = data.data.list.data;
            self.totalDataNumber = data.data.list.total
          })
          .catch(error => {
            self.loading = false;
          });
      },
      /*选择第几页*/
      handleCurrentChange(val) {
        let self = this;
        self.curPage = val;
        self.loading = true;
        self.getTableList();
      },

      /*每页多少条*/
      handleSizeChange(val) {
        let self = this;
        self.curPage = 1;
        self.pageSize = val;
        self.getTableList();
      },

      /*添加*/
      addClick() {
        this.$router.push('/plus/invitation/add');
      },
      /*购买记录*/
      orderClick(e) {
        let self = this;
        this.$router.push({
          path: '/plus/invitation/orderlist',
          query: {
            gift_package_id: e
          }
        })
      },
      /*编辑*/
      editClick(e) {
        let self = this;
        this.$router.push({
          path: '/plus/invitation/edit',
          query: {
            invitation_gift_id: e
          }
        })
      },

      /* 查询*/
      onSubmit() {
        let self = this;
        let params = self.form;
        self.loading = true;
        self.getTableList();
      },

      /*删除*/
      deleteClick(e) {
        let self = this;
        self.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.loading = true;
          InvitationGiftApi.del({
            id: e
          }, true).then(data => {
            self.loading = false;
            self.$message({
              message: data.msg,
              type: 'success'
            });
            self.getTableList();

          }).catch(error => {
            self.loading = false;
          });

        }).catch(() => {
          self.loading = false;
        });
      },

      /*发布*/
      sendClick(e) {
        let self = this;
        self.loading = true;
        InvitationGiftApi.send({
          id: e
        }, true).then(data => {
          self.loading = false;
          self.$message({
            message: data.msg,
            type: 'success'
          });
          self.getTableList();

        }).catch(error => {
          self.loading = false;
        });
      },
      /*终止*/
      endClick(e) {
        let self = this;
        self.loading = true;
        InvitationGiftApi.end({
          id: e
        }, true).then(data => {
          self.loading = false;
          self.$message({
            message: data.msg,
            type: 'success'
          });
          self.getTableList();

        }).catch(error => {
          self.loading = false;
        });
      },
      /*推广*/
      popoverFunc(e) {
        let self = this;
        self.loading = true;
        InvitationGiftApi.qrcode({
          id: e
        }, true).then(data => {
          self.loading = false;
          self.path = data.data.qrcode;

        }).catch(error => {
          self.loading = false;
        });
      },
      /*参与记录*/
      partakeClick(e) {
        let self = this;
        this.$router.push({
          path: '/plus/invitation/partake',
          query: {
            invitation_gift_id: e
          }
        })
      }
    }
  };
</script>

<style>
  .point-list .el-input-number--mini {
    width: auto;
  }
</style>
