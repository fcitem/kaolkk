$(function(){
	checkUserLogin(afterrender);
});

function afterrender(){
	var user = globalSetting.user;
	if (user){
		$("#saveUser")[0].disabled = false;
		var userStatus = "创作者";
		if (user.status == "0"){
			userStatus = "出版人";
			setVisible("myProduction",false);
//			setVisible("myIncome",false);
			setVisible("myPublish",true);
		} else {
			setVisible("myProduction",true);
//			setVisible("myIncome",true);
			setVisible("myPublish",false);
		}
		var username = user.email;
		if (user.username){
			username = user.username;
		}
		$("#userStatus")[0].innerText = userStatus;
		$("#userPageTitle")[0].innerText = userStatus;
		$("#publishUsername")[0].innerText = username;
		if (user.pictureName){
			var imagePath = "../image/upload/" + user.pictureName;
			$("#userPicture")[0].src = imagePath;
			$("#uploadPersonPicture")[0].src = imagePath;
		}
		$("#userId")[0].value = user.id;
		var emailMsg = user.email;
		if(user.active == "1"){
			$("#emailValid")[0].innerText = emailMsg +"(已验证)";
			setVisible("emailValid",true);
			setVisible("emailInvalid",false);
		} else {
			$("#emailSpan")[0].innerText = emailMsg;
			setVisible("emailInvalid",true);
			setVisible("emailValid",false);
		}
		$("#realname")[0].value = user.username;
		$("#pseudonym")[0].value = user.pseudonym;
		$("#phone")[0].value = user.phone;
		$("#introductionMyselef")[0].value = user.introductionMyselef;
		$("#speciality")[0].value = user.speciality;
		$("#representativeWorks")[0].value = user.representativeWorks;
		
    } else {
    	$("#saveUser")[0].disabled = true;
    }
}

function onuploadPersonPicture(){
	var user = globalSetting.user;
	if (!user || !user.id){
		openMessageWindow('info',"当前状态未登录或登录已失效，请重新登录");
		return;
	}
	$('#uploadPicture')[0].click();
}

function selectPersonPitcure(){
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
			$("#uploadPersonPicture")[0].src = imagePath;
//			$("#uploadPersonPicture")[0].src = "../image/upload/book1.png";
		}
	}).fail(function(result, success, e) {
		console.log("status:" + result.status + ":message:"
				+ result.message);
	});
}

