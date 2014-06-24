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
			}
		});
/**
 * 
 * 
 */


$import("js.model.Animal");
var dogClass = Class.forName({
			name : "class js.model.Dog extends js.model.Animal",
			"@Getter @Setter private color" : "black",
			"@Getter @Setter private word" : "",
			Dog : function(name, word) {
				this.word = word;
			},
			say : function() {
				return this.word;
			}
		});

$import("js.test.TestUnit");
$import("js.model.Animal");
$import("js.model.Dog");

var dog1 = new js.model.Dog("dog2", "汪汪2");
var dog2 = js.model.Dog.$class.newInstance();

var animal1 = new js.model.Animal("animal");
var animal2 = js.model.Animal.$class.newInstance();

Class
		.forName({
			name : "class test.lang.TestObject extends js.test.TestUnit",
			"@Test @Auto @Setter @Getter private obj" : {
				name : 'i am a object.',
				address : {
					china : true,
					no : 1
				}
			},

			testIsEmpty : function() {
				js.lang.System.out.println("null:" + Object.isEmpty(null));
				js.lang.System.out.println("undefined:"
						+ Object.isEmpty(undefined));
				js.lang.System.out.println("{}:" + Object.isEmpty({}));
				js.lang.System.out.println("[]:" + Object.isEmpty([]));
				js.lang.System.out.println("0:" + Object.isEmpty(0));
				js.lang.System.out.println("0.0:" + Object.isEmpty(0.0));
				js.lang.System.out.println("\"\":" + Object.isEmpty(""));
				js.lang.System.out.println("-1:" + Object.isEmpty(-1));
				js.lang.System.out.println("new Date():"
						+ Object.isEmpty(new Date()));
				js.lang.System.out.println("new js.model.Dog():"
						+ Object.isEmpty(dog1));
				js.lang.System.out.println("function(){}:"
						+ Object.isEmpty(function() {
						}));

				js.lang.System.out.println("true:" + Object.isEmpty(true));
				js.lang.System.out.println("false:" + Object.isEmpty(false));
			},

			testIsArray : function() {

				js.lang.System.out.println("null:" + Object.isArray(null));
				js.lang.System.out.println("undefined:"
						+ Object.isArray(undefined));
				js.lang.System.out.println("{}:" + Object.isArray({}));
				js.lang.System.out.println("[]:" + Object.isArray([]));
				js.lang.System.out.println("0:" + Object.isArray(0));
				js.lang.System.out.println("0.0:" + Object.isArray(0.0));
				js.lang.System.out.println("\"\":" + Object.isArray(""));
				js.lang.System.out.println("-1:" + Object.isArray(-1));
				js.lang.System.out.println("new Date():"
						+ Object.isArray(new Date()));
				js.lang.System.out.println("new js.model.Dog():"
						+ Object.isArray(dog1));
				js.lang.System.out.println("function(){}:"
						+ Object.isArray(function() {
						}));

				js.lang.System.out.println("true:" + Object.isArray(true));
				js.lang.System.out.println("false:" + Object.isArray(false));
			},

			testIsDate : function() {

				js.lang.System.out.println("null:" + Object.isDate(null));
				js.lang.System.out.println("undefined:"
						+ Object.isDate(undefined));
				js.lang.System.out.println("{}:" + Object.isDate({}));
				js.lang.System.out.println("[]:" + Object.isDate([]));
				js.lang.System.out.println("0:" + Object.isDate(0));
				js.lang.System.out.println("0.0:" + Object.isDate(0.0));
				js.lang.System.out.println("\"\":" + Object.isDate(""));
				js.lang.System.out.println("-1:" + Object.isDate(-1));
				js.lang.System.out.println("new Date():"
						+ Object.isDate(new Date()));
				js.lang.System.out.println("new js.model.Dog():"
						+ Object.isDate(dog1));
				js.lang.System.out.println("function(){}:"
						+ Object.isDate(function() {
						}));

				js.lang.System.out.println("true:" + Object.isDate(true));
				js.lang.System.out.println("false:" + Object.isDate(false));

			},

			testIsObject : function() {

				js.lang.System.out.println("null:" + Object.isObject(null));
				js.lang.System.out.println("undefined:"
						+ Object.isObject(undefined));
				js.lang.System.out.println("{}:" + Object.isObject({}));
				js.lang.System.out.println("[]:" + Object.isObject([]));
				js.lang.System.out.println("0:" + Object.isObject(0));
				js.lang.System.out.println("0.0:" + Object.isObject(0.0));
				js.lang.System.out.println("\"\":" + Object.isObject(""));
				js.lang.System.out.println("-1:" + Object.isObject(-1));
				js.lang.System.out.println("new Date():"
						+ Object.isObject(new Date()));
				js.lang.System.out.println("new js.model.Dog():"
						+ Object.isObject(dog1));
				js.lang.System.out.println("function(){}:"
						+ Object.isObject(function() {
						}));

				js.lang.System.out.println("true:" + Object.isObject(true));
				js.lang.System.out.println("false:" + Object.isObject(false));

			},

			testIsFunction : function() {

				js.lang.System.out.println("null:" + Object.isFunction(null));
				js.lang.System.out.println("undefined:"
						+ Object.isFunction(undefined));
				js.lang.System.out.println("{}:" + Object.isFunction({}));
				js.lang.System.out.println("[]:" + Object.isFunction([]));
				js.lang.System.out.println("0:" + Object.isFunction(0));
				js.lang.System.out.println("0.0:" + Object.isFunction(0.0));
				js.lang.System.out.println("\"\":" + Object.isFunction(""));
				js.lang.System.out.println("-1:" + Object.isFunction(-1));
				js.lang.System.out.println("new Date():"
						+ Object.isFunction(new Date()));
				js.lang.System.out.println("new js.model.Dog():"
						+ Object.isFunction(dog1));
				js.lang.System.out.println("function(){}:"
						+ Object.isFunction(function() {
						}));

				js.lang.System.out.println("true:" + Object.isFunction(true));
				js.lang.System.out.println("false:" + Object.isFunction(false));
			},

			testIsNumber : function() {

				js.lang.System.out.println("null:" + Object.isNumber(null));
				js.lang.System.out.println("undefined:"
						+ Object.isNumber(undefined));
				js.lang.System.out.println("{}:" + Object.isNumber({}));
				js.lang.System.out.println("[]:" + Object.isNumber([]));
				js.lang.System.out.println("0:" + Object.isNumber(0));
				js.lang.System.out.println("0.0:" + Object.isNumber(0.0));
				js.lang.System.out.println("\"\":" + Object.isNumber(""));
				js.lang.System.out.println("-1:" + Object.isNumber(-1));
				js.lang.System.out.println("new Date():"
						+ Object.isNumber(new Date()));
				js.lang.System.out.println("new js.model.Dog():"
						+ Object.isNumber(dog1));
				js.lang.System.out.println("function(){}:"
						+ Object.isNumber(function() {
						}));

				js.lang.System.out.println("true:" + Object.isNumber(true));
				js.lang.System.out.println("false:" + Object.isNumber(false));

			},

			testIsString : function() {

				js.lang.System.out.println("null:" + Object.isString(null));
				js.lang.System.out.println("undefined:"
						+ Object.isString(undefined));
				js.lang.System.out.println("{}:" + Object.isString({}));
				js.lang.System.out.println("[]:" + Object.isString([]));
				js.lang.System.out.println("0:" + Object.isString(0));
				js.lang.System.out.println("0.0:" + Object.isString(0.0));
				js.lang.System.out.println("\"\":" + Object.isString(""));
				js.lang.System.out.println("-1:" + Object.isString(-1));
				js.lang.System.out.println("new Date():"
						+ Object.isString(new Date()));
				js.lang.System.out.println("new js.model.Dog():"
						+ Object.isString(dog1));
				js.lang.System.out.println("function(){}:"
						+ Object.isString(function() {
						}));

				js.lang.System.out.println("true:" + Object.isString(true));
				js.lang.System.out.println("false:" + Object.isString(false));

			},

			testIsBoolean : function() {

				js.lang.System.out.println("null:" + Object.isBoolean(null));
				js.lang.System.out.println("undefined:"
						+ Object.isBoolean(undefined));
				js.lang.System.out.println("{}:" + Object.isBoolean({}));
				js.lang.System.out.println("[]:" + Object.isBoolean([]));
				js.lang.System.out.println("0:" + Object.isBoolean(0));
				js.lang.System.out.println("0.0:" + Object.isBoolean(0.0));
				js.lang.System.out.println("\"\":" + Object.isBoolean(""));
				js.lang.System.out.println("-1:" + Object.isBoolean(-1));
				js.lang.System.out.println("new Date():"
						+ Object.isBoolean(new Date()));
				js.lang.System.out.println("new js.model.Dog():"
						+ Object.isBoolean(dog1));
				js.lang.System.out.println("function(){}:"
						+ Object.isBoolean(function() {
						}));
				js.lang.System.out.println("true:" + Object.isBoolean(true));
				js.lang.System.out.println("false:" + Object.isBoolean(false));

			},

			testIsDefined : function() {

				js.lang.System.out.println("null:" + Object.isDefined(null));
				js.lang.System.out.println("undefined:"
						+ Object.isDefined(undefined));
				js.lang.System.out.println("{}:" + Object.isDefined({}));
				js.lang.System.out.println("[]:" + Object.isDefined([]));
				js.lang.System.out.println("0:" + Object.isDefined(0));
				js.lang.System.out.println("0.0:" + Object.isDefined(0.0));
				js.lang.System.out.println("\"\":" + Object.isDefined(""));
				js.lang.System.out.println("-1:" + Object.isDefined(-1));
				js.lang.System.out.println("new Date():"
						+ Object.isDefined(new Date()));
				js.lang.System.out.println("new js.model.Dog():"
						+ Object.isDefined(dog1));
				js.lang.System.out.println("function(){}:"
						+ Object.isDefined(function() {
						}));
				js.lang.System.out.println("true:" + Object.isDefined(true));
				js.lang.System.out.println("false:" + Object.isDefined(false));

			},
			testClone : function() {
				js.lang.System.out.println("克隆前：" + this.toString());
				var c = this.clone();
				js.lang.System.out.println("克隆后：" + c.toString());
				js.lang.System.out.println("克隆前后：" + (this === c));
			},

			testEach : function() {
				Object.each(this, function(i, o, a) {
					js.lang.System.out.println(i + ":" + o + "    this[" + this
							+ "]" + "    被遍历的对象[" + a.toString() + "]");
				}, null);
			},
			testEnumerate : function() {
				js.lang.System.out.println("scope:" + scope);
				Object.enumerate(this, function(i, o, a) {
					js.lang.System.out.println(i + ":" + o + "    this[" + this
							+ "]" + "    被遍历的对象[" + a.toString() + "]");
				}, this, true);

			},
			testToJson : function() {

				js.lang.System.out.println(Object.toJson(this));

			},
			testToQueryString : function() {
				js.lang.System.out.println(Object.toQueryString(this));
			},
			testGetClass : function() {
				js.lang.System.out.println(this.getClass());
			},
			testEquals : function() {

				js.lang.System.out.println("this.equals(this):"
						+ this.equals(this));
				js.lang.System.out.println("this.equals(null):"
						+ this.equals(null));
				js.lang.System.out.println("this.equals(undefined):"
						+ this.equals(undefined));

			},
			testGetVersion : function() {
				js.lang.System.out.println("this.getVersion():"
						+ this.getVersion());
			},
			testHashCode : function() {
				js.lang.System.out
						.println("this.hashCode():" + this.hashCode());
				js.lang.System.out
						.println("this.hashCode():" + this.hashCode());
			},
			testToString : function() {
				js.lang.System.out
						.println("this.toString():" + this.toString());
			}
		});
