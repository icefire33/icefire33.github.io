/**
 * Created by C0079 on 2016/4/18.
 */
define(function (require, exports, module) {
    var $ = require("jquery");
    var bootstrap = require("bootstrap");
    var personalPage = {};
    personalPage.pageInit = function () {
        bindLeadFadeIn();
        //setInterval(carouselPicture,1000);
        bindArrowsClick();
    };
    function bindLeadFadeIn() {
        $(".leadPicture").hover(function () {
            $(this).find(".leadSentence").fadeIn("slow");
        }, function () {
            $(this).find(".leadSentence").fadeOut("slow");
        });
    }

    function carouselPicture() {
        $(".mainPictureBox").append($(".mainPictureBox li").first());
    }

    function bindArrowsClick() {
        $(".rightScroll").on("click", function () {
            $(".mainPictureBox li").each(function(i,n){
                $(n).removeClass("moveScrollOne moveScrollTwo moveScrollThree moveScrollFour moveScrollOneR moveScrollTwoR moveScrollThreeR moveScrollFourR");
            });
             $(".mainPictureBox li:first-child").addClass("moveScrollOne").css({left:"29%", zIndex:-10,transform: "translate3D(0, 0, -400px) rotateY(0)",right:"auto"});
             $(".mainPictureBox li:nth-child(2)").addClass("moveScrollTwo").css({left:"-12%", zIndex:-1,transform: "translate3D(0, 0, -400px) rotateY(30deg)",right:"auto"});
             $(".mainPictureBox li:nth-child(3)").addClass("moveScrollThree").css({right:"29%", zIndex:100,transform: "translate3D(0, 0, 0) rotateY(0deg)",left:"auto"});
             $(".mainPictureBox li:nth-child(4)").addClass("moveScrollFour").css({right:"-12%",zIndex:-1, transform: "translate3D(0, 0, -400px) rotateY(-30deg)",left:"auto"});
            $(".mainPictureBox").append($(".mainPictureBox li").first());
        });
        $(".leftScroll").on("click", function () {
            $(".mainPictureBox li").each(function(i,n){
                $(n).removeClass("moveScrollOneR moveScrollTwoR moveScrollThreeR moveScrollFourR moveScrollOne moveScrollTwo moveScrollThree moveScrollFour");
            });
            $(".mainPictureBox li:first-child").addClass("moveScrollOneR").css({left:"29%", zIndex:100,transform: "translate3D(0, 0, 0) rotateY(0)",right:"auto"});
            $(".mainPictureBox li:nth-child(2)").addClass("moveScrollTwoR").css({right:"-12%", zIndex:-1,transform: "translate3D(0, 0, -400px) rotateY(-30deg)",left:"auto"});
            $(".mainPictureBox li:nth-child(3)").addClass("moveScrollThreeR").css({right:"29%", zIndex:-10,transform: "translate3D(0, 0, -400px) rotateY(0deg)",left:"auto"});
            $(".mainPictureBox li:nth-child(4)").addClass("moveScrollFourR").css({left:"-12%",zIndex:-1, transform: "translate3D(0, 0, -400px) rotateY(30deg)",right:"auto"});
            $(".mainPictureBox li:first-child").before($(".mainPictureBox li").last());
        });
    }

    exports.init = personalPage;
});