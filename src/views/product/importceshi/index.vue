<template>
    <div class="ceshi">
       <h1>{{singleData.title}}</h1>
       <el-descriptions :column="2" border>
            <el-descriptions-item label="样品名称" label-class-name="my-label-center" content-class-name="my-content-center">{{singleData.name}}</el-descriptions-item>
            <el-descriptions-item label="样品型号" label-class-name="my-label-center" content-class-name="my-content-center">{{singleData.modelNumber}}</el-descriptions-item>
            <el-descriptions-item label="委托单位" label-class-name="my-label-center" content-class-name="my-content-center">{{singleData.unit}}</el-descriptions-item>
            <el-descriptions-item label="生产单位" label-class-name="my-label-center" content-class-name="my-content-center">{{singleData.production}}</el-descriptions-item>
            <el-descriptions-item label="样品状态" label-class-name="my-label-center" content-class-name="my-content-center">
                <el-radio-group v-model="radio">
                    <el-radio :label="3">完好</el-radio>
                    <el-radio :label="6">异常</el-radio>
                </el-radio-group>
                <span>（见备注）</span>
            </el-descriptions-item>
            <el-descriptions-item label="到样日期" label-class-name="my-label-center" content-class-name="my-content-center">{{singleData.sampleArrival}}</el-descriptions-item>
            <el-descriptions-item label="样品数量" label-class-name="my-label-center" content-class-name="my-content-center">{{singleData.num}}</el-descriptions-item>
            <el-descriptions-item label="样品单号" label-class-name="my-label-center" content-class-name="my-content-center">{{singleData.serial}}</el-descriptions-item>
            <el-descriptions-item label="检测地点" label-class-name="my-label-center" content-class-name="my-content-center">{{singleData.location}}</el-descriptions-item>
            <el-descriptions-item label="检测日期" label-class-name="my-label-center" content-class-name="my-content-center">{{singleData.detection}}</el-descriptions-item>
            <el-descriptions-item :span="2" label="检测依据" label-class-name="my-label-center" :contentStyle="{'text-align': 'left','height':'200px'}">
                <el-input
                    type="textarea"
                    resize="none"
                    :autosize="{minRows: 10, maxRows: 999}"
                    placeholder="请输入内容"
                    v-model="singleData.addine">
                </el-input>

            </el-descriptions-item>
            <el-descriptions-item :span="2" label="检测结论" label-class-name="my-label-center" :contentStyle="{'text-align': 'left','height':'250px'}">
                <div class="jelun">
                    <div>
                        <p>{{singleData.myConclusion}}</p>
                        <div class="qian">
                            <p>检测单位（机构）盖章</p>
                        </div>
                    </div>
                    
                    <div class="shenpi">
                        <div style="padding-left: 20px;">批准人：{{singleData.myName}}</div>
                        <div>签发日期：{{singleData.myDate}}</div>
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
                    v-model="singleData.remarks">
                </el-input>
            </el-descriptions-item>
        </el-descriptions>
        <div class="footer">
            <ul>
                <li>审核：{{singleData.audit}}</li>
                <li>主检：{{singleData.primary}}</li>
                <li>编制：{{singleData.estable}}</li>
            </ul>
        </div>
        <div class="right">
            <el-button type="success" @click="downloadWord()">导出为Word</el-button>
        </div>
    </div>
</template>
<script>
import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import {saveAs} from 'file-saver'
export default{
    data(){
        return{
            radio:'',
            text:'12333333333333333333',
            textarea1:'江苏省苏州市吴中区吴中大道 1188 号',
            textarea2:'江苏省苏州市吴中区吴中大道 1188 号',
            // singleData:{
            //     title:'检测结论',
            //     name:'想念小理同学的每一天',
            //     modelNumber:521,
            //     unit:'想你的小王同学',
            //     production:'小王的每一天',
            //     state:'十分想念',
            //     sampleArrival:'2023.3.27',
            //     num:1314,
            //     serial:5211314,
            //     location:'小王的心里',
            //     detection:'2023.4.12',
            //     addine:'想念小理的一天想念小理的一天想念小理的一天想念小理的一天想念小理的一天想念小理的一天想念小理的一天想念小理的一天想念小理的一天想念小理的一天想念小理的一天想念小理的一天想念小理的一天',
            //     myConclusion:'十分想念，思念成疾.',
            //     myName:'小理',
            //     myDate:'2023.4.12',
            //     remarks:'允许',
            //     audit:'小理',
            //     primary:'小理',
            //     estable :'小王'
            // },
            singleData:{
                title:'检测结论',
                name:'样品1',
                modelNumber:'样品2',
                unit:'样品3',
                production:'样品4',
                state:'样品5',
                sampleArrival:'2023.3.27',
                num:"样品6",
                serial:'样品7',
                location:'样品8',
                detection:'样品9',
                addine:'样品10',
                myConclusion:'样品11',
                myName:'董事长',
                myDate:'2023.4.12',
                remarks:'允许',
                audit:'董事长',
                primary:'总经理',
                estable :'部长'
            }
        }
    },
    mounted(){
      
    },
    methods:{
        downloadWord(){
            let _this = this;
            // 读取并获得模板文件的二进制内容
            JSZipUtils.getBinaryContent("../../../../../static/files/yangpin.docx", function (error, content) {
                // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
                // 抛出异常
                if (error) {
                throw error;
                }
                // 创建一个PizZip实例，内容为模板的内容
                let zip = new PizZip(content);
                // 创建并加载docxtemplater实例对象
                let doc = new docxtemplater().loadZip(zip);
                // 设置模板变量的值,同步把对应变量绑定到word模板中

                let docxData = _this.singleData;//这里的_this.singleData是后台返回的值
                // let docxData = {
                //   gw_zh: "1111",
                //   gw_title:"我是标题",
                //   gw_content: "我是内容",
                //   fb_dateline:"我是时间"
                
                // }
                doc.setData({
                ...docxData
                });

                try {
                // 用模板变量的值替换所有模板变量
                doc.render();
                } catch (error) {
                // 抛出异常
                let e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties
                };
                console.log(JSON.stringify({ error: e }));
                throw error;
                }
                // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
                let out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                });
                // 将目标文件对象保存为目标类型的文件，并命名
                saveAs(out, "模板（Worde）文件下载.docx");
                // saveAs(out, "审批.docx");

            });
        }

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