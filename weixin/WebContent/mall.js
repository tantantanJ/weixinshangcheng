$(function(){

	
    $.ajax({
        url : 'getQueryResult.do',
        type : 'POST',
        data: 'infoType=商品显示&engine=static',
        async: false,
        dataType : 'json',
        success : function( data ) {
			if (ajaxJsonErrorHandler(data)) {
				returnData = data.rows;
				htmlStr="";
				htmlStr="<ul class='list'>";
					for (var i = 0; i <returnData.length ; i++) {
						htmlStr=htmlStr+"<li><a href=product.html?id="+(returnData[i].ID)+">";
						htmlStr=htmlStr+"<p class='productimg'><img src=upload/img/"+(returnData[i].ImgURL)+"></p>";
						htmlStr=htmlStr+"<p class='productname'>"+(returnData[i].MingCheng)+"</p>";
						htmlStr=htmlStr+"></p><p class='storename'>";
						htmlStr=htmlStr+"<p class='productprice'>&yen;<b>"+(returnData[i].JiaGe)+"</b>/"+(returnData[i].DanWei);
						htmlStr=htmlStr+"</p></a></li>";
						htmlStr=htmlStr+"</ul></div>";
						if ( (i+1) % 2 == 0){
						htmlStr="<ul class='list'>";
						}
						
					};
				$("#storeView").html(htmlStr);	
			} else {
			}
			var swiper = new Swiper('.swiper-container-b', {
			    pagination: '.swiper-pagination-b',
			    paginationClickable: true
			}); 
        	
            },
    });
    
   
    
    
    $.ajax({
        url : 'getQueryResult.do',
        type : 'POST',
        data: 'infoType=商品显示&engine=static',
        async: false,
        dataType : 'json',
        success : function( data ) {
			if (ajaxJsonErrorHandler(data)) {
				returnData = data.rows;
				htmlStr="";
				for (var i = 0; i <returnData.length ; i++) {
					htmlStr=htmlStr+"<li><a href=product.html?id="+(returnData[i].ID)+">";
					htmlStr=htmlStr+"<p class='productimg'><img src=upload/img/"+(returnData[i].ImgURL)+"></p>";
					htmlStr=htmlStr+"<p class='productname'>"+(returnData[i].MingCheng)+"</p>";
					htmlStr=htmlStr+"<p class='productprice'>&yen;<b>"+(returnData[i].JiaGe)+"</b>/"+(returnData[i].DanWei);
					htmlStr=htmlStr+"</p></a></li>";
				};
				$("#productView").html(htmlStr);	
			} else {
			}

        	
            },
    });

    
    $.ajax({
        url : 'getQueryResult.do',
        type : 'POST',
        data: 'infoType=所有活动&engine=static',
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
				$("#huoDong").html(htmlStr);	
			} else {
			}
       },
    });
    
});

