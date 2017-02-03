$().ready(function(){
	$('#photo').bind('change', function() {
		var validate=checkFile();
	});
	function checkFile(){
		var path=$('#photo').val();
		var type = path.substring(path.lastIndexOf(".") + 1, path.length).toLowerCase();
		 if (type != "jpg" && type != "bmp" && type != "gif" && type != "png") {
             alert("请上传正确的图片格式");
             return path;
         }
         return path;
	};
	$("#uploadImg").click(function(){
		var options = {  
				   /*target: '#output',          //把服务器返回的内容放入id为output的元素中     */ 
				   beforeSubmit: function showRequest(){
				   },  //提交前的回调函数  
				   success: function uploadSuccess(data){   //提交后的回调函数  
					   debugger;
					   var html='<img src="/klkk/bookImg/'+data.data+'" width=100% height=100%/>';
					   $("#photoPrew").html(html);
					},      
				   url: '/klkk/book/bookphoto',   //默认是form的action， 如果申明，则会覆盖  (注意两种写法涉及到的跨域问题)
				   //type: type,               //默认是form的method（get or post），如果申明，则会覆盖  
				   dataType: 'json',           //html(默认), xml, script, json...接受服务端返回的类型  
				   //clearForm: true,          //成功提交后，清除所有表单元素的值  
				   //resetForm: true,          //成功提交后，重置所有表单元素的值  
				   timeout: 3000               //限制请求的时间，当请求大于3秒后，跳出请求  
		};  
		if($('#photo').val()==''){
			alert("图片为空");
		}
		else{
			debugger;
			$("#file").ajaxSubmit(options);   //ajaxform提交表单文件
		}
	});
})
