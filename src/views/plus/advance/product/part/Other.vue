<template>
  <!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-积分商城-商品设置-编辑商品-其它
  -->
  <div>
    <div class="common-form">其它</div>
    <el-form-item label="活动时间" :rules="[{ required: true, message: '请选择活动时间' }]" prop="active_time">
      <el-date-picker v-model="form.active_time" type="datetimerange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="定金" prop="money" :rules="[{ required: true, message: '请填写定金' }]">
      <el-input type="number" v-model="form.money" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="限购数量" prop="limit_num" :rules="[{ required: true, message: '请填写限购数量' }]">
      <el-input type="number" v-model="form.limit_num" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort" :rules="[{ required: true, message: '请填写排序' }]">
      <el-input type="number" v-model="form.sort" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="审核状态">
      <el-radio-group v-model="form.audit_status">
        <el-radio :label="10">待审核</el-radio>
        <el-radio :label="20">通过</el-radio>
        <el-radio :label="30">未通过</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="商品状态">
      <el-radio-group v-model="form.status">
        <el-radio :label="10">上架</el-radio>
        <el-radio :label="20">下架</el-radio>
      </el-radio-group>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    inject: ['form']
  };
</script>

<style></style>
