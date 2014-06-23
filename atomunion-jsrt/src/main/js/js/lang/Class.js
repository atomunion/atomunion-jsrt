/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 10, 2014
 */

Class = function(c, classloader) {
	var obj = null, packages = null, fullName = null, name = null, superclass = null, type = null, superinterfaces = [], modifiers = null, annotations = null;
	// 自身method和fields,不包含从父类继承来的

	var fields = {}, methods = {}, statics = {};
	// var reflect = {
	// fields : {},
	// methods : {},
	// statics : {}
	// };
	var empty = function() {
	}, initial = null, init = null, constructor = function() {
		// 原始构造器
		// 1设置class对象和hashCode值
		this.$class = obj;

		// 2.2初始化继承父类属性
		var sc = obj.getSuperClass();
		while (sc && sc != Object.$class) {
			var f = sc.getFields();
			Object.each(f, function(i, v, o) {
				if (!fields[i]) {
					var value = v.getValue();
					this[i] = value ? value.clone() : value;
				}
			}, this);
			// sc.getInitial().apply(this, arguments);
			sc = sc.getSuperClass();
		}

		// 3初始化自身定义属性
		Object.each(fields, function(i, v, o) {
			var value = v.getValue();
			this[i] = value ? value.clone() : value;
		}, this);

		// 4用户构造器,先调用父类构造器以及initial方法
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

			instanceclass.prototype = ((superclass) ? superclass.instance
					: Object).prototype;
			constructor.prototype = new instanceclass;
			constructor.prototype.constructor = constructor;

			// toString()方法定义
			// if (superclass == Object.$class) {
			// constructor.prototype.toString = function() {
			// return this.getClass().getFullName() + " "
			// + this.hashCode();
			// };
			// }
		} else {
			constructor = Object;
		}

		Object.each(c, function(i, v, o) {
			if (i != "name") {
				var m = convert(i);
				m = new attribute(m.name, v, this, m.modifiers, m.annotations);
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
			return packages;
		},
		getDeclaredField : function(name) {
			return this.getField(name);
		},
		getDeclaredFields : function() {
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
			return this.getMethod(name);
		},
		getDeclaredMethods : function() {
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
					// 将构造器代理，默认调用父类构造器
					initial = proxy(m.getValue(),
							(this.getSuperClass() || Object.$class)
									.getInitial());
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
	obj = new $class();
	return obj;
};
Class.forName = function(c, loader) {
	return new Class(c, loader);
};
Object.$class = Class.forName({
	name : "class Object",
	/** 主版本号 . 子版本号 [ 修正版本号 [. 编译版本号 ]] */
	"private _version" : "0.1.1.0001",
	Object : function() {
		this._hashCode = new Date().getTime().toString(16);
	},
	getClass : function() {
		return this.$class;
	},
	/** 指示某个其他对象是否与此对象“相等”。 */
	equals : function(obj) {
		return obj === this;
	},
	getVersion : function() {
		return this._version;
	},
	hashCode : function() {
		return this._hashCode;
	},
	toString : function() {
		return this.getClass().getFullName() + " " + this.hashCode();
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

});