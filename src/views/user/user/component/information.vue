<template>
    <!--
        作者 wjy
        时间：2020-05-06
        描述：会员-机构数据-机构信息
    -->
    <div class="pb50">
      <el-form ref="form" size="small" :model="form" label-width="200px">
        <div class="common-form">机构信息</div>
        <el-form-item label="机构编号">
          
        </el-form-item>
        <el-form-item label="机构名称">

        </el-form-item>
        <el-form-item label="机构电话">

        </el-form-item>
        <el-form-item label="机构负责人">

        </el-form-item>
        <el-form-item label="会员有效期">
          
        </el-form-item>
        <el-form-item label="会员充值记录">

        </el-form-item>
        <el-form-item label="机构员工人数">
            
        </el-form-item>
        <!--提交-->
        <!-- <div class="common-button-wrapper">
          <el-button type="primary" size="small" @click="onSubmit" :loading="loading">提交</el-button>
        </div> -->
      </el-form>
    </div>
  </template>
  <script>
    import BalanceApi from '@/api/balance.js';
    export default {
      data() {
        return {
          form: {
  
          },
          loading: false,
        };
      },
      created() {
        /*获取数据*/
        this.getData();
      },
      methods: {
        /*获取数据*/
        getData() {
          let self = this;
          let Params = {};
          BalanceApi.getSettings(Params, true).then(data => {
            self.form = data.data.values;
          }).catch(error => {
  
          });
        },
  
        /*保存*/
        onSubmit() {
          let self = this;
          let form = self.form;
          self.$refs.form.validate((valid) => {
            if (valid) {
              self.loading = true;
              BalanceApi.setSettings(form, true)
                .then(data => {
                  self.loading = false;
                  if (data.code == 1) {
                    self.$message({
                      message: '恭喜你，保存成功',
                      type: 'success'
                    });
                  } else {
                    self.loading = false;
                  }
                })
                .catch(error => {
                  self.loading = false;
                });
            }
          });
        },
      }
    };
  </script>
  
  <style>
  </style>
  