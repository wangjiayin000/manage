import request from '@/utils/request'

let InvitationGiftApi = {
  /*添加邀请有礼*/
  addInvitation(data, errorback) {
    return request._post('/shop/plus.invitationgift.invitation/add', data, errorback);
  },
  /*编辑邀请有礼*/
  editInvitation(data, errorback) {
    return request._post('/shop/plus.invitationgift.invitation/edit', data, errorback);
  },
  /*列表*/
  InvitationList(data, errorback) {
    return request._post('/shop/plus.invitationgift.invitation/lists', data, errorback);
  },
  /*发布*/
  send(data, errorback) {
    return request._post('/shop/plus.invitationgift.invitation/send', data, errorback);
  },
  /*终止*/
  end(data, errorback) {
    return request._post('/shop/plus.invitationgift.invitation/end', data, errorback);
  },
  /*删除*/
  del(data, errorback) {
    return request._post('/shop/plus.invitationgift.invitation/del', data, errorback);
  },
  /*获取数据*/
  getInvitation(data, errorback) {
    return request._post('/shop/plus.invitationgift.invitation/getDatas', data, errorback);
  },
  /*推广二维码*/
  qrcode(data, errorback) {
      return request._post('/shop/plus.invitationgift.invitation/qrcode', data, errorback);
  },
  /*推广二维码*/
  partakelist(data, errorback) {
      return request._post('/shop/plus.invitationgift.invitation/partakelist', data, errorback);
  },
}

export default InvitationGiftApi;
