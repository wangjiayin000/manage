<template>
  <div class="d-a-c lh30 ww100 pt16">
    <div class="pt30 tc" style="width: 80px;">
      <p class="gray9">今日</p>
      <p class="gray9">昨日</p>
    </div>
    <div class="flex-1 tc">
      <p>累积商户数</p>
      <p class="f20 fb gray3">{{dataModel.supplier.supplier_total.today}}</p>
      <p class="gray">{{dataModel.supplier.supplier_total.yesterday}}</p>
    </div>
    <div class="flex-1 tc">
      <p>新增商户数</p>
      <p class="f20 fb gray3">{{dataModel.supplier.supplier_add.today}}</p>
      <p class="gray">{{dataModel.supplier.supplier_add.yesterday}}</p>
    </div>
    <div class="flex-1 tc">
      <p>新申请商户数</p>
      <p class="f20 fb gray3">{{dataModel.supplier.supplier_apply.today}}</p>
      <p class="gray">{{dataModel.supplier.supplier_apply.yesterday}}</p>
    </div>
    <div class="flex-1 tc">
      <p>商户退出数</p>
      <p class="f20 fb gray3">{{dataModel.supplier.supplier_refund.today}}</p>
      <p class="gray">{{dataModel.supplier.supplier_refund.yesterday}}</p>
    </div>
    <div class="flex-1 tc">
      <p>商户退出申请数</p>
      <p class="f20 fb gray3">{{dataModel.supplier.supplier_refund_apply.today}}</p>
      <p class="gray">{{dataModel.supplier.supplier_refund_apply.yesterday}}</p>
    </div>
  </div>
</template>
<script>

export default {
  components:{
  },
  data() {
    return {
      /*是否正在加载*/
      loading: true,

    };
  },
  inject: ['dataModel'],
  created() {

  },
  methods: {


  }
};
</script>

<style>
</style>
