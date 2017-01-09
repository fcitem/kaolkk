

var globalSetting={
		logindailog:{
			currentPage: null
		},
		user: null,
		registerStatus: null
		//debug
//		user: {
//			email: "419851763@qq.com",
//			username: "",
//			status: "1",
//			id : "4028818454b00bc50154b00d07480000"
//		}
};

function openDialog(type,status){
	if (status){
		globalSetting.registerStatus = status;
	} else {
		globalSetting.registerStatus = null;
	}
	changeTab(type);
	document.getElementById('dialog').style.display='block';
	document.getElementById('greyDiv').style.display='block';
}

function closeDialog(){
	document.getElementById('dialog').style.display='none';
	document.getElementById('greyDiv').style.display='none';
	if ($("#changePhoneWindow")[0]){
		$("#topicWindowPhone")[0].value = "";
		$("#topicWindowPhoneError")[0].innerText = '';
		$("#changePhoneWindow")[0].style.display='none';
	}
}

function openMessageWindow(type,text){
	if (type){
		if (type == "success"){
			$("#messageIcon")[0].src = "/klkk/img/system/success.ico";
		} else if (type == "fail"){
			$("#messageIcon")[0].src = "/klkk/img/system/fail.ico";
		} else if (type == "info"){
			$("#messageIcon")[0].src = "/klkk/img/system/icon-info.gif";
		}
	}
	if (text){
		$("#messageText")[0].innerText = text;
	}
	setVisible("messageWindow",true);
	setVisible("greyDiv",true);
}

function closeMessageWindow(id,callbackId){
	if ($("#messageText")[0]){
		$("#messageText")[0].innerText = "";
	}
	setVisible(id,false);
	setVisible("greyDiv",false);
	if (callbackId){
		var callback = $("#" + callbackId)[0].callback;
		if (callback){
			callback();
		}
	}
}

function openMessageQuestionWindow(text,callback){
	if (text){
		$("#messageQuestionText")[0].innerText = text;
	}
	setVisible("messageQuestionWindow",true);
	setVisible("greyDiv",true);
	if (callback){
		$("#messageQuestionOk")[0].callback = callback;
	}
}

function exist(){
	$.ajax({
		url : '/klkk/user/exist',
		type : 'POST',
		dataType : "json",
		success : function(result, success, e) {
			globalSetting.user = null;
			loginStatus();
			window.location.reload(); 
		},
		error : function(result, success, e) {
			globalSetting.user = null;
			loginStatus();
			window.location.reload(); 
		}
	})
}

function openPersonPage(){
	console.log("wait");
	window.location.href = "/klkk/app/userPage.html";
}

function changeTab(type){
	setVisible("firstPage",true);
	setVisible("dialogSecondePage",false);
	setVisible("prePage",false);
	setVisible("dialogThirdPage",false);
	var registerStyle = $("#registerTab")[0].style;
	var loginStyle = $("#loginTab")[0].style;
	var loginOrRegister = $("#loginOrRegister")[0];
	if (type == "login"){
		setStyle(loginStyle,registerStyle);
		setVisible("validationContainer",false);
		setVisible("protoalContainer",false);
		setVisible("forgetPassword",true);
		loginOrRegister.innerText="登录";
		loginOrRegister.setAttribute("action","login");
	} else {
		setStyle(registerStyle,loginStyle);
		setVisible("validationContainer",true);
		setVisible("protoalContainer",true);
		setVisible("forgetPassword",false);
		loginOrRegister.innerText="注册考拉看看";
		loginOrRegister.setAttribute("action","register");
		changeImg('imgObj');
		resetprotocal();
	}
	resetAllComponent();
	resetButton();
}

function setStyle(activeComponenet,inAciveComponent){
	activeComponenet.color = "#5a6d80";
	activeComponenet.borderBottomStyle = "solid";
	inAciveComponent.color='rgba(90, 109, 128, 0.6)';
	inAciveComponent.borderBottomStyle = "none";
}

