<template>
    <div>
        <div>测试</div>
        <el-table @selection-change="handleSelectionChange" :span-method="objectSpanMethod" :data="tableData" border  ref="multipleTable" >
            <!-- <el-table-column :selectable="checkSelect" type="selection" width="60">
            </el-table-column> -->
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
            tableData:[]
        }
    },
    mounted(){
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
        }

    }
}
</script>