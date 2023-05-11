<template>
    <div class="scancode">
        <el-form size="small" ref="form" :model="form" label-width="150px">
            <div class="common-form">商城设置</div>
            <el-form-item label="是否开启扫码">
                <div>
                    <el-radio v-model="form.store_open" label="1">开启</el-radio>
                    <el-radio v-model="form.store_open" label="0">关闭</el-radio>
                </div>
                <!-- <div class="tips">主要用于扫码开关</div> -->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default{
    data(){
        return{
            form:{
                store_open:'1'
            }
        }
    }
}
</script>