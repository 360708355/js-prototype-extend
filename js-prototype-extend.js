//全局方法扩展
/*
 * 是否存在指定变量
 */
window.prototype.isExitsVariable = function(variableName){
	try {
        if (typeof(variableName) == "undefined") {
            console.log("value is undefined");
            return false;
        } else {
            console.log("value is true");
            return true;
        }
    } catch(e) {}
    return false;
}
/*
 * 阻止冒泡
 */
window.prototype.stopPropagation = function(ev){
	var ev = ev || window.event;
	if(ev.stopPropagation){
		ev.stopPropagation();	//w3c阻止方法
	}else{
		ev.cancelBubble = true;	//IE阻止方法
	}
}
/*
 * 阻止默认行为
 */
window.prototype.preventDefault = function(ev){
	var ev = ev || window.event;
	if(ev.preventDefault){
		ev.preventDefault();	//w3c阻止方法
	}else{
		ev.returnValue = false;	//IE阻止方法
		return false;
	}
}

//对象方法扩展
/*
 * 判断是否为json对象
 */
Object.prototype.isJson = function(){
	var isjson = typeof(this) == "object" && Object.prototype.toString.call(this).toLowerCase() == "[object object]" && !this.length;
    return isjson;
}
/*
 * 判断是否为空对象
 */
Object.prototype.isEmpty = function(){
	for(var name in this){return false;}
    return true;
}

//字符串方法扩展
/*
 * 字符串颠倒顺序
 */
String.prototype.reverse = function(){
	return this.split("").reverse().join("");
}
/*
 * 删除字符串左右两端的空格
 */
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
/*
 * 删除左边的空格
 */
String.prototype.ltrim = function(){
	return this.replace(/(^\s*)/g,"");
}
/*
 * 删除右边的空格
 */
String.prototype.rtrim = function(){
	return this.replace(/(\s*$)/g,"");
}
/*
 * 检测字符串中是否存在指定字符
 */
String.prototype.inString = function(char){
	return new RegExp(char).test(this);
}
/*
 * 判断如果超过指定字数则显示省略号或进行截取
 * this是要截取的文字,num是限定的字数
 * isEllipsis:true 添加省略号,false 不添加省略号
 */
 String.prototype.overTxtEllipsis = function(num,isEllipsis){
 	if(this == null){
        return this;
    }else{
        var len = this.length;
        var txtSubstr = "";
        if(len > num){
            txtSubstr = this.substr(0,num);
            if(isEllipsis == true){
                txtSubstr = txtSubstr+"...";
            }
        }else{
            txtSubstr = this;
        }
        return txtSubstr;
    }
 }
 /**
 * 用于把用utf16编码的字符转换成实体字符，以供后台存储
 * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
 * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
 */
 String.prototype.utf16toEntities = function(){
 	var patt=/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    str = this.replace(patt, function(char){
        var H, L, code;
        if (char.length===2) {
            H = char.charCodeAt(0); // 取出高位
            L = char.charCodeAt(1); // 取出低位
            code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
            return "&#" + code + ";";
        } else {
            return char;
        }
    });
    return str;
 }
/*
 * 过滤script语句
 */
String.prototype.stripscript = function(){
	return this.replace(/<script.*?>.*?<\/script>/ig,'');
}

//数组方法扩展
/*
 * 数组的indexOf扩展
 */
Array.prototype.indexOf = function(arr){
	for(var i=0,j;j=this[i];i++){
		if(j==arr){return i;}
	}
	return -1;
}
Array.prototype.lastIndexOf = function(arr){
	for(var i=this.length-1,j;j=this[i];i--){
		if(j==e){return i;}
	}
	return -1;
}
/*
 * 检测数组中是否存在指定元素
 */
Array.prototype.inArray = function(val){
	if (this.indexOf(val) > -1){return true;}     
    return false;
}

//数值方法扩展
/*
 * 计算小数保留多位小数
 * this是数值，pos是要保留几位
 */
 Number.prototype.formatFloat = function(pos){
 	pos = pos || 0;
 	if(pos == 0){
 		return Math.round(this);
 	}else{
 		var num = Math.round(this*Math.pow(10, pos))/Math.pow(10, pos);
	    num = num + "";
	    var index = num.indexOf(".");
	    var indexofNum = num.substr(index+1,num.length-1);
	    var indexofNumLen = indexofNum.length;
	    var zeroNum = "";
	    if(index == -1){
	    	for(var i=0;i<pos;i++){
	    		zeroNum += "0";
	    	}
	        num = num + "." + zeroNum;
	    }else if(indexofNumLen == 1){
	    	for(var i=0;i<pos-1;i++){
	    		zeroNum += "0";
	    	}
	        num = num + zeroNum;
	    }
	    return num;
 	}
}

//日期时间方法扩展
/*
 * 将时间戳转换为发表时间的格式
 */
Date.prototype.getCreateTimeTxtByLong = function(){
	var minute = 1000 * 60,
		hour = minute * 60,
		day = hour * 24,
		halfamonth = day * 15,
		month = day * 30;

    var result = "";
    var now = new Date().getTime();
    var diffValue = now - this;
    if(diffValue < 0){
        console.log("结束日期不能小于开始日期！");
        return false;
    }
    var monthC =diffValue/month,
    	weekC =diffValue/(7*day),
    	dayC =diffValue/day,
    	hourC =diffValue/hour,
    	minC =diffValue/minute;
    if(monthC>=1){
        result="发表于" + parseInt(monthC) + "个月前";
    }else if(weekC>=1){
        result="发表于" + parseInt(weekC) + "周前";
    }else if(dayC>=1){
        result="发表于"+ parseInt(dayC) +"天前";
    }else if(hourC>=1){
        result="发表于"+ parseInt(hourC) +"个小时前";
    }else if(minC>=1){
        result="发表于"+ parseInt(minC) +"分钟前";
    }else{
        result="刚刚发表";
    }
    return result;
}