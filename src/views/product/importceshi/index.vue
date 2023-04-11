<template>
    <div class="ceshi">
       <h1>检验结论</h1>
       <el-descriptions title="检验结论" :extra="text" :column="2" border>
            <el-descriptions-item label="样品名称" label-class-name="my-label-center" content-class-name="my-content-center">kooriookami</el-descriptions-item>
            <el-descriptions-item label="样品型号" label-class-name="my-label-center" content-class-name="my-content-center">18100000000</el-descriptions-item>
            <el-descriptions-item label="委托单位" label-class-name="my-label-center" content-class-name="my-content-center">苏州市</el-descriptions-item>
            <el-descriptions-item label="生产单位" label-class-name="my-label-center" content-class-name="my-content-center">苏州市</el-descriptions-item>
            <el-descriptions-item label="样品状态" label-class-name="my-label-center" content-class-name="my-content-center">
                <el-radio-group v-model="radio">
                    <el-radio :label="3">完好</el-radio>
                    <el-radio :label="6">异常</el-radio>
                </el-radio-group>
                <span>（见备注）</span>
            </el-descriptions-item>
            <el-descriptions-item label="到样日期" label-class-name="my-label-center" content-class-name="my-content-center">苏州市</el-descriptions-item>
            <el-descriptions-item label="样品数量" label-class-name="my-label-center" content-class-name="my-content-center">苏州市</el-descriptions-item>
            <el-descriptions-item label="样品单号" label-class-name="my-label-center" content-class-name="my-content-center">苏州市</el-descriptions-item>
            <el-descriptions-item label="检测地点" label-class-name="my-label-center" content-class-name="my-content-center">苏州市</el-descriptions-item>
            <el-descriptions-item label="检测日期" label-class-name="my-label-center" content-class-name="my-content-center">苏州市</el-descriptions-item>
            <el-descriptions-item :span="2" label="检测依据" label-class-name="my-label-center" :contentStyle="{'text-align': 'left','height':'200px'}">
                <el-input
                    type="textarea"
                    resize="none"
                    :autosize="{minRows: 10, maxRows: 999}"
                    placeholder="请输入内容"
                    v-model="textarea1">
                </el-input>

            </el-descriptions-item>
            <el-descriptions-item :span="2" label="检测结论" label-class-name="my-label-center" :contentStyle="{'text-align': 'left','height':'250px'}">
                <div class="jelun">
                    <div class="qian">
                        <p>检测单位（机构）盖章</p>
                    </div>
                    <div class="shenpi">
                        <div style="padding-left: 20px;">批准人：</div>
                        <div>签发日期：</div>
                        <div style="width: 100px;text-align: right;padding-right: 20px;">年 月 日</div>
                    </div>
                </div>
               
            </el-descriptions-item>
            <el-descriptions-item :span="2" label="备注" label-class-name="my-label-center" :contentStyle="{'text-align': 'left','height':'100px'}">
                <el-input
                    type="textarea"
                    resize="none"
                    :autosize="{minRows: 5, maxRows: 999}"
                    placeholder="请输入内容"
                    v-model="textarea2">
                </el-input>
            </el-descriptions-item>
        </el-descriptions>
        <div class="footer">
            <ul>
                <li>审核：</li>
                <li>主检：</li>
                <li>编制：</li>
            </ul>
        </div>
    </div>
</template>
<script>

export default{
    data(){
        return{
            radio:'',
            text:'12333333333333333333',
            textarea1:'江苏省苏州市吴中区吴中大道 1188 号',
            textarea2:'江苏省苏州市吴中区吴中大道 1188 号'
        }
    },
    mounted(){
      
    },
    methods:{
      
    }
}
</script>
<style lang="scss" scoped>
 .ceshi{
    .jelun{
        height: 100%;
        position: relative;
        .qian{
            height: 220px;
            width: 220px;
            position: absolute;
            top: 0;
            right: 0;
            p{
                margin-top: 100px;
            }
        }
        .shenpi{
            position: absolute;
            bottom: 0;
            left: 0;
            height: 80px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .footer{
        ul{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 40px 50px;
        }
    }
 }
</style>
<style lang="scss">
 .ceshi{
    .el-textarea__inner{
        border: 1px solid #fff !important;
    }
}
</style>
<style>
 .my-label-center {
    text-align: center !important;
    width: 250px !important;
  }
  .my-content-center{
    text-align: center !important;
    width: 300px;
  }
</style>