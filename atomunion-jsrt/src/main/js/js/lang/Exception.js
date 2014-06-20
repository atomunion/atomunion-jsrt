/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.Exception extends Object",
	"private message" : null,// 错误信息,多同description
	"private name" : null,// 错误名
	"private number" : null,// 错误号
	"private description" : null,// 描述
	"private fileName" : null,// 错误发生的文件( Only in FF )
	"private stack" : null,// 错误发生时的调用堆栈 FF Only 属性
	"private lineNumber" : null,
	Exception : function(message, fileName, lineNumber, stack) {
		this.message = message;
		this.fileName = fileName;
		this.stack = stack;
		this.lineNumber = lineNumber;
		this.name = "Exception";
	},
	getName : function() {
		return this.name;
	},
	getMessage : function() {
		return this.message;
	},
	getNumber : function() {
		return this.number;
	},
	getDescription : function() {
		return this.description;
	},
	getFileName : function() {
		return this.fileName;
	},
	getStack : function() {
		return this.stack;
	},
	getLineNumber : function() {
		return this.lineNumber;
	}
});
Object.extend([ Error, EvalError, RangeError, ReferenceError, SyntaxError,
		TypeError, URIError ], js.lang.Exception.$class.getMethods(),
		'prototype', '_value');

/**
 * ⅰ.静态方法 ⅱ.抽象类 ⅲ.类型（prototype，instanceof） ⅳ.继承 ⅴ.封装 ⅵ.class对象，反射
 */
