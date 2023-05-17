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
     /*样品类型编辑*/
    sampleEditShowSampleType(data, errorback) {
        return request._post('/shop/sample.SampleManage/editShowSampleType', data, errorback);
    },
     /*样品类型编辑*/
     sampleShowSampleTypeList(data, errorback) {
        return request._post('/shop/sample.SampleManage/showSampleTypeList', data, errorback);
    },
      /*提交样品列表数据*/
      sampleAddSampleListt(data, errorback) {
        return request._post('/shop/sample.SampleList/addSampleList', data, errorback);
    },
      /*样品列表展示*/
      sampleShowSampleList(data, errorback) {
        return request._post('/shop/sample.SampleList/showSampleList', data, errorback);
    },
      /*样品列表编辑回显*/
    sampleEditShowSampleList(data, errorback) {
        return request._post('/shop/sample.SampleList/editShowSampleList', data, errorback);
    },
     /*样品列表删除*/
    sampleDelSampleList(data, errorback) {
        return request._post('/shop/sample.SampleList/delSampleList', data, errorback);
    },
     /*展示全部列表*/
     sampleShowSampleListModel(data, errorback) {
        return request._post('/shop/sample.SampleModel/showSampleListModel', data, errorback);
    },
      /*提交样品列表数据*/
    sampleAddSampleModel(data, errorback) {
        return request._post('/shop/sample.SampleModel/addSampleModel', data, errorback);
    },
      /*展示全部型号*/
    sampleShowSampleModel(data, errorback) {
        return request._post('/shop/sample.SampleModel/showSampleModel', data, errorback);
    },
      /*样品型号删除*/
    sampleDelSampleModel(data, errorback) {
        return request._post('/shop/sample.SampleModel/delSampleModel', data, errorback);
    },
      /*样品型号编辑回显示*/
    sampleDditShowSampleModel(data, errorback) {
        return request._post('/shop/sample.SampleModel/editShowSampleModel', data, errorback);
    },
}

export default SampleApi;
