import request from '@/utils/request'
let SampleApi = {
    /*样本类型*/
    sampleGetExperimentLists(data, errorback) {
        return request._post('/shop/sample.SampleManage/getExperimentLists', data, errorback);
    },
    /*获取实验检测项目*/
    sampleGetExperimentProjectLists(data, errorback) {
        return request._post('/shop/sample.SampleManage/getExperimentProjectLists', data, errorback);
    },
     /*提交样品数据*/
     sampleAddSampleType(data, errorback) {
        return request._post('/shop/sample.SampleManage/addSampleType', data, errorback);
    },
     /*样品类型展示*/
     sampleShowSampleType(data, errorback) {
        return request._post('/shop/sample.SampleManage/showSampleType', data, errorback);
    },
      /*样品类型删除*/
      sampleDelSampleType(data, errorback) {
        return request._post('/shop/sample.SampleManage/delSampleType', data, errorback);
    },
}

export default SampleApi;