new test.lang.TestObject();

Class.forName({
	name : "class test.lang.TestOOP extends js.test.TestUnit",
	"@Test @Auto @Setter @Getter private dog" : dog1,

	testConstrator : function() {
		js.lang.System.out.println("this.getName():" + this.getName());
	},

	testClone : function() {
		js.lang.System.out.println("克隆前：" + this.toString());
		js.lang.System.out.println(this.getName());
		js.lang.System.out.println(this.say());

		var c = this.clone();
		js.lang.System.out.println("克隆后：" + c.toString());
		js.lang.System.out.println("克隆前后：" + (this === c));
		js.lang.System.out.println(c.getName());
		js.lang.System.out.println(c.say());
	}
});

new test.lang.TestOOP();$import("js.model.Animal");
$import("js.model.Dog");
$import("js.test.TestUnit");

var testReflectObject = new js.model.Dog("dog", "汪汪");

Class.forName({
	name : "class test.lang.TestClass extends js.test.TestUnit",
	"@Test @Auto @Setter @Getter private dog" : testReflectObject.getClass(),
	TestClass : function() {
	},
	testGetConstructor : function() {
		js.lang.System.out.println(this.getConstructor());
	},
	testGetInitial : function() {
		js.lang.System.out.println(this.getInitial());
	},
	testGetInit : function() {
		js.lang.System.out.println(this.getInit());
	},
	testGetName : function() {
		js.lang.System.out.println(this.getName());
	},
	testGetFullName : function() {
		js.lang.System.out.println(this.getFullName());
	},
	testGetInstance : function() {
		js.lang.System.out.println(this.getInstance());
	},
	testGetAnnotations : function() {
		js.lang.System.out.println(this.getAnnotations());
	},
	testGetPackage : function() {
		js.lang.System.out.println(this.getPackage());
	},
	testGetDeclaredField : function() {
		js.lang.System.out.println(this.getDeclaredField("color"));
	},
	testGetDeclaredFields : function() {
		js.lang.System.out.println(this.getDeclaredFields());
	},
	testGetField : function() {
		js.lang.System.out.println(this.getField("color"));
	},
	testGetFields : function() {
		js.lang.System.out.println(this.getFields());
	},
	testGetDeclaredMethod : function() {
		js.lang.System.out.println(this.getDeclaredMethod("say"));
	},
	testGetDeclaredMethods : function() {
		js.lang.System.out.println(this.getDeclaredMethods());
	},
	testGetMethod : function() {
		js.lang.System.out.println(this.getMethod("say"));
	},
	testGetMethods : function() {
		js.lang.System.out.println(this.getMethods());
	},
	testGetSuperClass : function() {
		js.lang.System.out.println(this.getSuperClass());
	},
	testGetModifiers : function() {
		js.lang.System.out.println(this.getModifiers());
	},
	testAddMethod : function() {
		this.addMethod(new js.lang.reflect.Method("testAddMethod", function() {
					return "我是动态新增的方法";
				}, this, 1, []));
		js.lang.System.out.println(testReflectObject.testAddMethod());
	},
	testAddField : function() {
		js.lang.System.out.println(this.addField(new js.lang.reflect.Field(
				"testAddField", "我是动态新增的属性", this, 1, ["@Getter", "@Setter"])));
		js.lang.System.out.println(testReflectObject.getTestAddField());
	},
	testNewInstance : function() {
		var c = this.newInstance();
		js.lang.System.out.println(c.getColor());
	}
});
new test.lang.TestClass();$import("js.model.Animal");
$import("js.model.Dog");
$import("js.test.TestUnit");

