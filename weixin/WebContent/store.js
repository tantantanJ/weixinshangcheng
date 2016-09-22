
$(function(){
	var inID = GetQueryString("id"); 
	if(inID==null) { //参数错误未处理
		alert("未接收到ID号");
		return;
	};   
	$("#storeSM").html("输入ID= "+inID);
    $.ajax({
        url : 'getQueryResult.do',
        type : 'POST',
        data: 'infoType=门店信息&engine=static&id='+inID,
        async: false,
        dataType : 'json',
        success : function( data ) {
			if (ajaxJsonErrorHandler(data)) {
				returnData = data.rows;
				htmlStr="";
				htmlStr=htmlStr+"<li class='logo'>";
				htmlStr=htmlStr+"<img src=upload/logo/"+(returnData[0].LogoURL)+"></li>";
				htmlStr=htmlStr+"<li><p>"+(returnData[0].MingCheng)+"</p>";
				htmlStr=htmlStr+"<p>"+(returnData[0].DiZhi)+"</p>";
				htmlStr=htmlStr+"</li>";
				$("#storeXX").html(htmlStr);
				$("#storeSM").html(returnData[0].JianJie);
				$("title").html(returnData[0].MingCheng); 
			} else {
			}
            },
    });
	
    $.ajax({
        url : 'getQueryResult.do',
        type : 'POST',
        data: 'infoType=门店活动&engine=static&id='+inID,
        async: false,
        dataType : 'json',
        success : function( data ) {
			if (ajaxJsonErrorHandler(data)) {
				returnData = data.rows;
				htmlStr="";
				for (var i = 0; i <returnData.length ; i++) {
					htmlStr=htmlStr+"<div class='swiper-slide'>"+"<a href=huodong.html?id=";
					htmlStr=htmlStr+(returnData[i].ID)+">";
					htmlStr=htmlStr+"<img src=upload/huodong/";
					htmlStr=htmlStr+(returnData[i].ImgURL)+">";
					htmlStr=htmlStr+"<div class='active'>";
					htmlStr=htmlStr+"<h3 class=''>"+(returnData[i].MingCheng)+"</h3>";
					htmlStr=htmlStr+"<p >"+(returnData[i].ShuoMing)+"</p>";
					htmlStr=htmlStr+"</div></a></div>";
					};
				$("#storeHD").html(htmlStr);	
			} else {
			}
       },
    });
    
    $.ajax({
        url : 'getQueryResult.do',
        type : 'POST',
        data: 'infoType=门店商品&engine=static&id='+inID,
        async: false,
        dataType : 'json',
        success : function( data ) {
			if (ajaxJsonErrorHandler(data)) {
				returnData = data.rows;
				htmlStr="";
				for (var i = 0; i <returnData.length ; i++) {
					htmlStr=htmlStr+"<li><a href=product.html?id=";
					htmlStr=htmlStr+(returnData[i].ID);
					htmlStr=htmlStr+"><p class='productimg'><img src=upload/img/";
					htmlStr=htmlStr+(returnData[i].ImgURL);
					htmlStr=htmlStr+"></p><p class='productname'>";
					htmlStr=htmlStr+(returnData[i].MingCheng);
					htmlStr=htmlStr+"</p><p class='productprice'>&yen;<b>";
					htmlStr=htmlStr+(returnData[i].JiaGe)+"</b>/"+(returnData[i].DanWei);
					htmlStr=htmlStr+"</p></a></li>";
				};
				$("#productView").html(htmlStr);	
			} else {
			}

        	
            },
    });
    
});

