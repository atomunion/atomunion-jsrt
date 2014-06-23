/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.List");

Class.forName({
	name : "class js.util.Stack extends js.util.List",
	"private _table" : new Array(),
	"private _max" : 10,
	Stack : function(max) {
		this._max = max || 10;
	},
	"clone" : function() {
		var c = new js.util.Stack(this._max);
		var it = this.iterator();
		while (it.hasNext()) {
			var next = it.next();
			it.add(next ? next.clone() : next);
		}
		return c;
	},
	setMaxLength : function(max) {
		this._max = max || 10;
	},
	length : function() {
		return this._table.length;
	},
	clear : function() {
		var length = this.length();
		if (length > 0) {
			this._table.splice(0, length);
		}
	},
	pop : function() {
		return this._table.pop();
	},
	push : function(vargs) {
		if (this.length() > _max) {
			this._table.shift();
		}
		this._table.push(vargs);
	},
	empty : function() {
		return this._table.length <= 0;
	},
	peek : function() {
		if (this.empty()) {
			return null;
		}
		return this._table[this._table.length - 1];
	},
	search : function(ele) {
		return this._table.indexOf(ele);
	}
});
