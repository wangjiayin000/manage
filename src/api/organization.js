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
      /*机构对应的样品*/
    OrgSampleRelLists(data, errorback) {
        return request._post('/shop/organization.Organization/OrgSampleRelLists', data, errorback);
    },  
     /*机构对应的实验*/
     OrgExperimentLists(data, errorback) {
      return request._post('/shop/organization.Organization/OrgExperimentLists', data, errorback);
    },  
     /*机构对应的员工*/
     OrgStaffLists(data, errorback) {
      return request._post('/shop/organization.Organization/OrgStaffLists', data, errorback);
    }, 
     /*机构对应的基地*/
     OrgBaseLists(data, errorback) {
      return request._post('/shop/organization.Organization/OrgBaseLists', data, errorback);
    }, 
}

export default OrganizationApi;
