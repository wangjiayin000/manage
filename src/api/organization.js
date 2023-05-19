import request from '@/utils/request'
let OrganizationApi = {
     /*添加修改机构会员*/
     addOrganiztionVip(data, errorback) {
        return request._post('/shop/organization.Organization/addOrganiztionVip', data, errorback);
    },
      /*展示机构会员列表*/
      showOrganiztionVip(data, errorback) {
        return request._post('/shop/organization.Organization/showOrganiztionVip', data, errorback);
    },   
      /*删除机构会员*/
      delOrganiztionVip(data, errorback) {
        return request._post('/shop/organization.Organization/delOrganiztionVip', data, errorback);
    },  
}

export default OrganizationApi;
