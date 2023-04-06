<template>
  <!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-积分商城-商品列表
  -->
  <div class="user" v-loading="loading">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="兑换中" name="has_audit"></el-tab-pane>
      <el-tab-pane label="待审核" name="wait_audit"></el-tab-pane>
    </el-tabs>
    <div class="product-content point-list">
      <div class="table-wrap">
        <el-table size="small" :data="tableData" border style="width: 100%">
          <el-table-column prop="product_name" label="商品名称" width="360">
            <template slot-scope="scope">
              <div class="product-info">
                <div class="pic" style="width: 40px; height: 40px;"><img v-img-url="scope.row.product.image[0].file_path" alt="" /></div>
                <div class="info">
                  <div class="name">{{ scope.row.product.product_name }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="规格">
            <template slot-scope="scope">
              <span v-if="scope.row.product.spec_type == 10">单规格</span>
              <span v-if="scope.row.product.spec_type == 20">多规格</span>
            </template>
          </el-table-column>
          <el-table-column label="积分">
            <template slot-scope="scope">
              {{ scope.row.sku[0].point_num }}
            </template>
          </el-table-column>
          <el-table-column label="金额">
            <template slot-scope="scope">
              <span class="orange fb">{{ scope.row.sku[0].point_money }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="limit_num" label="限购数量"></el-table-column>
          <el-table-column prop="stock" label="活动库存"></el-table-column>
          <el-table-column prop="sort" label="排序"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0" class="red">待审核</span>
              <span v-if="scope.row.status == 10" class="green">通过</span>
              <span v-if="scope.row.status == 20" class="gray">未通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="显示状态" width="70">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state" :active-value="10" :inactive-value="20"
                @change="stateSet($event,scope.row.point_product_id)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template slot-scope="scope">
              <el-button v-auth="'/plus/points/product/edit'" @click="editClick(scope.row.point_product_id)" type="text" size="small">编辑</el-button>
              <el-button v-auth="'/plus/points/product/delete'" @click="deleteClick(scope.row.point_product_id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="pagination">
        <el-pagination background :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalDataNumber"></el-pagination>
      </div>
    </div>

   </div>
</template>
<script>
import PointProductApi from '@/api/pointproduct.js';
export default {
  data() {
    return {
      /*表格数据*/
      tableData: [],
      /*一页多少条*/
      pageSize: 20,
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
      activeName: 'has_audit'
    };
  },
  created() {
    /*获取列表*/
    this.getData();
  },
  methods: {

    /*获取列表*/
    getData() {
      let self = this;
      self.loading = true;
      let Params = {};
      Params.page = self.curPage;
      Params.status = self.activeName;
      PointProductApi.productList(Params, true)
        .then(res => {
          self.tableData = res.data.list.data;
          self.totalDataNumber = res.data.list.total;
          self.loading = false;
        })
        .catch(error => {
          self.loading = false;
        });
    },

    /*切换菜单*/
    handleClick(tab, event) {
      let self = this;
      self.curPage = 1;
      self.getData();
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
      this.$router.push('/plus/points/product/add?product_id=' + product_id);
    },

    /*编辑商品*/
    editClick(e) {
      let self = this;
      this.$router.push({
        path: '/plus/points/product/edit',
        query: {
          point_product_id: e
        }
      });
    },

    /* 查询*/
    onSubmit() {
      let self = this;
      let params = self.form;
      self.loading = true;
      self.getData();
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
          PointProductApi.deleteProduct(
            {
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
              self.getData();
            })
            .catch(error => {
              self.loading = false;
            });
        })
        .catch(() => {
          self.loading = false;
        });
    },
    stateSet(e, id) {
      let self = this;
      PointProductApi.stateSet({
        point_product_id: id,
        state: e
      }).then(data => {
        self.$message({
          message: data.msg,
          type: 'success'
        });
        // self.getData();
      });
    },

  }
};
</script>

<style>
.point-list .el-input-number--mini {
  width: auto;
}
</style>