var testReflectObject = new js.model.Dog("dog", "汪汪");

Class.forName({
			name : "class test.lang.reflect.TestField extends js.test.TestUnit",
			"@Test @Auto @Setter @Getter private fields" : testReflectObject
					.getClass().getFields()["color"],
			TestField : function() {
			},
			testGetDeclaringClass : function() {
				js.lang.System.out.println(this.getDeclaringClass());
			},
			testGetName : function() {
				js.lang.System.out.println(this.getName());
			},
			testGetModifiers : function() {
				js.lang.System.out.println(this.getModifiers());
			},
			testGetAnnotations : function() {
				js.lang.System.out.println(this.getAnnotations());
			},
			testGetValue : function() {
				js.lang.System.out.println(this.getValue());
			},
			testGet : function() {
				js.lang.System.out.println(this.get(testReflectObject));
			},
			testSet : function() {
				js.lang.System.out.println("set(\"red\")");
				this.set(testReflectObject, "red")
				js.lang.System.out.println(this.get(testReflectObject));
			}
		});
new test.lang.reflect.TestField();$import("js.model.Animal");
$import("js.model.Dog");
$import("js.test.TestUnit");

var testReflectObject = new js.model.Dog("dog", "汪汪");
Class.forName({
	name : "class test.lang.reflect.TestMethod extends js.test.TestUnit",
	"@Test @Auto @Setter @Getter private methods" : testReflectObject
			.getClass().getMethods()["say"],
	TestMethod : function() {
	},
	testInvoke : function() {
		js.lang.System.out
				.println("invoke say(), The desired operation is to print \"汪汪\"");
		js.lang.System.out.println(this.invoke(testReflectObject));
	},
	testGetDeclaringClass : function() {
		js.lang.System.out.println(this.getDeclaringClass());
	},
	testGetName : function() {
		js.lang.System.out.println(this.getName());
	},
	testGetModifiers : function() {
		js.lang.System.out.println(this.getModifiers());
	},
	testGetAnnotations : function() {
		js.lang.System.out.println(this.getAnnotations());
	},
	testGetValue : function() {
		js.lang.System.out.println(this.getValue());
	}
});
new test.lang.reflect.TestMethod();$import("js.test.TestUnit");
$import("js.util.ArrayList");
Class.forName({
			name : "class test.util.TestList extends js.test.TestUnit",
			"@Test @Auto @Setter @Getter private list" : new js.util.ArrayList(),
			TestList : function() {
				for (var i = 0; i < 3; i++) {
					this.getList().add("测试List接口" + i);
				}
			},
			testListIterator : function() {
				var itr = this.listIterator();
				while (itr.hasNext()) {
					js.lang.System.out.println(itr.next());
				}

				while (itr.hasPrevious()) {
					js.lang.System.out.println(itr.previous());
				}
			},
			testIterator : function() {
				var itr = this.iterator();
				while (itr.hasNext()) {
					js.lang.System.out.println(itr.next());
				}
			},
			testIndexOf : function() {
				for (var i = 0; i < 3; i++) {
					js.lang.System.out.println("********indexOf:" + i
							+ "   value:" + this.indexOf("测试" + i));
				}
			},
			testLastIndexOf : function() {
				for (var i = 0; i < 3; i++) {
					js.lang.System.out.println("********lastIndexOf:" + i
							+ "   value:" + this.lastIndexOf("测试" + i));
				}
			},
			testSubList : function() {
				js.lang.System.out.println("********subList(1,2)->"
						+ "   value:" + this.subList(1, 2));
			},
			testClear : function() {
				js.lang.System.out.println("clear前：" + this.size());
				this.clear();
				js.lang.System.out.println("clear后：" + this.size());
			}
		});
		
		$import("js.test.TestUnit");
