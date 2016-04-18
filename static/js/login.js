/**
 * Created by Administrator on 2016/4/16.
 */
define(function(require,exports,module){
    var $=require("jquery");
    var loginPage={};
    loginPage.pageInit=function(){
        loginTabs();
        bindLoginBtn();
    };
    function loginTabs(){
        $(".tab li").on("click",function(){
            if(!$(this).hasClass(".current")){
                var index=$(this).index();
                $(".tab .current").removeClass("current");
                $(this).addClass("current");
                $(".tabPage .show").removeClass("show").addClass("hide");
                $(".tabPage li").eq(index).addClass("show").removeClass("hide");
            }
        });
    }
    function bindLoginBtn(){
        $("#login").on("click",function(){
            var param={};
           param.username=$("#usernameL").val();
           param.password=$("#passwordL").val();
            httpClient.post();
        });
    }
    exports.init=loginPage;

});