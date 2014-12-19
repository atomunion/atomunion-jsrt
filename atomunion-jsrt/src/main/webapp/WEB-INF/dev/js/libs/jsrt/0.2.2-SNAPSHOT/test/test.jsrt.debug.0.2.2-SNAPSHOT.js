/**
 * 
 * 
 */

var animalClass = Class.forName({
	name : "class js.model.Animal extends Object",
	"@Getter @Setter private age" : 0,
	"private name" : 0,
	Animal : function(name) {
		this.name = name;
	},
	setName : function(name) {
		this.name = name;
	},
	getName : function() {
		return this.name;
	},
	say : function() {
		return "i am a animal";
	}
});
/**
 * 
 * 
 */

$import("js.model.Animal");
var dogClass = Class.forName({
	name : "public class js.model.Dog extends js.model.Animal",
	"@Getter @Setter private color" : "black",
	"@Getter @Setter private word" : "",
	"public Dog" : function(name, word) {
		this.word = word;
	},
	say : function() {
		return this.word;
	}
});
$import("js.test.TestCase");
$import("js.test.Assert");
$import("js.model.Animal");
$import("js.model.Dog");

var dog = new js.model.Dog("dog", "汪汪");

Class.forName({
    name : "class test.lang.TestObject extends js.test.TestCase",
    "@Setter @Getter private obj" : dog,

    "@Test testIsNull" : function() {

        js.test.Assert.assertTrue("null", Object.isNull(null));
        js.test.Assert.assertTrue("undefined", Object.isNull(undefined));
        js.test.Assert.assertFalse("{}:", Object.isNull({}));
        js.test.Assert.assertFalse("[]:", Object.isNull([]));
        js.test.Assert.assertFalse("0", Object.isNull(0));
        js.test.Assert.assertFalse("0.0", Object.isNull(0.0));
        js.test.Assert.assertFalse("\"\"", Object.isNull(""));
        js.test.Assert.assertFalse("-1", Object.isNull(-1));
        js.test.Assert.assertFalse("new Date()", Object.isNull(new Date()));
        js.test.Assert.assertFalse("new js.model.Dog()", Object.isNull(dog));
        js.test.Assert.assertFalse("function(){}", Object.isNull(function() {
        }));

        js.test.Assert.assertFalse("true", Object.isNull(true));
        js.test.Assert.assertFalse("false", Object.isNull(false));
    },
    "@Test testIsEmpty" : function() {
        js.test.Assert.assertTrue("null", Object.isEmpty(null));
        js.test.Assert.assertTrue("undefined", Object.isEmpty(undefined));
        js.test.Assert.assertFalse("{}", Object.isEmpty({}));
        js.test.Assert.assertTrue("[]", Object.isEmpty([]));
        js.test.Assert.assertFalse("0", Object.isEmpty(0));
        js.test.Assert.assertFalse("0.0", Object.isEmpty(0.0));
        js.test.Assert.assertTrue("\"\"", Object.isEmpty(""));
        js.test.Assert.assertFalse("-1", Object.isEmpty(-1));
        js.test.Assert.assertFalse("new Date()", Object.isEmpty(new Date()));
        js.test.Assert.assertFalse("new js.model.Dog()", Object.isEmpty(dog));
        js.test.Assert.assertFalse("function(){}", Object.isEmpty(function() {
        }));

        js.test.Assert.assertFalse("true", Object.isEmpty(true));
        js.test.Assert.assertFalse("false", Object.isEmpty(false));
    },

    "@Test testIsArray" : function() {

        js.test.Assert.assertFalse("null", Object.isArray(null));
        js.test.Assert.assertFalse("undefined", Object.isArray(undefined));
        js.test.Assert.assertFalse("{}", Object.isArray({}));
        js.test.Assert.assertTrue("[]", Object.isArray([]));
        js.test.Assert.assertFalse("0", Object.isArray(0));
        js.test.Assert.assertFalse("0.0", Object.isArray(0.0));
        js.test.Assert.assertFalse("\"\"", Object.isArray(""));
        js.test.Assert.assertFalse("-1", Object.isArray(-1));
        js.test.Assert.assertFalse("new Date()", Object.isArray(new Date()));
        js.test.Assert.assertFalse("new js.model.Dog()", Object.isArray(dog));
        js.test.Assert.assertFalse("function(){}", Object.isArray(function() {
        }));

        js.test.Assert.assertFalse("true", Object.isArray(true));
        js.test.Assert.assertFalse("false", Object.isArray(false));
    },

    "@Test testIsDate" : function() {

        js.test.Assert.assertFalse("null", Object.isDate(null));
        js.test.Assert.assertFalse("undefined", Object.isDate(undefined));
        js.test.Assert.assertFalse("{}", Object.isDate({}));
        js.test.Assert.assertFalse("[]", Object.isDate([]));
        js.test.Assert.assertFalse("0", Object.isDate(0));
        js.test.Assert.assertFalse("0.0", Object.isDate(0.0));
        js.test.Assert.assertFalse("\"\"", Object.isDate(""));
        js.test.Assert.assertFalse("-1", Object.isDate(-1));
        js.test.Assert.assertTrue("new Date()", Object.isDate(new Date()));
        js.test.Assert.assertFalse("new js.model.Dog()", Object.isDate(dog));
        js.test.Assert.assertFalse("function(){}", Object.isDate(function() {
        }));

        js.test.Assert.assertFalse("true", Object.isDate(true));
        js.test.Assert.assertFalse("false", Object.isDate(false));

    },

    "@Test testIsObject" : function() {

        js.test.Assert.assertFalse("null", Object.isObject(null));
        js.test.Assert.assertFalse("undefined", Object.isObject(undefined));
        js.test.Assert.assertTrue("{}", Object.isObject({}));
        js.test.Assert.assertFalse("[]", Object.isObject([]));
        js.test.Assert.assertFalse("0", Object.isObject(0));
        js.test.Assert.assertFalse("0.0", Object.isObject(0.0));
        js.test.Assert.assertFalse("\"\"", Object.isObject(""));
        js.test.Assert.assertFalse("-1", Object.isObject(-1));
        js.test.Assert.assertFalse("new Date()", Object.isObject(new Date()));
        js.test.Assert.assertTrue("new js.model.Dog()", Object.isObject(dog));
        js.test.Assert.assertFalse("function(){}", Object.isObject(function() {
        }));

        js.test.Assert.assertFalse("true:" + Object.isObject(true));
        js.test.Assert.assertFalse("false:" + Object.isObject(false));

    },

    "@Test testIsFunction" : function() {

        js.test.Assert.assertFalse("null", Object.isFunction(null));
        js.test.Assert.assertFalse("undefined", Object.isFunction(undefined));
        js.test.Assert.assertFalse("{}", Object.isFunction({}));
        js.test.Assert.assertFalse("[]", Object.isFunction([]));
        js.test.Assert.assertFalse("0", Object.isFunction(0));
        js.test.Assert.assertFalse("0.0", Object.isFunction(0.0));
        js.test.Assert.assertFalse("\"\"", Object.isFunction(""));
        js.test.Assert.assertFalse("-1", Object.isFunction(-1));
        js.test.Assert.assertFalse("new Date()", Object.isFunction(new Date()));
        js.test.Assert.assertFalse("new js.model.Dog()", Object.isFunction(dog));
        js.test.Assert.assertTrue("function(){}", Object.isFunction(function() {
        }));

        js.test.Assert.assertFalse("true", Object.isFunction(true));
        js.test.Assert.assertFalse("false", Object.isFunction(false));
    },

    "@Test testIsNumber" : function() {

        js.test.Assert.assertFalse("null", Object.isNumber(null));
        js.test.Assert.assertFalse("undefined", Object.isNumber(undefined));
        js.test.Assert.assertFalse("{}", Object.isNumber({}));
        js.test.Assert.assertFalse("[]", Object.isNumber([]));
        js.test.Assert.assertTrue("0", Object.isNumber(0));
        js.test.Assert.assertTrue("0.0", Object.isNumber(0.0));
        js.test.Assert.assertFalse("\"\"", Object.isNumber(""));
        js.test.Assert.assertTrue("-1", Object.isNumber(-1));
        js.test.Assert.assertFalse("new Date()", Object.isNumber(new Date()));
        js.test.Assert.assertFalse("new js.model.Dog()", Object.isNumber(dog));
        js.test.Assert.assertFalse("function(){}", Object.isNumber(function() {
        }));

        js.test.Assert.assertFalse("true", Object.isNumber(true));
        js.test.Assert.assertFalse("false", Object.isNumber(false));

    },

    "@Test testIsString" : function() {

        js.test.Assert.assertFalse("null", Object.isString(null));
        js.test.Assert.assertFalse("undefined", Object.isString(undefined));
        js.test.Assert.assertFalse("{}", Object.isString({}));
        js.test.Assert.assertFalse("[]", Object.isString([]));
        js.test.Assert.assertFalse("0", Object.isString(0));
        js.test.Assert.assertFalse("0.0", Object.isString(0.0));
        js.test.Assert.assertTrue("\"\"", Object.isString(""));
        js.test.Assert.assertFalse("-1", Object.isString(-1));
        js.test.Assert.assertFalse("new Date()", Object.isString(new Date()));
        js.test.Assert.assertFalse("new js.model.Dog()", Object.isString(dog));
        js.test.Assert.assertFalse("function(){}", Object.isString(function() {
        }));

        js.test.Assert.assertFalse("true", Object.isString(true));
        js.test.Assert.assertFalse("false", Object.isString(false));

    },

    "@Test testIsBoolean" : function() {

        js.test.Assert.assertFalse("null", Object.isBoolean(null));
        js.test.Assert.assertFalse("undefined", Object.isBoolean(undefined));
        js.test.Assert.assertFalse("{}", Object.isBoolean({}));
        js.test.Assert.assertFalse("[]", Object.isBoolean([]));
        js.test.Assert.assertFalse("0", Object.isBoolean(0));
        js.test.Assert.assertFalse("0.0", Object.isBoolean(0.0));
        js.test.Assert.assertFalse("\"\"", Object.isBoolean(""));
        js.test.Assert.assertFalse("-1", Object.isBoolean(-1));
        js.test.Assert.assertFalse("new Date()", Object.isBoolean(new Date()));
        js.test.Assert.assertFalse("new js.model.Dog()", Object.isBoolean(dog));
        js.test.Assert.assertFalse("function(){}", Object.isBoolean(function() {
        }));
        js.test.Assert.assertTrue("true", Object.isBoolean(true));
        js.test.Assert.assertTrue("false", Object.isBoolean(false));

    },

    "@Test testIsDefined" : function() {

        js.test.Assert.assertTrue("null", Object.isDefined(null));
        js.test.Assert.assertFalse("undefined", Object.isDefined(undefined));
        js.test.Assert.assertTrue("{}", Object.isDefined({}));
        js.test.Assert.assertTrue("[]", Object.isDefined([]));
        js.test.Assert.assertTrue("0", Object.isDefined(0));
        js.test.Assert.assertTrue("0.0", Object.isDefined(0.0));
        js.test.Assert.assertTrue("\"\"", Object.isDefined(""));
        js.test.Assert.assertTrue("-1", Object.isDefined(-1));
        js.test.Assert.assertTrue("new Date()", Object.isDefined(new Date()));
        js.test.Assert.assertTrue("new js.model.Dog()", Object.isDefined(dog));
        js.test.Assert.assertTrue("function(){}", Object.isDefined(function() {
        }));
        js.test.Assert.assertTrue("true", Object.isDefined(true));
        js.test.Assert.assertTrue("false", Object.isDefined(false));

    },
    "@Test testClone" : function() {
        js.lang.System.out.println("克隆前：" + this.getObj().toString());
        var c = this.getObj().clone();
        js.lang.System.out.println("克隆后：" + c.toString());

        js.test.Assert.assertNotSame("克隆前后  assertSame ", this.getObj(), c);
    },

    "@Test testEach" : function() {
        js.lang.System.out.println("被遍历的对象:" + this.getObj().toString());
        Object.each(this.getObj(), function(i, o, a) {
            js.lang.System.out.println(i + ":" + o + "    被遍历的对象[" + a.toString() + "]");
        }, null);
    },
    "@Test testEnumerate" : function() {
        js.lang.System.out.println("被遍历的对象:" + this.getObj().toString());

        Object.enumerate(this.getObj(), function(i, o, a) {
            js.lang.System.out.println(i + ":" + o + "   被遍历的对象[" + a.toString() + "]");
        }, dog, true);
    },
    "@Test testToJson" : function() {
        js.lang.System.out.println(this.getObj().toJson());

    },
    "@Test testToQueryString" : function() {
        js.lang.System.out.println(this.getObj().toQueryString());
    },
    "@Test testGetClass" : function() {
        js.lang.System.out.println(this.getObj().getClass());

        js.test.Assert.assertNotNull("this.getObj().getClass()", this.getObj().getClass());
    },
    "@Test testEquals" : function() {

        js.test.Assert.assertTrue("this.getObj().equals(this.getObj())", this.getObj().equals(this.getObj()));
        js.test.Assert.assertFalse("this.getObj().equals(null)", this.getObj().equals(null));
        js.test.Assert.assertFalse("this.getObj().equals(undefined)", this.getObj().equals(undefined));

    },
    "@Test testGetVersion" : function() {
        js.test.Assert.assertNotNull("this.getObj().getVersion():", this.getObj().getVersion());
    },
    "@Test testHashCode" : function() {
        js.test.Assert.assertNotNull("this.getObj().hashCode():", this.getObj().hashCode());
    },
    "@Test testToString" : function() {
        js.test.Assert.assertNotNull("this.getObj().toString()", this.getObj().toString());
    },
    "@Test testForIn" : function() {
        for (var i in this.getObj()) {
            js.lang.System.out.println("key:" + i + "    value:" + this.getObj()[i] + "   this.getObj().hasOwnProperty:" + this.getObj().hasOwnProperty(i));
        }

        js.lang.System.out.println("^^^^^^^^^^^^^^^^^^^^^^^test for in Object^^^^^^^^^^^^^^^^^^^^^^^");
        for (var i in Object) {
            js.lang.System.out.println("key:" + i + "    value:" + Object[i] + "   this.getObj().hasOwnProperty:" + this.getObj().hasOwnProperty(i));
        }
        js.lang.System.out.println("^^^^^^^^^^^^^^^^^^^^^^^test for in newObj^^^^^^^^^^^^^^^^^^^^^^^");
        var newObj = Object.create(this.getObj(), {
            add1 : {
                value : "add1",
                writable : true,
                enumerable : false,
                configurable : false
            },
            add2 : {
                value : "add2",
                writable : false,
                enumerable : true,
                configurable : false
            },
            add3 : {
                value : "add3",
                writable : false,
                enumerable : false,
                configurable : true
            },
            add4 : {
                value : "add4",
                writable : false,
                enumerable : false,
                configurable : false
            },
            add5 : {
                value : "add5",
                writable : true,
                enumerable : true,
                configurable : true
            },
            add6 : {
                value : function() {
                },
                writable : true,
                enumerable : true,
                configurable : true
            }
        });

        for (var i in newObj) {
            js.lang.System.out.println("key:" + i + "    value:" + newObj[i] + "   this.getObj().hasOwnProperty:" + newObj.hasOwnProperty(i));
        }

        js.lang.System.out.println("^^^^^^^^^^^^^^^^^^^^^^^test for in new Object^^^^^^^^^^^^^^^^^^^^^^^");

        Object.defineProperties(Object, {
            add1 : {
                value : "add1",
                writable : true,
                enumerable : false,
                configurable : false
            },
            add2 : {
                value : "add2",
                writable : false,
                enumerable : true,
                configurable : false
            },
            add3 : {
                value : "add3",
                writable : false,
                enumerable : false,
                configurable : true
            },
            add4 : {
                value : "add4",
                writable : false,
                enumerable : false,
                configurable : false
            },
            add5 : {
                value : "add5",
                writable : true,
                enumerable : true,
                configurable : true
            },
            add6 : {
                value : function() {
                },
                writable : true,
                enumerable : true,
                configurable : true
            }
        });

        for (var i in Object) {
            js.lang.System.out.println("key:" + i + "    value:" + Object[i] + "   this.getObj().hasOwnProperty:" + this.getObj().hasOwnProperty(i));
        }
        var obj = new Object();
        for (var i in obj) {
            js.lang.System.out.println("key:" + i + "    value:" + obj[i] + "   this.getObj().hasOwnProperty:" + this.getObj().hasOwnProperty(i));
        }

    }
});
new test.lang.TestObject();
$import("js.model.Animal");
$import("js.model.Dog");
$import("js.test.TestCase");

