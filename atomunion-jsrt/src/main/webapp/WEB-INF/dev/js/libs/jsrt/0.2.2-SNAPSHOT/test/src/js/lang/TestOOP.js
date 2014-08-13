/*!
 * JSRT JavaScript Library 0.2.1
 * lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc.
 * Released under the MIT license
 *
 * Date: 2014年6月27日
 */

$import("js.test.TestCase");
$import("js.test.Assert");
$import("js.model.Animal");
$import("js.model.Dog");

var dog1 = new js.model.Dog("dog1", "汪汪1");
var dog2 = js.model.Dog.$class.newInstance();

var animal1 = new js.model.Animal("animal1");
var animal2 = js.model.Animal.$class.newInstance();

Class.forName({
	name : "class test.lang.TestOOP extends js.test.TestCase",
	"@Test @Auto @Setter @Getter private dog" : dog1,

	testConstrator : function() {
		js.lang.System.out.println("this.getName():" + this.getName());
	},

	testClone : function() {
		js.test.Assert.assertEquals("this.getName()", this.getName(), "dog1");
		js.test.Assert.assertEquals("this.say()", this.say(), "汪汪1");

		var c = this.clone();
		js.test.Assert.assertNotSame("克隆前后值相等", this, c);
		js.test.Assert.assertEquals("clone.getName()", c.getName(), "dog1");
		js.test.Assert.assertEquals("clone.say()", c.say(), "汪汪1");

		// TODO 进一步测试深拷贝
	}
});

new test.lang.TestOOP();
