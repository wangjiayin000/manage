import request from '@/utils/request'
let CategoryApi = {
    /*类型列表*/
    categoryList(data, errorback) {
        return request._post('/shop/experiment.category/index', data, errorback);
    },
    /*添加类型*/
    addCategory(data, errorback) {
        return request._post('/shop/experiment.category/add', data, errorback);
    },
    /*修改类型*/
    editCategory(data, errorback) {
        return request._post('/shop/experiment.category/edit', data, errorback);
    },
    /*删除类型*/
    deleteCategory(data, errorback) {
        return request._post('/shop/experiment.category/delete', data, errorback);
    }
}

export default CategoryApi;