var testReflectObject = new js.model.Dog("dog", "汪汪");

Class.forName({
	name : "class test.lang.TestClass extends js.test.TestCase",
	"@Setter @Getter private dog" : testReflectObject.getClass(),
	TestClass : function() {
	},
	"@Test testGetClassConstructor" : function() {
		js.lang.System.out.println(this.getDog().getClassConstructor());
	},
	"@Test testGetConstructor" : function() {
		js.lang.System.out.println(this.getDog().getConstructor());
	},
	"@Test testGetInitial" : function() {
		js.lang.System.out.println(this.getDog().getInitial());
	},
	"@Test testGetName" : function() {
		js.lang.System.out.println(this.getDog().getName());
	},
	"@Test testGetFullName" : function() {
		js.lang.System.out.println(this.getDog().getFullName());
	},
	"@Test testGetInstance" : function() {
		js.lang.System.out.println(this.getDog().getInstance());
	},
	"@Test testGetAnnotations" : function() {
		js.lang.System.out.println(this.getDog().getAnnotations());
	},
	"@Test testGetPackage" : function() {
		js.lang.System.out.println(this.getDog().getPackage());
	},
	"@Test testGetDeclaredField" : function() {
		js.lang.System.out.println(this.getDog().getDeclaredField("color"));
	},
	"@Test testGetDeclaredFields" : function() {
		js.lang.System.out.println(this.getDog().getDeclaredFields());
	},
	"@Test testGetField" : function() {
		js.lang.System.out.println(this.getDog().getField("color"));
	},
	"@Test testGetFields" : function() {
		js.lang.System.out.println(this.getDog().getFields());
	},
	"@Test testGetDeclaredMethod" : function() {
		js.lang.System.out.println(this.getDog().getDeclaredMethod("say"));
	},
	"@Test testGetDeclaredMethods" : function() {
		js.lang.System.out.println(this.getDog().getDeclaredMethods());
	},
	"@Test testGetMethod" : function() {
		js.lang.System.out.println(this.getDog().getMethod("say"));
	},
	"@Test testGetMethods" : function() {
		js.lang.System.out.println(this.getDog().getMethods());
	},
	"@Test testGetSuperClass" : function() {
		js.lang.System.out.println(this.getDog().getSuperClass());
	},
	"@Test testGetModifiers" : function() {
		js.lang.System.out.println(this.getDog().getModifiers());
	},
	"@Test testAddMethod" : function() {
		this.getDog().addMethod(new js.lang.reflect.Method("testAddMethod", function() {
			return "我是动态新增的方法";
		}, this.getDog(), 1, []));
		js.lang.System.out.println(testReflectObject.testAddMethod());
	},
	"@Test testAddField" : function() {
		js.lang.System.out.println(this.getDog()
				.addField(new js.lang.reflect.Field("testAddField",
						"我是动态新增的属性", this.getDog(), 1, [ "@Getter", "@Setter" ])));
		js.lang.System.out.println(testReflectObject.getTestAddField());
	},
	"@Test testNewInstance" : function() {
		var c = this.getDog().newInstance();
		js.lang.System.out.println(c.getColor());
	}
});

