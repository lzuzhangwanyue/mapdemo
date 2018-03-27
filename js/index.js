$(document).ready(function(){
	var _h = $(".center").height();
	$("#ztree").css("max-height",(_h-10)+"px");
	$("#showpanel,#prettyprint").css("height",(_h-50)+"px");
	$("#prettyprint").css("max-height",(_h-50)+"px").css("overflow","auto");
    var setting = {
        callback: {
            onClick: function(event, treeId, treeNode, clickFlag){
                if(treeNode.src){
                    var src = treeNode.src;
                    $("#showpanel").attr("src",src);
                    $("#effecthref").attr("href",src).html(src);
                    if(!treeNode||!treeNode.senior){
                    	loadCode(src);
                    }
                    else{
                    	loadCode("serior.html");
                    }
                }
            }
        }
    };
    $.fn.zTree.init($("#ztree"), setting, treeData);
});

function loadCode(href){
    href +="?="+new Date().getTime();
    $.get(href,function(html){
        html = html.replace(/</g,"&lt;");
        html = html.replace(/>/g,"&gt;");
        html = html.replace(/\"/g,"&quot;");
        $("#prettyprint").empty();
        $("#prettyprint").html(html);
        prettyPrint();
    });
}