import request from '@/utils/request'
let ExperimentApi = {
    /*试验列表*/
    experimentList(data, errorback) {
        return request._post('/shop/experiment.experiment/index', data, errorback);
    },
    /*添加试验项目*/
    experimentAddItem(data, errorback) {
        return request._post('/shop/experiment.item/addItem', data, errorback);
    },
    /*添加试验子类*/
    experimentSubclass(data, errorback) {
        return request._post('/shop/experiment.item/addItemSubclass', data, errorback);
    },
    /*添加试验子类*/
    experimentAdd(data, errorback) {
        return request._post('/shop/experiment.experiment/add', data, errorback);
    }
    
}

export default ExperimentApi;