new test.lang.TestClass();
$import("js.model.Animal");
$import("js.model.Dog");
$import("js.test.TestCase");

var testReflectObject = new js.model.Dog("dog", "汪汪");

Class.forName({
	name : "class test.lang.reflect.TestField extends js.test.TestCase",
	"@Setter @Getter private field" : testReflectObject.getClass()
			.getField("color"),
	TestField : function() {
	},
	"@Test testGetDeclaringClass" : function() {
		js.lang.System.out.println(this.getField().getDeclaringClass());
	},
	"@Test testGetName" : function() {
		js.lang.System.out.println(this.getField().getName());
	},
	"@Test testGetModifiers" : function() {
		js.lang.System.out.println(this.getField().getModifiers());
	},
	"@Test testGetAnnotations" : function() {
		js.lang.System.out.println(this.getField().getAnnotations());
	},
	"@Test testGetValue" : function() {
		js.lang.System.out.println(this.getField().getValue());
	},
	"@Test testGet" : function() {
		js.lang.System.out.println(this.getField().get(testReflectObject));
	},
	"@Test testSet" : function() {
		js.lang.System.out.println("set(\"red\")");
		this.getField().set(testReflectObject, "red");
		js.lang.System.out.println(this.getField().get(testReflectObject));
	}
});
new test.lang.reflect.TestField();
$import("js.model.Animal");
$import("js.model.Dog");
$import("js.test.TestCase");

