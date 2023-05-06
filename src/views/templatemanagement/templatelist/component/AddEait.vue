<template>
  <!--
      作者 luoyiming
      时间：2023-05-04
      描述：审核管理-添加模板文件
  -->
  <el-dialog title="添加模板" :visible.sync="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false" width="600px">
    <el-form size="small" :model="form" ref="form">
      <el-form-item label="样品名称" :label-width="formLabelWidth" prop="name" :rules="[{required: true,message: '请选择样品',trigger: ['blur', 'change']}]">
        <el-select v-model="form.name" placeholder="请选择样品">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板文件" :label-width="formLabelWidth" prop="fileForm" :rules="[{required: true,message: '请上传文件',trigger: ['blur', 'change']}]">
        <div>
            <el-upload class="avatar-uploader" ref="upload" action="string"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :before-upload="onBeforeUploadImage" :http-request="UploadImage" :show-file-list="false">
            <el-button size="small" icon="el-icon-upload" type="primary">上传模板</el-button>
            </el-upload>
          </div>
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
          value: '1',
          label: '例行'
        }, {
          value: '2',
          label: '型式'
        }, {
          value: '3',
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
          name:'',
          fileForm:null
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
      /*选择图片之前*/
      onBeforeUploadImage(file) {
        var fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        const isEXCEL = fileType === 'xlsx';
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isEXCEL) {
          this.$message.error('上传文件只能是excel格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传文件大小不能超过 10MB!');
        }
        return isEXCEL && isLt10M;
      },

      /*上传图片*/
      UploadImage(param) {
        let self = this;
        const loading = this.$loading({
          lock: true,
          text: '正在处理,请等待',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const formData = new FormData();
        formData.append('iFile', param.file);
        this.form.fileForm = formData;
        // OrderApi.batchDelivery(formData)
        //   .then(response => {
        //     loading.close();
        //     self.dialogBatchDelivery = false;
        //     self.$message({
        //       message: response.msg,
        //       type: 'warning'
        //     });
        //   })
        //   .catch(response => {
        //     loading.close();
        //     self.$message({
        //       message: '本次处理失败',
        //       type: 'warning'
        //     });
        //     param.onError();
        //   });
      },
      /*添加样品*/
      addTag() {
        let self = this;
        let params = this.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.submit_loading = true;
            // if(type==0){
            //   CategoryApi.addCategory(params, true).then(data => {
            //     self.submit_loading = false;
            //     self.$message({
            //       message: data.msg,
            //       type: 'success'
            //     });
            //     self.dialogFormVisible(true);
            //   })
            //   .catch(error => {
            //     self.submit_loading = false;
            //   });
            // }else{
            //   CategoryApi.editCategory(params, true)
            //   .then(data => {
            //     self.submit_loading = false;
            //     self.$message({
            //       message: '恭喜你，修改成功',
            //       type: 'success'
            //     });
            //     self.dialogFormVisible(true);

            //   })
            //   .catch(error => {
            //     self.submit_loading = false;
            //   });
            // }
            
          }
        });
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
