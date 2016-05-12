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
        xx(".flower_svg").hover();
        xx.animateAll();
        $("#audio_btn").on("click",function(){
            getAudioTime(null);//获取音频时长
        });
        bindAudioVolumeBtn();
        bindVolumeAndPlayLineDrag();//绑定音量条与播放条拖拽事件
    };
    function bindVolumeAndPlayLineDrag(){
        bindPlayLineDrag();
        bindVolumeLineDrag();
    }
    function bindVolumeLineDrag(){
        var circleWidth=$(".volume_current_circle").width();
        var xLeft=$(".volume_line").width()-circleWidth;
        var volumeLineX=$(".volume_line").offset().left;
        $(".volume_current_circle").mousedown(function(){
            $("body").append("<div id='audio_cover'></div>");
            $("#audio_cover").mousemove(function(e){
                var x=e.pageX-volumeLineX;
                var left=x-xLeft+"px";
                if(x>xLeft){
                    left=0;
                    x=xLeft;
                }else if(x<circleWidth){
                    left=-xLeft;
                    x=0;
                }
                $(".volume_position").css("left",left);
                $("#audio_cover").off("mouseup").on("mouseup",function(){
                    document.getElementById("my_audio").muted=false;
                    var currentVolume=x/xLeft;
                    if(x==0){
                        $(".audio_volume").addClass("audio_mute");
                        $(".audio_volume").attr("data-status","mute");
                    }else{
                        $(".audio_volume").removeClass("audio_mute");
                        $(".audio_volume").attr("data-status","");
                    }
                    document.getElementById("my_audio").volume=currentVolume;
                    $("#audio_cover").off("mousemove").remove();
                });
            });
            $("#audio_cover").off("mouseup").on("mouseup",function(){
                $("#audio_cover").off("mousemove").remove();
            });
        });
    }
    function bindAudioVolumeBtn(){
        $(".audio_volume").click(function(){
            var circleWidth=$(".volume_current_circle").width();
            var volumeLineLeft=$(".volume_line").width()-circleWidth;
            var xLeft=$(".volume_position").css("left");
            if($(".audio_volume").attr("data-status")=="mute"){
                $(".audio_volume").removeClass("audio_mute").attr("data-status","");
                var currValue=$(".audio_volume").attr("data-currValue");
                $(".volume_position").css("left",currValue);
                $(".audio_volume").attr("data-currValue","");
                document.getElementById("my_audio").muted=false;
            }else{
                $(".audio_volume").addClass("audio_mute").attr("data-status","mute").attr("data-currValue",xLeft);
                $(".volume_position").css("left",-volumeLineLeft+"px");
                document.getElementById("my_audio").muted=true;
            }
        });
    }
    function bindPlayLineDrag(){
        var xLeft=-parseFloat($(".get_position").css("left"));
        var circleWidth=$(".current_circle").width();
        $(".current_circle").mousedown(function(event){
            $("body").append("<div id='audio_cover'></div>");
            $("#audio_cover").mousemove(function(e){
                $(".get_position").stop();
                var x=e.pageX;
                var left=x-xLeft+"px";
                if(x>xLeft){
                    left=0;
                    x=0;
                }else if(x<circleWidth){
                    left=-xLeft;
                }
                $(".get_position").css("left",left);
                $("#audio_cover").off("mouseup").on("mouseup",function(){
                    var time=document.getElementById("my_audio").duration;
                    var currentTime=time*x/xLeft;
                    if(x==0){
                        $(".get_position").css("left",-xLeft+"px");
                    }
                    document.getElementById("my_audio").currentTime=currentTime;
                    $("#audio_cover").off("mousemove").remove();
                    $(".get_position").stop();
                    getAudioTime("play");
                });
            });
            $("#audio_cover").off("mouseup").on("mouseup",function(){
                $("#audio_cover").off("mousemove").remove();
            });
        });
    }
    function getAudioTime(keyword){
        var time=document.getElementById("my_audio").duration;
        var currentTime=document.getElementById("my_audio").currentTime;
        var minute=parseInt(time/60);
        var second=Math.round(time%60);
        second=second<10?"0"+second:second;
        var duration=minute+":"+second;
        $("#duration").html(duration);
        //控制音频的播放
        time=time-currentTime;
        controlAudioPlay(time,keyword);
    }
    function controlAudioPlay(time,keyword){
        if($(".get_position").attr("data-play")=="play"&&keyword==null){
            document.getElementById("my_audio").pause();
            $(".get_position").stop();
            $(".get_position").attr("data-play","");
            $(".play_pause").removeClass("pause_play");
        }else{
            document.getElementById("my_audio").play();
            $(".get_position").attr("data-play","play");
            $(".play_pause").addClass("pause_play");
            $(".get_position").animate({left:"0"},time*1000,"linear",function(){
                $(".get_position").attr("data-play","");
                $(".play_pause").removeClass("pause_play");
            });
        }

    }


    function bindLeadFadeIn() {
        $(".leadPicture").hover(function () {
            if($(this).index()==1){
                $(this).find(".leadSentence").fadeIn("slow");
            }
        }, function () {
            if($(this).index()==1) {
                $(this).find(".leadSentence").fadeOut("slow");
            }
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
             $(".mainPictureBox li:first-child").addClass("moveScrollOne").css({left:"50%", zIndex:-10,transform: "translate3D(0, 0, -400px) rotateY(0)",right:"auto"});
             $(".mainPictureBox li:nth-child(2)").addClass("moveScrollTwo").css({left:"-12%", zIndex:-1,transform: "translate3D(0, 0, -400px) rotateY(30deg)",right:"auto"});
             $(".mainPictureBox li:nth-child(3)").addClass("moveScrollThree").css({right:"50%", zIndex:100,transform: "translate3D(0, 0, 0) rotateY(0deg)",left:"auto"});
             $(".mainPictureBox li:nth-child(4)").addClass("moveScrollFour").css({right:"-12%",zIndex:-1, transform: "translate3D(0, 0, -400px) rotateY(-30deg)",left:"auto"});
            $(".mainPictureBox").append($(".mainPictureBox li").first());
            bindLeadFadeIn();
        });
        $(".leftScroll").on("click", function () {
            $(".mainPictureBox li").each(function(i,n){
                $(n).removeClass("moveScrollOneR moveScrollTwoR moveScrollThreeR moveScrollFourR moveScrollOne moveScrollTwo moveScrollThree moveScrollFour");
            });
            $(".mainPictureBox li:first-child").addClass("moveScrollOneR").css({left:"50%", zIndex:100,transform: "translate3D(0, 0, 0) rotateY(0)",right:"auto"});
            $(".mainPictureBox li:nth-child(2)").addClass("moveScrollTwoR").css({right:"-12%", zIndex:-1,transform: "translate3D(0, 0, -400px) rotateY(-30deg)",left:"auto"});
            $(".mainPictureBox li:nth-child(3)").addClass("moveScrollThreeR").css({right:"50%", zIndex:-10,transform: "translate3D(0, 0, -400px) rotateY(0deg)",left:"auto"});
            $(".mainPictureBox li:nth-child(4)").addClass("moveScrollFourR").css({left:"-12%",zIndex:-1, transform: "translate3D(0, 0, -400px) rotateY(30deg)",right:"auto"});
            $(".mainPictureBox li:first-child").before($(".mainPictureBox li").last());
            bindLeadFadeIn();
        });
    }

    exports.init = personalPage;
});