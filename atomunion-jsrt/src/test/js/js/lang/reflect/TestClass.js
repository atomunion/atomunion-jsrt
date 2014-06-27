$import("js.model.Animal");
$import("js.model.Dog");
$import("js.test.TestCase");

var testReflectObject = new js.model.Dog("dog", "汪汪");

Class.forName({
	name : "class test.lang.TestClass extends js.test.TestCase",
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
		js.lang.System.out.println(this
				.addField(new js.lang.reflect.Field("testAddField",
						"我是动态新增的属性", this, 1, [ "@Getter", "@Setter" ])));
		js.lang.System.out.println(testReflectObject.getTestAddField());
	},
	testNewInstance : function() {
		var c = this.newInstance();
		js.lang.System.out.println(c.getColor());
	}
});

new test.lang.TestClass();
