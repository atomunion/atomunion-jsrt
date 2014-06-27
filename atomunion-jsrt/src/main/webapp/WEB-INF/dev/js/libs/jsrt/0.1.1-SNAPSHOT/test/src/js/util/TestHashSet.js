$import("js.test.TestCase");
$import("js.util.HashSet");
Class.forName({
	name : "class test.util.TestHashSet extends js.test.TestCase",
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
		for (var i = 0; i < 3; i++) {
			js.lang.System.out.println("测试set" + i);
			this.add("测试set" + i);
		}
		for (var i = 0; i < 3; i++) {
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
		var i = "测试set" + 2;
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
			js.lang.System.out.println("克隆前：value:" + v1 + "       克隆后：value:"
					+ v2);
		}
	}
});

new test.util.TestHashSet();
