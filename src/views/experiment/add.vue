<template>
    <div class="experimentAdd">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="基础设置" name="basic"></el-tab-pane>
            <el-tab-pane label="试验规格" name="many"></el-tab-pane>
        </el-tabs>
         <!--form表单-->
        <el-form size="small" ref="form" :model="form" label-width="180px">
            <!--基础信息-->
            <Basic v-show="activeName == 'basic'"></Basic>
            <!--规格设置-->
            <Many v-show="activeName == 'many'"></Many>
            <!--提交-->
            <div class="common-button-wrapper">
                <el-button size="small" type="info" @click="cancelFunc">取消</el-button>
                <el-button size="small" type="primary" @click="onSubmit" :loading="loading">保存</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import Basic from './component/Basic';
import Many from './component/Many';
import ExperimentApi from '@/api/Experiment.js';
export default{
        components:{
            Basic,
            Many
        },
        provide(){
            return {
                form: this.form
            }
        },
        data(){
            return{
                activeName: 'basic',
                /*是否正在加载*/
                loading: false,
                /*form表单数据*/
                form: {
                    model: {
                        name:'',
                        category_id:'',        
                        spec_many: {
                            /*多规格类别*/
                            spec_attr: [],
                            /*多规格表格数据*/
                            spec_list: []
                        },
                },
               
                }
            }
        },
       
        methods:{
            /*提交*/
            onSubmit: function() {
                let self = this;
                let params = {
                    name:self.form.model.name,
                    category_id:self.form.model.category_id,
                    spec_list:self.form.model.spec_many.spec_list
                }

                self.$refs.form.validate(valid => {
                if (valid) {
                    console.log(params,'表')
                    self.loading = true;
                    ExperimentApi.experimentAdd({
                        params
                    }, true)
                    .then(data => {
                        self.loading = false;
                        self.$message({
                        message: '添加成功',
                        type: 'success'
                        });
                        self.$router.push('/experiment/experimentlist');
                    })
                    .catch(error => {
                        self.loading = false;
                    });
                   
                }else{
                    self.$message({
                    message: '请检查必填项是否填写完整',
                    type: 'error'
                    });
                }
                });
            },

            /*取消*/
            cancelFunc() {
                this.$router.back(-1);
            },
        }
    }
</script>
<style lang="scss" scoped>
.experimentAdd{
    padding-bottom: 100px;
}
</style>