$import("js.util.ArrayList");
Class.forName({
			name : "class test.util.TestArrayList extends js.test.TestUnit",
			"@Test @Auto @Setter @Getter private list" : new js.util.ArrayList(),
			TestArrayList : function() {
				for (var i = 0; i < 3; i++) {
					this.getList().add("测试ArrayList" + i);
				}
			},
			testAdd : function() {
				for (var i = 4; i < 7; i++) {
					this.add("测试ArrayList" + i);
					js.lang.System.out.println("添加->测试ArrayList" + i);
				}
			},
			testGet : function() {
				for (var i = 0; i < 3; i++) {
					js.lang.System.out.println("********index:" + i
							+ "   value:" + this.get(i));
				}
			},
			testSet : function() {
				var i = 2, v = "新添加的3";
				js.lang.System.out.println("set-> index:" + i + ",value:" + v
						+ "  ,旧值：" + this.set(i, v) + "新值:" + this.get(i));
			},
			testRemove : function() {
				var i = 2;
				js.lang.System.out.println("remove-> index:" + i + ",旧值："
						+ this.remove(i) + "size:" + this.size());

			},
			testSize : function() {
				js.lang.System.out.println("size:" + this.size());
			},
			testClone : function() {
				var c = this.clone();

				js.lang.System.out.println("克隆前：" + this.size());
				js.lang.System.out.println("克隆后：" + c.size());

				var itr = c.iterator();
				var i = 0;
				while (itr.hasNext()) {
					js.lang.System.out.println("克隆前：" + this.get(i++)
							+ "       克隆后：" + itr.next());
				}
			}
		});