function resetAllComponent(){
	var allComponent = ['email','emailError','password','passwordError','randomCode','randomCodeError',
	                    'thirdPageEmail','thridPageEmailError','thirdPageRandomCode','thirdPageRandomCodeError',
	                    'statusMessage','emailcodeStatusMessage','thirdPageStatusMessage','fourPageStatusMessage',
	                    'fourPageEmailcodeError','fourPagePasswordError'];
	for (var i=0; i < allComponent.length; i++){
		var id = "#" + allComponent[i];
		var component = $(id)[0];
		if (component){
			if (component.localName == "input"){
				component.value = "";
			} else {
				component.innerText='';
			}
		}
	}
}

function resetButton(){
	var loginOrRegister = $("#loginOrRegister")[0];
	loginOrRegister.disabled = false;
}

function setMask(isVisible,textContent){
	if (isVisible){
		var msg = "提交中，请等待...";
		if (textContent){
			msg = textContent;
		}
		$("#maskText")[0].innerText = msg;
	}
	setVisible('dialogMask',isVisible);
	setVisible('maskContent',isVisible);
}


function resetprotocal(){
	var loginOrRegister = $("#isReadProtocal")[0];
	setVisible("isReadProtocal",true);
}

function checkProtocal(){
	var display = document.getElementById("isReadProtocal").style.display;
	var loginOrRegister = $("#loginOrRegister")[0];
	if (display == "none"){
		document.getElementById("isReadProtocal").style.display = 'block';
		loginOrRegister.disabled = false;
	} else {
		document.getElementById("isReadProtocal").style.display = 'none';
		loginOrRegister.disabled = true;
	}
	
}

function changeImg(id) {
    var imgSrc = $("#" + id);
    var src = imgSrc.attr("src");
    imgSrc.attr("src", chgUrl(src));
}

//时间戳   
//为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳   
function chgUrl(url) {
  var timestamp = (new Date()).valueOf();
  url = url.substring(0, 17);
  if ((url.indexOf("&") >= 0)) {
    url = url + "×tamp=" + timestamp;
  } else {
    url = url + "?timestamp=" + timestamp;
  }
  return url;
}

function checkEmail(isSend,id,errorId){
	var value = $("#" + id)[0].value;
	var emailError = $("#" + errorId)[0];
	if (value){
		if (isEmailValid(value)){
			var currentPage =  $("#firstPage")[0];
			var loginOrRegister = $("#loginOrRegister")[0];
			if (currentPage.style.display == "block" && loginOrRegister.innerText == "登录"){
				emailError.innerText = "";
				return true;
			}
			if (isSend){
				emailError.innerText = "";
				isEmailExist(value,emailError);
				return true;
			} else {
				if (emailError.innerText == "此邮箱已注册"){
					return false;
				} else {
					emailError.innerText = "";
					return true;
				}
			}
		} else {
			emailError.innerText = "请输入一个有效的邮箱";
		}
	} else {
		emailError.innerText = "邮箱不能为空";
	}
	
	return false;
}

function isEmailExist(value,emailError){
	var data = {
			email : value
	};
	var newdata = JSON.stringify(data);
	$.ajax({
		url : '/klkk/user/isEmailExist',
		type : 'POST',
		contentType : "application/json",
		data : newdata,
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				emailError.innerText = "此邮箱未注册";
			} else {
				if ($("#dialogThirdPage")[0].style.display == "block"){
					emailError.innerText = "";
				} else {
					emailError.innerText = "此邮箱已注册";
				}
			}
		},
		error : function(result, success, e) {
			emailError.innerText = "";
		}
	})
}

function checkPassword(id,errorId){
	var value = $("#" + id)[0].value;
	var passwordError = $("#" + errorId)[0];
	if (value){
		if (value.trim().length < 6){
			passwordError.innerText = '密码不能小于6位';
		} else {
			passwordError.innerText = '';
			return true;
		}
	} else {
		passwordError.innerText = '密码不能为空';
	}
	
	return false;
}

