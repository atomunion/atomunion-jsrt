/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 17, 2014
 */

Class.forName({
	name : "abstract class js.lang.ClassLoader extends Object",

	'@Setter @Getter private parent' : null,

	'@Setter @Getter private classes' : [],

	'private static SYSTEMLOADER' : null,

	"abstract loadClass" : function(scriptUrl, callback, scope, showBusy) {
	},
	'static getSystemClassLoader' : function(scriptUrl) {
		if (!js.lang.ClassLoader.SYSTEMLOADER) {
			js.lang.ClassLoader.SYSTEMLOADER = new js.net.URLClassLoader();
		}
		return js.lang.ClassLoader.SYSTEMLOADER;
	}
});
