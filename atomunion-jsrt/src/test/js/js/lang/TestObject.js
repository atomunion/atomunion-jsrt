$import("js.model.Animal");
$import("js.model.Dog");
$import("js.test.TestUnit");

var dog1 = new js.model.Dog("dog2", "汪汪2");
var dog2 = js.model.Dog.$class.newInstance();

var animal1 = new js.model.Animal("animal");
var animal2 = js.model.Animal.$class.newInstance();

Class.forName({
			name : "class test.lang.TestObject extends js.test.TestUnit",
			"@Test @Auto @Setter @Getter private dog" : dog1,
			testClone : function() {
				js.lang.System.out.println("克隆前：" + this.toString());
				js.lang.System.out.println(this.getName());
				js.lang.System.out.println(this.say());

				var c = this.clone();
				js.lang.System.out.println("克隆后：" + c.toString());
				js.lang.System.out.println("克隆前后：" + (this == c));
				js.lang.System.out.println(c.getName());
				js.lang.System.out.println(c.say());
			}
		});
new test.lang.TestObject();