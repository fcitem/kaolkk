$(function(){
	checkVersion();
//	checkUserLogin();
	getIndexFocus();
	getUnpublish();
	getPublish();
});



function getIndexFocus(){
	$.ajax({
		url : '/klkk/production/mainPage/focus',
		type : 'GET',
		contentType : "application/json",
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				addIndexProductToIndexPage(result.dataList);
			} else {
//				openMessageWindow('fail',result.message);
			}
		},
		error : function(result, success, e) {
//			openMessageWindow('fail',"网络超时或服务器异常");
		}
	});
}

function getUnpublish(){
	$.ajax({
		url : '/klkk/production/mainPage/unpublished',
		type : 'GET',
		contentType : "application/json",
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				addUnpublishToIndexPage(result.dataList);
			} else {
//				openMessageWindow('fail',result.message);
			}
		},
		error : function(result, success, e) {
//			openMessageWindow('fail',"网络超时或服务器异常");
		}
	});
}

function addIndexProductToIndexPage(dataList){
	if (dataList && dataList.length > 0){
		var allRow = "";
		for (var i=0;i<dataList.length;i++){
			var isActive = i==0 ? "item active" : "item";
			var picturePath = dataList[i].pictureName ? 'image/upload/' + dataList[i].pictureName : "";
			var title = dataList[i].focusTitle;
			var desc =  dataList[i].focusDesc;
			var url = "app/publishList.html";
			var isNewTab = false;
			if (dataList[i].url){
				if (dataList[i].url.indexOf("http:") == -1 && dataList[i].url.indexOf("https:") == -1){
					url = "http://"+ dataList[i].url;
				} else {
					url = dataList[i].url;
				}
				isNewTab = true;
			}
			var divRow = '<div class="' + isActive + '" style="cursor: pointer;" onclick="gotoBuyPage(\''+url+'\',' + isNewTab + ')">' +
	        				'<img style="width:172px;height:243px;" src="' + picturePath + '" />' +
			          		'<div class="container">' +
			            		'<div class="carousel-caption">' +
			              			'<h3>' + title + '</h3>' +
			              			'<p>' + desc + '</p>' +
			            		'</div>' +
			          		'</div>' +
			        	'</div>';
			allRow += divRow;
			
		}
		if (allRow){
			$("#indexFocus")[0].innerHTML = allRow;
		} else {
//			$("#indexFocus")[0].innerHTML = "请在后头设置显示信息";
		}
		
	}
}

function addUnpublishToIndexPage(dataList){
	if (dataList && dataList.length > 0){
		var allRow = '<div class="indexUnpublishTitle">他们在这里寻求出版</div>';
//		var divRow = "";
		for (var i=0;i<dataList.length;i++){
			if (i == 2){
				break;
			}
			var picturePath = dataList[i].pictureName ? 'image/upload/' + dataList[i].pictureName : "";
			var name = dataList[i].name;
			var introductionAuthor =  dataList[i].introductionAuthor;
			var editorRecommend = dataList[i].editorRecommend;
			var url = "app/publishList.html";
			var divRow = '<div class="col-xs-6" style="cursor: pointer;" onclick="gotoBuyPage(\''+url+'\',false)" >' +
							'<img src="' + picturePath+ '"  />' +
//							'<a href="app/publishList.html"><img src="' + picturePath+ '"  /></a>' +
							'<span>' +
								'<span class="title">' + name + '</span>' +
								'<p>' +
								'<span>' +
									'编辑推荐：' +
								'</span><br />' +
								'<label class="indexUnpublishDesc">'+editorRecommend + '</label><br />' +
								'</p>' +
								'<p>' +
									'<span>' +
										'作者简介：' +
									'</span><br /><label class="indexUnpublishDesc">' +introductionAuthor +
									'</label></p>' +
							'</span>' +
						'</div>';
			allRow += divRow;
			
		}
		var pageDiv = '<div>' +
						'<a href="app/publishList.html" class="indexToPublishList">查看更多 <img src="img/system/more.png"/></a>' +
					'</div>';
		allRow += pageDiv;
		if (allRow){
			$("#indexPageUnpublish")[0].innerHTML = allRow;
		}
		
	}
}

function getPublish(){
	$.ajax({
		url : '/klkk/production/mainPage/published',
		type : 'GET',
		contentType : "application/json",
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				addPublishToIndexPage(result.dataList);
			} else {
//				openMessageWindow('fail',result.message);
			}
		},
		error : function(result, success, e) {
//			openMessageWindow('fail',"网络超时或服务器异常");
		}
	});
}

function addPublishToIndexPage(dataList){
	if (dataList && dataList.length > 0){
		var alldl = "";
		for (var i=0;i<dataList.length;i++){
			var picturePath = dataList[i].pictureName ? 'image/upload/' + dataList[i].pictureName : "";
			var name = dataList[i].name;
			var url = "#";
			if (dataList[i].url){
				if (dataList[i].url.indexOf("http:") == -1 && dataList[i].url.indexOf("https:") == -1){
					url = "http://"+ dataList[i].url;
				} else {
					url = dataList[i].url;
				}
			}
//			var url = dataList[i].url ? dataList[i].url : "#";
			
			var hasPublishDesc = dataList[i].hasPublishDesc;
			var dl = '<dl style="width: 187.2px;">' +  
		        		'<dt>' +
							'<a href="' + url +'" target="_blank">' +
								'<img onmouseover="showDetail(this)" onmouseout="hideDetail(this)" src="' + picturePath + '"/>' +
								'<div class="publishMouse" id="ownid' + i + '" display="false" onmouseover="showDiv(this,true)" onmouseout="showDiv(this,false)"><label class="publishMouseLabel">'+hasPublishDesc+'</label></div>' +
								'</a></dt>' +
		        		'<dd>' + name + '</dd>' +  
		        	'</dl>';
			alldl += dl;
		}
		if (alldl){
			$("#content_list")[0].innerHTML = alldl;
		}
	}
}

var timeId;
function showDetail(e){
//	clearTimeout(timeId); 
	var displayDiv = e.nextElementSibling;
	if (displayDiv){
		displayDiv.style.display = "block";
	}
}

function hideDetail(e){
	var displayDiv = e.nextElementSibling;
	if (displayDiv){
		var id = displayDiv.id;
		timeId = setTimeout("hidede('" + id + "')",100);
	}
}

function hidede(id){
	var displayDiv =$("#" + id)[0];
	if (displayDiv){
		var isShow = displayDiv.getAttribute("display");
		if (isShow == "false"){
			displayDiv.style.display = "none";
		}
	}
}

function showDiv(e,isVisible){
	var img = e.previousElementSibling;
	if (isVisible){
		e.setAttribute("display","true");
	} else {
		e.style.display = "none";
		e.setAttribute("display","false");
	}
}

function gotoBuyPage(url,isNewTab){
	if(isNewTab){
		window.open (url);
	} else {
		window.location.href = url;
	}
}
