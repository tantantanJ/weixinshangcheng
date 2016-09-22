
$(function(){
	var inID = GetQueryString("id"); 
	if(inID==null) { //参数错误未处理
		alert("未接收到ID号");
		return;
	};   

    $.ajax({
        url : 'getQueryResult.do',
        type : 'POST',
        data: 'infoType=活动信息&engine=static&id='+inID,
        async: false,
        dataType : 'json',
        success : function( data ) {
			if (ajaxJsonErrorHandler(data)) {
				returnData = data.rows;
				htmlStr="";
				htmlStr=htmlStr+"<li>";
				htmlStr=htmlStr+"<img src=upload/huodong/"+(returnData[0].ImgURL)+">";
				htmlStr=htmlStr+"<div class=''>";
				htmlStr=htmlStr+"<h3 class=''>"+(returnData[0].StoreMingCheng)+" - "+(returnData[0].MingCheng)+"</h3>";
				htmlStr=htmlStr+"</div></li>";
				$("#huodongXX").html(htmlStr);
				$("#huodongSM").html(returnData[0].ShuoMing);
				if(returnData[0].Preducts!=null && returnData[0].Preducts!=""){
					fillHuoDongShangPing(returnData[0].Preducts);
					}
				$("title").html(returnData[0].MingCheng);
			} else {
			}
            },
    });
	
    
});

function fillHuoDongShangPing(Preducts) { 
    $.ajax({
        url : 'getQueryResult.do',
        type : 'POST',
        data: 'infoType=活动商品&engine=static&Preducts='+Preducts,
        async: false,
        dataType : 'json',
        success : function( data ) {
			if (ajaxJsonErrorHandler(data)) {
				returnData = data.rows;
				htmlStr="";
				for (var i = 0; i <returnData.length ; i++) {
					htmlStr=htmlStr+"<li><a href=product.html?id="+(returnData[i].ID)+"&huodong=true>";
					htmlStr=htmlStr+"<p class='productimg'><img src=upload/img/"+(returnData[i].ImgURL)+"></p>";
					htmlStr=htmlStr+"<p class='productname'>"+(returnData[i].MingCheng)+"</p>";
					htmlStr=htmlStr+"<p class='productprice'>&yen;<b>"+(returnData[i].HuoDongJia)+"</b>/"+(returnData[i].DanWei);
					htmlStr=htmlStr+"<p class='oldprice'><b>&yen;"+(returnData[0].YuanJia)+"/"+(returnData[0].DanWei)+"</b></p>";
					htmlStr=htmlStr+"</p></a></li>";
				};
				$("#productView").html(htmlStr);	
			} else {
			}

        	
            },
    });


} 