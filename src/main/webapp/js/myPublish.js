$(function(){
	checkUserLogin(myPublishAfterrender);
});

function myPublishAfterrender(){
	var user = globalSetting.user;
	if (user){
		if (user.status == "1"){
			window.location.href = "/klkk/app/publish.html";
		}
		
		var username = user.email;
		if (user.username){
			username = user.username;
		}
		$("#mypublishUsername")[0].innerText = username;
		if (user.pictureName){
			var imagePath = "../image/upload/" + user.pictureName;
			$("#userPicture")[0].src = imagePath;
		}
		getTopic(user.id);
	}
}

function checkTopicValid(){
	var topiTextarea = $("#myTopic")[0];
	if (topiTextarea.value.trim()){
		setVisible("topicNullInfo",false);
		checkField('myTopic',false,200,false);
	} else {
		setVisible("topicNullInfo",true);
	}
}

function getTopic(id){
	if (id.trim()){
		$.ajax({
			url : '/klkk/user/topic/' + id,
			type : 'GET',
			contentType : "application/json",
			dataType : "json",
			success : function(result, success, e) {
				if (result.status){
					if (result.dataModel && result.dataModel.content){
						setVisible("topicNullInfo",false);
						$("#myPublishTitle")[0].innerText = "你当前提交的选题内容： ";
						$("#myTopic")[0].disabled = true;
						$("#myTopic")[0].value = result.dataModel.content;
						$("#topicId")[0].value = result.dataModel.id;
						$("#saveTopic")[0].innerText = "编辑";
						$("#saveTopic")[0].setAttribute("action","edit");
					}
				} else {
					openMessageWindow('fail',result.message);
				}
			},
			error : function(result, success, e) {
				openMessageWindow('fail',"网络超时或服务器异常");
			}
		});
	}
}


function saveTopic(){
	var action = $("#saveTopic")[0].getAttribute("action");
	if (action == "edit"){
		$("#myTopic")[0].disabled = false;
		$("#saveTopic")[0].innerText = "提交选题任务";
		$("#saveTopic")[0].setAttribute("action","save");
	} else if (action == "save"){
		if (checkField('myTopic',false,200,true)){
			var id = $("#topicId")[0].value;
			var user = globalSetting.user;
			if (id && user){
				var data = {
						userId: user.id,
						content:$("#myTopic")[0].value,
						id: id
				};
				commitTopic('/klkk/user/updateToppic','PUT',data);
			} else {
				openMessageWindow('fail',"用户未登录或登录失效，请重新登录");
			}
		}
	} else {
		if (checkField('myTopic',false,200,true)){
			var user = globalSetting.user;
			if (user){
				var data = {
						userId: user.id,
						content:$("#myTopic")[0].value
				}
				commitTopic('/klkk/user/addToppic','POST',data);
			} else {
				openMessageWindow('fail',"用户未登录或登录失效，请重新登录");
			}
		}
	}
}

function commitTopic(url,method,data){
	setGlobalMask(true,"");
	var jsonData = JSON.stringify(data);
	$.ajax({
		url : url,
		type : method,
		contentType : "application/json",
		data : jsonData,
		dataType : "json",
		success : function(result, success, e) {
			setGlobalMask(false,"");
			if (result.status){
				$("#topicId")[0].value = result.dataModel.id;
				$("#myTopic")[0].disabled = true;
				$("#saveTopic")[0].innerText = "编辑";
				$("#saveTopic")[0].setAttribute("action","edit");
//				openMessageWindow('success',"保存成功！");
				openTopicWindow();
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

function openTopicWindow(){
	var user = globalSetting.user;
	if (user && user.phone){
		$("#topicWindowPhone")[0].value = user.phone;
	}
	setVisible("changePhoneWindow",true);
	setVisible("greyDiv",true);
} 

//移至common.js
//function closeTopicWindow(){
//	setVisible("changePhoneWindow",false);
//	setVisible("greyDiv",false);
//	$("#topicWindowPhone")[0].value = '';
//	$("#topicWindowPhoneError")[0].innerText = '';
//}

//移至common.js
//function checkTopicPhone(){
//	var checkResult = false;
//	var value = $("#topicWindowPhone")[0].value;
//	if (value){
//		if (!isValidPhone(value)){
//			$("#topicWindowPhoneError")[0].innerText = '请输入一个正确的手机号码';
//		} else {
//			$("#topicWindowPhoneError")[0].innerText = '';
//			checkResult = true;
//		}
//	} else {
//		$("#topicWindowPhoneError")[0].innerText = "手机号码不能为空";
//	}
//	return checkResult;
//}

function updatePhone(){
	if (checkTopicPhone()){
		var phone = $("#topicWindowPhone")[0].value;
		var user = globalSetting.user;
		if (user){
			var data = {
					id: user.id,
					phone:phone
			}
			setGlobalMask(true,"");
			var jsonData = JSON.stringify(data);
			$.ajax({
				url : '/klkk/user/updateUserPhone',
				type : 'PUT',
				contentType : "application/json",
				data : jsonData,
				dataType : "json",
				success : function(result, success, e) {
					setGlobalMask(false,"");
					if (result.status){
						openMessageWindow('success',"手机号码更新成功！");
						closeTopicWindow();
					} else {
//						openMessageWindow('fail',result.message);
						$("#topicWindowPhoneError")[0].innerText = "result.message";
					}
				},
				error : function(result, success, e) {
					setGlobalMask(false,"");
//					openMessageWindow('fail',"网络超时或服务器异常");
					$("#topicWindowPhoneError")[0].innerText = "网络超时或服务器异常";
				}
			});
		} else {
//			openMessageWindow('fail',"用户未登录或登录失效，请重新登录");
			$("#topicWindowPhoneError")[0].innerText = "用户未登录或登录失效，请重新登录";
		}
	}
}
