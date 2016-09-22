
/*
 * 完成ajax文本格式返回数据的异常处理，如果正常返回数据，则去除状态信息后，以数组形式返回数据内容。
 * 前提：	ajax返回数据只能使用本系统约定的text数据格式。
 * 输入:		参数1, String : ajax调用的返回数据
 * 出口：	返回调用点，继续执行后续语句
 * 返回：	正常：返回字符数组，为ajax调用的返回数据内容
 * 			异常：ajax调用错误时，进行错误内容提示，再返回false。
 * 其他:		本函数合并了原来的ajaxTextErrorHandler以及delAjaxTextStatus这两个函数的功能。
 * 			因此相应原来调用该两个函数的地方均需进行修改。
 * 改进：	暂无
 * 
 * @author Harry
 * @version 1.0 2014-1-27
 * 
 * 调用者：	1）函数：processAndFillData, mainTemplate包中的changePassword，resetPassword。
 * 			2）页面：marketing-event页面初始化部分，费用类别的读取，调用了本函数
 */
function ajaxTextProcessing(strData) {
	var data = $.trim(strData).split('~');
	
	if (data[0]=='ERROR') {
		if (data.length>1 && data[1]!='' ) {
			var errMsg = data[1].replace(/%/g,'<br/>');
			showupMessageInDialog(errMsg, '后台信息-请注意','wrong');			
		} else {
			showupMessageInDialog('访问数据库时发生错误，请联系系统管理员！', '请求助','wrong');			
		}
		return false;
	};
	if (data[0] == 'NOTALLOWED') {
		showupMessageInDialog('<br>无权限操作此功能！', '请知晓','wrong');
		return false;
	}
	if (data[0] != 'OK') {
		showupMessageInDialog('数据操作出现异常信息，请通知系统管理员处理！' + strData , '请通知','wrong');
		return false;
	}
	if (data[1]== 'FALSE') {
		return null;
	} else {
		if (data[2] == 'null') {
			return null;
		}
	}
	data.splice(0,2);
	return data;
};

/*
 * ajax调用时json数据的统一异常处理程序。
 * 本函数不同于ajaxTextProcessing，没有对数据本身进行状态字段的去除，
 * 仅提供了一个统一的返回错误处理方式。
 * 前提：	无；
 * 输入:		1）参数1：jsonString, 查询的返回结果。
 * 出口：	1）调用本函数的页面
 * 返回：	无
 * 其他:		无
 * 改进：	
 * 
 * @author Harry
 * @version 1.0 
 * 
 * 调用者：	1）使用json格式的ajax交互完成后都可引用该函数。
 * 					
 */
function ajaxJsonErrorHandler(jsonData) {
	if (jsonData.status=='ERROR') {
		if (typeof(jsonData.message)!='undefined' || jsonData.message != '' ) {
			showupMessageInDialog(jsonData.message, '请注意','wrong');			
		} else {
			showupMessageInDialog('访问数据库时发生错误，请联系系统管理员！', '请求助或重试','wrong');			
		}
		return false;
	};
	if (jsonData.status=='NODATA') {
		showupMessageInDialog('数据传输发生错误，请联系系统管理员！', '请求助','wrong');
		return false;
	};
	if (jsonData.status=='NOPK') {
		showupMessageInDialog('更新时发生严重错误，请联系系统管理员！', '请通知','wrong');
		return false;
	};
	if (jsonData.status !='OK') {
		showupMessageInDialog('返回状态：' + jsonData.status + 
				'<br><br>返回的数据格式错误，请联系系统管理员！', '请求助','wrong');
		return false;		
	}
	if (jsonData.hasData == 'FALSE') {
		return null;
	} else {
		return true;		
	}
};


function GetQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return (r[2]); return null; 
} 