var testReflectObject = new js.model.Dog("dog", "汪汪");

Class
		.forName({
			name : "class test.lang.reflect.TestMethod extends js.test.TestCase",
			
			"@Setter @Getter private method" : testReflectObject
					.getClass().getMethod("say"),
			
			TestMethod : function() {
			},
			
			"@Test testInvoke" : function() {
				js.lang.System.out
						.println("invoke say(), The desired operation is to print \"汪汪\"");
				js.lang.System.out.println(this.getMethod().invoke(testReflectObject));
			},
			"@Test testGetDeclaringClass" : function() {
				js.lang.System.out.println(this.getMethod().getDeclaringClass());
			},
			"@Test testGetName" : function() {
				js.lang.System.out.println(this.getMethod().getName());
			},
			"@Test testGetModifiers" : function() {
				js.lang.System.out.println(this.getMethod().getModifiers());
			},
			"@Test testGetAnnotations" : function() {
				js.lang.System.out.println(this.getMethod().getAnnotations());
			},
			"@Test testGetValue" : function() {
				js.lang.System.out.println(this.getMethod().getValue());
			}
		});

new test.lang.reflect.TestMethod();
$import("js.test.TestCase");
$import("js.util.ArrayList");
Class.forName({
	name : "class test.util.TestList extends js.test.TestCase",
	"@Setter @Getter private list" : new js.util.ArrayList(),
	TestList : function() {
		for (var i = 0; i < 3; i++) {
			this.getList().add("测试List接口" + i);
		}
	},
	"@Test testListIterator" : function() {
		var itr = this.getList().listIterator();
		while (itr.hasNext()) {
			js.lang.System.out.println(itr.next());
		}

		while (itr.hasPrevious()) {
			js.lang.System.out.println(itr.previous());
		}
	},
	"@Test testIterator" : function() {
		var itr = this.getList().iterator();
		while (itr.hasNext()) {
			js.lang.System.out.println(itr.next());
		}
	},
	"@Test testIndexOf" : function() {
		for (var i = 0; i < 3; i++) {
			js.lang.System.out.println("********indexOf:" + i + "   value:"
					+ this.getList().indexOf("测试" + i));
		}
	},
	"@Test testLastIndexOf" : function() {
		for (var i = 0; i < 3; i++) {
			js.lang.System.out.println("********lastIndexOf:" + i + "   value:"
					+ this.getList().lastIndexOf("测试" + i));
		}
	},
	"@Test testSubList" : function() {
		js.lang.System.out.println("********subList(1,2)->" + "   value:"
				+ this.getList().subList(1, 2));
	},
	"@Test testClear" : function() {
		js.lang.System.out.println("clear前：" + this.getList().size());
		this.getList().clear();
		js.lang.System.out.println("clear后：" + this.getList().size());
	}
});
new test.util.TestList();
$import("js.test.TestCase");
$import("js.util.ArrayList");
Class.forName({
	name : "class test.util.TestArrayList extends js.test.TestCase",
	"@Setter @Getter private list" : new js.util.ArrayList(),
	
	"TestArrayList" : function() {
		for (var i = 0; i < 3; i++) {
			this.getList().add("测试ArrayList" + i);
		}
	},
	
	"@Test testAdd" : function() {
		for (var i = 4; i < 7; i++) {
			this.getList().add("测试ArrayList" + i);
			js.lang.System.out.println("添加->测试ArrayList" + i);
		}
	},
	"@Test testGet" : function() {
		for (var i = 0; i < 3; i++) {
			js.lang.System.out.println("********index:" + i + "   value:"
					+ this.getList().get(i));
		}
	},
	"@Test testSet" : function() {
		var i = 2, v = "新添加的3";
		js.lang.System.out.println("set-> index:" + i + ",value:" + v
				+ "  ,旧值：" + this.getList().set(i, v) + "新值:" + this.getList().get(i));
	},
	"@Test testRemove" : function() {
		var i = 2;
		js.lang.System.out.println("remove-> index:" + i + ",旧值："
				+ this.getList().remove(i) + "size:" + this.getList().size());

	},
	"@Test testSize" : function() {
		js.lang.System.out.println("size:" + this.getList().size());
	},
	"@Test testClone" : function() {
		var c = this.getList().clone();

		js.lang.System.out.println("克隆前：" + this.getList().size());
		js.lang.System.out.println("克隆后：" + c.size());

		var itr = c.iterator();
		var i = 0;
		while (itr.hasNext()) {
			js.lang.System.out.println("克隆前：" + this.getList().get(i++) + "       克隆后："
					+ itr.next());
		}
	}
});
new test.util.TestList();
new test.util.TestArrayList();
$import("js.test.TestCase");
$import("js.util.HashSet");
Class.forName({
	name : "class test.util.TestHashSet extends js.test.TestCase",
	"@Setter @Getter private set" : new js.util.HashSet(),
	TestHashSet : function() {
		for (var i = 0; i < 3; i++) {
			this.getSet().add("测试set" + i);
		}
	},
	"@Test testSize" : function() {
		js.lang.System.out.println("size:" + this.getSet().size());
	},
	"@Test testClear" : function() {
		js.lang.System.out.println("clear:");
		this.getSet().clear();
		js.lang.System.out.println("size:" + this.getSet().size());
	},
	"@Test testAdd" : function() {
		for (var i = 0; i < 3; i++) {
			js.lang.System.out.println("测试set" + i);
			this.getSet().add("测试set" + i);
		}
		for (var i = 0; i < 3; i++) {
			js.lang.System.out.println("测试set" + i);
			this.getSet().add("测试set" + i);
		}
		js.lang.System.out.println("size:" + this.getSet().size());
	},
	"@Test testIterator" : function() {
		var itr = this.getSet().iterator();
		while (itr.hasNext()) {
			js.lang.System.out.println(itr.next());
		}
	},
	"@Test testContains" : function() {
		var i = "测试set" + 3;
		js.lang.System.out.println("value:" + i + ",contains:"
				+ this.getSet().contains(i));
	},

	"@Test testIsEmpty" : function() {
		js.lang.System.out.println("isEmpty:" + this.getSet().isEmpty());
	},

	"@Test testRemove" : function() {
		var i = "测试set" + 2;
		js.lang.System.out.println("remove-> key:" + i + ",旧值："
				+ this.getSet().remove(i) + " ,size:" + this.getSet().size());
	},
	"@Test testClone" : function() {
		var c = this.getSet().clone();

		js.lang.System.out.println("克隆前：" + this.getSet().size());
		js.lang.System.out.println("克隆后：" + c.size());

		var itr1 = this.getSet().iterator();

		var itr2 = c.iterator();

		while (itr1.hasNext()) {
			var v1 = itr1.next();
			var v2 = itr2.next();
			js.lang.System.out.println("克隆前：value:" + v1 + "       克隆后：value:"
					+ v2);
		}
	}
});