function checkRandomCode(id,errorId){
	var value = $("#" + id)[0].value;
	var randomCodeError = $("#" + errorId)[0];
	if (value.trim()){
		randomCodeError.innerText = "";
		return true;
	} else {
		randomCodeError.innerText = '验证码不能为空';
		return false;
	}
}

function returnPrePage(){
	resetAllComponent();
	var currentPage = globalSetting.logindailog.currentPage;
	if (currentPage == 'dialogSecondePage' || currentPage == 'dialogThirdPage'){
		timeTotal = 0;
		globalSetting.logindailog.currentPage = 'firstPage';
		setVisible('firstPage',true);
		setVisible('dialogSecondePage',false);
		setVisible('dialogThirdPage',false);
		setVisible('prePage',false);
	} else if (currentPage == 'dialogFourPage') {
		timeTotal = 0;
		globalSetting.logindailog.currentPage = 'dialogThirdPage';
		setVisible('dialogThirdPage',true);
		setVisible('dialogFourPage',false);
		changeImg('thirdPageimgObj');
	}
}

function submit(e){
	var action = e.getAttribute("action");
	var email = $("#email")[0];
	var password = $("#password")[0];
	var randomCode = $("#randomCode")[0];
	if (action == "login"){
		if (checkEmail(false,'email','emailError') && checkPassword('password','passwordError')){
			var data = {
					email : email.value,
					password: password.value
			};
			login(data,'/klkk/user/login','POST');
		}
	} else {
		if (checkEmail(false,'email','emailError') && checkPassword('password','passwordError') && checkRandomCode('randomCode','randomCodeError')){
			
			
			var data = {
					email : email.value,
					password : password.value,
					status : globalSetting.registerStatus ? globalSetting.registerStatus : 1,
					randomCode : randomCode.value
				};
			register(data);
		}
	}
}

function register(data){
	setMask(true,"");
	var newdata = JSON.stringify(data);
	$.ajax({
		url : "/klkk/user/addUser",
		type : 'POST',
		contentType : "application/json",
		data : newdata,
		dataType : "json",
		success : function(result, success, e) {
			setMask(false,"");
			if (result.status){
				$("#statusMessage")[0].innerText = '';
				globalSetting.user = result.dataModel;
				openDialogSecondPage();
			} else {
				$("#statusMessage")[0].innerText = result.message;
			}
		},
		error : function(result, success, e) {
			setMask(false,"");
			$("#statusMessage")[0].innerText = "提交失败，网络通讯失败"
		}
	})
}
var timeTotal = 60;
function openDialogSecondPage(isHiddenPre){
	var firstPage =  $("#firstPage")[0];
	var secondPage =  $("#dialogSecondePage")[0];
	var prePage =  $("#prePage")[0];
	var secondTipPage =  $("#secondTipPage")[0];
	
	timeTotal = 60;
	refresTime('resendCode');
	var msg = "验证码已发送到";
	if (globalSetting.user){
		msg += globalSetting.user.email;
	}
	secondTipPage.innerText = msg;
	globalSetting.logindailog.currentPage = 'dialogSecondePage';
	firstPage.style.display = "none";
	secondPage.style.display = "block";
	if (isHiddenPre){
		prePage.style.display = "none";
	} else {
		prePage.style.display = "inline-block";
	}
	
	
}

var countButtonId = null;
function refresTime(id){
	if (id){
		countButtonId = id;
	}
	timeTotal--;
	var resendCode =  $("#" + countButtonId)[0];
	resendCode.disabled = true;
	if (timeTotal <= 0){
		resendCode.innerText = '重发验证码';
		resendCode.disabled = false;
		return;
	}
	var msg = timeTotal + "秒后可重发";
	resendCode.innerText = msg;
	 setTimeout(refresTime,1000);
}

