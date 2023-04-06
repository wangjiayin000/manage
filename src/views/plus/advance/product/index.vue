<template>
  <!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-积分商城-商品列表
  -->
  <div class="user" v-loading="loading">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="0"></el-tab-pane>
      <el-tab-pane label="待审核" name="10"></el-tab-pane>
      <el-tab-pane label="已通过" name="20"></el-tab-pane>
      <el-tab-pane label="未通过" name="30"></el-tab-pane>
    </el-tabs>
    <div class="product-content advance-list">
      <div class="table-wrap">
        <el-table size="small" :data="tableData" border style="width: 100%">
          <el-table-column prop="product_name" label="商品名称" width="360">
            <template slot-scope="scope">
              <div class="product-info">
                <div class="pic" style="width: 40px; height: 40px;"><img
                    v-img-url="scope.row.product.image[0].file_path" alt="" /></div>
                <div class="info">
                  <div class="name">{{ scope.row.product.product_name }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="supplier.name" label="供应商"></el-table-column>
          <el-table-column label="规格">
            <template slot-scope="scope">
              <span v-if="scope.row.product.spec_type == 10">单规格</span>
              <span v-if="scope.row.product.spec_type == 20">多规格</span>
            </template>
          </el-table-column>
          <el-table-column label="定金">
            <template slot-scope="scope">
              {{ scope.row.money }}
            </template>
          </el-table-column>
          <el-table-column label="尾款">
            <template slot-scope="scope">
              <span class="orange fb">{{ scope.row.sku[0].product_price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="limit_num" label="限购数量"></el-table-column>
          <el-table-column prop="stock" label="活动库存"></el-table-column>
          <el-table-column prop="sort" label="排序"></el-table-column>
          <el-table-column label="审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.audit_status == 10" class="green">待审核</span>
              <span v-if="scope.row.audit_status == 20" class="red">已通过</span>
              <span v-if="scope.row.audit_status == 30" class="gray">未通过</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 10" class="green">上架</span>
              <span v-if="scope.row.status == 20" class="gray">下架</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template slot-scope="scope">
              <el-button v-auth="'/plus/advance/product/edit'" @click="editClick(scope.row.advance_product_id)"
                type="text" size="small">编辑</el-button>
              <el-button v-auth="'/plus/advance/product/delete'" @click="deleteClick(scope.row.advance_product_id)"
                type="text" size="small">删除</el-button>
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

    <!--商品选择-->
    <Product :isproduct="isproduct" :excludeIds="exclude_ids" :islist="false" @closeDialog="closeProductFunc"></Product>
  </div>
</template>
<script>
  import AdvanceApi from '@/api/advance.js';
  import Product from '@/components/product/Product.vue';
  export default {
    components: {
      /*选择商品*/
      Product
    },
    data() {
      return {
        /*表格数据*/
        tableData: [],
        /*一页多少条*/
        pageSize: 15,
        /*一共多少条数据*/
        totalDataNumber: 0,
        /*当前是第几页*/
        curPage: 1,
        /*是否加载完成*/
        loading: true,
        /*是否修改*/
        open_edit: false,
        /*当前编辑的对象*/
        userModel: {},
        /*是否打开选择商品*/
        isproduct: false,
        /*已有的id*/
        activeName: '0',
        /*已有的id*/
        exclude_ids: []
      };
    },
    created() {
      /*获取列表*/
      this.getTableList();
    },
    methods: {
      handleClick(tab, event) {
        let self = this;
        self.curPage = 1;
        self.getTableList();
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
        this.curPage = 1;
        this.pageSize = val;
        this.getTableList();
      },
      /*获取列表*/
      getTableList() {
        let self = this;
        let Params = {};
        Params.page = self.curPage;
        Params.list_rows = self.pageSize;
        Params.audit_status = self.activeName;
        AdvanceApi.productList(Params, true)
          .then(res => {
            self.exclude_ids = res.data.exclude_ids;
            self.tableData = res.data.list.data;
            self.totalDataNumber = res.data.list.total;
            self.loading = false;
          })
          .catch(error => {
            self.loading = false;
          });
      },

      /*打开添加*/
      changeProduct(list) {
        this.isproduct = true;
      },

      /*关闭商品选择*/
      closeProductFunc(e) {
        this.isproduct = false;
        if (e.type == 'success') {
          this.addClick(e.params.product_id);
        }
      },

      /*添加商品*/
      addClick(product_id) {
        this.$router.push('/plus/advance/product/add?product_id=' + product_id);
      },

      /*编辑商品*/
      editClick(e) {
        let self = this;
        this.$router.push({
          path: '/plus/advance/product/edit',
          query: {
            advance_product_id: e
          }
        });
      },

      /* 查询*/
      onSubmit() {
        let self = this;
        let params = self.form;
        self.loading = true;
        self.getTableList();
      },

      /*删除用户*/
      deleteClick(e) {
        let self = this;
        self
          .$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            self.loading = true;
            AdvanceApi.delProduct({
                  id: e
                },
                true
              )
              .then(data => {
                self.loading = false;
                self.$message({
                  message: data.msg,
                  type: 'success'
                });
                self.getTableList();
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

<style>
  .advance-list .el-input-number--mini {
    width: auto;
  }
</style>
