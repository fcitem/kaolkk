$(function(){
//	checkUserLogin(afterrenderPublishList);
	checkVersion();
	afterrenderPublishList();
});

function afterrenderPublishList(){
	var search = window.location.search;
	if (search){
		changeListPage(true);
//		getPublishAll();
	} else {
		changeListPage(false);
//		getUnpublishAll();
	}
}

function changeListPage(isPublish){
	setVisible("hasPublishListContainer", isPublish);
	setVisible("unPublishListContainer", !isPublish);
	if (isPublish){
		getPublishAll();
	} else {
		getUnpublishAll();
	}
}

function getUnpublishAll(page,pageNumber){
	var defaultPage = 1,defaultPageNumber = 8;
	if (page && page > 1){
		defaultPage = page;
	}
	
	if (pageNumber){
		defaultPageNumber = pageNumber;
	}
	
	$.ajax({
		url : '/klkk/production/allUnpublished/' + defaultPage+ '/' +defaultPageNumber,
		type : 'GET',
		contentType : "application/json",
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				$("#unpublishCurrentPage")[0].value = defaultPage;
				if (defaultPage == 1){
					$("#unpublishPageUp")[0].setAttribute("class","pageUnavailabile");
					$("#unpublishPageUpIcon")[0].setAttribute("class","pageiconUnavailable");
				} else {
					$("#unpublishPageUp")[0].setAttribute("class","pageAvailabile");
					$("#unpublishPageUpIcon")[0].setAttribute("class","pageiconAvailable");
				}
				var total = result.total;
				var totalPage = Math.ceil(total/defaultPageNumber);
				if (defaultPage  >= totalPage){
					$("#unpublishPageNext")[0].setAttribute("class","pageUnavailabile");
					$("#unpublishPageNextIcon")[0].setAttribute("class","pageiconUnavailable");
				} else {
					$("#unpublishPageNext")[0].setAttribute("class","pageAvailabile");
					$("#unpublishPageNextIcon")[0].setAttribute("class","pageiconAvailable");
				}
				addUnpublishToPublishListPage(result.dataList);
			} else {
				openMessageWindow('fail',result.message);
			}
		},
		error : function(result, success, e) {
//			openMessageWindow('fail',"网络超时或服务器异常");
		}
	});
}

function addUnpublishToPublishListPage(dataList){
	if (dataList && dataList.length > 0){
		var allRow = "";
		for (var i=0;i<dataList.length;i++){
//		for (var i=0;i<1;i++){
			var id = dataList[i].id;
			var name = dataList[i].name;
			var picturePath = dataList[i].pictureName ? '/klkk/image/upload/' + dataList[i].pictureName : "";
			var type = dataList[i].productionType;
			var introductionAuthor = dataList[i].introductionAuthor ? dataList[i].introductionAuthor : "暂无作者介绍";
			var hasPublishDesc = dataList[i].hasPublishDesc;
			var editorRecommend = dataList[i].editorRecommend;
			var userName = dataList[i].username;
			if (!userName){
				userName = dataList[i].email;
			}
			
			var row = '<div class="unpublishRow" onmouseover="changeBackground(this,true)" onmouseout="changeBackground(this,false)" onclick="openDetail(\'' + id +'\')">' +
						'<div class="unpublisherListPictureDiv">' +
							'<img class="unpublisherListPicture" alt="" src="' + picturePath + '">' +
							'<div class="unpublisherListPictureDivBorder"></div>' +
							'<div class="unpublishDetatil">查看详情</div>' +
						'</div>' +
						'<div class="unpublishListDetail">' +
							'<div class="unpublisListname">' + name + '</div>' +
							'<div class="unpublishListiprovenance">'+userName+'</div>' +
							'<div class="unpublishType">' +
					 			'<span>|<span style="margin: 0 5px;">' + type +'</span>|</span>' +
							'</div>' +
							'<div class="unpublishListworks">'+hasPublishDesc+'</div>' +
						'</div>' +
						'<div class="unpublishThirdColume">' +
							'<div class="unpublishIntroductionAuthor">作者介绍:</div>' +
							'<div class="unpublishAuthorDetail">' +
								'<div>' + introductionAuthor + '</div>' +
							'</div>' +
							'<div class="unpublishIntroductionAuthor">编辑推荐:</div>' +
							'<div class="unpublishAuthorDetail">' +
								'<div>'+editorRecommend+'</div>' +
							'</div>' +
						'</div>' +
					'</div>';
			
//			var row = '<div class="unpublishRow" onmouseover="changeBackground(this,true)" onmouseout="changeBackground(this,false)" onclick="openDetail(\''+id+'\')">' +
//						'<div class="unpublisherListPictureDiv">' +
//						'<img class="unpublisherListPicture" alt="" src="' + picturePath + '">' +
//						'<div class="unpublisherListPictureDivBorder"></div>' +
//						'<div class="unpublishDetatil">查看详情</div>' +
//					'</div>' +
//					'<div class="unpublishListDetail">' +
//						'<div class="unpublisListname">' + name + ' </div>' +
//						'<div class="unpublishListiprovenance">' + userName + '</div>' +
//						'<div class="unpublishType">' +
//							'<span>|<span style="margin: 0 5px;">' + type +'</span>|</span>' +
//						'</div>' +
//						'<div class="unpublishListworks">'+hasPublishDesc+'</div>' +
//					'</div>' +
//					'<div class="unpublishThirdColume">' +
//						'<div class="unpublishIntroductionAuthor">作者介绍:</div>' +
//						'<div class="unpublishAuthorDetail">' +
//							'<div>张小军：XXXXXXXXXXXXXXXXXXXX</div>' +
//							'<div>张小军：XXXXXXXXXXXXXXXXXXX</div>' +
//						'</div>' +
//						'<div class="unpublishIntroductionAuthor">编辑推荐:</div>' +
//						'<div class="unpublishAuthorDetail">' +
//							'<div>张小军：XXXXXXXXXXXXXXXXXXXX</div>' +
//							'<div>张小军：XXXXXXXXXXXXXXXXXXX</div>' +
//						'</div>' +
//					'</div>' +
//				'</div>';
			
			
			allRow += row;
		}
		
		if (allRow){
			$("#unpublishAll")[0].innerHTML = allRow;
		}
	}
}

