/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
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
			for (var i in s) {
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
				for (var i in s) {
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

Object.extend(Object, function() {
	var doNoting = function(x) {
		return x;
	}, NATIVE_JSON_STRINGIFY_SUPPORT = window.JSON
			&& typeof JSON.stringify === "function"
			&& JSON.stringify(0) === "0"
			&& typeof JSON.stringify(doNoting) === "undefined";
	return {
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
		clone : function() {
			return extend({}, this);
		},
		/*
		 * extend2 : function(d, s) { if (!Object.isEmpty(d) &&
		 * Object.isArray(d)) { for (var i = 0; i < d.length; i++) {
		 * Object.each(s, function(j, v, o) { d[i].prototype[j] = v.value; }); } }
		 * return d; },
		 */
		each : function(obj, fn, scope) {
			return Object.enumerate(obj, fn, scope, false);
		},
		enumerate : function(obj, fn, scope, pt) {
			if (Object.isEmpty(obj) || Object.isNumber(obj)
					|| Object.isString(obj) || Object.isBoolean(obj)) {
				return;
			}
			if (Object.isArray(obj)) {
				if (fn.call(scope || obj[i], i, obj[i], obj) === false) {
					return i;
				}
			} else {
				for (var p in obj) {
					if (pt || obj.hasOwnProperty(p)) {
						if (fn.call(scope || obj[p], p, obj[p], obj) === false) {
							return i;
						}
					}
				}
			}
			return true;
		},
		toJSON : NATIVE_JSON_STRINGIFY_SUPPORT ? doNoting : doNoting,
		toQueryString : doNoting
	};
}());
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
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
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */
 
 Object.extend(Array.prototype, {
			clear : function() {
				this.splice(0, this.length);
			},
			contains : function(elem) {
				return (Array.prototype.indexOf.call(this, elem) != -1)
						? true
						: false;
			},
			indexOf : function(elem) {
				for (var i = 0; i < this.length; i++) {
					if (this[i] == elem) {
						return i;
					}
				}
				return -1;
			},
			append : function(array, start, end) {
				if (!Object.isEmpty(array) && Object.isArray(array)) {
					start = start || 0;
					end = (end && end > start && end < array.length)
							? end
							: array.length;
					var parameter = Array.prototype.slice.call(array, start,
							end);
					Array.prototype.splice
							.call(parameter, 0, 0, this.length, 0);
					Array.prototype.splice.apply(this, parameter);
				}
				return this;
			}
		});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */

Class = function(c, classloader) {
	var packages = null, fullName = null, name = null, superclass = null, type = null, superinterfaces = [], modifiers = null, annotations = null;
	// 自身method和fields,不包含从父类继承来的

	var fields = {}, methods = {}, statics = {};
	// var reflect = {
	// fields : {},
	// methods : {},
	// statics : {}
	// };
	var empty = function() {
	}, initial = empty, init, constructor = function() {
		// 原始构造器
		// 1设置class对象和hashCode值
		this.$class = obj;
		this._hashCode = new Date().getTime().toString(16);

		// 2初始化继承父类属性
		var sc = obj.getSuperClass();
		while (sc && sc != Object.$class) {
			// 调用父类构造器
			var f = sc.getFields();
			Object.each(f, function(i, v, o) {
						if (!fields[i]) {
							var value = v.getValue();
							this[i] = value ? value.clone() : value;
						}
					}, this);
			sc.getInitial().apply(this, arguments);
			sc = sc.getSuperClass();
		}

		// 3初始化自身定义属性
		Object.each(fields, function(i, v, o) {
					var value = v.getValue();
					this[i] = value ? value.clone() : value;
				}, this);

		// 4用户构造器
		(initial = initial || empty).apply(this, arguments);

		// 5执行默认初始化方法
		(init = init || this.init || empty).apply(this, arguments);

		// 6防止用户构造器修改class对象
		if (this.$class != obj)
			this.$class = obj;
	}, instanceclass = function() {
	};
	var fetch = function(name, callback, scope) {
		if (Object.isEmpty(name)) {
			return null;
		}
		var emp = name.split("."), length = emp.length, temp = window;
		for (var j = 0; j < length - 1; j++) {
			temp[emp[j]] || (temp[emp[j]] = {});
			temp = temp[emp[j]];
		}
		return callback.call(scope, emp[j], temp);
	};

	var format = (function() {
		var regx1 = /(\s+$|^\s+)/g, regx2 = /\s*([,(=])\s*/g, regx3 = /\s*[)]\s*/g, regx4 = /\s{2,}/g;
		return function(str) {
			return str.replace(regx1, "").replace(regx2, "$1").replace(regx3,
					") ").replace(regx4, " ");
		};
	})();

	var attribute = function(name, value, declaringClass, modifiers,
			annotations) {
		this._name = name;
		this._value = value;
		this._declaringClass = declaringClass;
		this._modifiers = modifiers;
		this._annotations = annotations;
	};
	attribute.prototype = {
		getName : function() {
			return this._name;
		},
		setName : function(name) {
			this._name = name;
		},
		getValue : function() {
			return this._value;
		},
		setValue : function(value) {
			this._value = value;
		},
		getDeclaringClass : function() {
			return this._declaringClass;
		},
		setDeclaringClass : function(declaringClass) {
			this._declaringClass = declaringClass;
		},
		getModifiers : function() {
			return this._modifiers;
		},
		setModifiers : function(modifiers) {
			this._modifiers = modifiers;
		},
		getAnnotations : function() {
			return this._annotations;
		},
		setAnnotations : function(annotation) {
			this._annotations = annotation;
		}
	};
	var convert = function(m) {

		m = format(m);

		var index1 = m.indexOf("class ");
		var index2 = m.indexOf("interface ");

		var modify = null, type = null, name = null, extend = null, implement = null;
		if (index1 == -1 && index2 == -1) {
			// method,field
			var index = m.lastIndexOf(" ");
			modify = (index == -1 ? "" : m.substring(0, index + 1));
			name = m.substring(index + 1);
		} else {
			var index = null;
			if (index1 != -1) {
				index = index1;
				type = "class";
			} else {
				index = index2;
				type = "interface";
			}
			modify = m.substring(0, index);
			var defs = m.substring(index + 1).split(" "), len = defs.length;
			name = defs[1];
			if (len >= 4) {
				if (defs[2] == "extends") {
					extend = defs[3];
				} else {
					extend = "Object";
					implement = defs[3].split(",");
				}
				if (len >= 6) {
					implement = defs[5].split(",");
				}
			}
		}

		var regx = /@\S*/g;
		var isAbstract = modify.indexOf("abstract ") != -1, isInterface = modify
				.indexOf("interface ") != -1, isFinal = modify
				.indexOf("final ") != -1, isStatic = modify.indexOf("static ") != -1, isProtected = modify
				.indexOf("protected ") != -1, isPrivate = modify
				.indexOf("private ") != -1, isDefault = modify
				.indexOf("default ") != -1, isPublic = (modify
				.indexOf("public ") != -1 || (!isPrivate && !isDefault && !isProtected));

		/*
		 * abstract 1024, interface 512, final 16, static 8, protected 4,
		 * private 2 ,public 1,default 0
		 */
		var modifiers = 0;
		if (isAbstract) {
			modifiers += 1024;
		}
		if (isInterface) {
			modifiers += 512;
		}
		if (isFinal) {
			modifiers += 16;
		}
		if (isStatic) {
			modifiers += 8;
		}
		if (isProtected) {
			modifiers += 4;
		}
		if (isPrivate) {
			modifiers += 2;
		}
		if (isPublic) {
			modifiers += 1;
		}

		return {
			annotations : m.match(regx) || [],
			modifiers : modifiers,
			type : type,
			name : name,
			extend : extend,
			implement : implement
		};
	};
	var proxy = function(f, b, t, a) {
		return (Object.isEmpty(b) && Object.isEmpty(t) && Object.isEmpty(a))
				? f
				: function() {
					// 判断权限private,default,protected,public
					// 判断是否可以被重写final
					(!Object.isEmpty(b) && Object.isFunction(b))
							&& b.apply(this, arguments);

					var result = null;
					try {
						result = (!Object.isEmpty(f) && Object.isFunction(f))
								? f.apply(this, arguments)
								: f;
					} catch (e) {
						if (Object.isEmpty(t)) {
							throw e;
						} else {
							if (Object.isFunction(t))
								t.apply(this, arguments);
						}

					}
					(!Object.isEmpty(a) && Object.isFunction(a))
							&& a.apply(this, arguments);
					return result;
				};
	};
	var doAnnotations = function(self, m) {
		if (Object.isFunction(m.getValue())) {
			// 方法上的注解
		} else {
			// 属性上的注解
			if (m.getName() && m.getName().length > 1
					&& m.getName().length != "_") {
				var name = m.getName().indexOf("_") == 0 ? m.getName()
						.substring(1) : m.getName();
				name = name.charAt(0).toUpperCase() + name.substring(1);

				var modifier = (((m.getModifiers() & 8) != 0) ? 8 : 0) + 1;

				if (m.getAnnotations().contains("@Getter")) {
					var getName = "get" + name;
					if (!methods[getName]) {
						self.addMethod(new attribute(getName, function() {
									return this[m.getName()];
								}, self, modifier, []));
					}
				}
				if (m.getAnnotations().contains("@Setter")) {
					var setName = "set" + name;
					if (!methods[setName]) {
						self.addMethod(new attribute(setName, function(value) {
									this[m.getName()] = value;
								}, self, modifier, []));
					}
				}
			}
		}
	};
	var $class = function() {
		// TODO 判断extend合法,判断name合法+判断类是否已经存在 class xxx extends yyy implements
		// zzz,ttt
		var modify = convert(c["name"]);
		modifiers = modify.modifiers;
		annotations = modify.annotations;
		type = modify.type;
		fullName = modify.name;
		superclassDef = modify.extend;
		superinterfacesDef = modify.implement;

		if (fullName != "Object") {
			name = fetch(fullName, function(name, value) {
						value[name] = constructor;
						value[name].$class = this;
						packages = value;
						return name;
					}, this);

			if (superinterfacesDef) {
				var len = superinterfacesDef.length;
				for (var i = 0; i < len; i++) {
					superinterfaces[i] = fetch(superinterfacesDef[i], function(
									name, value) {
								return value[name];
							}).$class;
				}
			}
			superclass = (fetch(superclassDef, function(name, value) {
						return value[name];
					}) || Object).$class;

			// TODO 判断父类是否final

			instanceclass.prototype = ((superclass)
					? superclass.instance
					: Object).prototype;
			constructor.prototype = new instanceclass;
			constructor.prototype.constructor = constructor;

			if (superclass == Object.$class) {
				constructor.prototype.toString = function() {
					return this.getClass().getFullName() + " "
							+ this.hashCode();
				};
			}
		} else {
			constructor = Object;
		}

		Object.each(c, function(i, v, o) {
					if (i != "name") {
						var m = convert(i);
						m = new attribute(m.name, v, this, m.modifiers,
								m.annotations);
						if (Object.isFunction(v)) {
							this.addMethod(m);
						} else {
							this.addField(m);
						}
					}
				}, this);
		this.instance = constructor;
		return this;
	};
	$class.prototype = {
		getClassLoader : function() {

			return classloader
					|| (window.js.lang.ClassLoader ? js.lang.ClassLoader
							.getSystemClassLoader() : null);
		},

		getConstructor : function() {
			return constructor;
		},
		getInitial : function() {
			return initial;
		},
		getInit : function() {
			return init;
		},
		getPackage : function() {
			// TODO
			return packages;
		},
		getDeclaredField : function(name) {
			// TODO
			return this.getField(name);
		},
		getDeclaredFields : function() {
			// TODO
			return this.getFields();
		},
		getField : function(name) {
			var v = fields[name];
			if (v) {
				return v;
			}
			throw new js.lang.NoSuchFieldException();
		},
		getFields : function() {
			return fields;
		},
		getDeclaredMethod : function(name) {
			// TODO
			return this.getMethod(name);
		},
		getDeclaredMethods : function() {
			// TODO
			return this.getMethods();
		},
		getMethod : function(name) {
			var v = methods[name];
			if (v) {
				return v;
			}
			throw new js.lang.NoSuchMethodException();
		},
		getMethods : function() {
			return methods;
		},
		getName : function() {
			return name;
		},
		getFullName : function() {
			return fullName;
		},
		getSuperClass : function() {
			return superclass;
		},
		getModifiers : function() {
			return modifiers;
		},
		getAnnotations : function() {
			return annotations;
		},

		// 构造器必须公有静态方法必须公有
		addMethod : function(m) {
			if (!Object.isEmpty(m) && Object.isFunction(m.getValue())) {
				if (m.getAnnotations() && m.getAnnotations().length) {
					doAnnotations(this, m);
				}
				if (m.getName() == name) {
					initial = m.getValue();
				} else {
					m.setValue(proxy(m.getValue()));
					m.setDeclaringClass(this);

					if (window.js && window.js.lang && window.js.lang.reflect
							&& window.js.lang.reflect.Method
							&& window.js.lang.reflect.Method.loaded) {
						m = new window.js.lang.reflect.Method(m.getName(), m
										.getValue(), this, m.getModifiers(), m
										.getAnnotations());
					}

					if ((m.getModifiers() & 8) != 0) {
						constructor[m.getName()] = m.getValue();
						statics[m.getName()] = m;
					} else {
						constructor.prototype[m.getName()] = m.getValue();
						methods[m.getName()] = m;
					}
				}
			}
		},
		addField : function(m) {
			if (!Object.isEmpty(m) && !Object.isFunction(m.getValue())) {
				if (m.getAnnotations() && m.getAnnotations().length) {
					doAnnotations(this, m);
				}
				m.setDeclaringClass(this);
				if (window.js && window.js.lang && window.js.lang.reflect
						&& window.js.lang.reflect.Field
						&& window.js.lang.reflect.Field.loaded) {
					m = new window.js.lang.reflect.Field(m.getName(), m
									.getValue(), this, m.getModifiers(), m
									.getAnnotations());
				}

				if ((m.getModifiers() & 8) != 0) {
					constructor[m.getName()] = m.getValue();
					statics[m.getName()] = m;
				} else {
					fields[m.getName()] = m;
				}
			}
		},
		getInstance : function() {
			return constructor;
		},
		newInstance : function() {
			return new constructor();
		},
		clone : function() {
			return this;
		}
	};
	var obj = new $class();
	return obj;
};
Class.forName = function(c, loader) {
	return new Class(c, loader);
};
Object.$class = Class.forName({
			name : "class Object",
			/** 主版本号 . 子版本号 [ 修正版本号 [. 编译版本号 ]] */
			"private _version" : "0.1.1.0001",
			getClass : function() {
				return this.$class;
			},
			/** 指示某个其他对象是否与此对象“相等”。 */
			equals : function(obj) {
				return obj == this;
			},
			getVersion : function() {
				return this._version;
			},
			hashCode : function() {
				return this._hashCode;
			},
			clone : function() {
				var b = null;
				if (this instanceof Number || this instanceof String
						|| this instanceof Boolean) {
					return this.valueOf();
				} else if (this instanceof Function || this instanceof RegExp
						|| this instanceof Error || this instanceof EvalError
						|| this instanceof RangeError
						|| this instanceof ReferenceError
						|| this instanceof SyntaxError
						|| this instanceof TypeError
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
				for (var a in this) {
					if (a == "_hashCode") {
						b[a] = new Date().getTime().toString(16);
						continue;
					}
					if (this.hasOwnProperty(a)) {
						b[a] = this[a] ? this[a].clone() : this[a];
					}
				}
				return b;
			}

		});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 17, 2014
 */

Class.forName({
			name : "abstract class js.lang.ClassLoader extends Object",

			'@Setter @Getter private parent' : null,

			'@Setter @Getter private classes' : [],

			'private static SYSTEMLOADER' : null,

			"abstract loadClass" : function(scriptUrl, callback, scope,
					showBusy) {
			},
			'static getSystemClassLoader' : function(scriptUrl) {
				if (!js.lang.ClassLoader.SYSTEMLOADER) {
					js.lang.ClassLoader.SYSTEMLOADER = new js.net.URLClassLoader();
				}
				return js.lang.ClassLoader.SYSTEMLOADER;
			}
		});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class.forName({
	name : "class js.net.URLClassLoader extends js.lang.ClassLoader",

	'@Setter @Getter loadedScripts' : {},
	'@Setter @Getter waitingList' : {},
	'@Setter @Getter path' : [],

	URLClassLoader : function(parent) {
		this.parent = parent;
	},

	findClass : function(scriptUrl, notModify) {
		var isString = (Object.isString(scriptUrl));

		if (isString)
			scriptUrl = [scriptUrl];

		var classes = {}, path = this.path;
		if (!Object.isArray(scriptUrl)) {
			return classes;
		}

		for (var i = 0; i < scriptUrl.length; i++) {
			var src = url = scriptUrl[i];

			for (var j = 0; j < path.length; j++) {
				if (path[j] && path[j].name && path[j].url) {
					if (src.indexOf(path[j].name) == 0) {
						src = path[j].url + src.substring(path[j].name.length);
						break;
					}
				}
			}
			src = src.replace(/[.]/g, "/") + ".js";
			if (notModify) {
				src += "?t=" + new Date().getTime();
			}
			classes[url] = src;
		}
		return classes;
	},
	/**
	 * Loads one or more external script checking if not already loaded
	 * previously by this function.
	 * 
	 * @param {String|Array}
	 *            scriptUrl One or more URLs pointing to the scripts to be
	 *            loaded.
	 * @param {Function}
	 *            [callback] A function to be called when the script is loaded
	 *            and executed. If a string is passed to "scriptUrl", a boolean
	 *            parameter is passed to the callback, indicating the success of
	 *            the load. If an array is passed instead, two array parameters
	 *            are passed to the callback; the first contains the URLs that
	 *            have been properly loaded, and the second the failed ones.
	 * @param {Object}
	 *            [scope] The scope ("this" reference) to be used for the
	 *            callback call. Default to {@link Mclipse}.
	 * @param {Boolean}
	 *            [showBusy] Changes the cursor of the document while + * the
	 *            script is loaded.
	 *            @example
	 *            new js.lang.URLClassLoader().load( '/myscript.js' );
	 *            @example
	 *            new js.lang.URLClassLoader().load( '/myscript.js', function(
	 *            success ) { // Alerts "true" if the script has been properly
	 *            loaded. // HTTP error 404 should return "false". alert(
	 *            success ); });
	 *            @example
	 *            new js.lang.URLClassLoader().load( [ '/myscript1.js', '/myscript2.js' ], function( completed, failed )
	 *     {
	 *         alert( 'Number of scripts loaded: ' + completed.length );
	 *         alert( 'Number of failures: ' + failed.length );
	 *     });
	 */
	loadClass : function(scriptUrl, synchronous, notModify, callback, scope,
			showBusy) {

		var isString = (Object.isString(scriptUrl));

		if (isString)
			scriptUrl = [scriptUrl];

		if (!Object.isArray(scriptUrl)) {
			return false;
		}

		var scriptCount = scriptUrl.length, loadedScripts = this.loadedScripts, waitingList = this.waitingList, completed = [], failed = [];

		showBusy && document.setStyle('cursor', 'wait');
		if (!scope) {
			scope = this;
		}

		var doCallback = function(success) {
			if (callback) {
				if (isString)
					callback.call(scope, success);
				else
					callback.call(scope, completed, failed);
			}
			if (failed.length > 0) {
				throw new js.lang.ClassNotFoundException("Can't find Class named ("
						+ failed.join(",") + ")");
			}
		};

		if (scriptCount === 0) {
			doCallback(true);
			return true;
		}

		var checkLoaded = function(url, success) {
			(success ? completed : failed).push(url);

			if (--scriptCount <= 0) {
				showBusy && document.getDocumentElement().removeStyle('cursor');
				doCallback(success);
			}
		};

		var onLoad = function(url, success) {
			// Mark this script as loaded.
			loadedScripts[url] = 1;

			if (waitingList[url]) {
				// Get the list of callback checks waiting for this file.
				var waitingInfo = waitingList[url];
				delete waitingList[url];

				// Check all callbacks waiting for this file.
				for (var i = 0; i < waitingInfo.length; i++)
					waitingInfo[i](url, success);
			}

		};

		var loadScript = function(url, src) {

			// Create the <script> element.
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = src;

			if (script) {
				if ('addEventListener' in script) {
					script.onload = function() {
						onLoad(url, true);
					};
				} else if ('readyState' in script) { // for <IE9
					// Compatability
					script.onreadystatechange = function() {
						if (script.readyState == 'loaded'
								|| script.readyState == 'complete') {
							script.onreadystatechange = null;
							onLoad(url, true);
						}
					};
				} else {
					/** @ignore */
					script.onload = function() {
						// Some browsers, such as Safari, may call the
						// onLoad function
						// immediately. Which will break the loading
						// sequence. (#3661)
						setTimeout(function() {
									onLoad(url, true);
								}, 0);
					};

					// FIXME: Opera and Safari will not fire onerror.
					/** @ignore */
					script.onerror = function() {
						onLoad(url, false);
					};
				}
				// }

				// Append it to <head>.
				(document.head || document.getElementsByTagName("head")[0])
						.appendChild(script);
			}

		};

		var synchronousScript = function(url, src) {
			var isCrossOriginRestricted = false, xhr, status, isIE = /msie/
					.test(navigator.userAgent.toLowerCase());
			if (typeof XMLHttpRequest != 'undefined') {
				xhr = new XMLHttpRequest();
			} else {
				xhr = new ActiveXObject('Microsoft.XMLHTTP');
			}

			try {
				xhr.open('GET', src, false);
				xhr.send(null);
			} catch (e) {
				isCrossOriginRestricted = true;
			}

			status = (xhr.status === 1223)
					? 204
					: (xhr.status === 0 && ((self.location || {}).protocol == 'file:' || (self.location || {}).protocol == 'ionp:'))
							? 200
							: xhr.status;

			isCrossOriginRestricted = isCrossOriginRestricted || (status === 0);

			if (isCrossOriginRestricted) {
				onLoad(url, false);
			} else if ((status >= 200 && status < 300) || (status === 304)) {
				if (!isIE) {
					debugSourceURL = "\n//@ sourceURL=" + src;
				}

				eval(xhr.responseText + debugSourceURL);

				onLoad(url, true);
			} else {
				onLoad(url, false);
			}
			xhr = null;
		};

		for (var i = 0; i < scriptCount; i++) {

			var src = url = scriptUrl[i];

			if (this.parent
					&& this.parent.loadClass(url, synchronous, callback, scope,
							showBusy)) {
				continue;
			}

			var classes = this.findClass(src, notModify);

			if (loadedScripts[url]) {
				checkLoaded(url, true);
				continue;
			}

			var waitingInfo = waitingList[url] || (waitingList[url] = []);
			waitingInfo.push(checkLoaded);

			// Load it only for the first request.
			if (waitingInfo.length > 1) {
				continue;
			}

			if (synchronous) {
				loadScript(url, classes[url]);
			} else {
				synchronousScript(url, classes[url]);
			}
		}
		return true;
	}

});
$import = function(name) {
	js.lang.ClassLoader.getSystemClassLoader().loadClass(name);
};
Class.forName({
			name : "abstract class js.lang.reflect.Constructor extends Object"
		});

Class.forName({
			name : "public final class js.lang.reflect.Field extends Object",
			"@Setter @Getter private _declaringClass" : null,
			"@Setter @Getter private _name" : null,
			"@Setter @Getter private _modifiers" : null,
			"@Setter @Getter private _annotations" : null,
			"@Setter @Getter private _value" : null,
			Field : function(name, value, declaringClass, modifiers,
					annotations) {
				this._name = name;
				this._declaringClass = declaringClass;
				this._modifiers = modifiers;
				this._annotations = annotations;
				this._value = value;
			},
			clone : function() {
				return this;
			},
			"set" : function(obj, value) {
				obj[this._name] = value;
			},
			"get" : function(obj) {
				return obj[this._name];
			}
		});
js.lang.reflect.Field.loaded = true;Class.forName({
			name : "public final class js.lang.reflect.Method extends Object",

			"@Setter @Getter private _declaringClass" : null,
			"@Setter @Getter private _name" : null,
			"@Setter @Getter private _modifiers" : null,
			"@Setter @Getter private _annotations" : null,
			"@Setter @Getter private _value" : null,
			Method : function(name, methodAccessor, declaringClass, modifiers,
					annotations) {
				this._name = name;
				this._declaringClass = declaringClass;
				this._modifiers = modifiers;
				this._annotations = annotations;
				this._value = methodAccessor;
			},
			clone : function() {
				return this;
			},
			/** 对带有指定参数的指定对象调用由此 Method 对象表示的基础方法。 */
			invoke : function() {
				if (arguments.length > 0) {
					var obj = arguments[0];
					if (!obj || !this._value) {
						throw new js.lang.NullPointerException();
					} else if (obj[this._name]) {
						// TODO 判断权限是否可以被调用
						try {
							return this._value.apply(obj,
									Array.prototype.slice.call(arguments, 1));
						} catch (e) {
							throw new js.lang.reflect.InvocationTargetException(e
									.getMessage());
						}
					}
				}
				throw new js.lang.IllegalArgumentException();
			}
		});
js.lang.reflect.Method.loaded = true;/*
 * abstract 1024, interface 512, final 16, static 8, protected 4, private 2
 * ,public 1,default 0
 */
Class.forName({
			name : "public class js.lang.reflect.Modifier extends Object",

			/** 表示 abstract 修饰符的 int 的值。 2E10 */
			"public static final ABSTRACT" : 1024,

			/** 表示 interface 修饰符的 int 的值。 2E9 */
			"public static final INTERFACE" : 512,

			/** 表示 final 修饰符的 int 值。 2E4 */
			"public static final FINAL" : 16,

			/** 表示 static 修饰符的 int 值。 2E3 */
			"public static final STATIC" : 8,

			/** 表示 protected 修饰符的 int 值。 2E2 */
			"public static final PROTECTED" : 4,

			/** 表示 private 修饰符的 int 值。2E1 */
			"public static final PRIVATE" : 2,

			/** 表示 public 修饰符的 int 值。 2E0 */
			"public static final PUBLIC" : 1,

			/** 表示 default 修饰符的 int 值。 2E0 */
			"public static final DEFAULT" : 0,

			/** 如果整数参数包括 abstract 修饰符，则返回 true，否则返回 false。 */
			"public static isAbstract" : function(mod) {
				return (mod & js.lang.reflect.Modifier.ABSTRACT) != 0;
			},
			/** 如果整数参数包括 final 修饰符，则返回 true，否则返回 false。 */
			"public static isFinal" : function(mod) {
				return (mod & js.lang.reflect.Modifier.FINAL) != 0;
			},
			/** 如果整数参数包括 interface 修饰符，则返回 true，否则返回 false。 */
			"public static isInterface" : function(mod) {
				return (mod & js.lang.reflect.Modifier.INTERFACE) != 0;
			},
			/** 如果整数参数包括 private 修饰符，则返回 true，否则返回 false。 */
			"public static isPrivate" : function(mod) {
				return (mod & js.lang.reflect.Modifier.PRIVATE) != 0;
			},
			/** 如果整数参数包括 protected 修饰符，则返回 true，否则返回 false。 */
			"public static isProtected" : function(mod) {
				return (mod & js.lang.reflect.Modifier.PROTECTED) != 0;
			},
			/** 如果整数参数包括 public 修饰符，则返回 true，否则返回 false。 */
			"public static isPublic" : function(mod) {
				return (mod & js.lang.reflect.Modifier.PUBLIC) != 0;
			},
			/** 如果整数参数包括 static 修饰符，则返回 true，否则返回 false。 */
			"public static isStatic" : function(mod) {
				return (mod & js.lang.reflect.Modifier.STATIC) != 0;
			},
			"public static isDefault" : function(mod) {
				return (mod & js.lang.reflect.Modifier.DEFAULT) != 0;
			},
			clone : function() {
				return this;
			}
		});


Class.forName({
	name : "class js.lang.reflect.InvocationTargetException extends js.lang.Exception",
	"private name" : "InvocationTargetException",// 错误名
	"private number" : 100
		// 错误号
});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
			name : "class js.lang.Exception extends Object",
			"private message" : null,// 错误信息,多同description
			"private name" : null,// 错误名
			"private number" : null,// 错误号
			"private description" : null,// 描述
			"private fileName" : null,// 错误发生的文件( Only in FF )
			"private stack" : null,// 错误发生时的调用堆栈 FF Only 属性
			"private lineNumber" : null,
			Exception : function(message, fileName, lineNumber, stack) {
				this.message = message;
				this.fileName = fileName;
				this.stack = stack;
				this.lineNumber = lineNumber;
				this.name = "Exception";
			},
			getName : function() {
				return this.name;
			},
			getMessage : function() {
				return this.message;
			},
			getNumber : function() {
				return this.number;
			},
			getDescription : function() {
				return this.description;
			},
			getFileName : function() {
				return this.fileName;
			},
			getStack : function() {
				return this.stack;
			},
			getLineNumber : function() {
				return this.lineNumber;
			}
		});
Object.extend([Error, EvalError, RangeError, ReferenceError, SyntaxError,
				TypeError, URIError], js.lang.Exception.$class.getMethods(),
		'prototype', '_value');

/**
 * ⅰ.静态方法 ⅱ.抽象类 ⅲ.类型（prototype，instanceof） ⅳ.继承 ⅴ.封装 ⅵ.class对象，反射
 */
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.IllegalAccessException extends js.lang.Exception",
	"private name" : "IllegalAccessException",// 错误名
	"private number" : 21
		// 错误号
	});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.IllegalArgumentException extends js.lang.Exception",
	"private name" : "IllegalArgumentException",// 错误名
	"private number" : 20
		// 错误号
	});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.IllegalStateException extends js.lang.Exception",
	"private name" : "IllegalStateException",// 错误名
	"private number" : 22
		// 错误号
	});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.IndexOutOfBoundsException extends js.lang.Exception",
	"private name" : "IndexOutOfBoundsException",// 错误名
	"private number" : 11
		// 错误号
	});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
			name : "class js.lang.NoSuchFieldException extends js.lang.Exception",
			"private name" : "NoSuchFieldException",
			"private number" : 8
		});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
			name : "class js.lang.NoSuchMethodException extends js.lang.Exception",
			"private name" : "NoSuchMethodException",
			"private number" : 9
		});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
			name : "class js.lang.NullPointerException extends js.lang.Exception",
			"private name" : "NullPointerException",
			"private number" : 0
		});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */
 
 Class.forName({
	name : "class js.lang.UnsupportedOperationException extends js.lang.Exception",
	"private name" : "UnsupportedOperationException",// 错误名
	"private number" : 10
		// 错误号
});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 19, 2014
 */

