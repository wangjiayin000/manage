import request from '@/utils/request'

let GiftPackageApi = {
    /*保存礼包*/
    SavePackage(data, errorback) {
        return request._post('/shop/plus.giftpackage.giftpackage/saveGift', data, errorback);
    },
    /*获取数据*/
    getData(data, errorback) {
        return request._post('/shop/plus.giftpackage.giftpackage/getGiftPackage', data, errorback);
    },
    /*保存礼包*/
    EditPackage(data, errorback) {
        return request._post('/shop/plus.giftpackage.giftpackage/edit', data, errorback);
    },
    /*列表*/
    giftpackageList(data, errorback) {
        return request._post('/shop/plus.giftpackage.giftpackage/lists', data, errorback);
    },
    /*发布礼包*/
    send(data, errorback) {
        return request._post('/shop/plus.giftpackage.giftpackage/send', data, errorback);
    },
    /*终止礼包*/
    end(data, errorback) {
        return request._post('/shop/plus.giftpackage.giftpackage/end', data, errorback);
    },
    /*删除*/
    delpackage(data, errorback) {
        return request._post('/shop/plus.giftpackage.giftpackage/del', data, errorback);
    },
    /*订单*/
    orderlist(data, errorback) {
        return request._post('/shop/plus.giftpackage.giftpackage/orderlist', data, errorback);
    },
    /*推广二维码*/
    qrcode(data, errorback) {
        return request._post('/shop/plus.giftpackage.giftpackage/qrcode', data, errorback);
    },
}

export default GiftPackageApi;
