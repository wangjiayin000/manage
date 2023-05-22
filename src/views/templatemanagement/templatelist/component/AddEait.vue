<template>
  <!--
      作者 luoyiming
      时间：2023-05-04
      描述：审核管理-添加模板文件
  -->
  <el-dialog title="添加模板" :visible.sync="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
    :close-on-press-escape="false" width="600px">
    <el-form size="small" :model="form" ref="form">
      <el-form-item label="样品名称" :label-width="formLabelWidth" prop="template_name" :rules="[{required: true,message: '请选择样品名称',trigger: ['blur', 'change']}]">
        <!-- <el-input v-model="form.template_name" style="width:50%" placeholder="请输入模板名称"></el-input> -->
        <el-select v-model="form.template_name" filterable placeholder="请选择样品">
          <el-option
            v-for="item in sampleList"
            :key="item.id"
            :label="item.sample_name"
            :value="item.sample_name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板文件" :label-width="formLabelWidth" prop="template_url" :rules="[{required: true,message: '请上传文件',trigger: ['blur', 'change']}]">
        <div>
            <el-upload class="avatar-uploader" ref="upload" action="string"
              accept=".pdf" :before-upload="onBeforeUploadImage" :http-request="UploadImage"
              :limit="1" :on-remove="handleRemove" :show-file-list="showvisble">
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
  import TemplateApi from '@/api/Template.js';
  export default {
    data() {
      return {
         /*是否正在加载*/
         loading: true,
        /*左边长度*/
        formLabelWidth: '120px',
        showvisble:false,
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
        template_url:'',
        sampleList:[]
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
          template_name:'',
          template_url:null
        }
      },
      type:{
        type:Number,
        default:0
      }
    },
    created() {
      this.dialogVisible = this.open_add;
      this.init();
    },
   computed:{
      // formData(){
      //   let data = this.form;
      //   console.log(this.form,'数据')
      //   return data
      // }
   },
   mounted(){
   },
    methods: {
      init(){
        let self = this;
        self.loading = true;
        TemplateApi.getSampleListTemplate({}, true)
        .then(data => {
          self.loading = false;
          self.sampleList = data.data.list;
        })
        .catch(error => {
          self.loading = false;
        });
      },
      /*选择图片之前*/
      onBeforeUploadImage(file) {
        var fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        const isEXCEL = fileType === 'pdf';
        const isLt10M = file.size / 1024 / 1024 < 20;
        if (!isEXCEL) {
          this.$message.error('上传文件只能是pdf格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传文件大小不能超过 20MB!');
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
        formData.append('pdf_file', param.file);
        TemplateApi.uploadFileTemplate(formData)
          .then(response => {
            loading.close();
            self.dialogBatchDelivery = false;
            if(response.code==1){
              this.template_url = response.file_path;
              this.showvisble = true;
            }else{
              this.template_url = null;
              this.showvisble = false;
            }
            console.log( this.template_url,'pdf')
            self.$message({
              message: response.msg,
              type: 'warning'
            });
          })
          .catch(response => {
            loading.close();
            self.$message({
              message: '本次处理失败',
              type: 'warning'
            });
            param.onError();
          });
      },
      /**移除文件 */
      handleRemove(file, fileList) {
        this.template_url = '';
        this.showvisble = false;
        // console.log(file, fileList);
      },
      /*添加样品*/
      addTag() {
        let self = this;
        self.form.template_url = self.template_url
        let params = self.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.submit_loading = true;        
            TemplateApi.addTemplate(params, true).then(data => {
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
