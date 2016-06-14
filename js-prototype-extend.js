//字符串颠倒顺序
String.prototype.reverse = function(){
	return this.split("").reverse().join("");
}
//数组的indexOf扩展
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