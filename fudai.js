/**
 * Created by zj on 16/1/15.
 */
$(window).ready(function () {
    var $fudai = $('.fudai');
    var $houzi = $('.houzi');
    var $hander = $('.hander');
    var $result = $('#result');
    var $result_content = $('.result_content');

    /**
     *  环境判断
     */
    var ua = navigator.userAgent;
    console.log(ua);
    if (ua.match(/iphone/i) !=null) {
//        alert("iphone");
//        var ifr = document.createElement('iframe');
//        ifr.src = 'wx22e5d0e3792db66a://';
//        ifr.style.display = 'none';
//        document.body.appendChild(ifr);
//        window.setTimeout(function () {
//            document.body.removeChild(ifr);
//        }, 3000)
    }
    else if (ua.match(/Android/i) != null) {
    }
    else if (ua.match(/iPad/i) != null) {
    }

    $houzi.addClass("animated bounceInDown");
    setTimeout(function () {
        $fudai.removeClass("bounceIn")
    }, 2000);
    var timeFudai = setInterval(function () {
        $fudai.addClass("swing").delay(1000).queue(function (next) {
            $(this).removeClass("swing");
            next()
        })
    }, 2000);
    var timeHander = setInterval(function () {
        $hander.css({left: "67%", top: "62%"}).delay(500).queue(function (next) {
            $(this).css({left: "70%", top: "65%"});
            next()
        })
    }, 1000);

    $fudai.on("click", function () {
        clearInterval(timeFudai);
        clearInterval(timeHander);

        //获取奖品信息
        var $gift=$(".word");
        var $giftTitle=$gift.find('.title');
        var $giftName=$gift.find('.giftName');
        var $giftDetail=$('.giftDetail');
        var $codeName=$giftDetail.find('.codeName');
        var $cdkeyCode=$giftDetail.find('.cdkeyCode');
        var $keyValue=$giftDetail.find('.keyValue');
        var $cdkey=$giftDetail.find('.cdkey');

        var $button_close=$('.button_close').find('a');

        $.ajax({
            type: 'POST',
            dataType: "json",
            url: "http://test.baojinsuo.cn/openapi/activity/choujiang.json",
            data:{
                activity:"Lottery",
                code:"AC0000000005"
            },
            success: function (data) {
//                var adata = JSON.parse(data);
                var giftName=data.result.BusinessActiveName;
                var CodeName=data.result.BusinessCodeName;
                var CdkeyCode=data.result.CdkeyCode;
                var KeyValue=data.result.BusinessKeyValue;
                var Cdkey=data.result.Cdkey;

                $giftTitle.text("恭喜您获得");
                $giftName.text(giftName);
                $codeName.text(CodeName);
                $cdkeyCode.text(CdkeyCode);
                $keyValue.text(KeyValue);
                $cdkey.text(Cdkey);

                showFudai()
            },
            error: function () {
                $giftDetail.empty().html("<p>请检查您的网络，再次尝试</p>");
                showFudai();
                $button_close.attr("href","http://test.baojinsuo.cn/fudai")
            }
        });

        //弹出福袋
        function showFudai(){
            $fudai.removeClass("swing").queue(function (next) {
                $(this).addClass("pulse");
                next()
            }).delay(800).queue(function (next) {
                $result_content.addClass("animated bounceIn");
                $result.show();
            })
        }
    });

    /**
     * native应用判断
     */
//    document.getElementById('openApp').onclick = function (e) {
//        var $openApp=$('#openApp');
//        $openApp.click();
        // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
        // 否则打开a标签的href链接
//    };
});
