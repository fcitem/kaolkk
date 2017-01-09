$(function(){
	checkUserLogin(afterrenderPublish);
}); 

function afterrenderPublish(){
	var user = globalSetting.user;
	if (user){
		if (user.status == "0"){
			window.location.href = "/klkk/app/myPublish.html";
		}
		$("#writePlan")[0].src = "../img/system/haveidea-green.png";
		$("#writePlanCyle")[0].src = "../img/system/cyclegreen.png";
		$("#writePlanText")[0].style.color = "#76EE00";
		$("#readPbulish")[0].innerText = "确定";
		var username = user.email;
		if (user.username){
			username = user.username;
		}
		if (user.pictureName){
			var imagePath = "../image/upload/" + user.pictureName;
			$("#userPicture")[0].src = imagePath;
		}
		
		$("#publishUsername")[0].innerText = username;
		setVisible("selectTip",true);
    }
}


function addPublish(){
	$.ajax({
		url : '/klkk/user/isLogin',
		type : 'GET',
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				globalSetting.user = result.dataModel;
				openPublishPage();
			} else {
				openDialog('login');
			}
		},
		error : function(result, success, e) {
		}
	})
}

function changePublishType(type){
	if (!globalSetting.user){
		openDialog('login');
		return;
	}
	if (type == 'writePlanCyle'){
		$("#writePlan")[0].src = "../img/system/haveidea-green.png";
		$("#writePlanCyle")[0].src = "../img/system/cyclegreen.png";
		$("#writePlanText")[0].style.color = "#76EE00";
		$("#writeting")[0].src = "../img/system/writting.png";
		$("#writetingCycle")[0].src = "../img/system/cycle.png";
		$("#writtingText")[0].style.color = "#465563";
		$("#writeFinish")[0].src = "../img/system/finish.png";
		$("#writeFinishCycle")[0].src = "../img/system/cycle.png";
		$("#writeFinshText")[0].style.color = "#465563";
		$("#readPbulish")[0].setAttribute("action","writePlan");
	} else if(type == 'writetingCycle'){
		$("#writePlan")[0].src = "../img/system/haveidea.png";
		$("#writePlanCyle")[0].src = "../img/system/cycle.png";
		$("#writePlanText")[0].style.color = "#465563";
		$("#writeting")[0].src = "../img/system/writting-green.png";
		$("#writetingCycle")[0].src = "../img/system/cyclegreen.png";
		$("#writtingText")[0].style.color = "#76EE00";
		$("#writeFinish")[0].src = "../img/system/finish.png";
		$("#writeFinishCycle")[0].src = "../img/system/cycle.png";
		$("#writeFinshText")[0].style.color = "#465563";
		$("#readPbulish")[0].setAttribute("action","writting");
	} else {
		$("#writePlan")[0].src = "../img/system/haveidea.png";
		$("#writePlanCyle")[0].src = "../img/system/cycle.png";
		$("#writePlanText")[0].style.color = "#465563";
		$("#writeting")[0].src = "../img/system/writting.png";
		$("#writetingCycle")[0].src = "../img/system/cycle.png";
		$("#writtingText")[0].style.color = "#465563";
		$("#writeFinish")[0].src = "../img/system/finish-green.png";
		$("#writeFinishCycle")[0].src = "../img/system/cyclegreen.png";
		$("#writeFinshText")[0].style.color = "#76EE00";
		$("#readPbulish")[0].setAttribute("action","writefinish");
	}
}

