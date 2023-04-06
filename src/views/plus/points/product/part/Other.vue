<template>
  <!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-积分商城-商品设置-编辑商品-其它
  -->
  <div>
    <div class="common-form">其它</div>
    <el-form-item label="限购数量" prop="sort" :rules="[{ required: true, message: '请填写限购数量' }]">
      <el-input disabled type="number" v-model="form.limit_num" class="max-w460"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort" :rules="[{ required: true, message: '请填写排序' }]">
      <el-input disabled type="number" v-model="form.sort" class="max-w460"></el-input>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    inject: ['form']
  };
</script>

<style></style>
