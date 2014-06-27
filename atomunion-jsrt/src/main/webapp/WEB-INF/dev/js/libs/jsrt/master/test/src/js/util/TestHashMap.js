$import("js.test.TestCase");
$import("js.util.HashMap");
Class.forName({
	name : "class test.util.TestHashMap extends js.test.TestCase",
	"@Test @Auto @Setter @Getter private map" : new js.util.HashMap(),
	TestHashMap : function() {
		for (var i = 0; i < 6; i++) {
			this.getMap().put(i, "测试Map" + i);
		}
	},
	testEntrySet : function() {
		var itr = this.entrySet().iterator();
		while (itr.hasNext()) {
			var entry = itr.next();
			js.lang.System.out.println("key:" + entry.getKey() + ",value:"
					+ entry.getValue());
		}
	},
	testKeySet : function() {
		var itr = this.keySet().iterator();
		while (itr.hasNext()) {
			var key = itr.next();
			js.lang.System.out
					.println("key:" + key + ",value:" + this.get(key));
		}
	},
	testValues : function() {
		var itr = this.values().iterator();
		while (itr.hasNext()) {
			var value = itr.next();
			js.lang.System.out.println("value:" + value);
		}
	}
});

new test.util.TestHashMap();