function openPublishPage(){
	setVisible("publishSelectPage",false);
	setVisible("publishWritePlan",true);
	$("#userId")[0].value = globalSetting.user.id;
	var type = $("#readPbulish")[0].getAttribute("action");
	if (type == "writePlan"){
		$("#publishPlan")[0].src = "../img/system/haveidea-XS-green.png";
		$("#publishWriteting")[0].src = "../img/system/writting.png";
		$("#publishWriteFinish")[0].src = "../img/system/finish-XS.png";
		changeCycleAndText('publishWritePlanCyle','publisWritePlanText',true);
		changeCycleAndText('publishWritetingCycle','publishWrittingText',false);
		changeCycleAndText('publishWriteFinishCycle','publishWriteFinshText',false);
		setWrittingPageVisble(false);
		setFinishPageVisble(false);
		setPlanPageVisble(true);
		setYearCombox();
		setMonthCombox();
		setWeekCombox();
	} else if (type == "writting"){
		$("#publishPlan")[0].src = "../img/system/haveidea-XS.png";
		$("#publishWriteting")[0].src = "../img/system/writting-XS-green.png";
		$("#publishWriteFinish")[0].src = "../img/system/finish-XS.png";
		changeCycleAndText('publishWritePlanCyle','publisWritePlanText',false);
		changeCycleAndText('publishWritetingCycle','publishWrittingText',true);
		changeCycleAndText('publishWriteFinishCycle','publishWriteFinshText',false);
		setPlanPageVisble(false);
		setFinishPageVisble(false);
		setWrittingPageVisble(true);
		setYearCombox();
		setMonthCombox();
		setWeekCombox();
	} else {
		$("#publishPlan")[0].src = "../img/system/haveidea-XS.png";
		$("#publishWriteting")[0].src = "../img/system/writting.png";
		$("#publishWriteFinish")[0].src = "../img/system/finish-XS-green.png";
		changeCycleAndText('publishWritePlanCyle','publisWritePlanText',false);
		changeCycleAndText('publishWritetingCycle','publishWrittingText',false);
		changeCycleAndText('publishWriteFinishCycle','publishWriteFinshText',true);
		setPlanPageVisble(false);
		setWrittingPageVisble(false);
		setFinishPageVisble(true);
	}
}

function changeCycleAndText(cycleId,textId,isGreen){
	var cycle = "#" + cycleId;
	var text = "#" + textId;
	if (isGreen){
		$(cycle)[0].src = "../img/system/cyclegreen.png";
		$(text)[0].style.color = "#64a81a";
	} else {
		$(cycle)[0].src = "../img/system/cycle2.png";
		$(text)[0].style.color = "#465563";
	}
}

function setVisibleMutil(component,isvisible){
	for (var i=0;i<component.length;i++){
		setVisible(component[i],isvisible);
	}
}


function setPlanPageVisble(isVisible){
	var component = ["characterSetContainer","plotSetContainer","planCompleteTimeContainer"];
	setVisibleMutil(component,isVisible);
}

function setWrittingPageVisble(isVisible){
	var component = ["planCompleteTimeContainer","currentCompletePrecent","introductionAuthorComponent",
		                         "bookCatalogueContainer","sampleChapterContainer"];
	setVisibleMutil(component,isVisible);
}

function setFinishPageVisble(isVisible){
	var component = ["recommendMyselfContainer","introductionAuthorComponent",
                     "bookCatalogueContainer","sampleChapterContainer"];
	setVisibleMutil(component,isVisible);
}

function onUploadPicture(){
	$('#uploadPicture')[0].click();
}

function selectPitcure(e){
	$.ajax({
	    url: '/klkk/upload/image',
	    type: 'POST',
	    cache: false,
	    data: new FormData($('#uploadForm')[0]),
	    processData: false,
	    dataType : "json",
	    contentType: false
	}).done(function(result, success, e) {
		if (result.status){
			$('#imageId')[0].value = result.dataModel.id;
			var imagePath = "../image/upload/" + result.dataModel.name;
			$("#publishUploadPicture")[0].src = imagePath;
//			$("#publishUploadPicture")[0].src = "../image/upload/book1.png";
		}
	}).fail(function(result, success, e) {
		console.log("status:" + result.status + ":message:"
				+ result.message);
	});
}

function setYearCombox(){
	var year = new Date().getFullYear();
	var yearCombox = $('#year')[0];
	for (var i=0;i<10;i++){
		var valueInt = year + i;
		var valueStr = valueInt + "年";
		yearCombox.options.add(new Option(valueStr,valueStr)) ;
	}
}

function setMonthCombox(){
	var monthCombox = $('#month')[0];
	for (var i=1;i<13;i++){
		var valueStr = i + "月";
		monthCombox.options.add(new Option(valueStr,valueStr)) ;
	}
}

function setWeekCombox(){
	var weekCombox = $('#week')[0];
	for (var i=1;i<5;i++){
		var valueStr = "第" + i + "周";
		weekCombox.options.add(new Option(valueStr,valueStr)) ;
	}
}


