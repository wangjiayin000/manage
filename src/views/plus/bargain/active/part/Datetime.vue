<template>
  <!--
      	作者：luoyiming
      	时间：2020-06-25
      	描述：插件中心-砍价-活动列表-编辑砍价活动-时间设置
      -->
  <div>
    <div class="common-form">活动时间</div>
    <el-form-item label="报名截止日期" prop="join_end_time"
      :rules="[{ required: true, message: '请选择报名截止日期', trigger: 'change' }]">
      <el-date-picker
        v-model="form.join_end_time"
        type="datetime"
        placeholder="报名截止日期"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm"></el-date-picker>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-date-picker
        v-model="form.active_time"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="活动开始日期"
        end-placeholder="活动结束日期"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm"
        :picker-options="pickerOptions"
        ></el-date-picker>
        <div class="ml10 gray">砍价活动的开始日期与截止日期</div>
    </el-form-item>

    <el-form-item label="砍价有效期" :rules="[{ required: true, message: ' ' }]" prop="together_time">
      <div class="max-w460 d-s-c">
        <div class="flex-1">
          <el-input v-model="form.together_time" type="number"></el-input>
        </div>
        <span class="pl16">小时</span>
      </div>
    </el-form-item>

  </div>
</template>

<script>
export default {
  data() {
    return {
      /*如果没有后面的-8.64e7就是不可以选择今天的*/
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  inject: ['form']
};
</script>

<style></style>