function resendEmailCode(emailId,errorId,buttonId){
	var email = "", id = "";
	if (emailId){
		email = $("#" + emailId)[0].innerText;
	} else {
		if (globalSetting.user){
			email = globalSetting.user.email;
			id = globalSetting.user.id;
		}
	}
	
	var emailcodeStatusMessage =  $("#" + errorId)[0];
	if (email || id){
		var data = {
				id: id,
				email: email
			};
		var newdata = JSON.stringify(data);
		setMask(true,"");
		$.ajax({
			url : '/klkk/user/reSendCode',
			type : 'POST',
			contentType : "application/json",
			data : newdata,
			dataType : "json",
			success : function(result, success, e) {
				setMask(false,"");
				if (result.status){
					emailcodeStatusMessage.innerText = "已成功发送验证码到邮件";
					timeTotal = 60;
					refresTime(buttonId);
				} else {
					emailcodeStatusMessage.innerText = result.message;
				}
			},
			error : function(result, success, e) {
				setMask(false,"");
				emailcodeStatusMessage.innerText = "失败，可能是网络超时";
			}
		})
	} else {
		emailcodeStatusMessage.innerText = "不能获取到用户信息，请刷新页面重新验证";
	}
}

function login(data, url, method){
	setMask(true,"");
	var newdata = JSON.stringify(data);
	$.ajax({
		url : url,
		type : method,
		contentType : "application/json",
		data : newdata,
		dataType : "json",
		success : function(result, success, e) {
			setMask(false,"");
			if (result.status){
//				$("#statusMessage")[0].innerText = '';
//				closeDialog();
				globalSetting.user = result.dataModel;
//				loginStatus();
				window.location.reload();
			} else {
				$("#statusMessage")[0].innerText = result.message;
			}
		},
		error : function(result, success, e) {
			setMask(false,"");
			$("#statusMessage")[0].innerText = "提交失败，网络通讯失败"
		}
	});
}



function setVisible(id,isVisible){
	var obj = document.getElementById(id);
	if (obj){
		if (isVisible){
			obj.style.display = 'block';
		} else {
			obj.style.display = 'none';
		}
	}
}

function valideEmailCode(){
	var emailcode =  $("#emailcode")[0].value;
	var emailcodeStatusMessage =  $("#emailcodeStatusMessage")[0];
	if (emailcode.trim().length != 0){
		var data = {
				id : globalSetting.user.id,
				emailCode : emailcode
			};
		var newdata = JSON.stringify(data);
		setMask(true,"");
		$.ajax({
			url : '/klkk/user/activeUser',
			type : 'POST',
			contentType : "application/json",
			data : newdata,
			dataType : "json",
			success : function(result, success, e) {
				setMask(false,"");
				if (result.status){
					closeDialog();
					globalSetting.user = result.dataModel;
					loginStatus();
				} else {
					$("#statusMessage")[0].innerText = result.message;
				}
			},
			error : function(result, success, e) {
				setMask(false,"");
				emailcodeStatusMessage.innerText = "提交失败，可能是网络超时";
			}
		});
	} else {
		emailcodeStatusMessage.innerText = "请输入验证码";
	}
}

function skipValidation(){
	closeDialog();
	loginStatus();
}

function loginStatus(){
	if (globalSetting.user){
		var name = "Hi, ";
		if (globalSetting.user.username){
			name += globalSetting.user.username;
		} else {
			name += globalSetting.user.email;
		}
		$("#username")[0].innerText = name;
		$("#nologin")[0].style.display = "none";
		$("#haslogin")[0].style.display = "block";
	} else {
		$("#nologin")[0].style.display = "block";
		$("#haslogin")[0].style.display = "none";
	}
	
}

function openDialogThirdPage(){
	var firstPage =  $("#firstPage")[0];
	var dialogThirdPage =  $("#dialogThirdPage")[0];
	var prePage =  $("#prePage")[0];
	globalSetting.logindailog.currentPage = 'dialogThirdPage';
	firstPage.style.display = "none";
	dialogThirdPage.style.display = "block";
	prePage.style.display = "inline-block";
	changeImg('thirdPageimgObj');
}

