<template>
    <div>
        <el-upload
        action
        accept=".xlsx, .xls"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handle"
        >
        <el-button type="primary" class="imExcelBtn"
            >导入Excel</el-button
        >
        </el-upload>
        <el-button type="success" @click="exportExcel">导出为Excel</el-button>
        <div>测试</div>
        <el-table @selection-change="handleSelectionChange" :span-method="objectSpanMethod" :data="tableData" border id="excelTable" ref="multipleTable" >
            <el-table-column label="序号" width="60">
                <template v-if="scope.row" slot-scope="scope">
                <div>{{scope.row.rank}}</div>
                </template>
            </el-table-column>
            <el-table-column label="名称">
                <template v-if="scope.row" slot-scope="scope">
                <div>{{scope.row.name}}</div>  
                </template>
            </el-table-column>
            <el-table-column label="金额(元)">
                <template v-if="scope.row" slot-scope="scope">
                    {{scope.row.money}}
                </template>
            </el-table-column>
            <el-table-column label="面值(金币)">
                <template v-if="scope.row" slot-scope="scope">
                {{scope.row.coinNum}}
                </template>
            </el-table-column>
            <el-table-column label="全部数量(张)">
                <el-table-column label="数量(张)">
                    <template v-if="scope.row" slot-scope="scope">
                        {{scope.row.allNum}}
                    </template>
                </el-table-column>
                <el-table-column label="未发放(张)">
                    <template v-if="scope.row" slot-scope="scope">
                    {{scope.row.surplusNum}}
                    </template>
                </el-table-column>
            </el-table-column>
            
            <el-table-column label="门店名称">
                <template v-if="scope.row" slot-scope="scope">
                    {{scope.row.merchantName}}
                </template>
            </el-table-column>
            <el-table-column label="活动时间" width="160" prop="startTime">
                
            </el-table-column>

        </el-table>

    </div>