Class.forName({
	name : "class js.lang.ClassNotFoundException extends js.lang.Exception",
	"private name" : "ClassNotFoundException",// 错误名
	"private number" : 7
		// 错误号
	});/*
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
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 atomunion, Inc. Released under the MIT license
 * 
 * Date: Feb 13, 2014
 */
 
 $import("js.io.Console");

Class.forName({
	name : "class js.lang.System extends Object",
	"static err" : null,// 错误流
	"static out" : new js.io.Console(window.console),// 输出流
	"private static _env" : (function() {
		var userAgent = navigator.userAgent, ua = userAgent.toLowerCase(), check = function(
				r) {
			return r.test(ua);
		}, DOC = document, docMode = DOC.documentMode, isStrict = DOC.compatMode == "CSS1Compat", isOpera = check(/opera/), isChrome = check(/\bchrome\b/), isWebKit = check(/webkit/), isSafari = !isChrome
				&& check(/safari/), isSafari2 = isSafari
				&& check(/applewebkit\/4/), // unique to Safari 2
		isSafari3 = isSafari && check(/version\/3/), isSafari4 = isSafari
				&& check(/version\/4/), isIE = !isOpera && check(/msie/), isIE7 = isIE
				&& (check(/msie 7/) || docMode == 7), isIE8 = isIE
				&& (check(/msie 8/) && docMode != 7), isIE6 = isIE && !isIE7
				&& !isIE8, isGecko = !isWebKit && check(/gecko/), isGecko2 = isGecko
				&& check(/rv:1\.8/), isGecko3 = isGecko && check(/rv:1\.9/), isBorderBox = isIE
				&& !isStrict, isWindows = check(/windows|win32/), isMac = check(/macintosh|mac os x/), isAir = check(/adobeair/), isLinux = check(/linux/), isSecure = /^https/i
				.test(window.location.protocol), isIE9 = false;

		return {
			userAgent : userAgent,
			strict : isStrict,
			opera : isOpera,
			chrome : isChrome,
			webkit : isWebKit,
			safari : isSafari,
			safari2 : isSafari2,
			safari3 : isSafari3,
			safari4 : isSafari4,
			ie : isIE,
			ie6 : isIE6,
			ie7 : isIE7,
			ie8 : isIE8,
			ie9 : isIE9,
			gecko : isGecko,
			isGecko2 : isGecko2,
			isGecko3 : isGecko3,
			isBorderBox : isBorderBox,
			isWindows : isWindows,
			isMac : isMac,
			isAir : isAir,
			isLinux : isLinux,
			isSecure : isSecure
		};
	})(),
	/**
	 * 获得指定的环境变量值
	 */
	"static getenv" : function(env) {
		return (env) ? this._env[env] : this._env;
	}

});
