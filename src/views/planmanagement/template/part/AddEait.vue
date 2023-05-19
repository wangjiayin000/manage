<template>
  <!--
      作者 luoyiming
      时间：2023-05-04
      描述：审核管理-添加模板文件
  -->
  <el-dialog title="添加模板" :visible.sync="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false" width="600px">
    <el-form size="small" :model="form" ref="form">
      <el-form-item label="模板名称" :label-width="formLabelWidth" prop="file_name" :rules="[{required: true,message: '请输入模板名称',trigger: ['blur']}]">
        <el-input v-model="form.file_name" style="width:50%" placeholder="请输入模板名称"></el-input>
      </el-form-item>
      <el-form-item label="模板文件" :label-width="formLabelWidth" prop="file" :rules="[{required: true,message: '请上传文件',trigger: ['blur', 'change']}]">
        <div>
            <el-upload class="avatar-uploader" ref="upload" action="string"
              accept=".xlsx,.xlsm,.xls" :limit="1" :before-upload="onBeforeUploadImage" 
              :http-request="UploadImage" :on-change="onChange" 
              :show-file-list="true">
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
  import TemplateManagementApi from '@/api/TemplateManagement.js';
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
        formData:null
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
          file_name:'',
          file:null
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
      onChange(file){
      },
      UploadImage(param){
        this.form.file = param.file
      },
      /*添加样品*/
      addTag() {
        let self = this;
        console.log(self.form,'数据')
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.submit_loading = true;
            const formData = new FormData();
            formData.append('file', this.form.file);
            formData.append("file_name", this.form.file_name);
             TemplateManagementApi.uploadTemplate(formData)
              .then(response => {
                self.submit_loading = false;
                self.$message({
                  message: response.msg,
                  type: 'warning'
                });
                self.dialogFormVisible(true)
              })
              .catch(response => {
                self.submit_loading = false;
                self.$message({
                  message: '本次处理失败',
                  type: 'warning'
                });
              });
          
            
          }
        });
      },
      /*关闭弹窗*/
      dialogFormVisible(e) {
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
