$(function(){
//	checkVersion();
	afterrender();
//	checkUserLogin(afterrender);
});

function afterrender(){
	getOfficialAccountHeader();
	getOfficialAccountList();
}

function getOfficialAccountHeader(){
	$.ajax({
		url : '/klkk/officialAccount/headerFocus?page=1&limit=3',
		type : 'GET',
		dataType : "json",
		success : function(result, success, e) {
			if (result){
				if (result.status){
					addOfficialAccountHeader(result.dataList);
				} else {
					openMessageWindow('fail',result.message);
				}
			}
		},
		error : function(result, success, e) {
//			openMessageWindow('fail',"网络超时或服务器异常");
		}
	});
}

function addOfficialAccountHeader(dataList){
	if (dataList && dataList.length > 0){
		var img = dataList[0].image.name ? '/klkk/image/upload/' + dataList[0].image.name : "";
		var title = dataList[0].title ? dataList[0].title : "";
		var titleDesc = dataList[0].titleDesc ? dataList[0].titleDesc : "";
		
		$("#headerImge")[0].src = img;
		$("#headerTitle")[0].innerText = title;
		$("#headerTitleDesc")[0].innerText = titleDesc;
	}
}

function getOfficialAccountList(page,pageNumber){
	var defaultPage = 1,defaultPageNumber = 10;
	if (page && page > 1){
		defaultPage = page;
	}
	
	if (pageNumber){
		defaultPageNumber = pageNumber;
	}
	
	$.ajax({
		url : '/klkk/officialAccount/allOfficialAccount?page=' + defaultPage + '&limit=' + defaultPageNumber,
		type : 'GET',
//		contentType : "application/json",
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				$("#currentPage")[0].value = defaultPage;
				if (defaultPage == 1){
					$("#pageUp")[0].setAttribute("class","pageUnavailabile");
					$("#pageUpIcon")[0].setAttribute("class","pageiconUnavailable");
				} else {
					$("#pageUp")[0].setAttribute("class","pageAvailabile");
					$("#pageUpIcon")[0].setAttribute("class","pageiconAvailable");
				}
				var total = result.total;
				var totalPage = Math.ceil(total/defaultPageNumber);
				if (defaultPage  >= totalPage){
					$("#pageNext")[0].setAttribute("class","pageUnavailabile");
					$("#pageNextIcon")[0].setAttribute("class","pageiconUnavailable");
				} else {
					$("#pageNext")[0].setAttribute("class","pageAvailabile");
					$("#pageNextIcon")[0].setAttribute("class","pageiconAvailable");
				}
				addOfficialAccountList(result.dataList);
			} else {
				openMessageWindow('fail',result.message);
			}
		},
		error : function(result, success, e) {
//			openMessageWindow('fail',"网络超时或服务器异常");
		}
	});
}

function addOfficialAccountList(dataList){
	if (dataList && dataList.length > 0){
		var allRow = '';
		var rowLeft = false,rowRight = false;
		for (var i=0;i<dataList.length;i++){
			var title = dataList[i].title ? dataList[i].title :"";
			var picture = dataList[i].image.name ? '<img style="width: 80px;height: 80px" src="../image/upload/' + dataList[i].image.name + '" >':'';
			var titleDesc = dataList[i].titleDesc;
			var url = "#";
			if (dataList[i].url){
				if (dataList[i].url.indexOf("http:") == -1 && dataList[i].url.indexOf("https:") == -1){
					url = "http://"+ dataList[i].url;
				} else {
					url = dataList[i].url;
				}
			}
			
			var divRow = '<div class="officeAccountRow">' +
							'<a target="_blank" href="' + url + '">' +
								'<div class="officeAccountRowImg">' +
									picture +
								'</div>' +
								'<div class="officeAccountRowDesc">' +
									'<span class="officeAccountRowTitle">' + title + '</span>' +
									'<br/>' +
									'<span class="officeAccountRowdesc2">' + titleDesc + '</span>' +
								'</div>' +
							'</a>' +
						'</div>';
			
			allRow += divRow;
		}
		

		var listAllContainer = $("#listAllContainer")[0];
		listAllContainer.innerHTML = allRow;
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
	var currentPage = parseInt($("#currentPage")[0].value);
	if (isNext){
		currentPage = currentPage+1;
	} else {
		currentPage = currentPage-1;
	}
	if (currentPage < 1){
		currentPage = 1;
	}
	getOfficialAccountList(currentPage,10);
}


