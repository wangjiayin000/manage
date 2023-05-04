<template>
     <!--
          作者 wjy
          时间：2023-05-04
          描述：计划管理
      -->
    <div class="common-seach-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Excel模板" name="list"></el-tab-pane>
        <el-tab-pane label="上传记录" name="log"></el-tab-pane>
      </el-tabs>
  
      <!--Excel模板-->
      <List v-if="activeName == 'list'"></List>
      <!--上传记录-->
      <Log v-if="activeName == 'log'"></Log>
  
    </div>
  </template>
  <script>
  import List from './part/list';
  import Log from './part/log';
  export default {
    components: {
      List,
      Log
    },
    data() {
      return {
        activeName: 'list'
      };
    },
    methods: {}
  };
  </script>
  
  <style>
  
  </style>
  