function saveUser(){
	
	if (checkUserData()){
		var data = {
				id:$("#userId")[0].value,
				imageId:$("#imageId")[0].value,
				username:$("#realname")[0].value,
				pseudonym:$("#pseudonym")[0].value,
				phone:$("#phone")[0].value,
				introductionMyselef:$("#introductionMyselef")[0].value,
				speciality:$("#speciality")[0].value,
				representativeWorks:$("#representativeWorks")[0].value
		};
		var jsonData = JSON.stringify(data);
		setGlobalMask(true,"");
		$.ajax({
			url : '/klkk/user/updateUser',
			type : 'PUT',
			contentType : "application/json",
			data : jsonData,
			dataType : "json",
			success : function(result, success, e) {
				setGlobalMask(false,"");
				if (result.status){
					globalSetting.user = result.dataModel;
					openMessageWindow('success',"已保存！");
					afterrender();
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
}

function checkUserData(){
	return checkField('realname',false,20,true) && checkField('pseudonym',true,20,true) 
			&& checkField('phone',true,11,true,'phone') && checkField('introductionMyselef',false,200,true)
			&& checkField('speciality',false,200,true) && checkField('representativeWorks',false,200,true);
}


function statusError(){
	var user = globalSetting.user;
	if (!user){
		openMessageWindow('info',"当前状态未登录或登录已失效，请重新登录");
		return;
	}
	if (user.status == "0"){
		$("#statusText")[0].innerText = "创作者";
	} else {
		$("#statusText")[0].innerText = "出版人";
	}
	openChangeStatusWindow();
}

function openChangeStatusWindow(){
	setVisible("changeStatusWindow",true);
	setVisible("greyDiv",true);
}

function closeChangeStatusWindow(){
	setVisible("changeStatusWindow",false);
	setVisible("greyDiv",false);
}

function changeStatus(){
	var user = globalSetting.user;
	if (!user){
		openMessageWindow('info',"当前状态未登录或登录已失效，请重新登录");
		return;
	}
	
	if (!user.id){
		openMessageWindow('info',"不能获取到用户的ID，请重新登录");
		return;
	}
	var data = {
			id:user.id,
			status:user.status == "0" ? "1" : "0"
	};
	var jsonData = JSON.stringify(data);
	setGlobalMask(true,"");
	$.ajax({
		url : '/klkk/user/updateUserStatus',
		type : 'PUT',
		contentType : "application/json",
		data : jsonData,
		dataType : "json",
		success : function(result, success, e) {
			setGlobalMask(false,"");
			if (result.status){
				globalSetting.user = result.dataModel;
				afterrender();
				closeChangeStatusWindow();
				openMessageWindow('success',"身份更新成功！");
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

function validateEmail(){
	var user = globalSetting.user;
	if (!user || !user.id){
		openMessageWindow('info',"当前状态未登录或登录已失效，请重新登录");
		return;
	}
	
	var data = {
			id: user.id,
		};
	var jsonData = JSON.stringify(data);
	setGlobalMask(true,"正在发送验证码到邮箱...",'210px');
	$.ajax({
		url : '/klkk/user/reSendCode',
		type : 'POST',
		contentType : "application/json",
		data : jsonData,
		dataType : "json",
		success : function(result, success, e) {
			setGlobalMask(false,"");
			if (result.status){
				var userPageEmailTip =  $("#userPageEmailTip")[0];
				var msg = "验证码已发送到" + user.email;
				userPageEmailTip.innerText = msg;
				openvalidateEmailWindow();
			} else {
				openMessageWindow('fail',result.message);
			}
		},
		error : function(result, success, e) {
			setGlobalMask(false,"");
			openMessageWindow('fail',"发送失败，可能是网络超时或服务器异常");
		}
	});

	
}

function openvalidateEmailWindow(){
	timeTotal = 60;
	refresTime('userPageResendCode');
	setVisible("validateEmailWindow",true);
	setVisible("greyDiv",true);
}

function closeValidateEmailWindow(){
	timeTotal = 0;
	setVisible("validateEmailWindow",false);
	setVisible("greyDiv",false);
}

function valideEmailNow(){
	var emailcode =  $("#userPageEmailcode")[0].value;
	var emailcodeStatusMessage =  $("#userPageemailcodeStatusMessage")[0];
	if (emailcode.trim().length != 0){
		var data = {
				id : globalSetting.user.id,
				emailCode : emailcode
			};
		var newdata = JSON.stringify(data);
		setValidateWindowMask(true,"");
		$.ajax({
			url : '/klkk/user/activeUser',
			type : 'POST',
			contentType : "application/json",
			data : newdata,
			dataType : "json",
			success : function(result, success, e) {
				setValidateWindowMask(false,"");
				if (result.status){
					globalSetting.user = result.dataModel;
					afterrender();
					closeValidateEmailWindow();
					openMessageWindow('success',"邮箱验证成功！");
				} else {
					emailcodeStatusMessage.innerText = result.message;
				}
			},
			error : function(result, success, e) {
				setValidateWindowMask(false,"");
				emailcodeStatusMessage.innerText = "提交失败，可能是网络超时";
			}
		});
	} else {
		emailcodeStatusMessage.innerText = "请输入验证码";
	}
}


function setValidateWindowMask(isVisible,textContent){
	if (isVisible){
		var msg = "提交中，请等待...";
		if (textContent){
			msg = textContent;
		}
		$("#validateEmailmaskText")[0].innerText = msg;
	}
	setVisible('validateEmailWindowMask',isVisible);
	setVisible('validateEmailWindowMaskContent',isVisible);
}