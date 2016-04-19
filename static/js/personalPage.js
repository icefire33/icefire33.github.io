/**
 * Created by C0079 on 2016/4/18.
 */
define(function(require,exports,module){
    var $=require("jquery");
    var bootstrap=require("bootstrap");
    var personalPage={};
    personalPage.pageInit=function(){
        bindLeadFadeIn();
        setInterval(carouselPicture,1000);
    };
    function bindLeadFadeIn(){
        $(".leadPicture").hover(function(){
            $(this).find(".leadSentence").fadeIn("slow");
        },function(){
            $(this).find(".leadSentence").fadeOut("slow");
        });
    }
    function carouselPicture(){
        $(".mainPictureBox").append($(".mainPictureBox li").first());
    }

    exports.init=personalPage;
});