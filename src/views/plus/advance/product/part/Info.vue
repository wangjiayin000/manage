<template>
  <!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-积分商城-商品设置-添加商品-商品信息
  -->
  <div>
    <div class="common-form">商品信息</div>
    <el-form-item label="商品名称">
      <p class="fb">{{ form.product_name }}</p>
    </el-form-item>
    <el-form-item label="商品图片"><img :src="form.product_image" width="80" /></el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  inject: ['form'],
  created() {
    
  }
};
</script>

<style></style>
