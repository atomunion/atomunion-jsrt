/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.List");
$import("js.util.ValueIterator");

Class.forName({
	name : "class js.util.ValueList extends js.util.List",

	"private _element" : null,
	ValueList : function(element) {
		this._element = element;
	},
	iterator : function() {
		return new js.util.ValueIterator(this._element);
	}
});
