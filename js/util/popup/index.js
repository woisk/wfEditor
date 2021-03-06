define("util/popup/index",["wf","css!util/popup/index.css"],function(_require,exports,module){
    var $ = require("wf");

    var popup = function(opt){
        var o = $.extend({
            beforeOpen:function(){},
            afterOpen:function(){},
            beforeClose:function(){},
            width : 680,
            autoOpen: true,
            close : true,       //显示关闭按钮
            removeOnClose : true,   //关闭时移除DOM
            blurToClose : false  //是否支持点击半透明层关闭弹框
        },opt);

        var root = $('html'),
            holder = $('<div class="popup" style="display:none;"></div>'),
            close = $('<a href="javascript:void(0);" class="fa fa-remove popup-close"></a>'),
            inner = $('<div class="popup-inner"></div>').css({
                width: o.width
            }),
            roc = o.removeOnClose;

        //点击半透明层关闭
        if( o.blurToClose ){
            holder.on('click',function(e){
                e.target === this && holder.close();
            });
        }
        holder.on('click','.popup-close',function(){
            holder.close();
        });

        //添加当前DOM到holder
        inner.html(opt.html);
        inner.append( close );
        holder.append(inner);
        $(document.body).append( holder );

        holder.open = function(){
            var t = this;
            if( o.beforeOpen.call(t) !== false ){
                root.addClass('popup-overflow');
                $('.popup').not(t).hide();
                t.show();
                o.afterOpen.call(t);
            }
        };

        holder.close = function(handle){
            var t = this;
            if( o.beforeClose.call(t,handle) !== false ){
                roc ? t.remove() : t.hide();
                root.removeClass('popup-overflow');
            }
        };

        //自动打开
        if( o.autoOpen ){
            holder.open();
        }

        return holder;
    };

    // confirm|alert 相关 全局操作
    $(document).on('keyup',function(e){
        if( e.keyCode == 27 ){
            $( '.popup .popup-close' ).trigger('click');  
        }
    });

    var model = function(info, title, callback, conf){
        callback = callback || new Function();
        conf = conf || {};
        var html = '<div class="ui-confirm clearfix">'
                +'<h1 class="ui-confirm-title">'+(title||'温馨提示')+'</h1>'
                +'<div class="ui-confirm-info">'+info+'</div>'
                +'<p class="clearfix">'
                +( conf.alert ? '' : '<a href="javascript:void(0);" class="ui-confirm-cancel popup-close btn btn-default">取 消</a>' )
                +'<a href="javascript:void(0);" class="ui-confirm-submit btn btn-primary">确 定</a>'
                +'</p>'
            +'</div>';
        var d = popup($.extend({
                close : false,
                width: 300,
                html : html,
                beforeClose : function(handle){
                    var rt = callback.call( d, $(handle).hasClass('ui-confirm-submit') );
                    return handle ? rt : undefined;
                }
            },conf));

        d.on('click','.ui-confirm-submit',function(e){
            d.close( this );            
        });
        return d;
    };

    popup.dialog = function(info, title, cbk){
        return model(info,title,cbk,{
            autoOpen:false,
            removeOnClose:false,
            width: 500
        });
    };
    popup.confirm = model;
    popup.alert = function(info, title, cbk){
        return model(info,title,cbk,{alert:true});
    };

    return popup;
});