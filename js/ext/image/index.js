define("ext/image/index",["wf","util/popup/index"],function(_require,exports,module){
    var src = require.toUrl("ext/image/index") + ".html"; 

    var $ = require("wf"),
        Popup = require("util/popup/index");

    var uploader = null,
        // html = '',
        html = '<iframe src="'+src+'" frameborder="0" style="width:100%; height:300px;" id="iframe-image" name="iframe-image"></iframe>'
        dialog = Popup.dialog(html, "图片上传", function(r){
            if(r){  //点击确定按钮
                var imgUrl;
                if( ( imgUrl = imgInput.val() ) ){
                    //TODO
                }
            }
        });

    return {
        group: "other",
        title: "插入图片",
        role: "image",
        behavir: function(){
            dialog.open();
        }
    };
});