function findPassword(){
	if (checkEmail(false,'thirdPageEmail','thridPageEmailError') && 
			checkRandomCode('thirdPageRandomCode','thirdPageRandomCodeError')){
		var email = $("#thirdPageEmail")[0].value;
		var data = {
			email : email,
			randomCode: $("#thirdPageRandomCode")[0].value	
		};
		var newdata = JSON.stringify(data);
		setMask(true,"");
		$.ajax({
			url : '/klkk/user/findPassword',
			type : 'POST',
			contentType : "application/json",
			data : newdata,
			dataType : "json",
			success : function(result, success, e) {
				setMask(false,"");
				if (result.status){
					if (result.message){
						openDialog('rigister');
						$("#email")[0].value = email;
						checkEmail(true,'email','emailError');
					} else {
						openDialogFourPage(email);
					}
				} else {
					$("#thirdPageStatusMessage")[0].innerText = result.message;
				}
			},
			error : function(result, success, e) {
				setMask(false,"");
				emailcodeStatusMessage.innerText = "提交失败，可能是网络超时";
			}
		})
	}
}

function openDialogFourPage(email){
	resetAllComponent();
	var dialogThirdPage =  $("#dialogThirdPage")[0];
	var dialogFourPage =  $("#dialogFourPage")[0];
	globalSetting.logindailog.currentPage = 'dialogFourPage';
	dialogThirdPage.style.display = "none";
	dialogFourPage.style.display = "block";
	$("#hasRegisterEmail")[0].innerText = email;
	timeTotal = 60;
	refresTime('FourPageresendCode');
}

function checkEmailCode(id,errorId){
	var value = $("#" + id)[0].value;
	var errorComponent = $("#" + errorId)[0];
	if (value){
		if (value.trim().length != 6){
			errorComponent.innerText = "6位数验证码长度为6位";
		} else {
			errorComponent.innerText = "";
			return true;
		}
	} else {
		errorComponent.innerText = "6位数验证码不能为空";
	}
	return false;
}

function resetPassword(){
	if (checkPassword('fourPagePassword','fourPagePasswordError') && 
			checkEmailCode('fourPageEmailcode','fourPageEmailcodeError')){
		var data = {
				email: $("#hasRegisterEmail")[0].innerText,
				password: $("#fourPagePassword")[0].value,
				emailCode : $("#fourPageEmailcode")[0].value
			};
		var newdata = JSON.stringify(data);
		setMask(true,"");
		$.ajax({
			url : '/klkk/user/resetPassword',
			type : 'POST',
			contentType : "application/json",
			data : newdata,
			dataType : "json",
			success : function(result, success, e) {
				setMask(false,"");
				if (result.status){
					closeDialog();
					globalSetting.user = result.dataModel;
					loginStatus();
				} else {
					$("#fourPageStatusMessage")[0].innerText = result.message;
				}
			},
			error : function(result, success, e) {
				setMask(false,"");
				emailcodeStatusMessage.innerText = "提交失败，可能是网络超时";
			}
		})
	}
}


function goToPublish(){
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
					window.location.href = "/klkk/app/publish.html";
				}
			} else {
				
			}
		},
		error : function(result, success, e) {
		}
	})
}

function checkUserLogin(callback){
	$.ajax({
		url : '/klkk/user/isLogin',
		type : 'GET',
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				globalSetting.user = result.dataModel;
				
			} else {
				globalSetting.user = null;
			}
			loginStatus();
			if (callback){
				callback();
			}
		},
		error : function(result, success, e) {
			globalSetting.user = null;
			loginStatus();
		}
	})
}


function commonSendAjax(data, url, method) {
	var newdata = JSON.stringify(data);
	setMask(true,"");
	$.ajax({
		url : url,
		type : method,
		contentType : "application/json",
		data : newdata,
		dataType : "json",
		success : function(result, success, e) {
			setMask(false,"");
			console.log("status:" + result.status + ":message:"
					+ result.message);
			// debugger;
		},
		error : function(result, success, e) {
			setMask(false,"");
			console.log("status:" + result.status + ":message:"
					+ result.message);
		}
	});
}

