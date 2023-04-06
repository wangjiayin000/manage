<template>
  <!--
    作者：luoyiming
    时间：2020-06-25
    描述：插件中心-限时秒杀-秒杀活动-活动时间
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
    <el-form-item label="活动日期"
    prop="active_date"
    :rules="[{ required: true, message: '请选择活动日期', trigger: 'change' }]">
      <el-date-picker
        v-model="form.active_date"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="活动开始日期"
        end-placeholder="活动结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="每天活动时间"
    prop="active_time"
    :rules="[{ required: true, message: '请选择每天活动时间', trigger: 'change' }]">
      <el-time-picker
          is-range
          v-model="form.active_time"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          format="HH:mm"
          value-format="HH:mm"
          >
        </el-time-picker>
    </el-form-item>
  </div>
</template>

<script>
export default {
  data(){
    return{
      /*时间*/
      timeVal: new Date(2016, 9, 10, 8, 0, 0),
      /*如果没有后面的-8.64e7就是不可以选择今天的*/
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    }
  },
  props: {
    form: Object
  }
};
</script>

<style></style>