function nextOrPreUnpublishList(e,isNext){
	if (!e){
		return;
	}
	var classValue = e.getAttribute("class");
	if (classValue  == "pageUnavailabile" || classValue == "pageiconUnavailable"){
		return;
	}
	var currentPage = parseInt($("#unpublishCurrentPage")[0].value);
	if (isNext){
		currentPage = currentPage+1;
	} else {
		currentPage = currentPage-1;
	}
	if (currentPage < 1){
		currentPage = 1;
	}
	getUnpublishAll(currentPage,8);
}

function getPublishAll(page,pageNumber){
	var defaultPage = 1,defaultPageNumber = 8;
	if (page && page > 1){
		defaultPage = page;
	}
	
	if (pageNumber){
		defaultPageNumber = pageNumber;
	}
	
	$.ajax({
		url : '/klkk/production/allPublished/' + defaultPage+ '/' +defaultPageNumber,
		type : 'GET',
		contentType : "application/json",
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				$("#publishCurrentPage")[0].value = defaultPage;
				if (defaultPage == 1){
					$("#publishPageUp")[0].setAttribute("class","pageUnavailabile");
					$("#publishPageUpIcon")[0].setAttribute("class","pageiconUnavailable");
				} else {
					$("#publishPageUp")[0].setAttribute("class","pageAvailabile");
					$("#publishPageUpIcon")[0].setAttribute("class","pageiconAvailable");
				}
				var total = result.total;
				var totalPage = Math.ceil(total/defaultPageNumber);
				if (defaultPage  >= totalPage){
					$("#publishPageNext")[0].setAttribute("class","pageUnavailabile");
					$("#publishPageNextIcon")[0].setAttribute("class","pageiconUnavailable");
				} else {
					$("#publishPageNext")[0].setAttribute("class","pageAvailabile");
					$("#publishPageNextIcon")[0].setAttribute("class","pageiconAvailable");
				}
				addpublishToPublishListPage(result.dataList);
			} else {
				openMessageWindow('fail',result.message);
			}
		},
		error : function(result, success, e) {
//			openMessageWindow('fail',"网络超时或服务器异常");
		}
	});
}

