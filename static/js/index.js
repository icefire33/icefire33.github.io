/**
 * Created by Administrator on 2016/4/16.
 */
define(function(require,exports,module){
    var $=require("jquery");
    var bootstrap=require("bootstrap");
    var indexPage={};
    indexPage.pageInit=function(){
        $("body").load("static/html/login.html",function(){
        });
    };
    exports.init=indexPage;
});