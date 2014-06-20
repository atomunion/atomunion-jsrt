/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 13, 2014
 */

Class.forName({
	name : "class js.lang.StringBuffer extends Object",
	"private _strings" : new Array(),
	StringBuffer : function() {
	},
	append : function() {
		this._strings.append(Array.prototype.slice.call(arguments, 0));
		return this;
	},
	applys : function(array) {
		this._strings.append(array);
		return this;
	},
	clear : function() {
		this._strings.splice(0);
	},
	remove : function(start, end) {
		this._strings.splice(start, end - start);
	},
	substring : function(start, end) {
		return this._strings.slice(start, end).join("");
	},
	charAt : function(at) {
		return this.substring(at, at + 1);
	},
	indexOf : function(index) {
		return this._strings.indexOf(index);
	},
	length : function() {
		return this._strings.length;
	},
	toString : function(sp) {
		return this._strings.join(sp || "");
	}
});
