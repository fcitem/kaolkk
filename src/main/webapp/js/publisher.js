$(function(){
	checkVersion();
	afterrender();
//	checkUserLogin(afterrender);
});



function afterrender(){
	getPublisherByAjax();
	getPublisherHeader();
}

function getPublisherHeader(){
	$.ajax({
		url : '/klkk/user/topic/1/3',
		type : 'GET',
		contentType : "application/json",
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				addHeaderList(result.dataList);
			} else {
				openMessageWindow('fail',result.message);
			}
		},
		error : function(result, success, e) {
//			openMessageWindow('fail',"网络超时或服务器异常");
		}
	});
}

function getPublisherByAjax(page,pageNumber){
	var defaultPage = 1,defaultPageNumber = 8;
	if (page && page > 1){
		defaultPage = page;
	}
	
	if (pageNumber){
		defaultPageNumber = pageNumber;
	}
	
	$.ajax({
		url : '/klkk/user/publisher/' + defaultPage+ '/' +defaultPageNumber,
		type : 'GET',
		contentType : "application/json",
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				$("#publisherCurrentPage")[0].value = defaultPage;
				if (defaultPage == 1){
					$("#publisherPageUp")[0].setAttribute("class","pageUnavailabile");
					$("#publisherPageUpIcon")[0].setAttribute("class","pageiconUnavailable");
				} else {
					$("#publisherPageUp")[0].setAttribute("class","pageAvailabile");
					$("#publisherPageUpIcon")[0].setAttribute("class","pageiconAvailable");
				}
				var total = result.total;
				var totalPage = Math.ceil(total/defaultPageNumber);
				if (defaultPage  >= totalPage){
					$("#publisherPageNext")[0].setAttribute("class","pageUnavailabile");
					$("#publisherPageNextIcon")[0].setAttribute("class","pageiconUnavailable");
				} else {
					$("#publisherPageNext")[0].setAttribute("class","pageAvailabile");
					$("#publisherPageNextIcon")[0].setAttribute("class","pageiconAvailable");
				}
				addPublisherList(result.dataList);
			} else {
				openMessageWindow('fail',result.message);
			}
		},
		error : function(result, success, e) {
//			openMessageWindow('fail',"网络超时或服务器异常");
		}
	});
}

function addPublisherList(dataList){
	if (dataList && dataList.length > 0){
		var allRow = '';
		var divRow = '<div class="publisherListRow">';
		var rowLeft = false,rowRight = false;
		for (var i=0;i<dataList.length;i++){
			var username = dataList[i].username ? dataList[i].username :dataList[i].email;
			var picture = dataList[i].pictureName ? '<img class="publisherImage" src="../image/upload/' + dataList[i].pictureName + '" >':'';
			var publishType = dataList[i].publishType;
			var productionType = dataList[i].productionType;
			var topicRequire = dataList[i].topicRequire;
			
			if (i%2 == 0){
				rowLeft = true;
				divRow += '<div class="publisherListLeftDiv">' + 
							'<div class="publisherListPicture">' + picture + '</div>' +
							'<div class="publisherListDetail">' +
								'<div class="listname">' + username + '</div>' +
								'<div class="listiprovenance">'+publishType+'</div>' +
								'<div class="listtype">'+productionType+'</div>' +
								'<div class="listworks">代表作品：'+ dataList[i].representativeWorks +'</div>' +
//								'<div class="listrequire">选题要求：'+topicRequire+'</div>' +
							'</div>' +
						'</div>';
			} else {
				rowRight = true;
				divRow += '<div class="publisherListRightDiv">' +
							'<div class="publisherListPicture">' + picture + '</div>' +
							'<div class="publisherListDetail">' +
								'<div class="listname">' + username + '</div>' +
								'<div class="listiprovenance">'+publishType+'</div>' +
								'<div class="listtype">'+productionType+'</div>' +
								'<div class="listworks">代表作品：'+ dataList[i].representativeWorks +'</div>' +
//								'<div class="listrequire">选题要求：'+topicRequire+'</div>' +
							'</div>' +
						'</div>';
			}
			
			if (rowLeft && rowRight){
				rowLeft = false;
				rowRight = false;
				divRow += '</div>';
				allRow += divRow;
				divRow = '<div class="publisherListRow">';
			}
		}
		
		if (rowLeft && !rowRight){
			divRow += '</div>';
			allRow += divRow;
		}
		var listAllContainer = $("#listAllContainer")[0];
		if (!allRow){
			allRow = "暂无出版人"
		}
		listAllContainer.innerHTML = allRow;
	}
}

