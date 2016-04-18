/**
 * Created by C0079 on 2016/4/18.
 */
define(function(require,exports,module){
   var $=require("jquery");
    function post(url,data,success,error){
        $.ajax({
            type:"POST",
            url:url,
            data:data,
            success:success,
        });
    }
});