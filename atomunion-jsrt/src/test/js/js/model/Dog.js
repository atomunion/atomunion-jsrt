/**
 * 
 * 
 */


$import("js.model.Dog");
var dogClass = Class.forName({
			name : "class js.model.Dog extends js.model.Animal",
			"@Getter @Setter private color" : "black",
			"@Getter @Setter private word" : "",
			Dog : function(name, word) {
				this.name = name;
				this.word = word;
			},
			say : function() {
				return this.word;
			}
		});

