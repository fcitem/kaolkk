$().ready(function(){
	$('#photo').bind('change', function() {
		var validate=checkFile();
		if(validate){
			var str='<img id="imgId" src="'+$('#photo').val()+'" width="100%" height="100%"/>';
			$("#photo").html(str);
		}
	});
	function checkFile(){
		debugger;
		var path=$('#photo').val();
		alert(path);
		var type = path.substring(path.lastIndexOf(".") + 1, path.length).toLowerCase();
		 if (type != "jpg" && type != "bmp" && type != "gif" && type != "png") {
             alert("请上传正确的图片格式");
             return false;
         }
         return true;
	}
})