new test.util.TestHashSet();
$import("js.test.TestCase");
$import("js.util.HashMap");
Class.forName({
	name : "class test.util.TestMap extends js.test.TestCase",
	"@Setter @Getter private map" : new js.util.HashMap(),
	TestMap : function() {
		for (var i = 0; i < 6; i++) {
			this.getMap().put(i, "测试Map" + i);
		}
	},
	"@Test testContainsKey" : function() {
		for (var i = 2; i < 4; i++) {
			js.lang.System.out.println("containsKey->  index:" + i
					+ ",containsKey:" + this.getMap().containsKey(i));
		}
	},
	"@Test testContainsValue" : function() {
		for (var i = 2; i < 4; i++) {
			js.lang.System.out.println("containsValue->  value:测试Map" + i
					+ ",containsValue:" + this.getMap().containsValue("测试Map" + i));
		}
	},
	"@Test testGet" : function() {
		for (var i = 4; i < 6; i++) {
			js.lang.System.out.println("get-> index:" + i + ",value:"
					+ this.getMap().get(i));
		}
	},
	"@Test testIsEmpty" : function() {
		js.lang.System.out.println("isEmpty->" + this.getMap().isEmpty());

	},
	"@Test testPut" : function() {
		for (var i = 3; i < 6; i++) {
			this.getMap().put(i, "新put" + i);
			js.lang.System.out.println("put->key:" + i + ",value:"
					+ this.getMap().get(i));
		}
	},
	"@Test testSize" : function() {
		js.lang.System.out.println("size:" + this.getMap().size());
	},
	"@Test testRemove" : function() {
		var i = 5;
		js.lang.System.out.println("remove-> key:" + i + ",旧值："
				+ this.getMap().remove(i) + " ,size:" + this.getMap().size());

	},
	"@Test testClone" : function() {
		var c = this.getMap().clone();

		js.lang.System.out.println("克隆前：" + this.getMap().size());
		js.lang.System.out.println("克隆后：" + c.size());

		var itr1 = this.getMap().entrySet().iterator();

		var itr2 = c.entrySet().iterator();

		while (itr1.hasNext()) {
			var entry1 = itr1.next();
			var entry2 = itr2.next();
			js.lang.System.out.println("克隆前：key:" + entry1.getKey() + ",value:"
					+ entry1.getValue() + "       克隆后：key:" + entry2.getKey()
					+ ",value:" + entry2.getValue());
		}
	}
});
new test.util.TestMap();
$import("js.test.TestCase");
$import("js.util.HashMap");
Class.forName({
	name : "class test.util.TestHashMap extends js.test.TestCase",
	"@Setter @Getter private map" : new js.util.HashMap(),
	TestHashMap : function() {
		for (var i = 0; i < 6; i++) {
			this.getMap().put(i, "测试Map" + i);
		}
	},
	"@Test testEntrySet" : function() {
		var itr = this.getMap().entrySet().iterator();
		while (itr.hasNext()) {
			var entry = itr.next();
			js.lang.System.out.println("key:" + entry.getKey() + ",value:"
					+ entry.getValue());
		}
	},
	"@Test testKeySet" : function() {
		var itr = this.getMap().keySet().iterator();
		while (itr.hasNext()) {
			var key = itr.next();
			js.lang.System.out
					.println("key:" + key + ",value:" + this.getMap().get(key));
		}
	},
	"@Test testValues" : function() {
		var itr = this.getMap().values().iterator();
		while (itr.hasNext()) {
			var value = itr.next();
			js.lang.System.out.println("value:" + value);
		}
	}
});

