$import("js.test.TestUnit");
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
		});