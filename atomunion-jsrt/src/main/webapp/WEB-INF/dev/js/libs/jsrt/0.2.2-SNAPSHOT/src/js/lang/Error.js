/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
$import("js.lang.Throwable","BootstrapClassLoader");
Class.forName({
	name : "class Error",
	alias:"js.lang.Error",
	
	"private name" : "js.lang.Error",// 错误名
	"private number" : 1,
	
	Error : function(message, fileName, lineNumber, stack) {
		this.message = message;
		this.fileName = fileName;
		this.stack = stack;
		this.lineNumber = lineNumber;
	}


});

Object.extend(Error, js.lang.Throwable.$class.getMethods(),
        'prototype', '_value');

/*Object.extend([ Error, EvalError, RangeError, ReferenceError, SyntaxError,
TypeError, URIError ], js.lang.Throwable.$class.getMethods(),
'prototype', '_value');*/