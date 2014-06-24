$import("js.model.Animal");
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
new test.lang.reflect.TestField();