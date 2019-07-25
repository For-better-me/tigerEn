import wx from 'wx-jssdk-ts'
import { otherApi } from '../api/other'
import { UserApi } from '../api/user'
interface wxconfig {
    debug: boolean;
    appId: string;
    timestamp: number;
    nonceStr: string;
    signature: string;
    jsApiList: any;
}
var u:any = navigator.userAgent;
var isiOS:boolean = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
function reqConfig(shareLink: string) {
    // let url = encodeURIComponent(shareLink)
    otherApi.getConfig({ url: shareLink }).then((response) => {
        wxstart(response.data, shareLink);
    }).catch(() => {
        console.log('err');
    })
}

function wxstart(data: wxconfig, shareLink: string) {
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(() => {
        // 分享到朋友

        wx.updateAppMessageShareData({
            title: "趣虎",
            desc: "趣虎",
            link: isiOS ? window.location.href : shareLink,
            imgUrl: "http://m.vipqm.cn/logo.png",
            success: function () {
                // alert(urlParam)
                console.log("分享成功");
            },
            cancel: function () {
                // alert(urlParam)
                console.log("取消分享");
            }
        });
        // 分享给朋友圈
        wx.updateTimelineShareData({
            title: "趣虎", // 分享标题
            link: isiOS ? window.location.href : shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://m.vipqm.cn/logo.png", // 分享图标
            success: function () {
                // alert(urlParam)
                // 用户点击了分享后执行的回调函数
            },
            cancel: function () { }
        });
    });
}

export default reqConfig;