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
					return {
						// TODO 增加isNull和isEmpty的区分
						isNull : function(v) {
							return v === null || v === undefined;
						},

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

						isInstanceof : function(sub, sup) {
							return sub instanceof sup;
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
						}
					};
				}());

(function() {

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

		var modify = null, type = null, n = null, extend = null, implement = null;
		if (index1 === -1 && index2 === -1) {
			// method,field
			var index = m.lastIndexOf(" ");
			modify = (index === -1 ? "" : m.substring(0, index + 1));
			n = m.substring(index + 1);
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
			// FIXME var defs = m.substring(index + 1).split(" ")
			var defs = m.substring(index).split(" "), len = defs.length;
			n = defs[1];
			if (len >= 4) {
				if (defs[2] === "extends") {
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
			name : n,
			extend : extend,
			implement : implement
		};
	};
	var proxy = function(f, b, t, a) {
		return (Object.isEmpty(b) && Object.isEmpty(t) && Object.isEmpty(a)) ? f
				: function() {
					// 判断权限private,default,protected,public
					// 判断是否可以被重写final
					(!Object.isEmpty(b) && Object.isFunction(b))
							&& b.apply(this, arguments);

					var result = null;
					try {
						result = (!Object.isEmpty(f) && Object.isFunction(f)) ? f
								.apply(this, arguments)
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
	var doAnnotations = function(self, m, methods) {
		if (Object.isFunction(m.getValue())) {
			// 方法上的注解
		} else {
			// 属性上的注解
			if (m.getName() && m.getName().length > 1
					&& m.getName().length != "_") {
				var name = m.getName().indexOf("_") === 0 ? m.getName()
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

	var $class = function(c, classloader) {
		// TODO 判断extend合法,判断name合法+判断类是否已经存在 class xxx extends yyy
		// implements
		// zzz,ttt
		var modify = convert(c["name"]), isRoot = false, isKernel = true, superClassDef = modify.extend, superInterfacesDef = modify.implement,

		empty = function() {
		}, obj = this;

		// 自身method和fields,不包含从父类继承来的
		this.fields = {};
		this.methods = {};
		this.statics = {};

		this.modifiers = modify.modifiers;
		this.annotations = modify.annotations;
		this.type = modify.type;
		this.fullName = modify.name;
		this.alias = c["alias"];
		this.packages = null;
		this.name = null;
		this.superClass = null;
		this.superInterfaces = [];

		this.classloader = classloader;
		this.instanceclass = function() {
		};

		switch (this.fullName) {

		case 'Object':
			isRoot = true;
			this.classConstructor = Object;
			break;
		case 'Function':
			this.classConstructor = Function;
			break;
		case 'Array':
			this.classConstructor = Array;
			break;
		case 'String':
			this.classConstructor = String;
			break;
		case 'Boolean':
			this.classConstructor = Boolean;
			break;
		case 'Number':
			this.classConstructor = Number;
			break;
		case 'Date':
			this.classConstructor = Date;
			break;
		case 'RegExp':
			this.classConstructor = RegExp;
			break;
		case 'Error':
			this.classConstructor = Error;
			break;
		case 'EvalError':
			this.classConstructor = EvalError;
			break;
		case 'RangeError':
			this.classConstructor = RangeError;
			break;
		case 'ReferenceError':
			this.classConstructor = ReferenceError;
			break;
		case 'SyntaxError':
			this.classConstructor = SyntaxError;
			break;
		case 'TypeError':
			this.classConstructor = TypeError;
			break;
		case 'URIError':
			this.classConstructor = URIError;
			break;

		default:
			isKernel = false;

			this.classConstructor = function() {
				// 原始构造器
				// 1设置class对象和hashCode值
				this.$class = obj;

				// 2.2初始化继承父类属性
				var sc = obj.getSuperClass();
				while (sc) {
					var f = sc.getFields();
					Object.each(f, function(i, v, o) {
						if (!obj.getFields()[i]) {
							var value = v.getValue();
							this[i] = value ? value.clone() : value;
						}
					}, this);
					// sc.getInitial().apply(this, arguments);
					sc = sc.getSuperClass();
				}

				// 3初始化自身定义属性
				Object.each(obj.getFields(), function(i, v, o) {
					var value = v.getValue();
					this[i] = value ? value.clone() : value;
				}, this);

				// 4用户构造器,先调用父类构造器以及initial方法
				var initial = obj.getInitial();
				initial && initial.apply(this, arguments);

				// 5执行默认初始化方法
				var init = obj.getInit();
				(init = init || this.init || empty).apply(this, arguments);

				// 6防止用户构造器修改class对象
				if (this.$class != obj)
					this.$class = obj;
			};

			break;
		}

		this.instance = this.classConstructor;

		this.name = fetch(this.fullName, function(name, value) {
			value[name] = this.classConstructor;
			value[name].$class = this;
			packages = value;
			return name;
		}, this);

		// 默认无参构造函数
		if (!c[this.name]) {
			c[this.name] = empty;
		}

		if (!isRoot) {

			if (superInterfacesDef) {
				var len = superInterfacesDef.length;
				for (var i = 0; i < len; i++) {
					this.superInterfaces[i] = fetch(superInterfacesDef[i],
							function(name, value) {
								return value[name];
							}).$class;
				}
			}

			this.superClass = (fetch(superClassDef, function(name, value) {
				return value[name];
			}) || Object).$class;

			// TODO 判断父类是否final
			if (!isKernel) {

				this.instanceclass.prototype = ((this.superClass) ? this.superClass.instance
						: Object).prototype;
				this.classConstructor.prototype = new this.instanceclass;
				this.classConstructor.prototype.constructor = this.classConstructor;

				if (this.superClass === Object.$class) {
					// TODO 拷贝js.lang.Object中的toString方法
					this.classConstructor.prototype.toString = Object.$class
							.getMethod("toString").getValue();
				}
			}
		}

		Object.each(c, function(i, v, o) {
			if (i != "name") {
				var m = convert(i);
				m = new attribute(m.name, v, this, m.modifiers, m.annotations);
				if (Object.isFunction(v)) {
					// 确保toString为原生
					if (isKernel && m.getName() === "toString") {
						this.methods[m.getName()] = m;
						return true;
					}
					this.addMethod(m, isKernel);
				} else {
					this.addField(m);
				}
			}
		}, this);

		fetch(this.alias, function(name, value) {
			value[name] = this.classConstructor;
		}, this);

		return this;
	};
	$class.prototype = {
		getClassLoader : function() {

			return this.classloader
					|| (window.js.lang.ClassLoader ? js.lang.ClassLoader
							.getSystemClassLoader() : null);
		},

		getConstructor : function() {
			return this.classConstructor;
		},
		getInitial : function() {
			return this.initial;
		},
		getInit : function() {
			return this.init;
		},
		getPackage : function() {
			return this.packages;
		},
		getDeclaredField : function(name) {
			return this.getField(name);
		},
		getDeclaredFields : function() {
			return this.getFields();
		},
		getField : function(name) {
			var v = this.fields[name];
			if (v) {
				return v;
			}
			throw new js.lang.NoSuchFieldException();
		},
		getFields : function() {
			return this.fields;
		},
		getDeclaredMethod : function(name) {
			return this.getMethod(name);
		},
		getDeclaredMethods : function() {
			return this.getMethods();
		},
		getMethod : function(name) {
			var v = this.methods[name];
			if (v) {
				return v;
			}
			throw new js.lang.NoSuchMethodException();
		},
		getMethods : function() {
			return this.methods;
		},
		getName : function() {
			return name;
		},
		getFullName : function() {
			return this.fullName;
		},
		getSuperClass : function() {
			return this.superClass;
		},
		getModifiers : function() {
			return this.modifiers;
		},
		getAnnotations : function() {
			return this.annotations;
		},

		// 构造器必须公有静态方法必须公有
		addMethod : function(m) {
			if (!Object.isEmpty(m) && Object.isFunction(m.getValue())) {
				if (m.getAnnotations() && m.getAnnotations().length) {
					doAnnotations(this, m, this.methods);
				}
				var n = m.getName();
				if (n === this.name) {
					if (this.name === "Object") {
						this.initial = m.getValue();
					} else {
						// 将构造器代理，默认调用父类构造器
						this.initial = proxy(m.getValue(), (this
								.getSuperClass() || Object.$class).getInitial());
					}

				} else {
					m.setValue(proxy(m.getValue()));
					m.setDeclaringClass(this);

					if (window.js && window.js.lang && window.js.lang.reflect
							&& window.js.lang.reflect.Method
							&& window.js.lang.reflect.Method.loaded) {
						m = new window.js.lang.reflect.Method(n, m.getValue(),
								this, m.getModifiers(), m.getAnnotations());
					}

					if ((m.getModifiers() & 8) != 0) {
						this.classConstructor[n] = m.getValue();
						this.statics[n] = m;
					} else {
						this.classConstructor.prototype[n] = m.getValue();
						this.methods[n] = m;
					}

					if (n === "init") {
						this.init = n;
					}
				}
			}
		},
		addField : function(m) {
			if (!Object.isEmpty(m) && !Object.isFunction(m.getValue())) {
				if (m.getAnnotations() && m.getAnnotations().length) {
					doAnnotations(this, m, this.methods);
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
					this.classConstructor[m.getName()] = m.getValue();
					this.statics[m.getName()] = m;
				} else {
					this.fields[m.getName()] = m;
				}
			}
		},
		getInstance : function() {
			return this.instance;
		},
		isInstance : function(obj) {
			return Object.isNull(obj) ? false : obj.getClass() === this;
		},
		newInstance : function() {
			return new this.classConstructor();
		},
		clone : function() {
			return this;
		},

		isAssignableFrom : function() {
			// TODO
			return false;
		},

		isInterface : function() {
			// TODO
			return false;
		},

		isArray : function() {
			// TODO
			return false;
		},
		isPrimitive : function() {
			// TODO
			return false;
		},
		isAnnotation : function() {
			// TODO
			return false;
		}

	};

	Class = function() {
	};
	Class.forName = function(cls, classloader) {
		return new $class(cls, classloader);
	};
})();

// TODO
// Function,Array,String,Boolean,Number,Date,RegExp,Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError对象的$class属性

