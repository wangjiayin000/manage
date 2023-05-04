<template>
    <!--
         作者 wjy
         时间：2023-05-04
         描述：计划管理-机构管理
     -->
   <div class="common-seach-wrap">
     <el-tabs v-model="activeName">
       <el-tab-pane label="选择机构" name="list"></el-tab-pane>
       <el-tab-pane label="上传记录" name="log"></el-tab-pane>
     </el-tabs>
 
     <!--选择机构-->
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
 