new test.util.TestHashMap();
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年9月29日
 */

$import("js.test.TestCase");
$import("js.util.Date");
Class.forName({
    name : "class test.util.TestDate extends js.test.TestCase",
    "@Setter @Getter private date" : new js.util.Date(),
    TestDate : function() {
    },

    "@Test public testEquals" : function() {
        js.test.Assert.assertTrue("类js.util.Date中的equals方法测试不通过", !this.getDate().equals(new Date()));
        js.test.Assert.assertTrue("类js.util.Date中的equals方法测试不通过", this.getDate().equals(this.getDate()));
        js.test.Assert.assertTrue("类js.util.Date中的equals方法测试不通过", this.getDate().equals(this.getDate().clone()));
    },

    "@Test public testAfter" : function() {
        js.test.Assert.assertTrue("类js.util.Date中的after方法测试不通过", new Date().after(this.getDate()));
    },

    "@Test public testBefore" : function() {
        js.test.Assert.assertTrue("类js.util.Date中的after方法测试不通过", this.getDate().before(new Date()));
    },

    "@Test public testCompareTo" : function() {
        js.test.Assert.assertTrue("类js.util.Date中的compareTo方法测试不通过", new Date().compareTo(this.getDate()) > 0);
        js.test.Assert.assertTrue("类js.util.Date中的compareTo方法测试不通过", this.getDate().compareTo(new Date()) < 0);
        js.test.Assert.assertTrue("类js.util.Date中的compareTo方法测试不通过", this.getDate().compareTo(this.getDate().clone()) == 0);
    }
}); 

new test.util.TestDate();
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年9月29日
 */

