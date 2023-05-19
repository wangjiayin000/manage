import request from '@/utils/request'
let TemplateManagementApi = {
    /*上传excel文件模板*/
    uploadTemplate(formData, errorback) {
        return request._upload('/shop/project.TemplateManagement/uploadTemplate', formData, errorback);
    },
     /*展示全部模板*/
     showTemplate(data, errorback) {
        return request._post('/shop/project.TemplateManagement/showTemplate', data, errorback);
    },
      /*下载模板*/
      downloadTemplate(data, errorback) {
        return request._post('/shop/project.TemplateManagement/downloadTemplate', data, errorback);
    },    
      /*删除模板*/
      delTemplate(data, errorback) {
        return request._post('/shop/project.TemplateManagement/delTemplate', data, errorback);
    },   
}

export default TemplateManagementApi;
