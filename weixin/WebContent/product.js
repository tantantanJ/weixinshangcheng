
$(function(){
	var inID = GetQueryString("id"); 
	if(inID==null) { //参数错误未处理
		alert("未接收到ID号");
		return;
	};   
	var inHuoDong = GetQueryString("huodong"); 

    $.ajax({
        url : 'getQueryResult.do',
        type : 'POST',
        data: 'infoType=商品信息&engine=static&id='+inID,
        async: false,
        dataType : 'json',
        success : function( data ) {
			if (ajaxJsonErrorHandler(data)) {
				returnData = data.rows;
				htmlStr="";
				htmlStr=htmlStr+"<li>";
				htmlStr=htmlStr+"<img src=upload/img/"+(returnData[0].ImgURL)+">";
				htmlStr=htmlStr+"<div class=''>";
				htmlStr=htmlStr+"<h3 class='productname'>"+(returnData[0].MingCheng)+"</h3>";
				if (inHuoDong=='true'){
					htmlStr=htmlStr+"<p class='productprice'><b>&yen;"+(returnData[0].HuoDongJia)+"/"+(returnData[0].DanWei)+"</b></p>";
					htmlStr=htmlStr+"<p class='oldprice'><b>&yen;"+(returnData[0].YuanJia)+"/"+(returnData[0].DanWei)+"</b></p>";
				}else{
					htmlStr=htmlStr+"<p class='productprice'><b>&yen;"+(returnData[0].JiaGe)+"/"+(returnData[0].DanWei)+"</b></p>";
					if((returnData[0].TeJia)){
						htmlStr=htmlStr+"<p class='oldprice'><b>&yen;"+(returnData[0].YuanJia)+"/"+(returnData[0].DanWei)+"</b></p>";
					};
				};
				htmlStr=htmlStr+"</div></li>";
				$("#productXX").html(htmlStr);
				$("#productSM").html(returnData[0].ShuoMing);
				if(returnData[0].TuPianURL!=null && returnData[0].TuPianURL!=""){
					var tpdata = $.trim(returnData[0].TuPianURL).split(',');
					tphtmlStr="";
					for (var j = 0; j <tpdata.length ; j++) {
						tphtmlStr=tphtmlStr+"<li><img src=upload/img/"+tpdata[j]+"></li>";
					};
					$("#productTP").html(tphtmlStr);

				}
				$("title").html(returnData[0].MingCheng);
			} else {
			}
            },
    });
	
    
});