new test.util.TestList();
new test.util.TestArrayList();$import("js.test.TestUnit");
$import("js.util.HashSet");
Class.forName({
			name : "class test.util.TestHashSet extends js.test.TestUnit",
			"@Test @Auto @Setter @Getter private set" : new js.util.HashSet(),
			TestHashSet : function() {
				for (var i = 0; i < 3; i++) {
					this.getSet().add("测试set" + i);
				}
			},
			testSize : function() {
				js.lang.System.out.println("size:" + this.size());
			},
			testClear : function() {
				js.lang.System.out.println("clear:");
				this.clear();
				js.lang.System.out.println("size:" + this.size());
			},
			testAdd : function() {
				for(var i=0;i<3;i++){
					js.lang.System.out.println("测试set" + i);
					this.add("测试set" + i);
				}
				for(var i=0;i<3;i++){
					js.lang.System.out.println("测试set" + i);
					this.add("测试set" + i);
				}
				js.lang.System.out.println("size:" + this.size());
			},
			testIterator : function() {
				var itr = this.iterator();
				while (itr.hasNext()) {
					js.lang.System.out.println(itr.next());
				}
			},
			testContains : function() {
				var i = "测试set" + 3;
				js.lang.System.out.println("value:" + i + ",contains:"
						+ this.contains(i));
			},

			testIsEmpty : function() {
				js.lang.System.out.println("isEmpty:" + this.isEmpty());
			},

			testRemove : function() {
				var i = "测试set"+2;
				js.lang.System.out.println("remove-> key:" + i + ",旧值："
						+ this.remove(i) + " ,size:" + this.size());
			},
			testClone : function() {
				var c = this.clone();

				js.lang.System.out.println("克隆前：" + this.size());
				js.lang.System.out.println("克隆后：" + c.size());

				var itr1 = this.iterator();

				var itr2 = c.iterator();

				while (itr1.hasNext()) {
					var v1 = itr1.next();
					var v2 = itr2.next();
					js.lang.System.out.println("克隆前：value:" + v1
							+ "       克隆后：value:" + v2);
				}
			}
		});

