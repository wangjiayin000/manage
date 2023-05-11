<template>
    <!--
        作者 wjy
        时间：2023-05-06
        描述：机构列表-添加机构
    -->
    <el-dialog title="添加机构" :visible.sync="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
      :close-on-press-escape="false" width="600px">
      <el-form size="small" :model="form" ref="form">
        <el-form-item label="机构名称" :label-width="formLabelWidth" prop="name" :rules="[{required: true,message: '请输入机构名称'}]">
          <el-input v-model="form.name" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item label="机构电话" :label-width="formLabelWidth" prop="equity1" :rules="[{required: true,message: '请输入机构电话'}]">
          <el-input v-model="form.equity1" placeholder="请输入机构电话"></el-input>
        </el-form-item>
        <el-form-item label="机构负责人" :label-width="formLabelWidth" prop="equity2" :rules="[{required: true,message: '请输入机构负责人'}]">
          <el-input v-model="form.equity2" placeholder="请输入机构负责人"></el-input>
        </el-form-item>
        <el-form-item label="机构编号" :label-width="formLabelWidth" prop="equity3" :rules="[{required: true,message: '请输入机构编号'}]">
          <el-input v-model="form.equity3" placeholder="请输入机构编号"></el-input>
        </el-form-item>
        <el-form-item label="机构密码" :label-width="formLabelWidth" prop="equity4" :rules="[{required: true,message: '请输入机构密码'}]">
          <el-input v-model="form.equity4" placeholder="请输入机构密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="会员有效期" :label-width="formLabelWidth" prop="equity5" :rules="[{required: true,message: '请输入机构密码'}]">
            <el-date-picker
                v-model="form.equity5"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
      </el-form>
  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible">取 消</el-button>
        <el-button type="primary" @click="addGrade()" :disabled="submit_loading">确 定</el-button>
      </div>
    </el-dialog>
  </template>
  
  <script>
    import UserApi from '@/api/user.js';
    export default {
      data() {
        return {
          form: {
            name: '',
            equity1: '',
            equity2: '',
            equity3: '',
            equity4: '',
            equity5: '',
            equity6: ''
          },
          /*左边长度*/
          formLabelWidth: '120px',
          /*是否显示*/
          dialogVisible: false,
          /*是否正在提交*/
          submit_loading: false,
        };
      },
      props: ['open_addedit','addeditform'],
      created() {
        this.dialogVisible = this.open_addedit;
      },
      methods: {
  
        /*添加等级*/
        addGrade() {
          let self = this;
          let params = this.form;
          self.dialogFormVisible(true);
          // self.$refs.form.validate((valid) => {
          //   if (valid) {
          //     self.submit_loading = true;
          //     params.open_money=params.open_money==true?1:0;
          //     params.open_points=params.open_points==true?1:0;
          //     params.open_invite=params.open_invite==true?1:0;
          //     UserApi.addgrade(params, true).then(data => {
          //         self.submit_loading = false;
          //         self.$message({
          //           message: data.msg,
          //           type: 'success'
          //         });
          //         self.dialogFormVisible(true);
          //       })
          //       .catch(error => {
          //         self.submit_loading = false;
          //       });
          //   }
          // });
        },
        /*关闭弹窗*/
        dialogFormVisible(e) {
          if (e) {
            this.$emit('closeDialog', {
              type: 'success',
              openDialog: false
            })
          } else {
            this.$emit('closeDialog', {
              type: 'error',
              openDialog: false
            })
          }
        }
  
      }
    };
  </script>
  
  <style></style>
  