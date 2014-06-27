/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */

Object.$class = Class.forName({
	name : "class Object",
	alias : "js.lang.Object",
	/** 主版本号 . 子版本号 [ 修正版本号 [. 编译版本号 ]] */
	"private _version" : "0.1.1.0001",
	Object : function() {
		this._hashCode = new Date().getTime().toString(16);
	},
	getClass : function() {
		return this.$class || Object.$class;
	},
	/** 指示某个其他对象是否与此对象“相等”。 */
	equals : function(obj) {
		return obj === this;
	},
	getVersion : function() {
		return this._version;
	},
	hashCode : function() {
		return this._hashCode;
	},
	toString : function() {
		// TODO String,Number,Boolean,Array等的toString()方法
		return this.getClass().getFullName() + "<" + this.hashCode() + ">";
	},

	clone : function() {
		var b = null;
		if (this instanceof Number || this instanceof String
				|| this instanceof Boolean) {
			return this.valueOf();
		} else if (this instanceof Function || this instanceof RegExp
				|| this instanceof Error || this instanceof EvalError
				|| this instanceof RangeError || this instanceof ReferenceError
				|| this instanceof SyntaxError || this instanceof TypeError
				|| this instanceof URIError) {
			return this;
		} else if (this instanceof Date) {
			b = new Date();
			b.setTime(this.getTime());
			return b;
		} else if (this.$class) {
			b = this.$class.newInstance();
		} else {
			b = this instanceof Array ? [] : {};
		}
		for ( var a in this) {
			if (a === "_hashCode") {
				b[a] = new Date().getTime().toString(16);
				continue;
			}
			if (this.hasOwnProperty(a)) {
				b[a] = this[a] ? this[a].clone() : this[a];
			}
		}
		return b;
	},
	toJson : (function() {
		var NATIVE_JSON_STRINGIFY_SUPPORT = window.JSON
				&& typeof JSON.stringify === "function"
				&& JSON.stringify(0) === "0"
				&& typeof JSON.stringify(function() {
				}) === "undefined";
		return function() {
			if (NATIVE_JSON_STRINGIFY_SUPPORT) {
				// TODO 只取public属性

				return this;
				// return JSON.stringify(this);
			}
			return this;
		};
	})(),
	toQueryString : function() {
		// TODO
		return this;
	}
});
