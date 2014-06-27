$import("js.test.TestCase");
$import("js.util.ArrayList");
Class.forName({
	name : "class test.util.TestList extends js.test.TestCase",
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
			js.lang.System.out.println("********indexOf:" + i + "   value:"
					+ this.indexOf("测试" + i));
		}
	},
	testLastIndexOf : function() {
		for (var i = 0; i < 3; i++) {
			js.lang.System.out.println("********lastIndexOf:" + i + "   value:"
					+ this.lastIndexOf("测试" + i));
		}
	},
	testSubList : function() {
		js.lang.System.out.println("********subList(1,2)->" + "   value:"
				+ this.subList(1, 2));
	},
	testClear : function() {
		js.lang.System.out.println("clear前：" + this.size());
		this.clear();
		js.lang.System.out.println("clear后：" + this.size());
	}
});
new test.util.TestList();
