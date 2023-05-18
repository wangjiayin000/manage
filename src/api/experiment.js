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
    },
     /*删除试验项目*/
     experimentDelete(data, errorback) {
        return request._post('/shop/experiment.experiment/delete', data, errorback);
    },
      /*编辑试验项目*/
    experimentEdit(data, errorback) {
        return request._get('/shop/experiment.experiment/edit', data, errorback);
    },
    
}

export default ExperimentApi;
