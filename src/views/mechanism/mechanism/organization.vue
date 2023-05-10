<template>
    <!--
        作者 wjy
        时间：2023-05-06
        描述：会员-机构数据
    -->
    <div class="common-seach-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="机构信息" name="information"></el-tab-pane>
        <el-tab-pane label="样品" name="specimen"></el-tab-pane>
        <el-tab-pane label="试验" name="experiment"></el-tab-pane>
        <el-tab-pane label="员工" name="employee"></el-tab-pane>
        <el-tab-pane label="基地" name="base"></el-tab-pane>
      </el-tabs>
  
      <!--机构信息-->
      <Information v-if="activeName == 'information'"></Information>
      <!--样品-->
      <Specimen v-if="activeName == 'specimen'"></Specimen>
      <!--试验-->
      <Experiment v-if="activeName == 'experiment'"></Experiment>
      <!--员工-->
      <Employee v-if="activeName == 'employee'"></Employee>
      <!--基地-->
      <Base v-if="activeName == 'base'"></Base>
  
    </div>
  </template>
  <script>
  import Information from './component/information';
  import Specimen from './component/specimen';
  import Experiment from './component/experiment';
  import Employee from './component/employee';
  import Base from './component/base';
  export default {
    components: {
        Information,
        Specimen,
        Experiment,
        Employee,
        Base
    },
    data() {
      return {
        form: {
          status: 0
        },
        activeName: 'information'
      };
    },
    methods: {}
  };
  </script>
  
  <style>
  
  </style>
  