function addpublishToPublishListPage(dataList){
	if (dataList && dataList.length > 0){
		var allRow = "";
		var divRow = '<div class="listrow">';
		var rowLeft = false,rowRight = false;
		for (var i=0;i<dataList.length;i++){
			var name = dataList[i].name;
			var picturePath = dataList[i].pictureName ? '/klkk/image/upload/' + dataList[i].pictureName : "";
			var type = dataList[i].productionType;
			var hasPublishDesc = dataList[i].hasPublishDesc;
			var url = "#";
			if (dataList[i].url){
				if (dataList[i].url.indexOf("http:") == -1 && dataList[i].url.indexOf("https:") == -1){
					url = "http://"+ dataList[i].url;
				} else {
					url = dataList[i].url;
				}
			}
			
			var userName = dataList[i].username;
			if (!userName){
				userName = dataList[i].email;
			}
			
			if (i%2 == 0){
				rowLeft = true;
				divRow += '<div class="listLeftDiv">' +
							'<div class="publisherListPicture">' +
								'<img class="publishListPageImage" src="' + picturePath + '">' +
							'</div>' +
							'<div class="publishListDetail">' +
								'<div class="publisListname">' + name + '<span class="publishListType">|<span style="margin: 0 5px;">' + type + '</span>|</span> </div>' +
								'<div class="publishListiprovenance">'+userName+'</div>' +
								'<div class="publishListButton" url="' + url + '"  onclick="gotoBuyPage(this)"><img class="publishHeart" src="../img/system/heart.png">想&nbsp;要</div>' +
								'<div class="publishListworks">'+hasPublishDesc+'</div>' +
								'<div class="publishListworks"></div>' +
								'<div class="publishListworks"></div>' +
							'</div>' +
						'</div>';
			} else {
				rowRight = true;
				divRow += '<div class="listRightDiv">' +
							'<div class="publisherListPicture" style="margin-top: 15px">' +
								'<img class="publishListPageImage" src="' + picturePath + '">' +
							'</div>' +
							'<div class="publishListRightDetail" >' +
								'<div class="publisListname">' + name + '<span class="publishListType">|<span style="margin: 0 5px;">' + type + '</span>|</span> </div>' +
								'<div class="publishListiprovenance">'+userName+'</div>' +
								'<div class="publishListButton" url="' + url + '"  onclick="gotoBuyPage(this)"><img class="publishHeart" src="../img/system/heart.png">想&nbsp;要</div>' +
								'<div class="publishListworks">'+hasPublishDesc+'</div>' +
								'<div class="publishListworks"></div>' +
								'<div class="publishListworks"></div>' +
							'</div>' +
						'</div>';
			}
			if (rowLeft && rowRight){
				rowLeft = false;
				rowRight = false;
				divRow += '</div>';
				allRow += divRow;
				divRow = '<div class="listrow">';
			}
		}
		if (rowLeft && !rowRight){
			divRow += '</div>';
			allRow += divRow;
		}
		var listAllContainer = $("#publishListAll")[0];
		if (!allRow){
			allRow = "暂无出版书稿";
		}
		listAllContainer.innerHTML = allRow;
	}
}

function nextOrPrePublishList(e,isNext){
	if (!e){
		return;
	}
	var classValue = e.getAttribute("class");
	if (classValue  == "pageUnavailabile" || classValue == "pageiconUnavailable"){
		return;
	}
	var currentPage = parseInt($("#publishCurrentPage")[0].value);
	if (isNext){
		currentPage = currentPage+1;
	} else {
		currentPage = currentPage-1;
	}
	if (currentPage < 1){
		currentPage = 1;
	}
	getPublishAll(currentPage,8);
}

function gotoBuyPage(e){
	window.open(e.getAttribute("url"));
}

function changeBackground(self,isDispalyBackground){
	if (isDispalyBackground){
		self.setAttribute("class","unpublishRowSelect");
	} else {
		self.setAttribute("class","unpublishRow");
	}
}

function openDetail(id){
	if (id){
		$.ajax({
			url : '/klkk/production/product/' + id,
			type : 'GET',
			contentType : "application/json",
			dataType : "json",
			success : function(result, success, e) {
				if (result.status){
					addProductDetail(result.dataModel);
				} else {
					openMessageWindow('fail',result.message);
				}
			},
			error : function(result, success, e) {
//				openMessageWindow('fail',"网络超时或服务器异常");
			}
		});
	} else {
		openMessageWindow('fail',"不能获取到作品的ID，请刷新页面重试");
	}
}

function addProductDetail(datamodel){
	var title = datamodel.name ? datamodel.name : "";
	var pitcurePath = datamodel.pictureName ? "/klkk/image/upload/" + datamodel.pictureName : "";
	var productionType = datamodel.productionType ? datamodel.productionType : "";
	var totalWord = datamodel.totalWord ? datamodel.totalWord : "";
	var advertising = datamodel.advertising ? datamodel.advertising : "";
	var sellingPoint = datamodel.sellingPoint ? datamodel.sellingPoint : "";
	var introductionContent = datamodel.introductionContent ? datamodel.introductionContent : "";
	var introductionAuthor = datamodel.introductionAuthor ? datamodel.introductionAuthor : "";
	var bookCatalogue = datamodel.bookCatalogue ? datamodel.bookCatalogue : "";
	var sampleChapter = datamodel.sampleChapter ? datamodel.sampleChapter : "";
	
	$("#leftTitle")[0].innerText = title;
	$("#leftPicture")[0].src = pitcurePath;
	$("#rightTitle")[0].innerText = title;
	$("#rightType")[0].innerText = productionType;
	$("#rightTotalworld")[0].innerText = totalWord;
	$("#advertising")[0].innerText = advertising;
	$("#sellingPoint")[0].innerText = sellingPoint;
	$("#rightIntroductionContent")[0].innerText = introductionContent;
	$("#rightintroductionAuthor")[0].innerText = introductionAuthor;
	$("#rightBookCatalogue")[0].innerText = bookCatalogue;
	$("#rightSampleChapter")[0].innerText = sampleChapter;
	
	gotoDetail('introductionContent',false);
	openDetailDialog();
}