</template>
<script>
import * as XLSX from "xlsx/xlsx.mjs";
import FileSaver from "file-saver";
export default{
    data(){
        return{
            tableList:[
                {   
                    id:1,
                    rank:'1',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐1",
                    startTime:'2023-04-06'
                },
                {   
                    id:1,
                    rank:'1',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐2",
                    startTime:'2023-04-06'
                },
                {   
                    id:1,
                    rank:'1',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐3",
                    startTime:'2023-04-06'
                },
                {   
                    id:1,
                    rank:'1',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐4",
                    startTime:'2023-04-06'
                },
                {   
                    id:2,
                    rank:'2',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐11",
                    startTime:'2023-04-06'
                },
                {   
                    id:2,
                    rank:'2',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐22",
                    startTime:'2023-04-06'
                },
                {   
                    id:2,
                    rank:'2',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐33",
                    startTime:'2023-04-06'
                },
                {   
                    id:3,
                    rank:'3',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐111",
                    startTime:'2023-04-06'
                },
                {   
                    id:3,
                    rank:'3',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐222臭豆腐222臭豆腐222臭豆腐222臭豆腐222臭豆腐222臭豆腐222臭豆腐222臭豆腐222",
                    startTime:'2023-04-06'
                },
                {   
                    id:3,
                    rank:'3',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐333",
                    startTime:'2023-04-06'
                },
                {   
                    id:3,
                    rank:'3',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐444",
                    startTime:'2023-04-06'
                },
                {   
                    id:4,
                    rank:'4',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐555",
                    startTime:'2023-04-06'
                },
                {   
                    id:4,
                    rank:'4',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐666",
                    startTime:'2023-04-06'
                },
                {   
                    id:5,
                    rank:'5',
                    name:'小明',
                    money:'10000.00',
                    coinNum:"100.00",
                    allNum:1000,
                    surplusNum:500,
                    merchantName:"臭豆腐9999",
                    startTime:'2023-04-06'
                }
            ],
            spanArr:[],
            tableKey: false, //表格的key及显示与隐藏
            excelName: "", //excel表格名称
            excelHeader: [], //excel的表头
            tableData: [], //表格数据
            tableColumn: [], //表格的表头
        }
    },
    mounted(){
        // console.log(this.tableList.length,'1231111111')
        this.tableData = this.tableList
        this.getSpanId(this.tableData)
    },
    methods:{
        handleSelectionChange(){

        },
        /**
         * 获取每行id
         * @param {*} data 
         */
         getSpanId(data) {
            // data就是我们从后台拿到的数据
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                //spanArr 用于存放没一行记录的合并数
                    this.spanArr.push(1);
                    //pos是spanArr的索引
                    this.pos = 0;
                } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].id === data[i - 1].id) {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                }
                // console.log(this.spanArr);
                // console.log(this.pos);
            }
        },

        /**
         * 合并行列  
         * 当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性。
         * @param {*} param0 
         */
        objectSpanMethod({
            row,
            column,
            rowIndex,
            columnIndex
        }) {
            if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 ||
                columnIndex === 7 || columnIndex === 3 || columnIndex === 9 || columnIndex === 10 ||
                columnIndex === 11 || columnIndex === 12) {
                
                const _row = this.spanArr[rowIndex];
                //如果行号大于0 合并
                const _col = _row > 0 ? 1 : 0;
                // console.log(`rowspan:${_row} colspan:${_col}`);
                return {
                    // [0,0] 表示这一行不显示， 
                    rowspan: _row,
                    colspan: _col
                };
            }
        },
        // 上传文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
        handle(file, fileList) {
            this.tableData = [];
            this.spanArr=[];
            //pos是spanArr的索引
            this.pos = 0;
            //改变表格key值
            this.readExcel(file); // 调用读取数据的方法
        },
        // 读取数据
        readExcel(file) {
            let that = this;
            if (!file) {
                //如果没有文件
                return false;
            } else if (!/.(xls|xlsx)$/.test(file.name.toLowerCase())) {
                this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
                return false;
            }
            const fileReader = new FileReader();
            fileReader.onload = (ev) => {
                try {
                const data = ev.target.result;
                const workbook = XLSX.read(data, {
                    type: "binary",
                });
                if (workbook.SheetNames.length >= 1) {
                    this.$message({
                    message: "导入数据表格成功",
                    showClose: true,
                    type: "success",
                    });
                }
                const wsname = workbook.SheetNames[0]; //取第一张表
                const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
                // console.log("生成json：", ws);
                // that.tableData = [];
                for (var i = 1; i < ws.length; i++) {
                    let sheetData = {
                    // 键名为绑定 el 表格的关键字，值则是 ws[i][对应表头名]
                    rank: ws[i]["序号"],
                    name: ws[i]["名称"],
                    money:ws[i]["金额(元)"],
                    coinNum:ws[i]["面值(金币)"],
                    allNum:ws[i]["全部数量(张)"],
                    surplusNum:ws[i]["__EMPTY"],
                    merchantName:ws[i]["门店名称"],
                    startTime: ws[i]["活动时间"],
                    // city: ws[i]["__EMPTY_1"],
                    };
                    // console.log("上传的数据:", sheetData);
                    //添加到表格中
                    that.tableData.push(sheetData);
                    //正常导入需要拿到上传的数据就在这从新弄个数组push进去，然后传给后台，后台保存后查询表格返给前端。
                }
                that.getExel(that.tableData)
                this.$refs.upload.value = "";
                // this.getSpanId(that.tableData)
                } catch (e) {
                console.log(e);
                return false;
                }
            };

            // 如果为原生 input 则应是 files[0]
            fileReader.readAsBinaryString(file.raw);
        },
        //获取导入表格的数据
        getExel(data){
            for(let i=0;i<data.length;i++){
                if (i === 0) {
                //spanArr 用于存放没一行记录的合并数
                    this.spanArr.push(1);
                    //pos是spanArr的索引
                    this.pos = 0;
                } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].rank) {
                        this.spanArr.push(1);
                        this.pos = i;                   
                    } else {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    }
                }
                // console.log(this.spanArr);
                // console.log(this.pos);   
            }
        },
        //导出表格为Excel
        exportExcel() {
            /* generate workbook object from table */
            let xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
            let table = document.querySelector('#excelTable').cloneNode(true)
            //这里是双下划线
            // table.removeChild(table.querySelector('.el-table__fixed')) 
            let wb = XLSX.utils.table_to_book(table, xlsxParam)

            /* get binary string as output */
            let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }),`${new Date()*1}.xlsx`)// 'fileName.xlsx'
            } catch (e) {
                if (typeof console !== 'undefined') {
                console.log(e, wbout)
                }
            }
            return wbout
        },

    }
}
</script>