function commonSendAjaxGet(url) {
	setMask(true,"");
	$.ajax({
		url : url,
		type : 'Get',
		success : function(result, success, e) {
			setMask(false,"");
			console.log("status:" + result.status + ":message:"
					+ result.message);
			// debugger;
		},
		error : function(result, success, e) {
			setMask(false,"");
			console.log("status:" + result.status + ":message:"
					+ result.message);
		}
	});
}

function setGlobalMask(isVisible,textContent,width){
	if (isVisible){
		var msg = "提交中，请等待...";
		if (textContent){
			msg = textContent;
		}
		$("#publishMaskText")[0].innerText = msg;
	}
	if (width){
		$("#publishMaskContent")[0].style.width = width;
	} else {
		$("#publishMaskContent")[0].style.width = "170px";
	}
	setVisible("greyDiv",isVisible);
	setVisible('publishMaskContent',isVisible);
}

function checkVersion(callBack){
	$.ajax({
		url : '/klkk/manage/systemSet',
		type : 'GET',
		dataType : "json",
		success : function(result, success, e) {
			if (result.status){
				var data = result.dataModel;
				if (data.version == "1.0"){
					setVisible("loginDiv",false);
				} else {
					setVisible("loginDiv",true);
					checkUserLogin(callBack);
				}
			} else {
				
			}
		},
		error : function(result, success, e) {
		}
	})
}

function closeTopicWindow(){
	setVisible("changePhoneWindow",false);
//	setVisible("greyDiv",false);
	$("#topicWindowPhone")[0].value = '';
	$("#topicWindowPhoneError")[0].innerText = '';
}

function checkTopicPhone(){
	var checkResult = false;
	var value = $("#topicWindowPhone")[0].value;
	if (value){
		if (!isValidPhone(value)){
			$("#topicWindowPhoneError")[0].innerText = '请输入一个正确的手机号码';
		} else {
			$("#topicWindowPhoneError")[0].innerText = '';
			checkResult = true;
		}
	} else {
		$("#topicWindowPhoneError")[0].innerText = "手机号码不能为空";
	}
	return checkResult;
}

function addPhone(status){
	
	if (checkTopicPhone()){
		var phone = $("#topicWindowPhone")[0].value;
		var data = {
				phone:phone,
				status: status
		}
		setGlobalMask(true,"");
		var jsonData = JSON.stringify(data);
		$.ajax({
			url : '/klkk/user/addUser/phone',
			type : 'POST',
			contentType : "application/json",
			data : jsonData,
			dataType : "json",
			success : function(result, success, e) {
				setGlobalMask(false,"");
				if (result.status){
					openMessageWindow('success',"手机号码提交成功！");
					closeTopicWindow();
				} else {
					$("#topicWindowPhoneError")[0].innerText = result.message;
				}
			},
			error : function(result, success, e) {
				setGlobalMask(false,"");
				$("#topicWindowPhoneError")[0].innerText = "网络超时或服务器异常";
			}
		});
	}
}

function initWidth(){
	var height = $("#weixiIframe")[0].getAttribute("width");
	if (height){
		$("#weixiIframe")[0].setAttribute("width",null)
	}
	var a=$("#weixiIframe")[0].setAttribute("width","100%");
//	var iframe = $("#weixiIframe")[0];
//	console.log(iframe.document)
//	debugger;
}

function iframeChange(isBack){
	window.location.reload();
//	if (isBack){
////		$("#weixiIframe")[0].contentWindow.history.go(-1);
//		$("#weixiIframe")[0].contentWindow.history.back();
//	} else {
////		$("#weixiIframe")[0].contentWindow.history.go(1);
//		$("#weixiIframe")[0].contentWindow.history.forward();
//	}
	
}

function testInit(){
	debugger;
}