function addHeaderList(dataList){
	if (dataList && dataList.length > 0){
		var allRow = '';
		for (var i=0;i<dataList.length;i++){
			var isActive = i==0 ? "item active" : "item";
			var img = dataList[i].pictureName ? '<img class="publisherHeadIcon" src="/klkk/image/upload/' + dataList[i].pictureName +'" />': "";
			var userName = dataList[i].userName ? dataList[i].userName : dataList[i].userEmail;
			var message = dataList[i].headerMsg ? dataList[i].headerMsg : "请在后头编辑显示内容";
			var productionType = dataList[i].productionType;
			var imageType = getImageTypePicture(productionType);
			var imagePath = "";
			var css = "otherPublishType";
			if (productionType == "互联网及创业" || productionType == "人文与社科"){
				css = "publishType";
			}
			if (imageType){
				imagePath = "../img/system/" + imageType;
			}
			var divRow = '<div class="' + isActive + '">' +
	        				'<img style="top: 53px;" src="'+imagePath+'" />' +
		        			'<div class="'+css+'">&nbsp;&nbsp;'+productionType+'</div>' +
		        			'<div class="rightLine"></div>' +
		        			'<div class="rightPart">' +
		        				'<div>' +
		        					'<div class="iconContainer">' + img +'</div>' +
		        					'<div class="firstDiv">' +
		        						'<span style="font-size: 18px">' + userName + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>已发布选题</span>' +
		        					'</div>' +
		        				'</div>' +
		        				'<div class="secondDesc">' + message +
		        				'</div>' +
		        			'</div>' +
		          			'<div class="container" style="height: 151px;"></div>' +
		        		'</div>';
			allRow += divRow;
		}
		
		if (!allRow){
			allRow = "请在后台设置显示内容";
		}
		$("#publishHeader")[0].innerHTML = allRow;
	}
}

function getImageTypePicture(productType){
	var pictureName = "";
	switch (productType) {
		case "互联网及创业":
			pictureName = "internet.png"
			break;
		case "励志":
			pictureName = "motivational.png"
			break;
		case "人文与社科":
			pictureName = "renwen.png"
			break;
		case "金融":
			pictureName = "financial.png"
			break;
		case "经管":
			pictureName = "jingguan.png"
			break;
		case "传记":
			pictureName = "biography.png"
			break;
		case "其他":
			pictureName = "other.png"
			break;
		default:
			break;
	}
	return pictureName;
}

function gotoMyPublishPage(){
	
	$.ajax({
		url : '/klkk/manage/systemSet',
		type : 'GET',
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				var data = result.dataModel;
				if (data.version == "1.0"){
					setVisible("changePhoneWindow",true);
					setVisible("greyDiv",true);
				} else {
					checkUserLogin(afterCheck);
				}
			} else {
				
			}
		},
		error : function(result, success, e) {
		}
	})
//	checkUserLogin(afterCheck);
}

function afterCheck(){
	var user = globalSetting.user;
	if (user){
		window.location.href = "/klkk/app/myPublish.html";
	} else {
		openDialog('login','0');
	}
}

function nextOrPrePublisher(e,isNext){
	if (!e){
		return;
	}
	var classValue = e.getAttribute("class");
	if (classValue  == "pageUnavailabile" || classValue == "pageiconUnavailable"){
		return;
	}
	var currentPage = parseInt($("#publisherCurrentPage")[0].value);
	if (isNext){
		currentPage = currentPage+1;
	} else {
		currentPage = currentPage-1;
	}
	if (currentPage < 1){
		currentPage = 1;
	}
	getPublisherByAjax(currentPage,8);
}