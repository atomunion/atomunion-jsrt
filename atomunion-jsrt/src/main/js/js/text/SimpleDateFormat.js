/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 16, 2014
 */

$import("js.text.DateFormat");

/**
 * 字母 日期或时间元素 表示 示例
 * 
 * G Era 标志符 Text AD y 年 Year 1996; 96
 * 
 * M 年中的月份 Month July; Jul;07
 * 
 * w 年中的周数 Number 27
 * 
 * W 月份中的周数 Number 2
 * 
 * D 年中的天数 Number 189
 * 
 * d 月份中的天数 Number 10
 * 
 * F 月份中的星期 Number 2
 * 
 * E 星期中的天数 Text Tuesday; Tue
 * 
 * a Am/pm 标记 Text PM
 * 
 * H 一天中的小时数（0-23） Number 0
 * 
 * k 一天中的小时数（1-24） Number 24
 * 
 * K am/pm 中的小时数（0-11） Number 0
 * 
 * h am/pm 中的小时数（1-12） Number 12
 * 
 * m 小时中的分钟数 Number 30
 * 
 * s 分钟中的秒数 Number 55
 * 
 * S 毫秒数 Number 978
 * 
 * z 时区 General time zone Pacific Standard Time; PST; GMT-08:00
 * 
 * Z 时区
 */
Class.forName({
	name : "abstract class js.text.SimpleDateFormat extends js.text.DateFormat",
	'private _pattern' : null,
	SimpleDateFormat : function(pattern) {
		this._pattern = pattern;
	},

	/** 格式化一个对象以生成一个字符串。 */
	'format' : function(obj) {
	},
	/** 从给定字符串的开始分析文本，以生成一个日期。 */
	'parse' : function(source) {
	}
});
