import request from '@/utils/request'
let TemplateApi = {
    /*上传文件模板*/
    uploadFileTemplate(formData, errorback) {
        return request._post('/shop/template.upload/uploadFile', formData, errorback);
    },
    /*模板列表*/
      listsTemplate(data, errorback) {
        return request._post('/shop/template.template/lists', data, errorback);
    },
     /*添加模板*/
     addTemplate(data, errorback) {
        return request._post('/shop/template.template/add', data, errorback);
    },
     /*删除模板*/
     deleteTemplate(data, errorback) {
        return request._post('/shop/template.template/delete', data, errorback);
    },
     /*样品列表*/
     getSampleListTemplate(data, errorback) {
        return request._post('/shop/template.template/getSampleList', data, errorback);
    },
}

export default TemplateApi;
