//注册
function sendData() {
	var email = $("#email").val();
	var password = $("#password").val();
	var randomCode = $("#randomCode").val();
	var data = {
		email : email,
		password : password,
		status : 0,
		randomCode : randomCode
	}
	var newdata = JSON.stringify(data);
	$.ajax({
		url : "user/addUser",
		type : 'POST',
		contentType : "application/json",
		data : newdata,
		dataType : "json",
		success : function(result, success, e) {
			console.log("status:" + result.status + ":message:"
					+ result.message);
			// debugger;
		},
		error : function(result, success, e) {
			console.log("fakse");
		}
	});
}

//重复验证码到邮箱
function resend() {
	var emailCode = $("#emailCode").val();
	var data = {
		id : "4028818454ae390c0154ae3dbe9c0000"
	}
	commonSendAjax(data,'../user/reSendCode','POST');
}

//激活用户
function activeUser() {
	var emailCode = $("#emailCode").val();
	var data = {
		id : "4028818454b00bc50154b00d07480000",
		emailCode : emailCode
	}
	commonSendAjax(data,'../user/activeUser','POST');
}

//重置密码
function resetPassword(){
	var data = {
			id : "4028818454b00bc50154b00d07480000",
			password: $("#password").val(),
			emailCode : $("#emailCode").val()
		}
		commonSendAjax(data,'../user/resetPassword','POST');
}

//登录
function login() {
	var email = $("#email").val();
	var data = {
			email : email,
			password: $("#password").val()
	}
	commonSendAjax(data,'../user/login','POST');
}

//找回密码
function findPassword() {
	var email = $("#email").val();
	var data = {
			email : email,
			randomCode: $("#randomCode").val()
	}
	commonSendAjax(data,'../user/findPassword','POST');
}

function commit(){
	var aa = $("#file").val();
	console.log("aa=" + aa);
	
//	$.ajax({
//	    url: '../upload/image',
//	    type: 'POST',
//	    cache: false,
//	    data: new FormData($('#uploadForm')[0]),
//	    processData: false,
//	    contentType: false
//	}).done(function(result, success, e) {
//		var results = $.parseJSON(result);
//		console.log("status:" + results.status + ":message:"
//				+ results.message);
//		if (results.status){
//			commitProduce(results.dataModel.id);
//			
//		}
//	}).fail(function(result, success, e) {
//		var result = $.parseJSON(result);
//		console.log("status:" + result.status + ":message:"
//				+ result.message);
//	});
	commitProduce("4028818454b02e930154b02ec5c60000","2");
}

//我的作品处理数据
function commitProduce(imageId,status,isupdate){
	var data = {
			id:"4028818454d38f8d0154d38fba140000",
			name:$("#name").val(),
			productionType:$("#productionType").val(),
			totalWord:$("#totalWord").val(),
			recommendMyself:$("#recommendMyself").val(),
			targerReader:$("#targerReader").val(),
			introductionContent:$("#introductionContent").val(),
			introductionAuthor:$("#introductionAuthor").val(),
			bookCatalogue:$("#bookCatalogue").val(),
			sampleChapter:$("#sampleChapter").val(),
			imageId:imageId,
			status:status,
			completeYear:$("#completeYear").val(),
			completeMonth:$("#completeMonth").val(),
			completeWeek:$("#completeWeek").val(),
			completeProcess:$("#completeProcess").val(),
			characterSet:$("#characterSet").val(),
			plotSet:$("#plotSet").val(),
			userId:'4028818454b00bc50154b00d07480000'
	};
	
	if (isupdate){
		commonSendAjax(data,'../production/production','PUT');
	} else {
		commonSendAjax(data,'../production/production','POST');
	}
//	commonSendAjax(data,'../production/commit','POST');
//	commonSendAjax(data,'../production/saveDraft','POST');
}

//写作中-存草稿
function saveDraft(){
	commitProduce("4028818454b02e930154b02ec5c60000","1",false);
}

//写作中-修改草稿
function updateWriteCommit(){
	commitProduce("4028818454b02e930154b02ec5c60000","1",true);
}

//写作中-提交
function writeCommit(){
	var data = {
			id:""
	};
	commonSendAjax(data,'../production/commit/4028818454d311ad0154d311e7060000','POST');
}

//function writeCommit(){
//	var aa = $("#file").val();
//	console.log("aa=" + aa);
	
//	$.ajax({
//	    url: '../upload/image',
//	    type: 'POST',
//	    cache: false,
//	    data: new FormData($('#uploadForm')[0]),
//	    processData: false,
//	    contentType: false
//	}).done(function(result, success, e) {
//		var results = $.parseJSON(result);
//		console.log("status:" + results.status + ":message:"
//				+ results.message);
//		if (results.status){
//			commitProduce(results.dataModel.id);
//			
//		}
//	}).fail(function(result, success, e) {
//		var result = $.parseJSON(result);
//		console.log("status:" + result.status + ":message:"
//				+ result.message);
//	});
//	commitProduce("4028818454b02e930154b02ec5c60000","1");
//}

