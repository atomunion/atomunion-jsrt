/*
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
	init : function() {
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
