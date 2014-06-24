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

new test.lang.TestOOP();