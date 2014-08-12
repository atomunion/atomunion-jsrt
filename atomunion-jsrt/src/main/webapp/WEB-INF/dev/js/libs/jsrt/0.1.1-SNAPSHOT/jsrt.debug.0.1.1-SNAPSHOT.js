/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */
var ECMA = true;
Object.extend = function(d, s, k, m, pros) {

	pros = pros || {};
	var writable = !!pros.writable, enumerable = !!pros.enumerable, configurable = !!pros.configurable;
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

						if (ECMA) {
							Object.defineProperty(d[k], i, {
								value : m ? s[i][m] : s[i],
								writable : writable,
								enumerable : enumerable,
								configurable : configurable
							});
						} else {

							d[k][i] = m ? s[i][m] : s[i];
						}
					} else {
						if (ECMA) {
							Object.defineProperty(d, i, {
								value : m ? (s[i] ? s[i][m] : null) : s[i],
								writable : writable,
								enumerable : enumerable,
								configurable : configurable
							});
						} else {
							d[i] = m ? (s[i] ? s[i][m] : null) : s[i];
						}
					}
				}
			}
		} else {
			for (var j = 0; j < d.length; j++) {
				for ( var i in s) {
					if (s.hasOwnProperty(i)) {
						if (!d[j]) {
							d[j] = {};
						}
						if (k) {
							if (!d[j][k]) {
								d[j][k] = {};
							}
							if (ECMA) {
								Object.defineProperty(d[j][k], i, {
									value : m ? s[i][m] : s[i],
									writable : writable,
									enumerable : enumerable,
									configurable : configurable
								});
							} else {
								d[j][k][i] = m ? s[i][m] : s[i];
							}
						} else {

							if (ECMA) {
								Object.defineProperty(d[j], i, {
									value : m ? (s[i] ? s[i][m] : null) : s[i],
									writable : writable,
									enumerable : enumerable,
									configurable : configurable
								});
							} else {

								d[j][i] = m ? (s[i] ? s[i][m] : null) : s[i];
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
								for (var i = 0, len = obj.length; i < len; i++) {

									if (fn
											.call(scope || obj[i], i, obj[i],
													obj) === false) {
										return i;
									}
								}
							} else {
								for ( var p in obj) {
									if (pt || obj.hasOwnProperty(p)) {
										if (fn.call(scope || obj[p], p, obj[p],
												obj) === false) {
											return p;
										}
									}
								}
							}
							return true;
						}
					};
				}(), null, null, {
					writable : false,
					enumerable : false,
					configurable : false
				});

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
				.indexOf("public ") != -1 || (!isPrivate && !isDefault && !isProtected)), isWritable = modify
				.indexOf("writable ") != -1, isEnumerable = modify
				.indexOf("enumerable ") != -1, isConfigurable = modify
				.indexOf("configurable ") != -1, isNonWritable = modify
				.indexOf("non-writeable ") != -1, isNonEnumerable = modify
				.indexOf("non-enumerable ") != -1, isNonConfigurable = modify
				.indexOf("non-configurable ") != -1;

		/*
		 * abstract 1024, interface 512, final 16, static 8, protected 4,
		 * private 2 ,public 1,default 0
		 */
		var modifiers = 0;

		if (isNonWritable) {
			modifiers += 65536;
		}

		if (isWritable) {
			modifiers += 32768;
		}

		if (isNonEnumerable) {
			modifiers += 16384;
		}
		if (isEnumerable) {
			modifiers += 8192;
		}

		if (isNonConfigurable) {
			modifiers += 4096;
		}

		if (isConfigurable) {
			modifiers += 2048;
		}

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

				if (m.getAnnotations().indexOf("@Getter") != -1) {
					var getName = "get" + name;
					if (!methods[getName]) {
						self.addMethod(new attribute(getName, function() {
							return this[m.getName()];
						}, self, modifier, []));
					}
				}
				if (m.getAnnotations().indexOf("@Setter") != -1) {
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

	var empty = function() {
	};

	var CodeHeap = function() {
		this.heap = [];
	};
	CodeHeap.prototype = {
		find : function(elem) {
			for (var i = 0, len = this.heap.length; i < len; i++) {
				if (this.heap[i].key === elem) {
					return this.heap[i].value;
				}
			}
			return null;
		},
		get : function($class, key) {

			var code = this.find($class);
			if (code) {
				return code[key];
			}
			throw new Error("illegal code heap states.");
		},
		set : function($class, key, value) {
			var code = this.find($class);
			if (code) {
				if (Object.isArray(key)) {
					Object.each(key, function(i, v, o) {
						code[v] = value;
					});
				} else {
					code[key] = value;
				}
			}
		},
		create : function($class, name, fullName, alias, packages, type,
				modifiers, annotations, fields, methods, statics, superClass,
				superInterfaces, classloader, instanceClass, classConstructor) {

			if (this.find($class)) {
				throw new Error("class or interface <" + fullName
						+ "> have already loaded!");
			}
			this.heap.push({
				key : $class,
				value : {
					name : name,
					fullName : fullName,
					alias : alias,

					packages : packages,
					type : type,
					modifiers : modifiers,
					annotations : annotations,

					// 自身method和fields,不包含从父类继承来的
					fields : fields || {},
					methods : methods || {},
					statics : statics || {},

					superClass : superClass,
					superInterfaces : superInterfaces || [],

					classloader : classloader,
					instanceClass : instanceClass || function() {
					},
					instance : classConstructor,
					classConstructor : classConstructor

				}
			});

		}
	};

	var heap = new CodeHeap();

	var $class = function(classDef, classloader) {
		// TODO 判断extend合法,判断name合法+判断类是否已经存在 class xxx extends yyy
		// implements
		// zzz,ttt
		var modify = convert(classDef["name"]), alias = classDef["alias"], fullName = modify.name, isRoot = false, isKernel = true, superClassDef = modify.extend, superInterfacesDef = modify.implement, classObj = this, classConstructor = null;

		heap.create(this, null, fullName, alias, null, modify.type,
				modify.modifiers, modify.annotations, null, null, null, null,
				null, classloader, null, null);

		switch (fullName) {

		case 'Object':
			isRoot = true;
			classConstructor = Object;
			break;
		case 'Function':
			classConstructor = Function;
			break;
		case 'Array':
			classConstructor = Array;
			break;
		case 'String':
			classConstructor = String;
			break;
		case 'Boolean':
			classConstructor = Boolean;
			break;
		case 'Number':
			classConstructor = Number;
			break;
		case 'Date':
			classConstructor = Date;
			break;
		case 'RegExp':
			classConstructor = RegExp;
			break;
		case 'Error':
			classConstructor = Error;
			break;
		case 'EvalError':
			classConstructor = EvalError;
			break;
		case 'RangeError':
			classConstructor = RangeError;
			break;
		case 'ReferenceError':
			classConstructor = ReferenceError;
			break;
		case 'SyntaxError':
			classConstructor = SyntaxError;
			break;
		case 'TypeError':
			classConstructor = TypeError;
			break;
		case 'URIError':
			classConstructor = URIError;
			break;

		default:
			isKernel = false;

			classConstructor = function() {
				// 原始构造器
				// 1设置class对象和hashCode值

				if (ECMA) {
					Object.defineProperty(this, "$class", {
						value : classObj,
						writable : false,
						enumerable : false,
						configurable : false
					});
				} else {
					this.$class = classObj;
				}

				// 2.2初始化继承父类属性
				var sc = classObj.getSuperClass();
				while (sc) {
					var f = sc.getFields();
					Object
							.each(
									f,
									function(i, v, o) {
										if (!classObj.getFields()[i]) {
											var value = v.getValue();

											value = value ? value.clone()
													: value;

											if (ECMA) {
												Object
														.defineProperty(
																this,
																i,
																{
																	value : value,
																	writable : (v
																			.getModifiers() & 65536) == 0,
																	enumerable : (v
																			.getModifiers() & 16384) == 0,
																	configurable : (v
																			.getModifiers() & 4096) == 0
																});
											} else {
												this[i] = value;
											}
										}
									}, this);
					// sc.getConstructor().apply(this, arguments);
					sc = sc.getSuperClass();
				}

				// 3初始化自身定义属性
				Object.each(classObj.getFields(), function(i, v, o) {
					var value = v.getValue();
					value = value ? value.clone() : value;
					if (ECMA) {
						Object.defineProperty(this, i, {
							value : value,
							writable : (v.getModifiers() & 65536) == 0,
							enumerable : (v.getModifiers() & 16384) == 0,
							configurable : (v.getModifiers() & 4096) == 0
						});
					} else {
						this[i] = value;
					}
				}, this);

				// 4用户构造器,先调用父类构造器以及constructor2方法
				var constructor2 = classObj.getConstructor();
				constructor2 && constructor2.apply(this, arguments);

				// 5执行默认初始化方法
				var initial = classObj.getInitial();
				(initial = initial || this.initial || empty).apply(this,
						arguments);

				// 6防止用户构造器修改class对象
				if (!ECMA && this.$class != classObj) {
					this.$class = classObj;
				}
			};

			break;
		}

		heap.set(this, [ "classConstructor", "instance" ], classConstructor);

		var name = fetch(fullName, function(name, value) {
			value[name] = classConstructor;
			value[name].$class = this;
			packages = value;
			return name;
		}, this);

		heap.set(this, "name", name);

		// 默认无参构造函数
		if (!classDef[name]) {
			classDef[name] = empty;
		}

		if (!isRoot) {

			if (superInterfacesDef) {
				var len = superInterfacesDef.length;

				var superInterfaces = heap.get(this, "superInterfaces");
				for (var i = 0; i < len; i++) {

					superInterfaces[i] = fetch(superInterfacesDef[i], function(
							name, value) {
						return value[name];
					}).$class;
				}
			}

			var superClass = (fetch(superClassDef, function(name, value) {
				return value[name];
			}) || Object).$class;

			heap.set(this, "superClass", superClass);

			// TODO 判断父类是否final
			if (!isKernel) {
				var instanceClass = heap.get(this, "instanceClass");
				instanceClass.prototype = ((superClass) ? heap.get(superClass,
						"instance") : Object).prototype;

				if (ECMA) {
					classConstructor.prototype = Object
							.create(instanceClass.prototype);
				} else {
					classConstructor.prototype = new instanceClass;
				}
				classConstructor.prototype.constructor = classConstructor;

				if (superClass === Object.$class) {
					// TODO 拷贝js.lang.Object中的toString方法
					classConstructor.prototype.toString = Object.$class
							.getMethod("toString").getValue();
				}
			}
		}

		Object.each(classDef, function(i, v, o) {
			if (i != "name") {
				var m = convert(i);
				m = new attribute(m.name, v, this, m.modifiers, m.annotations);
				if (Object.isFunction(v)) {
					// 确保toString为原生
					if (isKernel && m.getName() === "toString") {
						this.getMethods()[m.getName()] = m;
						return true;
					}
					this.addMethod(m);
				} else {
					this.addField(m);
				}
			}
		}, this);

		fetch(alias, function(name, value) {
			value[name] = classConstructor;
		}, this);

		return this;
	};
	$class.prototype = {
		getClassLoader : function() {

			return heap.get(this, "classloader")
					|| (window.js.lang.ClassLoader ? js.lang.ClassLoader
							.getSystemClassLoader() : null);
		},

		getClassConstructor : function() {
			return heap.get(this, "classConstructor");
		},
		getConstructor : function() {
			return heap.get(this, "constructor2");
		},
		getInitial : function() {
			return heap.get(this, "initial");
		},
		getPackage : function() {
			return heap.get(this, "packages");
		},
		getStatics : function() {
			return heap.get(this, "statics");
		},
		getDeclaredField : function(name) {
			return this.getField(name);
		},
		getDeclaredFields : function() {
			return this.getFields();
		},
		getField : function(name) {
			var v = heap.get(this, "fields")[name];
			if (v) {
				return v;
			}
			throw new js.lang.NoSuchFieldException();
		},
		getFields : function() {
			return heap.get(this, "fields");
		},
		getDeclaredMethod : function(name) {
			return this.getMethod(name);
		},
		getDeclaredMethods : function() {
			return this.getMethods();
		},
		getMethod : function(name) {
			var v = heap.get(this, "methods")[name];
			if (v) {
				return v;
			}
			throw new js.lang.NoSuchMethodException();
		},
		getMethods : function() {
			return heap.get(this, "methods");
		},
		getName : function() {
			return heap.get(this, "name");
		},
		getFullName : function() {
			return heap.get(this, "fullName");
		},
		getSuperClass : function() {
			return heap.get(this, "superClass");
		},
		getModifiers : function() {
			return heap.get(this, "modifiers");
		},
		getAnnotations : function() {
			return heap.get(this, "annotations");
		},

		// 构造器必须公有静态方法必须公有
		addMethod : function(m) {
			if (!Object.isEmpty(m) && Object.isFunction(m.getValue())) {
				if (m.getAnnotations() && m.getAnnotations().length) {
					doAnnotations(this, m, this.getMethods());
				}
				var n = m.getName(), name = heap.get(this, "name");
				if (n === name) {
					if (name === "Object") {
						heap.set(this, "constructor2", m.getValue());
					} else {
						// 将构造器代理，默认调用父类构造器
						heap.set(this, "constructor2", proxy(m.getValue(),
								(this.getSuperClass() || Object.$class)
										.getConstructor()));
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

						if (ECMA) {
							Object
									.defineProperty(
											this.getClassConstructor(),
											n,
											{
												value : m.getValue(),
												writable : (m.getModifiers() & 32768) != 0,
												enumerable : (m.getModifiers() & 8192) != 0,
												configurable : (m
														.getModifiers() & 2048) != 0
											});
						} else {
							this.getClassConstructor()[n] = m.getValue();
						}
						this.getStatics()[n] = m;
					} else {
						if (ECMA) {
							Object
									.defineProperty(
											this.getClassConstructor().prototype,
											n,
											{
												value : m.getValue(),
												writable : (m.getModifiers() & 32768) != 0,
												enumerable : (m.getModifiers() & 8192) != 0,
												configurable : (m
														.getModifiers() & 2048) != 0
											});
						} else {
							this.getClassConstructor().prototype[n] = m
									.getValue();
						}
						this.getMethods()[n] = m;
					}

					if (n === "initial") {
						heap.set(this, "initial", n);
					}
				}
			}
		},
		addField : function(m) {
			if (!Object.isEmpty(m) && !Object.isFunction(m.getValue())) {
				if (m.getAnnotations() && m.getAnnotations().length) {
					doAnnotations(this, m, this.getMethods());
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

					if (ECMA) {
						Object.defineProperty(this.getClassConstructor(), m
								.getName(), {
							value : m.getValue(),
							writable : (m.getModifiers() & 65536) == 0,
							enumerable : (m.getModifiers() & 16384) == 0,
							configurable : (m.getModifiers() & 4096) == 0
						});
					} else {
						this.getClassConstructor()[m.getName()] = m.getValue();
					}
					this.getStatics()[m.getName()] = m;
				} else {
					this.getFields()[m.getName()] = m;
				}
			}
		},
		getInstance : function() {
			return heap.get(this, "instance");
		},
		isInstance : function(obj) {
			return Object.isNull(obj) ? false : obj.getClass() === this;
		},
		newInstance : function() {
			return new (heap.get(this, "classConstructor"))();
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
			return heap.get(this, "type") === "interface";
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

/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */

Object.$class = Class.forName({
	name : "class Object",
	"non-enumerable non-writeable non-configurable alias" : "js.lang.Object",
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
	getVersion : (function() {
		/** 主版本号 . 子版本号 [ 修正版本号 [. 编译版本号 ]] */
		var version = "0.1.1.0001";
		return function() {
			return this.version || version;
		};
	})(),
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
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */

Class.forName({
	name : "class Array",
	alias : "js.lang.Array",
	Array : function() {
	},
	clear : function() {
		this.splice(0, this.length);
	},
	contains : function(elem) {
		return (Array.prototype.indexOf.call(this, elem) != -1) ? true : false;
	},
	indexOf : function(elem) {
		for (var i = 0, len = this.length; i < len; i++) {
			if (this[i] === elem) {
				return i;
			}
		}
		return -1;
	},
	append : function(array, start, end) {
		if (!Object.isEmpty(array) && Object.isArray(array)) {
			start = start || 0;
			end = (end && end > start && end < array.length) ? end
					: array.length;
			var parameter = Array.prototype.slice.call(array, start, end);
			Array.prototype.splice.call(parameter, 0, 0, this.length, 0);
			Array.prototype.splice.apply(this, parameter);
		}
		return this;
	}
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
Class.forName({
	name : "class Boolean",
	alias:"js.lang.Boolean",
	Boolean : function() {
	},
	"public equals" : function(s) {
		return Object.isBoolean(s) && this == s;
	}
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

Class.forName({
	name : "class Function",
	alias:"js.lang.Function",
	Function : function() {
	}
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

Class.forName({
	name : "class Number",
	
	alias:"js.lang.Number",
	Number : function() {
	},
	"public equals" : function(s) {
		return Object.isNumber(s) && this == s;
	}

});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */


Class.forName({
	name : "class RegExp",
	alias:"js.lang.RegExp",
	RegExp : function() {
	}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */

Class.forName({
	name : "class String",
	alias:"js.lang.String",
	String : function() {
	},
	"public trim" : function() {
		var re = /^\s+|\s+$/g;
		return function() {
			return this.replace(re, "");
		};
	}(),
	"public equals":function(s){
		return Object.isString(s) && this == s;
	}
	
	
	
});
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
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class
		.forName({
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
					scriptUrl = [ scriptUrl ];

				var classes = {}, path = this.path;
				if (!Object.isArray(scriptUrl)) {
					return classes;
				}

				for (var i = 0; i < scriptUrl.length; i++) {
					var src = url = scriptUrl[i];

					for (var j = 0; j < path.length; j++) {
						if (path[j] && path[j].name && path[j].url) {
							if (src.indexOf(path[j].name) === 0) {
								src = path[j].url
										+ src.substring(path[j].name.length);
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
			 *            scriptUrl One or more URLs pointing to the scripts to
			 *            be loaded.
			 * @param {Function}
			 *            [callback] A function to be called when the script is
			 *            loaded and executed. If a string is passed to
			 *            "scriptUrl", a boolean parameter is passed to the
			 *            callback, indicating the success of the load. If an
			 *            array is passed instead, two array parameters are
			 *            passed to the callback; the first contains the URLs
			 *            that have been properly loaded, and the second the
			 *            failed ones.
			 * @param {Object}
			 *            [scope] The scope ("this" reference) to be used for
			 *            the callback call. Default to {@link Mclipse}.
			 * @param {Boolean}
			 *            [showBusy] Changes the cursor of the document while + *
			 *            the script is loaded.
			 * @example new js.lang.URLClassLoader().load( '/myscript.js' );
			 * @example new js.lang.URLClassLoader().load( '/myscript.js',
			 *          function( success ) { // Alerts "true" if the script has
			 *          been properly loaded. // HTTP error 404 should return
			 *          "false". alert( success ); });
			 * @example new js.lang.URLClassLoader().load( [ '/myscript1.js',
			 *          '/myscript2.js' ], function( completed, failed ) {
			 *          alert( 'Number of scripts loaded: ' + completed.length );
			 *          alert( 'Number of failures: ' + failed.length ); });
			 */
			loadClass : function(scriptUrl, synchronous, notModify, callback,
					scope, showBusy) {

				var isString = (Object.isString(scriptUrl));

				if (isString)
					scriptUrl = [ scriptUrl ];

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
						throw new js.lang.ClassNotFoundException(
								"Can't find Class named (" + failed.join(",")
										+ ")");
					}
				};

				if (scriptCount === 0) {
					doCallback(true);
					return true;
				}

				var checkLoaded = function(url, success) {
					(success ? completed : failed).push(url);

					if (--scriptCount <= 0) {
						showBusy
								&& document.getDocumentElement().removeStyle(
										'cursor');
						doCallback(success);
					}
				};

				var onLoad = function(url, success) {
					// Mark this script as loaded.
					loadedScripts[url] = 1;

					if (waitingList[url]) {
						// Get the list of callback checks waiting for this
						// file.
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
								if (script.readyState === 'loaded'
										|| script.readyState === 'complete') {
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

					status = (xhr.status === 1223) ? 204
							: (xhr.status === 0 && ((self.location || {}).protocol === 'file:' || (self.location || {}).protocol === 'ionp:')) ? 200
									: xhr.status;

					isCrossOriginRestricted = isCrossOriginRestricted
							|| (status === 0);

					if (isCrossOriginRestricted) {
						onLoad(url, false);
					} else if ((status >= 200 && status < 300)
							|| (status === 304)) {
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

					// 1.判断内存中是否存在
					var u = url.split("."), ref = window;
					for (var j = 0, len = u.length; j < len; j++) {
						if (ref) {
							ref = ref[u[j]];
						} else {
							break;
						}
					}
					if (ref && !ref.equals(window)) {
						continue;
					}

					// 2.判断当前ClassLoader是否加载过。
					if (loadedScripts[url]) {
						checkLoaded(url, true);
						continue;
					}

					var waitingInfo = waitingList[url]
							|| (waitingList[url] = []);
					waitingInfo.push(checkLoaded);

					// Load it only for the first request.
					if (waitingInfo.length > 1) {
						continue;
					}

					if (this.parent
							&& this.parent.loadClass(url, synchronous,
									callback, scope, showBusy)) {
						continue;
					}

					var classes = this.findClass(src, notModify);

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
	// 1判断内存中是否存在 ， 2判断当前ClassLoader是否加载过。
	js.lang.ClassLoader.getSystemClassLoader().loadClass(name);
};/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

Class.forName({
	name : "class js.lang.Throwable extends Object",
	"private message" : null,// 错误信息,多同description
	"private name" : "js.lang.Throwable",// 错误名
	"private number" : null,// 错误号
	"private description" : null,// 描述
	"private fileName" : null,// 错误发生的文件( Only in FF )
	"private stack" : null,// 错误发生时的调用堆栈 FF Only 属性
	"private lineNumber" : null,
	Throwable : function(message, fileName, lineNumber, stack) {
		this.message = message;
		this.fileName = fileName;
		this.stack = stack;
		this.lineNumber = lineNumber;
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
/*Object.extend([ Error, EvalError, RangeError, ReferenceError, SyntaxError,
TypeError, URIError ], js.lang.Throwable.$class.getMethods(),
'prototype', '_value');*//*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
$import("js.lang.Throwable");
Class.forName({
	name : "class Error",
	alias:"js.lang.Error",
	
	"private name" : "js.lang.Error",// 错误名
	"private number" : 1,
	
	Error : function(message, fileName, lineNumber, stack) {
		this.message = message;
		this.fileName = fileName;
		this.stack = stack;
		this.lineNumber = lineNumber;
	}


});

Object.extend(Error, js.lang.Throwable.$class.getMethods(),
        'prototype', '_value');

/*Object.extend([ Error, EvalError, RangeError, ReferenceError, SyntaxError,
TypeError, URIError ], js.lang.Throwable.$class.getMethods(),
'prototype', '_value');*//*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

$import("js.lang.Throwable");
Class.forName({
	name : "class EvalError",
	alias:"js.lang.EvalError",
	
	"private name" : "js.lang.EvalError",// 错误名
	"private number" : 2,
	
	EvalError : function() {
	}
});

Object.extend(EvalError, js.lang.Throwable.$class.getMethods(),
        'prototype', '_value');
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

$import("js.lang.Throwable");
Class.forName({
	name : "class RangeError",
	alias:"js.lang.RangeError",
	
	"private name" : "js.lang.RangeError",// 错误名
	"private number" : 3,
	
	RangeError : function() {
	}
});
Object.extend(RangeError, js.lang.Throwable.$class.getMethods(),
        'prototype', '_value');
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
$import("js.lang.Throwable");
Class.forName({
	name : "class ReferenceError",
	alias:"js.lang.ReferenceError",
	
	"private name" : "js.lang.ReferenceError",// 错误名
	"private number" : 4,
	
	ReferenceError : function() {
	}
});

Object.extend(ReferenceError, js.lang.Throwable.$class.getMethods(),
        'prototype', '_value');
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
$import("js.lang.Throwable");
Class.forName({
	name : "class SyntaxError",
	alias:"js.lang.SyntaxError",
	
	"private name" : "js.lang.SyntaxError",// 错误名
	"private number" : 5,
	
	SyntaxError : function() {
	}
});

Object.extend(SyntaxError, js.lang.Throwable.$class.getMethods(),
        'prototype', '_value');
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
$import("js.lang.Throwable");
Class.forName({
	name : "class TypeError",
	alias:"js.lang.TypeError",
	
	"private name" : "js.lang.TypeError",// 错误名
	"private number" : 6,
	
	TypeError : function() {
	}
});

Object.extend(TypeError, js.lang.Throwable.$class.getMethods(),
        'prototype', '_value');
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */
$import("js.lang.Throwable");

Class.forName({
	name : "class URIError",
	alias:"js.lang.URIError",
	
	"private name" : "js.lang.URIError",// 错误名
	"private number" : 7,
	
	URIError : function() {
	}
});

Object.extend(URIError, js.lang.Throwable.$class.getMethods(),
                'prototype', '_value');
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */
$import("js.lang.Throwable");
Class.forName({
	name : "class js.lang.Exception extends js.lang.Throwable",

	"private name" : "js.lang.Exception",// 错误名
	"private number" : 0,// 错误号
	
	Exception : function(message, fileName, lineNumber, stack) {
		this.message = message;
		this.fileName = fileName;
		this.stack = stack;
		this.lineNumber = lineNumber;
	}

});

/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */


$import("js.lang.Error");
Class.forName({
	name : "class js.test.AssertionError extends js.lang.Error",
	"private name" : "js.test.AssertionError",// 错误名
	"private number" : -1
	

});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 15, 2014
 */

Class.forName({
	name : "class js.test.TestCase extends Object",
	"@Setter @Getter private _testObjects" : [],
	"@Setter @Getter private _autoTestObjects" : [],
	"@Setter @Getter private _testMethods" : [],
	TestCase : function() {
	},
	initial : function() {
		this.reset();
		this.injectTestObjects();
		this.injectTestMethods();
		this.main();
	},
	reset : function() {
		var objs = this.getTestObjects();
		if (objs) {
			objs.clear();
		}

		var autoObjs = this.getAutoTestObjects();
		if (autoObjs) {
			autoObjs.clear();
		}

		var methods = this.getTestMethods();
		if (methods) {
			methods.clear();
		}
	},
	injectTestObjects : function() {
		var fields = this.$class.getFields();
		Object.each(fields, function(i, v, o) {
			if (v.getAnnotations()) {
				if (v.getAnnotations().contains("@Test")) {
					this.getTestObjects().push(i);
				}
				if (v.getAnnotations().contains("@Auto")) {
					this.getAutoTestObjects().push(i);
				}
			}
		}, this);
	},
	injectTestMethods : function() {
		var methods = this.$class.getMethods();
		Object.each(methods, function(i, v, o) {
			if (i.indexOf("test") === 0) {
				this.getTestMethods().push(i);
			}
		}, this);

		/*
		 * for (var i in methods) { if (i.indexOf("test")===0) {
		 * this.getTestMethods().push(i); } }
		 */
	},
	getTestMethod : function(name) {
		var methods = this.$class.getMethods();
		var method = null;
		if (methods[name] && methods[name].getValue()) {
			method = methods[name].getValue();
		} else {
			throw new js.lang.NoSuchMethodException(
					"Test Object is missed! Details[name:" + name + "]");
		}
		return method;
	},
	getTestObject : function(name) {
		var field = null;
		if (this[name]) {
			field = this[name];
		} else {
			throw new js.lang.NoSuchFieldException(
					"Test Object is missed! Details[name:" + name + "]");
		}
		return field;
	},
	main : function() {
		var i = 0, length = this.getAutoTestObjects().length, j = 0, len = this
				.getTestMethods().length;
		for (; i < length; i++) {
			for (; j < len; j++) {
				this
						.run(this.getAutoTestObjects()[i], this
								.getTestMethods()[j]);
			}
		}
	},
	run : function(f, m) {
		var obj = this.getTestObject(f);
		var method = this.getTestMethod(m);

		var msg = [ "****TestCase { TestObject「", obj.toString(), "」,  Field「",
				f.toString(), "」,  Method「", m.charAt(4).toLowerCase(),
				m.substring(5), "」 }****" ];

		js.lang.System.out.group(msg.join(""));

		try {
			method.call(obj);
		} catch (e) {
			js.lang.System.out.error("%s", [ "Name<", e.getName(),
					">;  Number<", e.getNumber(), ">;  Message<",
					e.getMessage(), ">" ].join(""));
		}
		// if (!obj[name]) {
		// js.lang.System.out.warn("%s",
		// "this test unit case is not be promoted !");
		// }
		js.lang.System.out.groupEnd();
	}
});
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */

$import("js.test.AssertionError");
/**
 * A set of assertion methods useful for writing tests. Only failed assertions
 * are recorded. These methods can be used directly:
 * <code>Assert.assertEquals(...)</code>, however, they read better if they
 * are referenced through static import:<br/>
 * 
 * <pre>
 * $import(&quot;js.test.Assert&quot;);
 *    ...
 *    js.test.Assert.assertEquals(...);
 * </pre>
 * 
 * @see AssertionError
 */
Class
		.forName({
			name : "public class js.test.Assert",
			/**
			 * Protect constructor since it is a static only class
			 */
			"protected Assert" : function() {
			},
			/**
			 * Fails a test with the given message.
			 * 
			 * @param message
			 *            the identifying message for the {@link AssertionError} (<code>null</code>
			 *            okay)
			 * @see AssertionError
			 */
			"static public void fail" : function(message) {
				throw new js.test.AssertionError(message);
			},
			/**
			 * Asserts that a condition is true. If it isn't it throws an
			 * {@link AssertionError} with the given message.
			 * 
			 * @param message
			 *            the identifying message for the {@link AssertionError} (<code>null</code>
			 *            okay)
			 * @param condition
			 *            condition to be checked
			 */
			"static public void assertTrue" : function(message, condition) {
				if (!condition) {
					js.test.Assert.fail(message);
				}
			},

			/**
			 * Asserts that a condition is false. If it isn't it throws an
			 * {@link AssertionError} with the given message.
			 * 
			 * @param message
			 *            the identifying message for the {@link AssertionError} (<code>null</code>
			 *            okay)
			 * @param condition
			 *            condition to be checked
			 */
			"static public void assertFalse" : function(message, condition) {
				js.test.Assert.assertTrue(message, !condition);
			},

			/**
			 * Asserts that two objects are equal. If they are not, an
			 * {@link AssertionError} is thrown with the given message. If
			 * <code>expected</code> and <code>actual</code> are
			 * <code>null</code>, they are considered equal.
			 * 
			 * @param message
			 *            the identifying message for the {@link AssertionError} (<code>null</code>
			 *            okay)
			 * @param expected
			 *            expected value
			 * @param actual
			 *            actual value
			 */
			"static public void assertEquals" : function(message, expected,
					actual) {
				if (Object.isNull(expected) && Object.isNull(actual)) {
					return;
				}

				if (!Object.isNull(expected) && expected.equals(actual)) {
					return;
				}

				var formatted = new js.lang.StringBuffer();
				if (message != null && !message.equals("")) {
					formatted.append(message).append(" ");
				}

				formatted.append("expected:<");
				formatted.append(Object.isNull(expected) ? "null" : expected
						.toString());
				formatted.append("> but was:<");
				formatted.append(Object.isNull(actual) ? "null" : actual
						.toString());
				formatted.append(">");

				// TODO float类型判断
				js.test.Assert.fail(formatted.toString());
			},

			/**
			 * Asserts that two objects are <b>not</b> equals. If they are, an
			 * {@link AssertionError} is thrown with the given message. If
			 * <code>first</code> and <code>second</code> are
			 * <code>null</code>, they are considered equal.
			 * 
			 * @param message
			 *            the identifying message for the {@link AssertionError} (<code>null</code>
			 *            okay)
			 * @param first
			 *            first value to check
			 * @param second
			 *            the value to check against <code>first</code>
			 */
			"static public void assertNotEquals" : function(message, expected,
					actual) {

				if (!Object.isNull(expected)) {

					if (!expected.equals(actual)) {
						return;
					}
				} else {
					if (!Object.isNull(expected)) {
						return;
					}
				}

				// TODO float类型判断

				var formatted = new js.lang.StringBuffer();
				formatted.append("Values should be different. ");
				if (message != null) {
					formatted.append(message).append(". ");
				}

				formatted.append("Actual: ").append(actual);
				js.test.Assert.fail(formatted.toString());
			},

			/**
			 * Asserts that an object isn't null. If it is an
			 * {@link AssertionError} is thrown with the given message.
			 * 
			 * @param message
			 *            the identifying message for the {@link AssertionError} (<code>null</code>
			 *            okay)
			 * @param object
			 *            Object to check or <code>null</code>
			 */
			"static public void assertNotNull" : function(message, object) {
				js.test.Assert.assertTrue(message, !Object.isNull(object));
			},

			/**
			 * Asserts that an object is null. If it is not, an
			 * {@link AssertionError} is thrown with the given message.
			 * 
			 * @param message
			 *            the identifying message for the {@link AssertionError} (<code>null</code>
			 *            okay)
			 * @param object
			 *            Object to check or <code>null</code>
			 */
			"static public void assertNull" : function(message, object) {
				if (Object.isNull(object)) {
					return;
				}

				var formatted = new js.lang.StringBuffer();

				if (message != null) {
					formatted.append(message).append(" ");
				}

				formatted.append("expected null, but was:<").append(actual)
						.append(">");

				js.test.Assert.fail(formatted.toString());
			},

			/**
			 * Asserts that two objects refer to the same object. If they are
			 * not, an {@link AssertionError} is thrown with the given message.
			 * 
			 * @param message
			 *            the identifying message for the {@link AssertionError} (<code>null</code>
			 *            okay)
			 * @param expected
			 *            the expected object
			 * @param actual
			 *            the object to compare to <code>expected</code>
			 */
			"static public void assertSame" : function(message, expected,
					actual) {
				if (expected === actual) {
					return;
				}
				var formatted = new js.lang.StringBuffer();
				if (message != null) {
					formatted.append(message).append(" ");
				}

				formatted.append("expected same:<").append(expected).append(
						"> was not:<").append(actual).append(">");

				js.test.Assert.fail(formatted.toString());
			},

			/**
			 * Asserts that two objects do not refer to the same object. If they
			 * do refer to the same object, an {@link AssertionError} is thrown
			 * with the given message.
			 * 
			 * @param message
			 *            the identifying message for the {@link AssertionError} (<code>null</code>
			 *            okay)
			 * @param unexpected
			 *            the object you don't expect
			 * @param actual
			 *            the object to compare to <code>unexpected</code>
			 */
			"static public void assertNotSame" : function(message, unexpected,
					actual) {
				if (unexpected !== actual) {
					return;
				}

				var formatted = new js.lang.StringBuffer();
				if (message != null) {
					formatted.append(message).append(" ");
				}
				formatted.append("expected not same");
				js.test.Assert.fail(formatted.toString());
			},

			/**
			 * Asserts that <code>actual</code> satisfies the condition
			 * specified by <code>matcher</code>. If not, an
			 * {@link AssertionError} is thrown with information about the
			 * matcher and failing value. Example:
			 * 
			 * <pre>
			 * assertThat(0, is(1)); // fails:
			 * // failure message:
			 * // expected: is &lt;1&gt;
			 * // got value: &lt;0&gt;
			 * assertThat(0, is(not(1))) // passes
			 * </pre>
			 * 
			 * <code>org.hamcrest.Matcher</code> does not currently document
			 * the meaning of its type parameter <code>T</code>. This method
			 * assumes that a matcher typed as <code>Matcher&lt;T&gt;</code>
			 * can be meaningfully applied only to values that could be assigned
			 * to a variable of type <code>T</code>.
			 * 
			 * @param <T>
			 *            the static type accepted by the matcher (this can flag
			 *            obvious compile-time problems such as
			 *            {@code assertThat(1, is("a"))}
			 * @param actual
			 *            the computed value being compared
			 * @param matcher
			 *            an expression, built of {@link Matcher}s, specifying
			 *            allowed values
			 * @see org.hamcrest.CoreMatchers
			 * @see org.hamcrest.MatcherAssert
			 */
			"public static <T> void assertThat" : function(actual, matcher) {
				// TODO 正则表达式
			}
		});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class.forName({
	name : "abstract class js.lang.reflect.Constructor extends Object"
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */

Class.forName({
    name : "public final class js.lang.reflect.Field extends Object",
    "@Setter @Getter private _declaringClass" : null,
    "@Setter @Getter private _name" : null,
    "@Setter @Getter private _modifiers" : null,
    "@Setter @Getter private _annotations" : null,
    "@Setter @Getter private _value" : null,

    Field : function(name, value, declaringClass, modifiers, annotations) {
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
js.lang.reflect.Field.loaded = true;
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class.forName({
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
					return this._value.apply(obj, Array.prototype.slice.call(
							arguments, 1));
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
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

/**
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
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class
		.forName({
			name : "class js.lang.reflect.InvocationTargetException extends js.lang.Exception",
			"private name" : "InvocationTargetException",// 错误名
			"private number" : 100
		// 错误号
		});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.IllegalAccessException extends js.lang.Exception",
	"private name" : "js.lang.IllegalAccessException",// 错误名
	"private number" : 101
// 错误号
});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.IllegalArgumentException extends js.lang.Exception",
	"private name" : "js.lang.IllegalArgumentException",// 错误名
	"private number" : 102
// 错误号
});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.IllegalStateException extends js.lang.Exception",
	"private name" : "js.lang.IllegalStateException",// 错误名
	"private number" : 103
// 错误号
});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.IndexOutOfBoundsException extends js.lang.Exception",
	"private name" : "js.lang.IndexOutOfBoundsException",// 错误名
	"private number" : 104
// 错误号
});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.NoSuchFieldException extends js.lang.Exception",
	"private name" : "js.lang.NoSuchFieldException",
	"private number" : 105
});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.NoSuchMethodException extends js.lang.Exception",
	"private name" : "js.lang.NoSuchMethodException",
	"private number" : 106
});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class.forName({
	name : "class js.lang.NullPointerException extends js.lang.Exception",
	"private name" : "js.lang.NullPointerException",
	"private number" : 107
});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 12, 2014
 */

Class
		.forName({
			name : "class js.lang.UnsupportedOperationException extends js.lang.Exception",
			"private name" : "js.lang.UnsupportedOperationException",// 错误名
			"private number" : 108
		// 错误号
		});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 19, 2014
 */

Class.forName({
	name : "class js.lang.ClassNotFoundException extends js.lang.Exception",
	"private name" : "js.lang.ClassNotFoundException",// 错误名
	"private number" : 100
// 错误号
});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class.forName({
			name : "abstract class js.io.Writer extends Object",
			"protected _writer" : null,
			Writer : function(writer) {
				this._writer = writer;
			},

			/** 将指定字符追加到此 writer。 */
			append : function(c) {
				return this;
			},
			/** 写入字符数组,字符,字符串或某一部分 */
			write : function(cbuf, off, len) {
			}
		});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class.forName({
			name : "class js.io.PrintWriter extends js.io.Writer",
			PrintWriter : function() {
			},
			print : function(cbuf, off, len, ln) {
			},
			println : function(cbuf, off, len) {
				this.print(cbuf, off, len, true);
			}
		});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

$import("js.io.PrintWriter");

Class
		.forName({
			name : "class js.io.Console extends js.io.PrintWriter",
			Console : function(writer) {
				if (writer && writer.log && typeof writer.log != 'function') {
					this._ie = true;
				}
				this._writer = writer;
			},
			"private unsupport" : function() {
				var msg = null;
				if (arguments.length <= 0) {
					msg = "Your browser console don\'t support the output instruction. Please check your browser version:\""
							+ js.lang.System.getenv("userAgent") + "\"";
				} else {
					msg = Array.prototype.slice.call(arguments).join(' ; ');
				}
				alert(msg);
			},
			print : function(buf, off, len, ln) {
				var cbuf = buf;
				if (!Object.isEmpty(cbuf)) {
					if (!Object.isString(cbuf) && !Object.isArray(cbuf)) {
						cbuf = cbuf.toString();
					}
					var str = null;
					if (!off || off < 0)
						off = 0;
					if (!len) {
						len = cbuf.length - off;
					} else if (off + len > cbuf.length)
						len = cbuf.length - off;

					if (Object.isString(cbuf)) {
						str = cbuf.substring(off, len + off);
					} else {
						str = cbuf.slice(off, len + off);
					}
					this.log("%s", ln ? str + "\n" : str);

				}
			},
			/** 判断一个表达式或变量是否为真。如果结果为否，则在控制台输出一条相应信息，并且抛出一个异常 */
			assert : function() {
				return (this._writer.assert || this.unsupport).apply(
						this._writer, arguments);
			},

			/**
			 * 打印日志信息，支持printf风格的占位符。只支持字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）四种。 比如，
			 * log("%d年%d月%d日",2011,3,26); log("圆周率是%f",3.1415926);
			 */
			log : function() {

				if (this._ie && this._writer.log) {
					if (arguments.length === 1) {
						this._writer.log(arguments[0]);
					} else if (arguments.length > 1) {
						this._writer.log(arguments[0], arguments[1]);
					}
					return;
				}

				return (this._writer.log || this.unsupport).apply(this._writer,
						arguments);

			},

			/**
			 * 打印一般信息，支持printf风格的占位符。
			 */
			info : function() {

				if (this._ie && this._writer.info) {
					if (arguments.length === 1) {
						this._writer.info(arguments[0]);
					} else if (arguments.length > 1) {
						this._writer.info(arguments[0], arguments[1]);
					}
					return;
				}

				return (this._writer.info || this.unsupport).apply(
						this._writer, arguments);
			},

			/**
			 * 打印警告提示，支持printf风格的占位符。
			 */
			warn : function() {

				if (this._ie && this._writer.warn) {
					if (arguments.length === 1) {
						this._writer.warn(arguments[0]);
					} else if (arguments.length > 1) {
						this._writer.warn(arguments[0], arguments[1]);
					}
					return;
				}

				return (this._writer.warn || this.unsupport).apply(
						this._writer, arguments);
			},

			/**
			 * 打印误提示，支持printf风格的占位符。
			 */
			error : function() {

				if (this._ie && this._writer.error) {
					if (arguments.length === 1) {
						this._writer.error(arguments[0]);
					} else if (arguments.length > 1) {
						this._writer.error(arguments[0], arguments[1]);
					}
					return;
				}

				return (this._writer.error || this.unsupport).apply(
						this._writer, arguments);
			},

			/**
			 * 可以显示一个对象所有的属性和方法。
			 */
			dir : function() {
				return (this._writer.dir || this.unsupport).apply(this._writer,
						arguments);
			},

			/**
			 * profile()和profileEnd()，用来显示代码的性能分析。
			 * 
			 * profile("性能分析器一"); ----待检测的代码---- profileEnd();
			 */
			profile : function() {
				return (this._writer.profile || this.unsupport).apply(
						this._writer, arguments);
			},

			profileEnd : function() {
				return (this._writer.profileEnd || this.unsupport).apply(
						this._writer, arguments);
			},

			/** ie9,firfox */
			clear : function() {
				if (this._ie && this._writer.clear) {
					return this._writer.clear();
				}
				return (this._writer.clear || this.unsupport).apply(
						this._writer, arguments);
			},

			/**
			 * 用来追踪函数的调用轨迹。
			 * 
			 * 
			 * 比如，有一个加法器函数。
			 * 
			 * <pre>
			 * function add(a, b) {
			 * 	return a + b;
			 * }
			 * </pre>
			 * 
			 * 如果想知道这个函数是如何被调用的，在其中加入console.trace()方法就可以了。
			 * 
			 * <pre>
			 * function add(a, b) {
			 * 	console.trace();
			 * 	return a + b;
			 * }
			 * </pre>
			 * 
			 * 假定这个函数的调用代码如下：
			 * 
			 * <pre>
			 * var x = add3(1, 1);
			 * function add3(a, b) {
			 * 	return add2(a, b);
			 * }
			 * function add2(a, b) {
			 * 	return add1(a, b);
			 * }
			 * function add1(a, b) {
			 * 	return add(a, b);
			 * }
			 * </pre>
			 * 
			 * 运行后，会显示add()的调用轨迹，从上到下依次为add()、add1()、add2()、add3()。
			 * 
			 */
			trace : function() {
				return (this._writer.trace || this.unsupport).apply(
						this._writer, arguments);
			},
			/**
			 * 打印调试信息，支持printf风格的占位符。
			 */
			debug : function() {
				return (this._writer.debug || this.unsupport).apply(
						this._writer, arguments);
			},

			/**
			 * 用来显示网页的某个节点（node）所包含的html/xml代码。比如，先获取一个表格节点，然后，显示该节点包含的代码。
			 * dirxml(document.getElementById("ID"));
			 */
			dirxml : function() {
				return (this._writer.dirxml || this.unsupport).apply(
						this._writer, arguments);
			},

			/**
			 * 如果信息太多，可以分组显示，用到的方法是console.group()和console.groupEnd()。
			 */
			group : function() {
				if (this._ie) {
					return this.println(arguments[0]
							|| "***************start*****************");
				}
				return (this._writer.group || this.unsupport).apply(
						this._writer, arguments);
			},
			groupCollapsed : function() {
				return (this._writer.groupCollapsed || this.unsupport).apply(
						this._writer, arguments);
			},
			/**
			 * 如果信息太多，可以分组显示，用到的方法是console.group()和console.groupEnd()。
			 */
			groupEnd : function() {
				if (this._ie) {
					return this.println(arguments[0]
							|| "***************end*****************");
				}
				return (this._writer.groupEnd || this.unsupport).apply(
						this._writer, arguments);
			},
			markTimeline : function() {
				return (this._writer.markTimeline || this.unsupport).apply(
						this._writer, arguments);
			},
			/**
			 * time()和timeEnd()，用来显示代码的运行时间。
			 * 
			 * time("计时器一"); ----待检测的代码---- timeEnd("计时器一");
			 */
			time : function() {
				return (this._writer.time || this.unsupport).apply(
						this._writer, arguments);
			},
			timeEnd : function() {
				return (this._writer.timeEnd || this.unsupport).apply(
						this._writer, arguments);
			},
			timeStamp : function() {
				return (this._writer.timeStamp || this.unsupport).apply(
						this._writer, arguments);
			},
			count : function() {
				return (this._writer.count || this.unsupport).apply(
						this._writer, arguments);
			}
		});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
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
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 13, 2014
 */

$import("js.io.Console");

Class
		.forName({
			name : "class js.lang.System extends Object",
			"static err" : null,// 错误流
			"static out" : new js.io.Console(window.console),// 输出流
			"private static _env" : (function() {
				var userAgent = navigator.userAgent, ua = userAgent
						.toLowerCase(), check = function(r) {
					return r.test(ua);
				}, DOC = document, docMode = DOC.documentMode, isStrict = DOC.compatMode === "CSS1Compat", isOpera = check(/opera/), isChrome = check(/\bchrome\b/), isWebKit = check(/webkit/), isSafari = !isChrome
						&& check(/safari/), isSafari2 = isSafari
						&& check(/applewebkit\/4/), // unique to Safari 2
				isSafari3 = isSafari && check(/version\/3/), isSafari4 = isSafari
						&& check(/version\/4/), isIE = !isOpera
						&& check(/msie/), isIE7 = isIE
						&& (check(/msie 7/) || docMode === 7), isIE8 = isIE
						&& (check(/msie 8/) && docMode !== 7), isIE6 = isIE
						&& !isIE7 && !isIE8, isGecko = !isWebKit
						&& check(/gecko/), isGecko2 = isGecko
						&& check(/rv:1\.8/), isGecko3 = isGecko
						&& check(/rv:1\.9/), isBorderBox = isIE && !isStrict, isWindows = check(/windows|win32/), isMac = check(/macintosh|mac os x/), isAir = check(/adobeair/), isLinux = check(/linux/), isSecure = /^https/i
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
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class.forName({
	name : "class js.net.http.Http extends Object",
	"public static REQUEST" : {
		TYPE : [ "GET", "HEAD", "PUT", "DELETE", "POST", "OPTIONS" ]
	},
	Http : function() {
	}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class.forName({
	name : "class js.net.http.Rest extends Object",
	Rest : function() {
	},
	build : (function() {
		var regx1 = /\/{2,}/g, regx2 = /\/$/g;
		return function() {
			if (arguments.length > 0) {
				if (!Object.isEmpty(arguments[0])
						&& Object.isString(arguments[0])) {
					var _method = arguments[0].toUpperCase();
					if (com.js.net.http.HTTP.REQUEST.TYPE.contains(_method)) {
						var temp = new StringBuffer();
						var url = temp.append("").applys(
								Array.prototype.slice.call(arguments, 1))
								.toString("/");
						temp.clear();
						temp.append(
								url.trim().replace(regx1, "/").replace(regx2,
										"")).append("?_method=")
								.append(_method);
						return temp.toString();
					}
				}
			}
			return null;
		};
	})()
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 16, 2014
 */

Class.forName({
	name : "abstract class js.text.Format extends Object",
	Format : function() {
	},

	/** 格式化一个对象以生成一个字符串。 */
	'abstract format' : function(obj) {
	},

	/** 从给定字符串的开始处分析文本以生成一个对象。 */
	'abstract parse' : function(source) {
	}
});
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
	DateFormat : function() {
	},

	/** 格式化一个对象以生成一个字符串。 */
	'abstract format' : function(obj) {
	},
	/** 从给定字符串的开始分析文本，以生成一个日期。 */
	'abstract parse' : function(source) {
	}

});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
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
Class
		.forName({
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
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

Class.forName({
	name : "class js.util.Iterator extends Object",
	"private _element" : null,
	"private _cursor" : 0,
	"private _lastRet" : -1,
	Iterator : function(element) {
		this._element = element || [];
	},

	hasNext : function() {
		return this._cursor < this._element.size();
	},

	next : function() {
		try {
			var next = this._element.get(this._cursor);
			this._lastRet = this._cursor++;
			return next;
		} catch (e) {
			throw new js.lang.IndexOutOfBoundsException("Index: "
					+ this._cursor + ", Size: " + this._element.size()
					+ ",Message:" + e.getMessage());
		}
	},
	remove : function() {
		if (this._lastRet === -1)
			throw new js.lang.IllegalStateException();
		try {
			this._element.removeAt(this._lastRet);
			if (this._lastRet < this._cursor)
				this._cursor--;
			this._lastRet = -1;
		} catch (e) {
			throw new js.lang.IndexOutOfBoundsException();
		}
	}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Iterator");

Class.forName({
	name : "class js.util.LinkIterator extends js.util.Iterator",

	LinkIterator : function(element, index) {
		this._element = element;
		this._cursor = index || 0;
	},

	"hasPrevious" : function() {
		return this._cursor > 0;
	},

	"previous" : function() {
		try {
			var i = this._cursor - 1, previous = this._element.get(i);
			this._lastRet = this._cursor = i;
			return previous;
		} catch (e) {
			throw new js.lang.IndexOutOfBoundsException();
		}
	},

	"nextIndex" : function() {
		return this._cursor;
	},

	"previousIndex" : function() {
		return this._cursor - 1;
	}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Iterator");

Class
		.forName({
			name : "class js.util.HashIterator extends js.util.Iterator",

			hasNext : function() {
				return this._cursor < this._element._hashArray.length;
			},
			next : function() {
				try {
					// TODO
					var next = this._element._table[this._element._hashArray[this._cursor]];
					this._lastRet = this._cursor++;
					return next;
				} catch (e) {
					throw new js.lang.IndexOutOfBoundsException("Index: "
							+ this._cursor + ", Size: " + this._element.size()
							+ ",Message:" + e.getMessage());
				}
			},
			remove : function() {
				if (this._lastRet === -1)
					throw new js.lang.IllegalStateException();
				try {
					this._element._table.splice(
							this._element._hashArray[this._lastRet], 1);

					var keys = this._element._hash;

					Object.each(keys, function(i, v, o) {
						if (v === this._element._hashArray[this._lastRet]) {
							remove(i);
							return false;
						}
					}, this);
					/*
					 * for (var i in keys) { if (keys[i] === this._lastRet) {
					 * delete this._element._hash[i]; break; } }
					 */
					if (this._lastRet < this._cursor)
						this._cursor--;
					this._lastRet = -1;
				} catch (e) {
					throw new js.lang.IndexOutOfBoundsException();
				}
			}

		});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.HashIterator");

Class
		.forName({
			name : "class js.util.KeyIterator extends js.util.HashIterator",
			next : function() {
				try {
					var next = this._element._table[this._element._hashArray[this._cursor]];
					this._lastRet = this._cursor++;
					return next.getKey();
				} catch (e) {
					throw new js.lang.IndexOutOfBoundsException("Index: "
							+ this._cursor + ", Size: " + this._element.size()
							+ ",Message:" + e.getMessage());
				}
			}
		});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.HashIterator");

Class
		.forName({
			name : "class js.util.ValueIterator extends js.util.HashIterator",
			next : function() {
				try {
					var next = this._element._table[this._element._hashArray[this._cursor]];
					this._lastRet = this._cursor++;
					return next.getValue();
				} catch (e) {
					throw new js.lang.IndexOutOfBoundsException("Index: "
							+ this._cursor + ", Size: " + this._element.size()
							+ ",Message:" + e.getMessage());
				}
			}
		});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

/**
 * 测试集合框架 js.util.Collection |
 * ----------------------------------------------------- | | js.util.List
 * js.util.Set | | ------------------------------
 * ------------------------------- | | | | js.util.ArrayList js.util.Stack
 * js.util.HashSet js.util.TreeSet
 * 
 * 
 * 
 * 
 * js.util.Map | -------------------------------------------------------- | |
 * js.util.HashMap js.util.TreeMap
 * 
 */
Class.forName({
	name : "abstract class js.util.Collection extends Object",

	"clone" : function() {
		var c = this.getClass().newInstance();
		var it = this.iterator();
		while (it.hasNext()) {
			var next = it.next();
			c.add(next ? next.clone() : next);
		}
		return c;
	},

	/**
	 * 返回此 collection 中的元素数。
	 */
	"abstract size" : function() {
		return 0;
	},

	/**
	 * 返回在此 collection 中的元素上进行迭代的迭代器。
	 */
	"abstract iterator" : function() {
	},

	/**
	 * 确保此 collection 包含指定的元素（可选操作）。
	 */
	add : function(o) {
		throw new js.lang.UnsupportedOperationException();
	},

	/**
	 * 将指定 collection 中的所有元素添加到此 collection 中（可选操作）。
	 */
	addAll : function(c) {
		var modified = false;
		var e = c.iterator();
		while (e.hasNext()) {
			if (this.add(e.next()))
				modified = true;
		}
		return modified;
	},

	/**
	 * 如果此 collection 包含指定的元素，则返回 true。
	 */
	contains : function(o) {
		var e = this.iterator();
		while (e.hasNext()) {
			var n = e.next();
			if (n === o) {
				return true;
			} else if (!Object.isEmpty(o) && !Object.isEmpty(o.equals)
					&& Object.isFunction(o.equals) && o.equals(n)) {
				return true;
			}
		}
		return false;
	},

	/** 从此 collection 中移除所有元素（可选操作）。 */
	clear : function() {
		var e = this.iterator();
		while (e.hasNext()) {
			e.next();
			e.remove();
		}

	},

	/** 如果此 collection 包含指定 collection 中的所有元素，则返回 true。 */
	containsAll : function(c) {
		var e = c.iterator();
		while (e.hasNext()) {
			if (!this.contains(e.next())) {
				return false;
			}
		}
		return true;
	},

	/**
	 * 如果此 collection 不包含元素，则返回 true。
	 */
	isEmpty : function() {
		return this.size() <= 0;
	},

	/**
	 * 从此 collection 中移除指定元素的单个实例（如果存在）（可选操作）。
	 */
	remove : function(o) {
		var e = this.iterator();
		while (e.hasNext()) {
			var n = e.next();
			if (n === o) {
				e.remove();
				return true;
			} else if (!Object.isEmpty(o) && !Object.isEmpty(o.equals)
					&& Object.isFunction(o.equals) && o.equals(n)) {
				e.remove()
				return true;
			}
		}
		return false;
	},

	/**
	 * 从此 collection 中移除包含在指定 collection 中的所有元素（可选操作）。
	 */
	removeAll : function(c) {
		var modified = false;
		var e = this.iterator();
		while (e.hasNext()) {
			if (c.contains(e.next())) {
				e.remove();
				modified = true;
			}
		}
		return modified;
	},

	/**
	 * 仅在此 collection 中保留指定 collection 中所包含的元素（可选操作）。
	 */
	retainAll : function(c) {
		var modified = false;
		var e = this.iterator();
		while (e.hasNext()) {
			if (!c.contains(e.next())) {
				e.remove();
				modified = true;
			}
		}
		return modified;
	},

	/**
	 * 返回包含此 collection 中所有元素的数组。
	 */
	toArray : function() {
		var r = [], it = this.iterator(), i = 0;
		while (it.hasNext()) {
			r[i++] = it.next();
		}
		return r;
	}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Collection");

Class.forName({
	name : "class js.util.Set extends js.util.Collection"

});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Set");
$import("js.util.KeyIterator");

Class.forName({
	name : "class js.util.KeySet extends js.util.Set",
	"private _element" : null,
	KeySet : function(element) {
		this._element = element;
	},
	iterator : function() {
		return new js.util.KeyIterator(this._element);
	}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Collection");
$import("js.util.LinkIterator");
$import("js.util.Iterator");

Class.forName({
	name : "class js.util.List extends js.util.Collection",

	listIterator : function() {
		var index = arguments[0] || 0;
		if (index < 0 || index > this.size())
			throw new new js.lang.IndexOutOfBoundsException("Index: " + index);

		return new js.util.LinkIterator(this, index);

	},
	// get(number),size(),remove()
	iterator : function() {
		return new js.util.Iterator(this);
	},

	"abstract removeAt" : function(index) {
	},
	/** 返回此列表中指定位置处的元素。 */
	"abstract get" : function(index) {
	},

	/** 返回此列表 fromIndex（包括）和 toIndex（不包括）之间部分的视图。 */
	"abstract subList" : function(fromIndex, toIndex) {
		throw new js.lang.UnsupportedOperationException();
	},

	/** 返回此列表中首次出现指定元素的索引，如果列表中不包含此元素，则返回 -1。 */
	"indexOf" : function(o) {
		var e = this.listIterator();
		while (e.hasNext()) {
			var n = e.next();
			if (n === o) {
				return e.previousIndex();
			} else if (!Object.isEmpty(o) && !Object.isEmpty(o.equals)
					&& Object.isFunction(o.equals) && o.equals(n)) {
				return e.previousIndex();
			}
		}
		return -1;
	},

	"lastIndexOf" : function(o) {
		var e = this.listIterator(this.size());
		while (e.hasPrevious()) {
			var p = e.previous();
			if (p === o) {
				return e.nextIndex();
			} else if (!Object.isEmpty(o) && !Object.isEmpty(o.equals)
					&& Object.isFunction(o.equals) && o.equals(p)) {
				return e.nextIndex();
			}
		}
		return -1;
	},

	/** 将此列表中指定位置的元素替换为指定的元素（可选操作）。 */
	"set" : function(index, element) {
		throw new js.lang.UnsupportedOperationException();
	}
});
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
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

Class.forName({
	name : "class js.util.Entry extends Object",
	"private _key" : null,
	"private _value" : null,
	Entry : function(key, value) {
		this._key = key;
		this._value = value;
	},
	"clone" : function() {
		var key = this._key ? this._key.clone() : this._key;
		var value = this._value ? this._value.clone() : this._value;
		return new js.util.Entry(key, value);
	},
	getKey : function() {
		return this._key;
	},
	getValue : function() {
		return this._value;
	},
	setValue : function(val) {
		this._value = _val;
	}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Set");

Class.forName({
	name : "class js.util.EntrySet extends js.util.Set",
	"private _element" : null,
	EntrySet : function(element) {
		this._element = element;
	},
	iterator : function() {
		return new js.util.HashIterator(this._element);
	}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Iterator");
$import("js.util.KeySet");
$import("js.util.ValueList");

Class
		.forName({
			name : "class js.util.Map extends Object",

			"clone" : function() {
				var c = this.getClass().newInstance();
				var it = this.entrySet().iterator();
				while (it.hasNext()) {
					var next = it.next();
					if (next === null || next === undefined) {
						c.put(null, null);
					} else {
						c.put(next.clone());
						// var e = next.clone();
						// c.put(e.getKey(), e.getValue());
					}
				}
				return c;
			},

			/** 从此映射中移除所有映射关系（可选操作）。 */
			clear : function() {
				this.entrySet().clear();
			},

			/** 如果此映射包含指定键的映射关系，则返回 true。 */
			containsKey : function(key) {
				var e = this.entrySet().iterator();
				while (e.hasNext()) {
					var k = e.next().getKey();
					if (key === k) {
						return true;
					} else if (!Object.isEmpty(key)
							&& !Object.isEmpty(key.equals)
							&& Object.isFunction(key.equals) && key.equals(k)) {
						return true;
					}
				}
				return false;
			},

			/** 如果此映射为指定值映射一个或多个键，则返回 true。 */
			containsValue : function(value) {
				var e = this.entrySet().iterator();
				while (e.hasNext()) {
					var v = e.next().getValue();
					if (value === v) {
						return true;
					} else if (!Object.isEmpty(value)
							&& !Object.isEmpty(value.equals)
							&& Object.isFunction(value.equals)
							&& value.equals(v)) {
						return true;
					}
				}
				return false;
			},

			/** 返回此映射中映射到指定键的值。 */
			"get" : function(key) {
				var i = this.entrySet().iterator();
				while (i.hasNext()) {
					var e = i.next();
					var k = e.getKey();
					if (key === k) {
						return e.getValue();
					} else if (!Object.isEmpty(key)
							&& !Object.isEmpty(key.equals)
							&& Object.isFunction(key.equals) && key.equals(k)) {
						return e.getValue();
					}
				}
				return null;
			},

			/** 如果此映射未包含键-值映射关系，则返回 true。 */
			isEmpty : function() {
				return this.size() <= 0;
			},

			/** 将指定的值与此映射中的指定键相关联（可选操作）。 */
			put : function(key, value) {
				throw new js.lang.UnsupportedOperationException();
			},

			/** 从指定映射中将所有映射关系复制到此映射中（可选操作）。 */
			putAll : function(m) {
				var i = m.entrySet();
				while (i.hasNext()) {
					var e = i.next();
					this.put(e.getKey, e.getValue());
				}
			},

			/** 如果存在此键的映射关系，则将其从映射中移除（可选操作）。 */
			remove : function(key) {
				var i = entrySet().iterator(), correctEntry = null;
				while (correctEntry === null && i.hasNext()) {
					var e = i.next();

					if (key === e.getKey()) {
						correctEntry = e;
					} else if (!Object.isEmpty(key)
							&& !Object.isEmpty(key.equals)
							&& Object.isFunction(key.equals)
							&& key.equals(e.getKey())) {
						correctEntry = e;
					}
				}
				var oldValue = null;
				if (correctEntry != null) {
					oldValue = correctEntry.getValue();
					i.remove();
				}
				return oldValue;
			},

			/** 返回此映射中的键-值映射关系数。 */
			size : function() {
				return this.entrySet().size();
			},

			/** 返回此映射中包含的映射关系的 set 视图。 */
			"abstract entrySet" : function() {
			},

			keySet : function() {
				return new js.util.KeySet(this);
			},

			values : function() {
				return new js.util.ValueList(this);
			},

			/** 比较指定的对象与此映射是否相等。 */
			equals : function(o) {
			}
		});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Map");
$import("js.util.Entry");
$import("js.util.EntrySet");

Class
		.forName({
			name : "class js.util.HashMap extends js.util.Map",
			"private _table" : [],

			/**
			 * 根据_hash和_hashCache确定hash值
			 */
			"private _hash" : {},
			"private _hashCache" : [],
			"private _hashArray" : [],// _hash的实时拷贝

			"private hash" : function(key) {
				var hash = this._hash[key];
				if (Object.isEmpty(hash)) {
					if (this._hashCache.length <= 0) {
						hash = this._table.length;
					} else {
						hash = this._hashCache.pop();
					}
					this._hashArray.push(hash);
				}
				if (hash < 0 || hash > this._table.length)
					throw new js.lang.UnsupportedOperationException();
				return hash;
			},

			/**
			 * put(entry) put(key,value)
			 */
			put : function(key, value) {
				var entry = key;
				if (entry != null && entry != undefined
						&& entry instanceof js.util.Entry) {
					key = entry.getKey();
					value = entry.getValue();
				} else {
					entry = new js.util.Entry(key, value);
				}

				var oldValue = null;
				var hash = this.hash(key);
				if (hash < this._table.length && hash >= 0) {
					oldValue = this._table[hash];
				}
				this._hash[key] = hash;
				this._table[hash] = entry;
				return oldValue;
			},
			"get" : function(key) {
				var hash = this._hash[key];
				return (hash != null && hash >= 0 && hash < this._table.length && this._table[hash]) ? this._table[hash]
						.getValue()
						: null;
			},
			entrySet : function() {
				// size(),remove()
				return new js.util.EntrySet(this);
			},
			size : function() {
				return this._table.length - this._hashCache.length;
			},
			remove : function(key) {
				var hash = this._hash[key];
				var oldObj = null;

				if (hash != null && hash >= 0 && hash < this._table.length
						&& this._table[hash]) {
					oldObj = this._table[hash].getValue();
					this._table[hash] = null;
					this._hashCache.push(hash);
				}
				var hai = this._hashArray.indexOf(hash);
				if (hai >= 0) {
					this._hashArray.splice(hai, 1);
				}
				delete this._hash[key];

				return oldObj;
			},
			clear : function() {
				Object.each(this._hash, function(i, v, o) {
					this.remove(i);
				}, this);
				/*
				 * for (var i in this._hash) { this.remove(i); }
				 */
			}
		});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Map");

Class.forName({
	name : "class js.util.TreeMap extends js.util.Map"
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.List");

Class.forName({
	name : "class js.util.ArrayList extends js.util.List",
	"private _table" : [],
	"private rangeCheck" : function(index) {
		if (index < 0 || index >= this.size())
			throw new js.lang.IndexOutOfBoundsException("Index: " + index
					+ ", Size: " + size);
	},

	/** 在此列表中指定的位置插入指定的元素（可选操作）。 */
	"add" : function() {
		// index, element
		var index = null, element = null;
		if (arguments.length >= 2 && !Object.isEmpty(arguments[0])
				&& Object.isNumber(arguments[0])) {
			index = arguments[0];
			element = arguments[1];
		} else if (arguments.length > 0) {
			element = arguments[0];
			index = this.size();
		}
		if (index != this.size()) {
			this.rangeCheck(index);
		}
		this._table.splice(index, 0, element);
	},

	/** 返回此列表 fromIndex（包括）和 toIndex（不包括）之间部分的视图。 */
	subList : function(fromIndex, toIndex) {
		return this._table.slice(fromIndex, toIndex);
	},

	"set" : function(index, element) {
		this.rangeCheck(index);
		var oldValue = this._table[index];
		this._table[index] = element;
		return oldValue;
	},
	/** 返回此列表中指定位置处的元素。 */
	"get" : function(index) {
		this.rangeCheck(index);
		return this._table[index];
	},

	removeAt : function(index) {
		return this._table.splice(index, 1)
	},

	"size" : function() {
		return this._table.length;
	}
});/*
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
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Set");
$import("js.util.HashMap");

Class.forName({
	name : "class js.util.HashSet extends js.util.Set",

	"private _table" : null,
	HashSet : function() {
		this._table = new js.util.HashMap();
	},

	iterator : function() {
		return this._table.keySet().iterator();
	},

	size : function() {
		return this._table.size();
	},

	isEmpty : function() {
		return this._table.isEmpty();
	},

	contains : function(o) {
		return this._table.containsKey(o);
	},

	add : function(e) {
		return this._table.put(e, null);
	},

	remove : function(o) {
		this._table.remove(o);
		return o;
	},

	clear : function() {
		this._table.clear();
	}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Set");

Class.forName({
	name : "class js.util.TreeSet extends js.util.Set"

});/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月25日
 */


Class.forName({
	name : "class Date",
	alias:"js.util.Date",
	Date : function() {
	},
	"public equals" : function(s) {
		return this === s;
	}
});
/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

Class.forName({
	name : "abstract class js.util.Calendar extends Object"
});/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Calendar");

Class.forName({
	name : "abstract class js.util.GregorianCalendar extends js.util.Calendar"
});