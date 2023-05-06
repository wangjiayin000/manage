<template>
  <!--
      作者 luoyiming
      时间：2020-06-09
      描述：会员-等级管理-添加等级
  -->
  <el-dialog title="添加类型" :visible.sync="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false" width="600px">
    <el-form size="small" :model="form" ref="form">
      <el-form-item label="类型名称" :label-width="formLabelWidth" prop="name" :rules="[{required: true,message: '请输入类型名称',trigger: ['blur', 'change']}]">
        <el-input v-model="form.name" placeholder="请输入标签名称"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible">取 消</el-button>
      <el-button type="primary" @click="addTag()" :disabled="submit_loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import CategoryApi from '@/api/Category.js';
  export default {
    data() {
      return {
        // form: {
        //   /*昵称*/
        //   tag_name: ''
        // },
        /*左边长度*/
        formLabelWidth: '120px',
        /*是否显示*/
        dialogVisible: false,
        /*是否正在提交*/
        submit_loading: false,
        /*类型*/
        options: [{
          value: '例行',
          label: '例行'
        }, {
          value: '型式',
          label: '型式'
        }, {
          value: '特殊',
          label: '特殊'
        }],
      };
    },
    props: {
      open_add:{
        type:Boolean,
        default:false
      },
      form:{
        type:Object,
        default:{
          name:''
        }
      },
      type:{
        type:Number,
        default:0
      }
    },
    created() {
      this.dialogVisible = this.open_add;
    },
    methods: {

      /*添加等级*/
      addTag() {
        let self = this;
        let params = this.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.submit_loading = true;
            if(this.type==0){
              CategoryApi.addCategory(params, true).then(data => {
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
            }else{
              CategoryApi.editCategory(params, true)
              .then(data => {
                self.submit_loading = false;
                self.$message({
                  message: '恭喜你，修改成功',
                  type: 'success'
                });
                self.dialogFormVisible(true);

              })
              .catch(error => {
                self.submit_loading = false;
              });
            }
            
          }
        });
      },
      /*关闭弹窗*/
      dialogFormVisible(e) {
        this.form.name = ''
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