//已有写作计划-存草稿
function writePlanSave(){
	var aa = $("#file").val();
	console.log("aa=" + aa);
	
//	$.ajax({
//	    url: '../upload/image',
//	    type: 'POST',
//	    cache: false,
//	    data: new FormData($('#uploadForm')[0]),
//	    processData: false,
//	    contentType: false
//	}).done(function(result, success, e) {
//		var results = $.parseJSON(result);
//		console.log("status:" + results.status + ":message:"
//				+ results.message);
//		if (results.status){
//			commitProduce(results.dataModel.id);
//			
//		}
//	}).fail(function(result, success, e) {
//		var result = $.parseJSON(result);
//		console.log("status:" + result.status + ":message:"
//				+ result.message);
//	});
	commitProduce("4028818454b02e930154b02ec5c60000","0",false);
}

//已有写作计划-修改
function updateWritePlanCommit(){
	commitProduce("4028818454b02e930154b02ec5c60000","0",true);
}

//已有写作计划-提交
function writePlanCommit(){
	var data = {
			id:""
	};
	commonSendAjax(data,'../production/commit/4028818454d38f8d0154d38fba140000','POST');
}



//编辑个人资料提交
function personCommit(){
	var aa = $("#file").val();
	console.log("aa=" + aa);
	
//	$.ajax({
//	    url: '../upload/image',
//	    type: 'POST',
//	    cache: false,
//	    data: new FormData($('#uploadForm')[0]),
//	    processData: false,
//	    contentType: false
//	}).done(function(result, success, e) {
//		var results = $.parseJSON(result);
//		console.log("status:" + results.status + ":message:"
//				+ results.message);
//		if (results.status){
//			handleData(results.dataModel.id);
//			
//		}
//	}).fail(function(result, success, e) {
//		var result = $.parseJSON(result);
//		console.log("status:" + result.status + ":message:"
//				+ result.message);
//	});
	handleData("4028818454d937df0154d93881090000");
}

//编辑个人资料-处理数据
function handleData(imageId){
	var data = {
			username:$("#username").val(),
			pseudonym:$("#pseudonym").val(),
			phone:$("#phone").val(),
			introductionMyselef:$("#introductionMyselef").val(),
			speciality:$("#speciality").val(),
			representativeWorks:$("#representativeWorks").val(),
			imageId:imageId,
			image:{
				id:"sssssssssss"
			},
			id:'4028818454b00bc50154b00d07480000'
	};
	commonSendAjax(data,'../user/updateUser','PUT');
}

//添加主题
function topicCommit(){
	var data = {
			content:$("#content").val(),
			userId:'4028818454b00bc50154b00d07480000'
	};
	commonSendAjax(data,'../user/addToppic','POST');
}

//修改主题
function updateTopic(){
	var data = {
			content:$("#content").val(),
			id:"4028818454ba3e860154ba450b250001",
			userId:'4028818454b00bc50154b00d07480000'
	};
	commonSendAjax(data,'../user/updateToppic','PUT');
}

//修改手机号码
function updatephone(){
	var data = {
			phone:$("#phone").val(),
			id:"4028818454b00bc50154b00d07480000"
	};
	commonSendAjax(data,'../user/updateUserPhone','PUT');
}

//获取选题
function getTopic(){
	//不需要data参数，此处偷懒，暂时共用一个ajax方法
	var data = {
			userId:'4028818454b00bc50154b00d07480000'
	};
	
	commonSendAjax(data,'../user/topic/4028818454b00bc50154b00d07480000','GET');
}

//获取我的所有作品
function getProductionByUserId(){
	commonSendAjaxGet('../production/myAllProduct/4028818454b00bc50154b00d07480000/1/10','GET');
}

//获取首页未出版的
function getMainPageUnpublished(){
	
	commonSendAjaxGet('../production/mainPage/unpublished','GET');
}


//获取首页已出版的
function getMainPagePublished(){
	
	commonSendAjaxGet('../production/mainPage/published','GET');
}

//获取所有未出版的
function getALLUnPublished(){
	
	commonSendAjaxGet('../production/allUnpublished/1/10','GET');
}

//获取所有已出版的
function getAllPublished(){
	
	commonSendAjaxGet('../production/allPublished/1/10','GET');
}

//根据作品ID获取我的作品
function getProductById(){
	
	commonSendAjaxGet('../production/product/4028818454b56f100154b56f42d40000','GET');
}

function getpublisher(){
	commonSendAjaxGet('../user/publisher/1/10','GET');
}

function commonSendAjaxGet(url) {
	$.ajax({
		url : url,
		type : 'Get',
		success : function(result, success, e) {
			console.log("status:" + result.status + ":message:"
					+ result.message);
			// debugger;
		},
		error : function(result, success, e) {
			console.log("status:" + result.status + ":message:"
					+ result.message);
		}
	});
}

function commonSendAjax(data, url, method) {
	var newdata = JSON.stringify(data);
	$.ajax({
		url : url,
		type : method,
		contentType : "application/json",
		data : newdata,
		dataType : "json",
		success : function(result, success, e) {
			console.log("status:" + result.status + ":message:"
					+ result.message);
			// debugger;
		},
		error : function(result, success, e) {
			console.log("status:" + result.status + ":message:"
					+ result.message);
		}
	});
}