function saveDraft(){
	if (isValid()){
		console.log("");
		var id = $("#id")[0].value;
		//基本数据
		var data = {
				id:id,
				imageId:$("#imageId")[0].value,
				name:$("#name")[0].value,
				productionType:$("#productionType")[0].value,
				totalWord:$("#totalWord")[0].value,
				targerReader:$("#targerReader")[0].value,
				introductionContent:$("#introductionContent")[0].value,
				userId:$("#userId")[0].value
		};
		
		var type = $("#readPbulish")[0].getAttribute("action");
		if (type == 'writePlan'){
			data.status = 0;
			data.completeYear = $("#year")[0].value;
			data.completeMonth = $("#month")[0].value;
			data.completeWeek = $("#week")[0].value;
			data.characterSet = $("#characterSet")[0].value;
			data.plotSet = $("#plotSet")[0].value;
			
		} else if (type == 'writting'){
			data.status = 1;
			data.completeProcess = $("#completeProcess")[0].value;
			data.completeYear = $("#year")[0].value;
			data.completeMonth = $("#month")[0].value;
			data.completeWeek = $("#week")[0].value;
			data.introductionAuthor = $("#introductionAuthor")[0].value;
			data.bookCatalogue = $("#bookCatalogue")[0].value;
			data.sampleChapter = $("#sampleChapter")[0].value;
			
		} else if (type == 'writefinish'){
			data.status = 2;
			data.recommendMyself = $("#recommendMyself")[0].value;
			data.introductionAuthor = $("#introductionAuthor")[0].value;
			data.bookCatalogue = $("#bookCatalogue")[0].value;
			data.sampleChapter = $("#sampleChapter")[0].value;
		}
		if (id){
			commitData(data,'PUT');
		} else {
			commitData(data,'POST');
		}
	}
}

function commitData(data,method){
	setGlobalMask(true,"");
	var newdata = JSON.stringify(data);
	$.ajax({
		url : '/klkk/production/production',
		type : method,
		contentType : "application/json",
		data : newdata,
		dataType : "json",
		success : function(result, success, e) {
			setGlobalMask(false,"");
			if (result.status){
				$("#id")[0].value = result.dataModel.id;
				$("#commit")[0].disabled = false;
				openMessageWindow('success',"已存为草稿！");
			} else {
				openMessageWindow('fail',result.message);
			}
		},
		error : function(result, success, e) {
			setGlobalMask(false,"");
			openMessageWindow('fail',"网络超时或服务器异常");
		}
	});
}

function commit(){
	openMessageQuestionWindow("提交之后不能再次修改，你确定要提交？",commitAjax);
}



function commitAjax(){
	var id = $("#id")[0].value;
	if (id){
		setGlobalMask(true,"");
		$.ajax({
			url : '/klkk/production/commit/' + id,
			type : 'POST',
			contentType : "application/json",
			dataType : "json",
			success : function(result, success, e) {
				setGlobalMask(false,"");
				if (result.status){
					$("#commit")[0].disabled = true;
					$("#saveDraft")[0].disabled = true;
					openMessageWindow('success',"已提交！");
				} else {
					openMessageWindow('fail',result.message);
				}
			},
			error : function(result, success, e) {
				setGlobalMask(false,"");
				openMessageWindow('fail',"网络超时或服务器异常");
			}
		});
	} else {
		openMessageWindow('fail',"不能获取到作品的ID信息,请再次点击存草稿。");
	}
}

function isValid(){
	var valid = false;
	
	var commonIsValid = checkField('name',false,20,true) && checkField('productionType',false,20,true)&& checkField('totalWord',false,20,true);
	if (!commonIsValid){
		return false;
	}
	var type = $("#readPbulish")[0].getAttribute("action");
	if (type == 'writePlan'){
		valid = checkField('year',false,5,true)&& checkField('month',false,3,true) && checkField('week',false,3,true)
			&& checkField('targerReader',false,200,true) && checkField('introductionContent',false,200,true)
			&& checkField('characterSet',true,200,true) && checkField('plotSet',true,200,true);
	} else if (type == 'writting'){
		valid = checkField('year',false,5,true)&& checkField('month',false,3,true) && checkField('week',false,3,true)
			&& checkField('completeProcess',false,5,true) && checkField('targerReader',false,200,true) && checkField('introductionContent',false,200,true)
			&& checkField('introductionAuthor',false,200,true) &&checkField('bookCatalogue',true,200,true) && checkField('sampleChapter',true,200,true);
	} else if (type == 'writefinish'){
		valid = checkField('recommendMyself',false,100,true) && checkField('targerReader',false,200,true) && checkField('introductionContent',false,200,true)
			&& checkField('introductionAuthor',false,200,true) &&checkField('bookCatalogue',true,200,true) && checkField('sampleChapter',true,200,true);
	}
	
	return valid;
}

function getPersonInfo(){
	checkUserLogin(setContentByPerson);
}

function setContentByPerson(){
	var user = globalSetting.user;
	if (user){
		if (user.introductionMyselef){
			$("#introductionAuthor")[0].value = user.introductionMyselef;
		} else {
			openMessageWindow('fail',"个人资料个人简介为空");
		}
	} else {
		openDialog('login');
	}
}