function openDetailDialog(){
	setVisible("detailWindow",true);
	setVisible("greyDiv",true);
}

function closeDetailDialog(){
	if ($("#totalDiv")[0].scrollTop != 0){
		$("#totalDiv")[0].scrollTop = 0;
	}
	setVisible("detailWindow",false);
	setVisible("greyDiv",false);
}

function onscrollChange(e){
    contentH = e.scrollHeight,//内容高度
    scrollTop = e.scrollTop;//滚动高度
	//需要计算各个div的高度
	var totalWorldDivHeight = $("#totalWorldDiv")[0].scrollHeight;
	var advertisingDivHeight = $("#advertisingDiv")[0].scrollHeight;
	var sellingPointsDivHeight = $("#sellingPointsDiv")[0].scrollHeight;
	var introductionContentDivHeight = $("#introductionContentDiv")[0].scrollHeight;
	var introductionAuthorDivHeight = $("#introductionAuthorDiv")[0].scrollHeight;
	var bookCatalogueDivHeight = $("#bookCatalogueDiv")[0].scrollHeight;
	var sampleChapterDivHeight = $("#sampleChapterDiv")[0].scrollHeight;
	
	var introductionContentArea =  advertisingDivHeight + sellingPointsDivHeight + introductionContentDivHeight + 40;
	var introductionAuthorArea = introductionContentArea + introductionAuthorDivHeight + 10;
	var bookCatalogueArea = introductionAuthorArea + bookCatalogueDivHeight + 10;
	
	if (scrollTop <= introductionContentArea){
		gotoDetail('introductionContent',false);
	} else if (scrollTop <= introductionAuthorArea) {
		gotoDetail('introductionAuthor',false);
	} else if (scrollTop <= bookCatalogueArea){
		gotoDetail('bookCatalogue',false);
	} else {
		gotoDetail('sampleChapter',false);
	}
}

function gotoDetail(id,isClick){
	var ids=['introductionContent','introductionAuthor','bookCatalogue','sampleChapter'];
	for (var i=0; i<ids.length; i++){
		var idStr = "#" + ids[i];
		var imgIdStr = idStr + "Imag";
		if (ids[i] == id){
			$(idStr)[0].setAttribute("class","detailListActive");
			$(imgIdStr)[0].setAttribute("class","dialogImgActive");
			if (isClick){
				gotoScroll(id);
			}
		} else {
			var classStr = $(idStr)[0].getAttribute("class");
			if (classStr == "detailListActive"){
				$(idStr)[0].setAttribute("class","detailList");
				$(imgIdStr)[0].setAttribute("class","dialogImg");
			}
		}
	}
}

function gotoScroll(id){
	var scrollHeight = computeDivHeight(id);
	var totalDiv = $("#totalDiv")[0];
	totalDiv.scrollTop = scrollHeight;
}

function computeDivHeight(id){
	var totalWorldDivHeight = $("#totalWorldDiv")[0].scrollHeight;
	var advertisingDivHeight = $("#advertisingDiv")[0].scrollHeight;
	var sellingPointsDivHeight = $("#sellingPointsDiv")[0].scrollHeight;
	var introductionContentDivHeight = $("#introductionContentDiv")[0].scrollHeight;
	var introductionAuthorDivHeight = $("#introductionAuthorDiv")[0].scrollHeight;
	var bookCatalogueDivHeight = $("#bookCatalogueDiv")[0].scrollHeight;
	var sampleChapterDivHeight = $("#sampleChapterDiv")[0].scrollHeight;
	
	var introductionContentArea =  totalWorldDivHeight + advertisingDivHeight + sellingPointsDivHeight + 30;
	var introductionAuthorArea = introductionContentArea + introductionContentDivHeight + 10;
	var bookCatalogueArea = introductionAuthorArea + introductionAuthorDivHeight + 10;
	var sampleChapterArea = bookCatalogueArea + bookCatalogueDivHeight + 10;
	
	var scrollHeight = 0;
	if (id == "introductionContent"){
		scrollHeight = introductionContentArea;
	}
	if (id == "introductionAuthor"){
		scrollHeight = introductionAuthorArea;
	}
	if (id == "bookCatalogue"){
		scrollHeight = bookCatalogueArea;
	}
	if (id == "sampleChapter"){
		scrollHeight = sampleChapterArea;
	}
	return scrollHeight;
}