$import("js.test.TestCase");
$import("js.util.Calendar");
$import("js.util.GregorianCalendar");
Class.forName({
    name : "class test.util.TestCalendar extends js.test.TestCase",
    "@Setter @Getter private calendar" : null,

    "@Setter @Getter private static staticField" : 1,

    "@Setter @Getter private field" : 2,

    TestCalendar : function() {
    },

    "@BeforeClass public static setUpBeforeClass" : function() {
        js.test.Assert.assertTrue("类test.util.TestCalendar中的setUpBeforeClass方法测试不通过", this.staticField == 1);
        js.test.Assert.assertTrue("类test.util.TestCalendar中的setUpBeforeClass方法测试不通过", this.field == null);
    },

    "@AfterClass public static tearDownAfterClass" : function() {
        js.test.Assert.assertTrue("类test.util.TestCalendar中的setUpBeforeClass方法测试不通过", this.staticField == 1);
        js.test.Assert.assertTrue("类test.util.TestCalendar中的setUpBeforeClass方法测试不通过", this.field == null);
    },

    "@Before public setUp" : function() {
        this.setCalendar(js.util.Calendar.getInstance());
        this.getCalendar().setTimeInMillis(0);
    },

    "@After public tearDown" : function() {
    },

    "@Test testAfter" : function() {
        js.test.Assert.assertTrue("类js.util.Calendar中的after方法测试不通过", js.util.Calendar.getInstance().after(this.getCalendar()));
    },

    "@Test testBefore" : function() {
        js.test.Assert.assertTrue("类js.util.Calendar中的before方法测试不通过", this.getCalendar().before(js.util.Calendar.getInstance()));
    },

    "@Test testClear" : function() {
        this.getCalendar().clear(js.util.Calendar.YEAR);
        js.test.Assert.assertTrue("类js.util.Calendar中的clear方法测试不通过", this.getCalendar().get(js.util.Calendar.YEAR) == 1970);

        this.getCalendar().clear();
        js.test.Assert.assertTrue("类js.util.Calendar中的clear方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 0);

    },

    "@Test testClone" : function() {
        js.test.Assert.assertTrue("类js.util.Calendar中的clone方法测试不通过", this.getCalendar().clone().compareTo(this.getCalendar()) == 0);
    },

    "@Test testCompareTo" : function() {
        js.test.Assert.assertTrue("类js.util.Calendar中的compareTo方法测试不通过", js.util.Calendar.getInstance().compareTo(this.getCalendar()) > 0);
        js.test.Assert.assertTrue("类js.util.Calendar中的compareTo方法测试不通过", this.getCalendar().compareTo(js.util.Calendar.getInstance()) < 0);
        js.test.Assert.assertTrue("类js.util.Calendar中的compareTo方法测试不通过", this.getCalendar().clone().compareTo(this.getCalendar()) == 0);
    },

    "@Test testEquals" : function() {

        js.test.Assert.assertTrue("类js.util.Calendar中的equals方法测试不通过", this.getCalendar().clone().equals(this.getCalendar()));
        js.test.Assert.assertTrue("类js.util.Calendar中的equals方法测试不通过", !this.getCalendar().clone().equals(js.util.Calendar.getInstance()));
    },

    "@Test testGet" : function() {

        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(YEAR) 正确值：1970 实际值：" + this.getCalendar().get(js.util.Calendar.YEAR), this.getCalendar().get(js.util.Calendar.YEAR) == 1970);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(MONTH) 正确值：0 实际值：" + this.getCalendar().get(js.util.Calendar.MONTH), this.getCalendar().get(js.util.Calendar.MONTH) == 0);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(WEEK_OF_YEAR) 正确值：1 实际值：" + this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR), this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(WEEK_OF_MONTH) 正确值：1 实际值：" + this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH), this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(DAY_OF_MONTH) 正确值：1 实际值：" + this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH), this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(DAY_OF_YEAR) 正确值：1 实际值：" + this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR), this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(DAY_OF_WEEK) 正确值：5 实际值：" + this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK), this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK) == 5);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(DAY_OF_WEEK_IN_MONTH) 正确值：1 实际值：" + this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH), this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(AM_PM) 正确值：0 实际值：" + this.getCalendar().get(js.util.Calendar.AM_PM), this.getCalendar().get(js.util.Calendar.AM_PM) == 0);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(HOUR) 正确值：8 实际值：" + this.getCalendar().get(js.util.Calendar.HOUR), this.getCalendar().get(js.util.Calendar.HOUR) == 8);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(HOUR_OF_DAY) 正确值：8 实际值：" + this.getCalendar().get(js.util.Calendar.HOUR_OF_DAY), this.getCalendar().get(js.util.Calendar.HOUR_OF_DAY) == 8);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(MINUTE) 正确值：0 实际值：" + this.getCalendar().get(js.util.Calendar.MINUTE), this.getCalendar().get(js.util.Calendar.MINUTE) == 0);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(SECOND) 正确值：0 实际值：" + this.getCalendar().get(js.util.Calendar.SECOND), this.getCalendar().get(js.util.Calendar.SECOND) == 0);
        js.test.Assert.assertTrue("类js.util.Calendar中的get方法测试不通过 get(MILLISECOND) 正确值：0 实际值：" + this.getCalendar().get(js.util.Calendar.MILLISECOND), this.getCalendar().get(js.util.Calendar.MILLISECOND) == 0);
    },

    "@Test testGetInstance" : function() {
        js.test.Assert.assertTrue("类js.util.Calendar中的getInstance方法测试不通过", Object.isNull(this.getCalendar()) || Object.isInstanceof(this.getCalendar(), js.util.Calendar));
    },

    "@Test testGetTime" : function() {
        js.lang.System.out.println(this.getCalendar().getTime());
        js.test.Assert.assertTrue("类js.util.Calendar中的getTime方法测试不通过", this.getCalendar().getTime().compareTo(new Date(0)) == 0);
    },

    "@Test testGetTimeInMillis" : function() {
        js.test.Assert.assertTrue("类js.util.Calendar中的getTime方法测试不通过", this.getCalendar().getTimeInMillis() == 0);
    },

    "@Test testSet" : function() {

        //12小时制
        this.getCalendar().clear();
        this.getCalendar().set(js.util.Calendar.YEAR, 1987);
        this.getCalendar().set(js.util.Calendar.MONTH, 3);
        this.getCalendar().set(js.util.Calendar.DAY_OF_MONTH, 10);
        this.getCalendar().set(js.util.Calendar.AM_PM, 1);
        this.getCalendar().set(js.util.Calendar.HOUR, 10);
        this.getCalendar().set(js.util.Calendar.MINUTE, 10);
        this.getCalendar().set(js.util.Calendar.SECOND, 10);
        this.getCalendar().set(js.util.Calendar.MILLISECOND, 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.YEAR) == 1987);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 3);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR) == 15);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR) == 100);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK) == 6);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.AM_PM) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR_OF_DAY) == 22);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MINUTE) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.SECOND) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MILLISECOND) == 10);

        //24小时制
        this.getCalendar().clear();
        this.getCalendar().set(js.util.Calendar.YEAR, 1987);
        this.getCalendar().set(js.util.Calendar.DAY_OF_WEEK, 5);
        this.getCalendar().set(js.util.Calendar.HOUR_OF_DAY, 22);
        this.getCalendar().set(js.util.Calendar.MINUTE, 10);
        this.getCalendar().set(js.util.Calendar.SECOND, 10);
        this.getCalendar().set(js.util.Calendar.MILLISECOND, 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.YEAR) == 1987);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 0);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK) == 5);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.AM_PM) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR_OF_DAY) == 22);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MINUTE) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.SECOND) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MILLISECOND) == 10);

        //DAY_OF_YEAR  一年中的第几天
        this.getCalendar().clear();
        this.getCalendar().set(js.util.Calendar.YEAR, 1987);
        this.getCalendar().set(js.util.Calendar.DAY_OF_YEAR, 100);
        this.getCalendar().set(js.util.Calendar.HOUR_OF_DAY, 22);
        this.getCalendar().set(js.util.Calendar.MINUTE, 10);
        this.getCalendar().set(js.util.Calendar.SECOND, 10);
        this.getCalendar().set(js.util.Calendar.MILLISECOND, 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.YEAR) == 1987);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 3);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR) == 15);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR) == 100);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK) == 6);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.AM_PM) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR_OF_DAY) == 22);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MINUTE) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.SECOND) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MILLISECOND) == 10);

        this.getCalendar().clear();
        this.getCalendar().set(js.util.Calendar.DAY_OF_YEAR, 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 0);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 1);

        this.getCalendar().clear();
        this.getCalendar().set(js.util.Calendar.DAY_OF_YEAR, 31);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 0);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 31);

        this.getCalendar().clear();
        this.getCalendar().set(js.util.Calendar.DAY_OF_YEAR, 32);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 1);

        //DAY_OF_WEEK : 月中的第一个周几
        this.getCalendar().clear();
        this.getCalendar().set(js.util.Calendar.YEAR, 1987);
        this.getCalendar().set(js.util.Calendar.MONTH, 3);
        this.getCalendar().set(js.util.Calendar.DAY_OF_WEEK, 5);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.YEAR) == 1987);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 3);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR) == 14);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR) == 92);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK) == 5);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH) == 1);

        //WEEK_OF_MONTH : 按照日历中的第几周的周天 下标从1开始
        this.getCalendar().clear();
        this.getCalendar().set(js.util.Calendar.YEAR, 1987);
        this.getCalendar().set(js.util.Calendar.MONTH, 3);
        this.getCalendar().set(js.util.Calendar.WEEK_OF_MONTH, 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.YEAR) == 1987);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR) == 14);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH) == 5);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 29);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR) == 88);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH) == 5);

        // DAY_OF_WEEK_IN_MONTH : 按照日历中的第几周的周天 下标从0开始
        this.getCalendar().clear();
        this.getCalendar().set(js.util.Calendar.YEAR, 1987);
        this.getCalendar().set(js.util.Calendar.MONTH, 3);
        this.getCalendar().set(js.util.Calendar.DAY_OF_WEEK_IN_MONTH, 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.YEAR) == 1987);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 3);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR) == 15);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 5);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR) == 95);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH) == 1);

        this.getCalendar().clear();
        this.getCalendar().set(js.util.Calendar.YEAR, 1987);
        this.getCalendar().set(js.util.Calendar.MONTH, 3);
        this.getCalendar().set(js.util.Calendar.DAY_OF_WEEK_IN_MONTH, 0);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的set方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 29);
    },

    "@Test testIsSet" : function() {
        this.getCalendar().set(js.util.Calendar.YEAR, 1987);

        js.test.Assert.assertTrue("类js.util.Calendar中的isFieldSet方法测试不通过", this.getCalendar().isFieldSet(js.util.Calendar.YEAR));
    },

    "@Test testSetDate" : function(year, month, date, hourOfDay, minute, second) {
        this.getCalendar().setDate(1987, 3, 10, 22, 10, 10);

        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.YEAR) == 1987);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 3);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR) == 15);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR) == 100);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK) == 6);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.AM_PM) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR_OF_DAY) == 22);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.MINUTE) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的setDate方法测试不通过", this.getCalendar().get(js.util.Calendar.SECOND) == 10);

    },

    "@Test testSetTime" : function(date) {
        this.getCalendar().setTime(new Date(545062210010));

        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.YEAR) == 1987);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 3);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR) == 15);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR) == 100);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK) == 6);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.AM_PM) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR_OF_DAY) == 22);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.MINUTE) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTime方法测试不通过", this.getCalendar().get(js.util.Calendar.SECOND) == 10);
    },

    "@Test testSetTimeInMillis" : function(millis) {

        this.getCalendar().setTimeInMillis(545062210010);

        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.YEAR) == 1987);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 3);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR) == 15);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR) == 100);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK) == 6);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH) == 2);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.AM_PM) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR_OF_DAY) == 22);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.MINUTE) == 10);
        js.test.Assert.assertTrue("类js.util.Calendar中的setTimeInMillis方法测试不通过", this.getCalendar().get(js.util.Calendar.SECOND) == 10);

    },

    "@Test testToString" : function() {
        js.lang.System.out.println(this.getCalendar().toString());
    }
});

