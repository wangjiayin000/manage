<template>
  <!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-积分商城-商品设置-编辑商品-规格
  -->
  <div>
    <div class="common-form">规格</div>
    <el-form-item label="规格详情" prop="tableData">
      <div class="pt16">
        <el-table size="mini" :data="form.tableData" :span-method="objectSpanMethod" border style="width: 100%;">
          <el-table-column label="商品名称" width="300">
            <template slot-scope="scope">
              <p class="text-ellipsis-2">{{ scope.row.product_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="规格" width="180">
            <template slot-scope="scope">
              <div class="gray" v-if="scope.row.spec_type == 10">暂无规格</div>
              <div v-if="scope.row.spec_type == 20">
                <div class="spec-min-box">
                  <p class="text-ellipsis" :title="scope.row.spec_name">{{ scope.row.spec_name }}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="product_price" label="售价"></el-table-column>
          <el-table-column label="拼团价">
            <template slot-scope="scope">
              <el-input disabled size="small" type="number" min="0" step="1" v-model="scope.row.assemble_price"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="拼团库存">
            <template slot-scope="scope">
              <el-form-item label="" style="margin-bottom: 0;"><el-input disabled size="small" type="number" min="0" step="0.01" v-model="scope.row.assemble_stock"></el-input></el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form-item>
  </div>
</template>

<script>
import PorductApi from '@/api/product.js';
import { mergeTable } from '@/utils/table.js';
export default {
  data() {
    return {
      /*查询规格当前商品*/
      curProduct: {},
    };
  },
  inject: ['form', 'type'],
  created() {
    this.creatSpec();
  },
  methods: {
    /*关闭弹窗*/
    creatSpec(e) {
      this.form.tableData = mergeTable(this.form.tableData);
    },
    /*表格合并行*/
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.rowSpan != null) {
          return {
            rowspan: row.rowSpan,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
  }
};
</script>

<style lang="scss">
.spec-min-box > i {
  position: absolute;
  right: 0;
  font-size: 16px;
  cursor: pointer;
}
.spec-min-box .el-icon-close {
  top: 0;
  color: red;
  visibility: hidden;
}
td:hover .spec-min-box .el-icon-close {
  visibility: visible;
}
.spec-min-box .el-icon-caret-right {
  bottom: 0;
  transform: rotate(45deg);
  color: #3a8ee6;
}
.el-form-item.is-error .active-all-set .el-input__inner,
.el-form-item.is-error .isvalid .el-input__inner {
  border-color: #c0c4cc;
}
</style>