new test.util.TestHashSet();$import("js.test.TestUnit");
$import("js.util.HashMap");
Class.forName({
			name : "class test.util.TestMap extends js.test.TestUnit",
			"@Test @Auto @Setter @Getter private map" : new js.util.HashMap(),
			TestMap : function() {
				for (var i = 0; i < 6; i++) {
					this.getMap().put(i, "测试Map" + i);
				}
			},
			testContainsKey : function() {
				for (var i = 2; i < 4; i++) {
					js.lang.System.out.println("containsKey->  index:" + i
							+ ",containsKey:" + this.containsKey(i));
				}
			},
			testContainsValue : function() {
				for (var i = 2; i < 4; i++) {
					js.lang.System.out.println("containsValue->  value:测试Map"
							+ i + ",containsValue:"
							+ this.containsValue("测试Map" + i));
				}
			},
			testGet : function() {
				for (var i = 4; i < 6; i++) {
					js.lang.System.out.println("get-> index:" + i + ",value:"
							+ this.get(i));
				}
			},
			testIsEmpty : function() {
				js.lang.System.out.println("isEmpty->" + this.isEmpty());

			},
			testPut : function() {
				for (var i = 3; i < 6; i++) {
					this.put(i, "新put" + i);
					js.lang.System.out.println("put->key:" + i + ",value:"
							+ this.get(i));
				}
			},
			testSize : function() {
				js.lang.System.out.println("size:" + this.size());
			},
			testRemove : function() {
				var i = 5;
				js.lang.System.out.println("remove-> key:" + i + ",旧值："
						+ this.remove(i) + " ,size:" + this.size());

			},
			testClone : function() {
				var c = this.clone();

				js.lang.System.out.println("克隆前：" + this.size());
				js.lang.System.out.println("克隆后：" + c.size());

				var itr1 = this.entrySet().iterator();

				var itr2 = c.entrySet().iterator();

				while (itr1.hasNext()) {
					var entry1 = itr1.next();
					var entry2 = itr2.next();
					js.lang.System.out.println("克隆前：key:" + entry1.getKey()
							+ ",value:" + entry1.getValue() + "       克隆后：key:"
							+ entry2.getKey() + ",value:" + entry2.getValue());
				}
			}
		});$import("js.test.TestUnit");
$import("js.util.HashMap");
Class.forName({
			name : "class test.util.TestHashMap extends js.test.TestUnit",
			"@Test @Auto @Setter @Getter private map" : new js.util.HashMap(),
			TestHashMap : function() {
				for (var i = 0; i < 6; i++) {
					this.getMap().put(i, "测试Map" + i);
				}
			},
			testEntrySet : function() {
				var itr = this.entrySet().iterator();
				while (itr.hasNext()) {
					var entry = itr.next();
					js.lang.System.out.println("key:" + entry.getKey()
							+ ",value:" + entry.getValue());
				}
			},
			testKeySet : function() {
				var itr = this.keySet().iterator();
				while (itr.hasNext()) {
					var key = itr.next();
					js.lang.System.out.println("key:" + key + ",value:"
							+ this.get(key));
				}
			},
			testValues : function() {
				var itr = this.values().iterator();
				while (itr.hasNext()) {
					var value = itr.next();
					js.lang.System.out.println("value:" + this.get(value));
				}
			}
		});
		
		new test.util.TestMap();
new test.util.TestHashMap();