/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 16, 2014
 */

$import("js.text.Format");

Class.forName({
	name : "abstract class js.text.DateFormat extends js.text.Format",
	
	'@Gatter @Setter protected calendar':null,

	DateFormat : function() {
	},

	/** 格式化一个对象以生成一个字符串。 */
	'final format' : function(obj) {
		if (Object.isInstanceof(obj, Date))
			return this.formatDate(obj).toString();
		else if (Object.isInstanceof(obj, Number))
			return this.formatDate(new Date(obj)).toString();
		else
			throw new js.lang.IllegalArgumentException(
					"Cannot format given Object as a Date");
	},

	/** 格式化一个对象以生成一个字符串。 */
	'abstract formatDate' : function(date) {
	},

	/** 从给定字符串的开始分析文本，以生成一个日期。 */
	'abstract parse' : function(source) {
	}

});
