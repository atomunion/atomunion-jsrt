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
new test.util.TestArrayList();