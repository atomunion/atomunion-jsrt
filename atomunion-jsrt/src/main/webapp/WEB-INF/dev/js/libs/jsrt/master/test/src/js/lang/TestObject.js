$import("js.test.TestCase");
$import("js.test.Assert");
$import("js.model.Animal");
$import("js.model.Dog");

var dog = new js.model.Dog("dog", "汪汪");

Class.forName({
    name : "class test.lang.TestObject extends js.test.TestCase",
    "@Test @Auto @Setter @Getter private obj" : dog,

    testIsNull : function() {

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
    testIsEmpty : function() {
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

    testIsArray : function() {

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

    testIsDate : function() {

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

    testIsObject : function() {

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

    testIsFunction : function() {

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

    testIsNumber : function() {

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

    testIsString : function() {

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

    testIsBoolean : function() {

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

    testIsDefined : function() {

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
    testClone : function() {
        js.lang.System.out.println("克隆前：" + this.toString());
        var c = this.clone();
        js.lang.System.out.println("克隆后：" + c.toString());

        js.test.Assert.assertNotSame("克隆前后  assertSame ", this, c);
    },

    testEach : function() {
        Object.each(this, function(i, o, a) {
            js.lang.System.out.println(i + ":" + o + "    this[" + this + "]" + "    被遍历的对象[" + a.toString() + "]");
        }, null);
    },
    testEnumerate : function() {
        var scope = dog;
        js.lang.System.out.println("scope:" + scope.toString());

        Object.enumerate(this, function(i, o, a) {
            js.lang.System.out.println(i + ":" + o + "    this[" + this + "]    this==scope[" + (this === scope) + "]    被遍历的对象[" + a.toString() + "]");
        }, dog, true);
    },
    testToJson : function() {
        js.lang.System.out.println(this.toJson());

    },
    testToQueryString : function() {
        js.lang.System.out.println(this.toQueryString());
    },
    testGetClass : function() {
        js.lang.System.out.println(this.getClass());

        js.test.Assert.assertNotNull("this.getClass()", this.getClass());
    },
    testEquals : function() {

        js.test.Assert.assertTrue("this.equals(this)", this.equals(this));
        js.test.Assert.assertFalse("this.equals(null)", this.equals(null));
        js.test.Assert.assertFalse("this.equals(undefined)", this.equals(undefined));

    },
    testGetVersion : function() {
        js.test.Assert.assertNotNull("this.getVersion():", this.getVersion());
    },
    testHashCode : function() {
        js.test.Assert.assertNotNull("this.hashCode():", this.hashCode());
    },
    testToString : function() {
        js.test.Assert.assertNotNull("this.toString()", this.toString());
    },
    testForIn : function() {
        for (var i in this) {
            js.lang.System.out.println("key:" + i + "    value:" + this[i] + "   this.hasOwnProperty:" + this.hasOwnProperty(i));
        }

        js.lang.System.out.println("^^^^^^^^^^^^^^^^^^^^^^^test for in Object^^^^^^^^^^^^^^^^^^^^^^^");
        for (var i in Object) {
            js.lang.System.out.println("key:" + i + "    value:" + Object[i] + "   this.hasOwnProperty:" + this.hasOwnProperty(i));
        }
        js.lang.System.out.println("^^^^^^^^^^^^^^^^^^^^^^^test for in newObj^^^^^^^^^^^^^^^^^^^^^^^");
        var newObj = Object.create(this, {
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
            js.lang.System.out.println("key:" + i + "    value:" + newObj[i] + "   this.hasOwnProperty:" + newObj.hasOwnProperty(i));
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
            js.lang.System.out.println("key:" + i + "    value:" + Object[i] + "   this.hasOwnProperty:" + this.hasOwnProperty(i));
        }
        var obj = new Object();
        for (var i in obj) {
            js.lang.System.out.println("key:" + i + "    value:" + obj[i] + "   this.hasOwnProperty:" + this.hasOwnProperty(i));
        }

    }
});
new test.lang.TestObject();
