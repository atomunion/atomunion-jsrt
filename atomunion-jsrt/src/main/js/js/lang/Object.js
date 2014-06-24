/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */

Object.extend = function(d, s, k, m) {
	if (d === null || s === null || d === undefined || s === undefined
			|| typeof d === "number" || typeof s === "number"
			|| typeof d === "string" || typeof s === "string"
			|| typeof d === "boolean" || typeof s === "boolean") {
		return d;
	}
	if (Object.prototype.toString.call(s) === "[object Object]") {
		if (Object.prototype.toString.apply(d) !== "[object Array]"
				|| d === Array.prototype) {
			for ( var i in s) {
				if (s.hasOwnProperty(i)) {
					if (k) {
						if (!d[k]) {
							d[k] = {};
						}
						if (m) {
							d[k][i] = s[i][m];
						} else {
							d[k][i] = s[i];
						}
					} else {
						if (m) {
							d[i] = s[i] ? s[i][m] : null;
						} else {
							d[i] = s[i];
						}
					}

				}
			}
		} else {
			for (var j = 0; j < d.length; j++) {
				for ( var i in s) {
					if (s.hasOwnProperty(i)) {
						if (k) {
							if (!d[j]) {
								d[j] = {};
							}
							if (!d[j][k]) {
								d[j][k] = {};
							}
							if (m) {
								d[j][k][i] = s[i][m];
							} else {
								d[j][k][i] = s[i];
							}
						} else {
							if (m) {
								d[j][i] = s[i] ? s[i][m] : null;
							} else {
								d[j][i] = s[i];
							}
						}
					}
				}
			}
		}
	}
	return d;
};

Object
		.extend(
				Object,
				function() {
					var doNoting = function(x) {
						return x;
					}, NATIVE_JSON_STRINGIFY_SUPPORT = window.JSON
							&& typeof JSON.stringify === "function"
							&& JSON.stringify(0) === "0"
							&& typeof JSON.stringify(doNoting) === "undefined";
					return {
						
						//TODO 增加isNull和isEmpty的区分
						isEmpty : function(v) {
							return v === null || v === undefined
									|| ((Object.isArray(v) && !v.length))
									|| (Object.isString(v) && v.trim() === "");
						},

						isArray : function(v) {
							return Object.prototype.toString.apply(v) === "[object Array]";
						},

						isDate : function(v) {
							return Object.prototype.toString.apply(v) === "[object Date]";
						},

						isObject : function(v) {
							return !!v
									&& Object.prototype.toString.call(v) === "[object Object]";
						},

						isFunction : function(v) {
							return Object.prototype.toString.apply(v) === "[object Function]";
						},

						isNumber : function(v) {
							return typeof v === "number" && isFinite(v);
						},

						isString : function(v) {
							return typeof v === "string";
						},

						isBoolean : function(v) {
							return typeof v === "boolean";
						},

						isDefined : function(v) {
							return typeof v !== "undefined";
						},
						/*
						 * extend2 : function(d, s) { if (!Object.isEmpty(d) &&
						 * Object.isArray(d)) { for (var i = 0; i < d.length;
						 * i++) { Object.each(s, function(j, v, o) {
						 * d[i].prototype[j] = v.value; }); } } return d; },
						 */
						each : function(obj, fn, scope) {
							return Object.enumerate(obj, fn, scope, false);
						},
						enumerate : function(obj, fn, scope, pt) {
							if (Object.isEmpty(obj) || Object.isNumber(obj)
									|| Object.isString(obj)
									|| Object.isBoolean(obj)) {
								return;
							}
							if (Object.isArray(obj)) {
								if (fn.call(scope || obj[i], i, obj[i], obj) === false) {
									return i;
								}
							} else {
								for ( var p in obj) {
									if (pt || obj.hasOwnProperty(p)) {
										if (fn.call(scope || obj[p], p, obj[p],
												obj) === false) {
											return i;
										}
									}
								}
							}
							return true;
						},
						toJson : NATIVE_JSON_STRINGIFY_SUPPORT ? doNoting
								: doNoting,
						toQueryString : doNoting
					};
				}());
