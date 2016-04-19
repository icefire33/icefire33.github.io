/*** Created by xuxiang on 2016/4/15.*/
(function(window, undefined){
    'use strict';
    var window=window;
     var xx=function(selector){
            return new xx.fn.init(selector);
        };
    xx.animateAll=function(time){
        xx(document).animate(time);
    };

    xx.nor_time=800;
    ///reg初始化0，animate为1，fadein为2，fadeout为3.
    xx.fn=xx.prototype={
        init:function(selector){
            this.reg=0;
            this.current_frame = 0;
            this.total_frames = 120;
            this.xx_svg_animate= 0;
            this.svg_arr=[];
            /*选择器为空*/
            if ( !selector ) {
                this.reg=0;
                return this;
            }
            /*选择器为dom或者jquery对象或者XX单节点*/
            if ( selector.nodeType|| selector[0].nodeType) {
                this[0] = selector.nodeType?selector:selector[0];
                return this;
            }
            /*选择器为XX多节点对象*/
            if (selector[0][0].nodeType) {
                this[0] = selector[0];
                return this;
            }
            this[0]=document.querySelectorAll(selector);
            return this;
        },
        each:function(fun){
            var xx_ele=this;
            [].slice.call(this[0]).forEach(function(element,index){
                    var args=[].slice.call(arguments);
                    xx_ele[0]=element;
                    fun.apply(xx_ele,args);
                }
            );
            return this;
        },
        add:function(event,fun){
            var xx_ele=this;
            this[0].addEventListener(event,function(ev){
                fun.call(xx_ele,ev);
            });
            return this;
        },
        on:function(selector,event){
            var event=event||"mouseover";

            this.each(function(element,index){
                this.add(event,function(ev){
                    var ev = ev || window.event;

                    var target = ev.target || ev.srcElement;
                    if((!selector)||([].slice.call(element.querySelectorAll(selector)).indexOf(target)!=-1)&&target.xx_svg_animate!=1)
                    {
                        this.animate(target);
                    }
                })
            });
            return this;
        },
        css:function(css_name,css_value){
            if(this[0][0]&&this[0][0].nodeType)
            this.each(function(){
                this[0].style[css_name]=css_value;
            });
            else if(this[0]&&this[0].nodeType){
                this[0].style[css_name]=css_value;
            }
        },
        hide:function(){
            if(!this.asyc)
            {
                this.css("display","none");
                return this;
            }

            else{
                var xx_svg=this;
                window.setTimeout(function(){
                    xx_svg.hide();
                },1);
            }
            return this;

        },
        eq:function(i){
            if(this[0]&&this[0][i]&&this[0][i].nodeType)
                this[0]=this[0][i];
            return this;
        },
        fadeout:function(ele,time){

            if(typeof ele=="number"){
                var time=ele;
                ele=this.eq(0);
            }
            else{
                time=typeof time=="number"?time:xx.nor_time;
                if(!ele){
                    ele=this.eq(0);
                }else{
                    if(ele.nodeType)
                        ele=xx(ele);
                    else if(ele[0]&&ele[0].nodeType)
                        ele=ele;
                    else if(ele[0]&&ele[0][0]&&ele[0][0].nodeType)
                        ele=ele.eq(0);
                    else return this;
                }
            }

            if(!this.asyc)
            {
                ele.reg=3;
                ele.asyc=time;
                var time=time;
                ele.fadeoutdraw(time);
                return ele;
            }
            else{
                var delay=this.asyc;
                ele.asyc=this.asyc+time;
                var xx_svg=this;
                window.setTimeout(function(){
                    xx(xx_svg).fadeout(ele,time);
                },delay);
            }
            ele.reg=3;
            return ele;
        },
        fadeoutdraw:function(time,total_time){
            var total_time=total_time||time;
            var xx_svg=this;
            if(time<=0)
            {
                window.cancelAnimFrame(xx_svg.handle);
                xx_svg.css("opacity","0");
                xx_svg.asyc=0;
                return this;
            }
            else{
                time-=1000/60;
                var opacity=(time/total_time)+"";
                xx_svg.css("opacity",opacity);
                xx_svg.handle=window.requestAnimFrame(function(){
                    xx_svg.fadeoutdraw(time,total_time);
                });
            }
            return this;
        },
        fadein:function(ele,time){

            if(typeof ele=="number"){
                var time=ele;
                ele=this.eq(0);
            }
            else{
                time=typeof time=="number"?time:xx.nor_time;
                if(!ele){
                    ele=this.eq(0);
                }else{
                    if(ele.nodeType)
                        ele=xx(ele);
                    else if(ele[0]&&ele[0].nodeType)
                        ele=ele;
                    else if(ele[0]&&ele[0][0]&&ele[0][0].nodeType)
                        ele=ele.eq(0);
                    else return this;
                }
            }
            if(!this.asyc)
            {
                ele.css("display","block");
                ele.reg=2;
                ele.asyc=time;
                var time=time;
                ele.fadedraw(time);
                return ele;

            }
            else{
                var delay=this.asyc;
                ele.asyc=this.asyc+time;
                var xx_svg=this;
                window.setTimeout(function(){
                    xx(xx_svg).fadein(ele,time);
                }, delay);
            }
            ele.reg=2;
            return ele;
        },
        fadedraw:function(time,total_time){
            var total_time=total_time||time;
            var xx_svg=this;
            if(time<=0)
            {
                window.cancelAnimFrame(xx_svg.handle);
                xx_svg.css("opacity","1");
                xx_svg.asyc=0;
                return this;
            }
            else{
                time-=1000/60;
               var opacity=(1-time/total_time)+"";
                xx_svg.css("opacity",opacity);
                xx_svg.handle=window.requestAnimFrame(function(){
                    xx_svg.fadedraw(time,total_time);
                });
            }
            return this;
        },
        animate:function(target,time){
            this.reg=1;
            var arr=[];
            if(time){
                this.total_frames=time/1000*60;
            }
            else if (typeof target==="number"){
                this.total_frames=target/1000*60;
                target=undefined;
            }
            if(!this.asyc||!this.reg||this.reg==1) {
                this.asyc = this.total_frames/60*1000;
                var target = target || (this[0].nodeType ? this[0] : null);
                if (!target && this[0][0].nodeType) {
                    var targets = this[0];
                    [].slice.call(targets).forEach(function (element) {
                        [].slice.call(element.querySelectorAll('path')).forEach(function (el, index) {
                            var length = el.getTotalLength();
                            el.style.strokeDasharray = length + ' ' + length;
                            el.style.strokeDashoffset = length;
                            arr.push(el);
                        });
                    });
                    this.draw(targets, this.current_frame, arr);
                    return this;
                }
                if (target.xx_svg_animate === 1)
                    return this;

                target.xx_svg_animate = 1;
                [].slice.call(target.querySelectorAll('path')).forEach(function (el, index) {
                    var length = el.getTotalLength();
                    el.style.strokeDasharray = length + ' ' + length;
                    el.style.strokeDashoffset = length;
                    arr.push(el);
                });
                this.draw(target, this.current_frame, arr);
            }
            else{
                var xx_svg=this;
                window.setTimeout(function(){
                    xx(xx_svg).animate(target,time);
                },xx_svg.asyc);
            }
            return this;
        },
        hover:function(){
            return this.on(),this;
        },
        draw:function(target,current_frame,svg_arr){
            if(current_frame>=this.total_frames)
            {
                this.current_frame=0;
                this.svg_arr=[];
                window.cancelAnimFrame(target.handle);
                target.xx_svg_animate=0;
                this.asyc=0;
                return this;
            }
            else{
                current_frame++;
                for(var j=0; j<svg_arr.length;j++){
                    var length=svg_arr[j].getTotalLength();
                    var len_frame = length/this.total_frames;
                    svg_arr[j].style.strokeDashoffset =length-(current_frame*len_frame);
            }
                var xx_svg=this;
                target.handle=window.requestAnimFrame(function(){
                    xx_svg.draw(target,current_frame,svg_arr);
                });
            }

        },
    };
    xx.fn.init.prototype=xx.fn;
    window.requestAnimFrame = function(){
        return (
            window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            }
        );
    }();

    window.cancelAnimFrame = function(){
        return (
            window.cancelAnimationFrame       ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame    ||
            window.oCancelAnimationFrame      ||
            window.msCancelAnimationFrame     ||
            function(id){
                window.clearTimeout(id);
            }
        );
    }();

//    var handle,current_frame = 0, total_frames = 120,xx_svg_animate= 0,svg_arr=[];


    window.xx=xx;
})(window);

//xx(document).animate();
//xx(".xx_svg_ul").eq(1).eq(1).animate();
//xx.animateAll();
//xx(".xx_svg").hover();
//xx(".xx_svg_ul").animate(2000).fadein(2000).fadeout(2000);
//xx(".xx_svg_ul").eq(0).css("opacity","0");