<template>
    <!--
        作者 wjy
        时间：2023-05-06
        描述：机构列表-添加机构
    -->
    <el-dialog title="添加机构" :visible.sync="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
      :close-on-press-escape="false" width="600px">
      <el-form size="small" :model="form" :rules="rules" ref="form">
        <el-form-item label="机构名称" :label-width="formLabelWidth" prop="org_name">
          <el-input v-model="form.org_name" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item label="机构电话" :label-width="formLabelWidth" prop="org_tel">
          <el-input v-model="form.org_tel" placeholder="请输入机构电话"></el-input>
        </el-form-item>
        <el-form-item label="机构负责人" :label-width="formLabelWidth" prop="org_principal">
          <el-input v-model="form.org_principal" placeholder="请输入机构负责人"></el-input>
        </el-form-item>
        <el-form-item label="机构编号" :label-width="formLabelWidth" prop="org_num">
          <el-input v-model="form.org_num" placeholder="请输入机构编号"></el-input>
        </el-form-item>
        <el-form-item label="机构密码" :label-width="formLabelWidth" prop="org_pwd">
          <el-input v-model="form.org_pwd" placeholder="请输入机构密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="会员有效期" :label-width="formLabelWidth" prop="vip_time">
            <el-date-picker
                v-model="form.vip_time"
                type="date"
                :picker-options="pickerOptions"
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
    import OrganizationApi from '@/api/Organization.js';
    import { isvalidPhone } from '@/utils/validate';
    export default {
      props: ['open_addedit','addform'],
      data() {
        // 自定义验证
        const validPhone = (rule, value, callback) => {
          if (!value) {
            callback(new Error('请输入机构电话'))
          } else if (!isvalidPhone(value)) { //判断用户输入的值是否符合规则
            callback(new Error('请输入正确的11位手机号码'))
          } else {
            callback()
          }
        }
        return {
          form: {
            org_name: '',
            org_tel: '',
            org_principal: '',
            org_num: '',
            org_pwd: '',
            vip_time: '',
            id: ''
          },
          pickerOptions: {
            disabledDate: (time) => {
              return time.getTime() < Date.now()-1 * 24 * 60 * 60 * 1000
            }
          },
          rules:{
            org_name:[
              {required: true,message: '请输入机构名称',trigger: 'blur'}
            ],
            org_tel:[
              {required: true,trigger: 'blur',validator:validPhone}
            ],
            org_principal:[
              {required: true,message: '请输入机构负责人',trigger: 'blur'}
            ],
            org_num:[
              {required: true,message: '请输入机构编号',trigger: 'blur'}
            ],
            org_pwd:[
              {required: true,message: '请输入机构密码',trigger: 'blur'},
              { min: 6, message: '请输入大于6位数的密码', trigger: 'blur' }
            ],
            vip_time:[
              {required: true,message: '请选好会员到期时间',trigger:[ 'blur','change']}
            ],

          },
          /*左边长度*/
          formLabelWidth: '120px',
          /*是否显示*/
          dialogVisible: false,
          /*是否正在提交*/
          submit_loading: false,
        };
      },
    
     
      created() {
        this.dialogVisible = this.open_addedit;
        this.form ={
            org_name: this.addform.org_name || '',
            org_tel: this.addform.org_tel || '',
            org_principal:this.addform.org_principal || '',
            org_num: this.addform.org_num || '',
            org_pwd: this.addform.org_pwd || '',
            vip_time:this.addform.vip_time&&new Date(this.addform.vip_time*1) || '',
            id:this.addform.id || ''
        } ;
      },
      methods: {
  
        /*添加等级*/
        addGrade() {
          let self = this;        
          let params = this.form;
          console.log(params,'params')
          self.$refs.form.validate((valid) => {
            if (valid) {
              self.submit_loading = true;
              params.vip_time = params.vip_time*1;
              
              OrganizationApi.addOrganiztionVip(params, true).then(data => {
                  self.submit_loading = false;
                  self.$message({
                    message: data.msg,
                    type: 'success'
                  });
                  self.dialogFormVisible(true);
                })
                .catch(error => {
                  self.submit_loading = false;
                });
            }
          });
        },
        /*关闭弹窗*/
        dialogFormVisible(e) {
          this.form.id = '';
          this.$refs['form'].resetFields();
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
  