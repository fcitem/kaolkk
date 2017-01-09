function isEmailValid(value){
	 re= /\w@\w*\.\w/;
	 return re.test(value);
}

function isValidPhone(value){
	re= /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
	return re.test(value);
}

/*
 * 文本框自我验证
 * id=组件ID
 * isEmpty=是否为空，true可以为空，false不能为空
 * length=最大长度
 * isFocus=验证失败时是否焦点
 * type=验证类型//目前有phone
 */
function checkField(id,isEmpty,length,isFoucs,type){
	var result = true;
	var component = $('#' + id)[0];
	if (component){
		var value = component.value;
		if (!isEmpty && !value.trim()){
			component.setAttribute("title","该字段不能为空");
			result = false;
		} else if (length && value.length > length){
			component.setAttribute("title","该字段的最大长度不能超过" + length);
			result = false;
		} else if (value && type && type == "phone"){
			if (!isValidPhone(value)){
				component.setAttribute("title","请输入正确的手机号码");
				result = false;
			}
		}
		if (!result){
			component.style.borderColor= "red";
//			component.style.outline = "none";
			if (isFoucs){
				component.focus();
			}
		} else {
			result = true;
			component.style.borderColor= "";
//			component.style.outline = "Blue 1px";
			component.removeAttribute("title");
		}
	} else {
		result = false;
	}
	return result;
}