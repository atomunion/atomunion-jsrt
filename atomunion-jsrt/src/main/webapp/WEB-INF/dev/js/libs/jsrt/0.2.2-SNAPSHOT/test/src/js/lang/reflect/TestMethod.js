$import("js.model.Animal");
$import("js.model.Dog");
$import("js.test.TestCase");

var testReflectObject = new js.model.Dog("dog", "汪汪");

Class
		.forName({
			name : "class test.lang.reflect.TestMethod extends js.test.TestCase",
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

new test.lang.reflect.TestMethod();
