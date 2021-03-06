/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
$import("js.lang.Throwable");
Class.forName({
	name : "class TypeError",
	alias:"js.lang.TypeError",
	
	"private name" : "js.lang.TypeError",// 错误名
	"private number" : 6,
	
	TypeError : function() {
	}
});

Object.extend(TypeError, js.lang.Throwable.$class.getMethods(),
        'prototype', '_value');
