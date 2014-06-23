/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */

Object.extend(String.prototype, {
	trim : function() {
		var re = /^\s+|\s+$/g;
		return function() {
			return this.replace(re, "");
		};
	}()
});
