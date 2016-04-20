/**
 * Created by Administrator on 2016/4/16.
 */
define(function(require,exports,module){
    var $=require("jquery");
    var bootstrap=require("bootstrap");
    var loginPage={};
    loginPage.pageInit=function(){
        loginTabs();
        bindLoginBtn();
    };
    function loginTabs(){
        $(".tab li").on("click",function(){
            if(!$(this).hasClass(".currentTab")){
                var index=$(this).index();
                $(".tab .currentTab").removeClass("currentTab");
                $(this).addClass("currentTab");
                if(index==0){
                    $(".scrollLine").animate({marginLeft:0},"slow");
                    $(".tabPage").animate({left:0},"slow");
                }else if(index==1){
                    $(".scrollLine").animate({marginLeft:"150px"},"slow");
                    $(".tabPage").animate({left:"-300px"},"slow");
                }
                //$(".tabPage .prevPage").removeClass("prevPage").addClass("nextPage");
                //$(".tabPage li").eq(index).addClass("prevPage").removeClass("nextPage");
            }
        });
    }
    function bindLoginBtn(){
        $("#login").on("click",function(){
            var param={};
           param.username=$("#usernameL").val();
           param.password=$("#passwordL").val();
            $("body").load("static/html/personalPage.html",function(){
            });
        });
    }
    exports.init=loginPage;

});