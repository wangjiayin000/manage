<template>
  <!--
    作者：luoyiming
    时间：2020-06-25
    描述：插件中心-限时秒杀-秒杀活动
  -->
  <div class="user">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已审核" name="10"></el-tab-pane>
      <el-tab-pane label="待审核" name="0"></el-tab-pane>
      <el-tab-pane label="未通过" name="20"></el-tab-pane>
    </el-tabs>

    <div class="product-content">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="table-wrap">
          <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="product.product_name" label="商品名称">
            </el-table-column>
           <el-table-column prop="seckillSku[0].seckill_price" label="秒杀价" width="150">
            </el-table-column>
            <el-table-column prop="limit_num" label="限购数量" width="120"></el-table-column>
            <el-table-column prop="status_text" label="审核状态" width="70">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0" class="red">待审核</span>
                <span v-if="scope.row.status == 10" class="green">通过</span>
                <span v-if="scope.row.status == 20" class="gray">未通过</span>
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="显示状态" width="70">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.state" :active-value="10" :inactive-value="20"
                  @change="stateSet($event,scope.row.seckill_product_id)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="90">
              <template slot-scope="scope">
                <el-button @click="editClick(scope.row)" type="text" size="small">审核</el-button>
                <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <!--分页-->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="curPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalDataNumber"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import SeckillApi from '@/api/seckill.js';
export default {
  components: {},
  inject: ['reload'],
  data() {
    return {
      /*是否加载完成*/
      loading: true,
      /*列表数据*/
      tableData: [

      ],
      /*一页多少条*/
      pageSize: 20,
      /*一共多少条数据*/
      totalDataNumber: 0,
      /*当前是第几页*/
      curPage: 1,
      /*搜索表单对象*/
      form: {},
      /*是否打开添加弹窗*/
      open_add: false,
      /*是否打开编辑弹窗*/
      open_edit: false,
      /*当前编辑的对象*/
      userModel: {},
      formInline: {},
      status: ['未开始', '进行中', '已结束'],
      /*已有的id*/
      activeName: '0',
      seckill_activity_id:0
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
      this.curPage = val;
      this.getTableList();
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
      if(self.$route.query.id){
        self.seckill_activity_id=self.$route.query.id
      }
      let Params = this.formInline;
      Params.page = self.curPage;
      Params.list_rows = self.pageSize;
      Params.status = self.activeName;
      Params.seckill_activity_id =self.seckill_activity_id;
      self.loading = true;
      SeckillApi.postSkilladuit(Params, true)
        .then(data => {
          self.loading = false;
          self.tableData = data.data.list.data;
          self.totalDataNumber = data.data.list.total;
        })
        .catch(error => {});
    },
    /*搜索查询*/
    onSubmit() {
      this.curPage = 1;
      this.getTableList();
    },

    /*编辑活动*/
    editClick(row) {
      let seckill_product_id = row.seckill_product_id;
      let seckill_activity_id = this.$route.query.id;
      this.$router.push({
        path: '/plus/seckill/product/edit',
        query: {
          seckill_product_id: seckill_product_id,
          seckill_activity_id:seckill_activity_id
        }
      });
    },

    /*删除*/
    deleteClick(row) {
      let self = this;
      self
        .$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          SeckillApi.delProduct(
            {
              seckill_product_id: row.seckill_product_id
            },
            true
          )
            .then(data => {
              self.$message({
                message: '恭喜你，商品删除成功',
                type: 'success'
              });
              this.onSubmit();
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    stateSet(e, id) {
      let self = this;
      SeckillApi.stateSet({
        seckill_product_id: id,
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

<style></style>
