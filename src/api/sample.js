import request from '@/utils/request'
let SampleApi = {
    /*样本类型*/
    sampleGetExperimentLists(data, errorback) {
        return request._post('/shop/sample.SampleManage/getExperimentLists', data, errorback);
    }
  
}

export default SampleApi;