new test.util.TestCalendar();
/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年9月29日
 */

$import("js.test.TestCase");
$import("js.util.Calendar");
$import("js.util.GregorianCalendar");
Class.forName({
    name : "class test.util.TestGregorianCalendar extends js.test.TestCase",
    "@Setter @Getter private calendar" : new js.util.GregorianCalendar(),
    TestGregorianCalendar : function() {
    },

    "@Before public setUp" : function() {
        js.lang.System.out.println("setUp");

        this.setCalendar(js.util.Calendar.getInstance());
        this.getCalendar().setTimeInMillis(545062210010);
    },

    "@Test testAdd" : function() {

        this.getCalendar().add(js.util.Calendar.YEAR, -10);
        this.getCalendar().add(js.util.Calendar.MONTH, 25);
        this.getCalendar().add(js.util.Calendar.DAY_OF_MONTH, 21);
        this.getCalendar().add(js.util.Calendar.HOUR_OF_DAY, -10);
        this.getCalendar().add(js.util.Calendar.MINUTE, 51);
        this.getCalendar().add(js.util.Calendar.SECOND, 15);

        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.YEAR) == 1979);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.MONTH) == 4);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_YEAR) == 22);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.WEEK_OF_MONTH) == 5);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_MONTH) == 31);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_YEAR) == 151);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK) == 5);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.DAY_OF_WEEK_IN_MONTH) == 5);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.AM_PM) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.HOUR_OF_DAY) == 13);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.MINUTE) == 1);
        js.test.Assert.assertTrue("类js.util.Calendar中的add方法测试不通过", this.getCalendar().get(js.util.Calendar.SECOND) == 25);

    }
});

new test.util.TestGregorianCalendar(); /*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年10月16日
 */

$import("js.text.DateFormat");
$import("js.text.SimpleDateFormat");
Class.forName({
    name : "class test.text.TestDateFormat extends js.test.TestCase",
    "@Setter @Getter private format" : null,

    "@Before public setUp" : function() {

    },

    "@Test testFormat" : function() {
        var format1 = new js.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
        var format2 = new js.text.SimpleDateFormat("yMdkHmsSEDFwWahK");
        
        
        
        var d = new Date(1413453621420);
        var t = d.getTime();

        //2014-10-16 18:00:21 420   Thu Oct 16 2014 18:00:21 GMT+0800 (中国标准时间) 
        js.test.Assert.assertTrue("类test.text.TestDateFormat中的testFormat方法测试不通过", format1.format(d) == "2014-10-16 18:00:21 420");
        js.test.Assert.assertTrue("类test.text.TestDateFormat中的testFormat方法测试不通过", format1.format(t) == "2014-10-16 18:00:21 420");
        js.test.Assert.assertTrue("类test.text.TestDateFormat中的testFormat方法测试不通过", format2.format(d) == "201410161818021420星期四2893423下午66");
        js.test.Assert.assertTrue("类test.text.TestDateFormat中的testFormat方法测试不通过", format2.format(t) == "201410161818021420星期四2893423下午66");

        //2014-01-01 00:00:00 00   201411240000星期三1111上午120
        js.lang.System.out.println(format1.format(1388505600000));
        js.lang.System.out.println(format2.format(1388505600000));
        
        //2014-02-28 23:59:59 999 201422823235959999星期五59495下午1111
        js.lang.System.out.println(format1.format(1393603199999));
        js.lang.System.out.println(format2.format(1393603199999));
        
        //2014-03-01 00:00:00 00 201431240000星期六60191上午120
        js.lang.System.out.println(format1.format(1393603200000));
        js.lang.System.out.println(format2.format(1393603200000));
  
        //2014-12-31 23:59:59 999 2014123123235959999星期三365515下午1111
        js.lang.System.out.println(format1.format(1420041599999));
        js.lang.System.out.println(format2.format(1420041599999));


    }
});
new test.text.TestDateFormat();
