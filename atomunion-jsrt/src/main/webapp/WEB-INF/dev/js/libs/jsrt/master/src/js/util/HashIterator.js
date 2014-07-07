/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Iterator");

Class
		.forName({
			name : "class js.util.HashIterator extends js.util.Iterator",

			hasNext : function() {
				return this._cursor < this._element._hashArray.length;
			},
			next : function() {
				try {
					// TODO
					var next = this._element._table[this._element._hashArray[this._cursor]];
					this._lastRet = this._cursor++;
					return next;
				} catch (e) {
					throw new js.lang.IndexOutOfBoundsException("Index: "
							+ this._cursor + ", Size: " + this._element.size()
							+ ",Message:" + e.getMessage());
				}
			},
			remove : function() {
				if (this._lastRet === -1)
					throw new js.lang.IllegalStateException();
				try {
					this._element._table.splice(
							this._element._hashArray[this._lastRet], 1);

					var keys = this._element._hash;

					Object.each(keys, function(i, v, o) {
						if (v === this._element._hashArray[this._lastRet]) {
							remove(i);
							return false;
						}
					}, this);
					/*
					 * for (var i in keys) { if (keys[i] === this._lastRet) {
					 * delete this._element._hash[i]; break; } }
					 */
					if (this._lastRet < this._cursor)
						this._cursor--;
					this._lastRet = -1;
				} catch (e) {
					throw new js.lang.IndexOutOfBoundsException();
				}
			}

		});
