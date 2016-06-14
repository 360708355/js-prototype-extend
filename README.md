# js-prototype-extend
这是一个通过原型的方式来扩展js方法的文件

注意：
运用原型方法有风险，请谨慎使用，弊端如下：
1.容易造成全局污染，和其他库冲突
2.出了Bug不太好定位问题
3.有可能出现代码向上不兼容的情况，比如定义了一个Object.prototype.clone。万一ES7、ES8也定义了这个函数，那旧代码不就会出现问题了嘛！
4.容易造成团队间的编写冲突，因为原型谁都能改

