<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-优惠券-优惠券列表-添加优惠券
      -->
  <div class="user">
    <div class="common-form">新增活动会场</div>
    <div class="product-content">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="活动标题" prop="name" :rules="[{ required: true, message: ' ' }]">
          <el-input type="text" v-model="form.name" placeholder="请输入活动标题" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item label="活动日期">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker v-model="form.value1" type="datetimerange"  value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </div>
        </el-form-item>
        <div class="common-form">邀请成功的条件</div>
        <el-form-item label="邀请成功的条件 "><el-radio v-model="form.inv_condition" label="1">邀请成为会员</el-radio></el-form-item>
        <div class="common-form">礼品设置</div>
        <div v-for="(item, reward_index) in rewardData" :key="reward_index">
          <el-form-item label="奖励">
            <el-input type="number" v-model="item.invitation_num" class="max-w460">
              <template slot="prepend">
                每邀请
              </template>
              <template slot="append">
                人获得礼品
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="礼品">
            <el-checkbox v-model="item.is_point">积分</el-checkbox>
            <el-input type="number" v-model="item.point" class="max-w460">
              <template slot="append">
                积分
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox v-model="item.is_coupon">优惠券</el-checkbox>
            <el-input type="text" v-model="item.coupon_name" class="max-w460"></el-input>
            <el-button type="primary" @click="addCoupon(reward_index)">选择优惠券</el-button>
          </el-form-item>
        </div>

        <el-form-item label=""><el-button type="primary" @click="addInv">添加奖励项</el-button></el-form-item>
      </el-form>
      <!--提交-->
      <div class="common-button-wrapper"><el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button></div>
    </div>
    <!--选择优惠券-->
    <GetCoupon v-if="open_add" :open_add="open_add" @closeDialog="closeProductDialogFunc($event)">选择优惠券弹出层</GetCoupon>
  </div>
</template>
<script>
import InvitationGiftApi from '@/api/invitationgift.js';
import GetCoupon from '@/components/coupon/GetCoupon';
export default {
  components: {
    /*选择优惠券件*/
    GetCoupon
  },
  data() {
    return {
      form: {
        name: '',
        inv_condition: '1',
        value1: []
      },
      /*优惠券*/
      tableData: [],
      loading: false,
      open_add: false,
      /*奖励列表*/
      rewardData: [],
      coupon_index: 0
    };
  },
  created() {},
  methods: {
    /*添加奖励*/
    addInv() {
      let obj = {
        invitation_num: 1,
        is_coupon: false,
        point: 0,
        is_point: false,
        coupon_ids: '',
        coupon_name: ''
      };
      this.rewardData.push(obj);
    },
    /*添加优惠券*/
    addCoupon(reward_index) {
      this.open_add = true;
      this.coupon_index = reward_index;
    },

    /*关闭优惠券*/
    closeProductDialogFunc(e) {
      let self = this;
      let index = self.coupon_index;
      self.open_add = e.openDialog;
      self.rewardData[index].coupon_ids += e.params.coupon_id + ',';
      self.rewardData[index].coupon_name += e.params.name + ',';
    },
    /*提交表单*/
    onSubmit() {
      let self = this;
      let form = self.form;
      form.reward_data = self.rewardData;
      self.$refs.form.validate(valid => {
        if (valid) {
          self.loading = true;
          InvitationGiftApi.addInvitation(form, true)
            .then(data => {
              self.loading = false;
              if (data.code == 1) {
                self.$message({
                  message: data.msg,
                  type: 'success'
                });
                self.$router.push('/plus/invitation/index');
              } else {
                self.loading = false;
              }
            })
            .catch(error => {
              self.loading = false;
            });
        }
      });
    }
  }
};
</script>
