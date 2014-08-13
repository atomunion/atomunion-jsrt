/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 14, 2014
 */

Class
		.forName({
			name : "class js.net.URLClassLoader extends js.lang.ClassLoader",

			'@Setter @Getter loadedScripts' : {},
			'@Setter @Getter waitingList' : {},
			'@Setter @Getter path' : [],

			URLClassLoader : function(parent) {
				this.parent = parent;
			},

			findClass : function(scriptUrl, notModify) {
				var isString = (Object.isString(scriptUrl));

				if (isString)
					scriptUrl = [ scriptUrl ];

				var classes = {}, path = this.path;
				if (!Object.isArray(scriptUrl)) {
					return classes;
				}

				for (var i = 0; i < scriptUrl.length; i++) {
					var src = url = scriptUrl[i];

					for (var j = 0; j < path.length; j++) {
						if (path[j] && path[j].name && path[j].url) {
							if (src.indexOf(path[j].name) === 0) {
								src = path[j].url
										+ src.substring(path[j].name.length);
								break;
							}
						}
					}
					src = src.replace(/[.]/g, "/") + ".js";
					if (notModify) {
						src += "?t=" + new Date().getTime();
					}
					classes[url] = src;
				}
				return classes;
			},
			/**
			 * Loads one or more external script checking if not already loaded
			 * previously by this function.
			 * 
			 * @param {String|Array}
			 *            scriptUrl One or more URLs pointing to the scripts to
			 *            be loaded.
			 * @param {Function}
			 *            [callback] A function to be called when the script is
			 *            loaded and executed. If a string is passed to
			 *            "scriptUrl", a boolean parameter is passed to the
			 *            callback, indicating the success of the load. If an
			 *            array is passed instead, two array parameters are
			 *            passed to the callback; the first contains the URLs
			 *            that have been properly loaded, and the second the
			 *            failed ones.
			 * @param {Object}
			 *            [scope] The scope ("this" reference) to be used for
			 *            the callback call. Default to {@link Mclipse}.
			 * @param {Boolean}
			 *            [showBusy] Changes the cursor of the document while + *
			 *            the script is loaded.
			 * @example new js.lang.URLClassLoader().load( '/myscript.js' );
			 * @example new js.lang.URLClassLoader().load( '/myscript.js',
			 *          function( success ) { // Alerts "true" if the script has
			 *          been properly loaded. // HTTP error 404 should return
			 *          "false". alert( success ); });
			 * @example new js.lang.URLClassLoader().load( [ '/myscript1.js',
			 *          '/myscript2.js' ], function( completed, failed ) {
			 *          alert( 'Number of scripts loaded: ' + completed.length );
			 *          alert( 'Number of failures: ' + failed.length ); });
			 */
			loadClass : function(scriptUrl, synchronous, notModify, callback,
					scope, showBusy) {

				var isString = (Object.isString(scriptUrl));

				if (isString)
					scriptUrl = [ scriptUrl ];

				if (!Object.isArray(scriptUrl)) {
					return false;
				}

				var scriptCount = scriptUrl.length, loadedScripts = this.loadedScripts, waitingList = this.waitingList, completed = [], failed = [];

				showBusy && document.setStyle('cursor', 'wait');
				if (!scope) {
					scope = this;
				}

				var doCallback = function(success) {
					if (callback) {
						if (isString)
							callback.call(scope, success);
						else
							callback.call(scope, completed, failed);
					}
					if (failed.length > 0) {
						throw new js.lang.ClassNotFoundException(
								"Can't find Class named (" + failed.join(",")
										+ ")");
					}
				};

				if (scriptCount === 0) {
					doCallback(true);
					return true;
				}

				var checkLoaded = function(url, success) {
					(success ? completed : failed).push(url);

					if (--scriptCount <= 0) {
						showBusy
								&& document.getDocumentElement().removeStyle(
										'cursor');
						doCallback(success);
					}
				};

				var onLoad = function(url, success) {
					// Mark this script as loaded.
					loadedScripts[url] = 1;

					if (waitingList[url]) {
						// Get the list of callback checks waiting for this
						// file.
						var waitingInfo = waitingList[url];
						delete waitingList[url];

						// Check all callbacks waiting for this file.
						for (var i = 0; i < waitingInfo.length; i++)
							waitingInfo[i](url, success);
					}

				};

				var loadScript = function(url, src) {

					// Create the <script> element.
					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.src = src;

					if (script) {
						if ('addEventListener' in script) {
							script.onload = function() {
								onLoad(url, true);
							};
						} else if ('readyState' in script) { // for <IE9
							// Compatability
							script.onreadystatechange = function() {
								if (script.readyState === 'loaded'
										|| script.readyState === 'complete') {
									script.onreadystatechange = null;
									onLoad(url, true);
								}
							};
						} else {
							/** @ignore */
							script.onload = function() {
								// Some browsers, such as Safari, may call the
								// onLoad function
								// immediately. Which will break the loading
								// sequence. (#3661)
								setTimeout(function() {
									onLoad(url, true);
								}, 0);
							};

							// FIXME: Opera and Safari will not fire onerror.
							/** @ignore */
							script.onerror = function() {
								onLoad(url, false);
							};
						}
						// }

						// Append it to <head>.
						(document.head || document.getElementsByTagName("head")[0])
								.appendChild(script);
					}

				};

				var synchronousScript = function(url, src) {
					var isCrossOriginRestricted = false, xhr, status, isIE = /msie/
							.test(navigator.userAgent.toLowerCase());
					if (typeof XMLHttpRequest != 'undefined') {
						xhr = new XMLHttpRequest();
					} else {
						xhr = new ActiveXObject('Microsoft.XMLHTTP');
					}

					try {
						xhr.open('GET', src, false);
						xhr.send(null);
					} catch (e) {
						isCrossOriginRestricted = true;
					}

					status = (xhr.status === 1223) ? 204
							: (xhr.status === 0 && ((self.location || {}).protocol === 'file:' || (self.location || {}).protocol === 'ionp:')) ? 200
									: xhr.status;

					isCrossOriginRestricted = isCrossOriginRestricted
							|| (status === 0);

					if (isCrossOriginRestricted) {
						onLoad(url, false);
					} else if ((status >= 200 && status < 300)
							|| (status === 304)) {
						if (!isIE) {
							debugSourceURL = "\n//@ sourceURL=" + src;
						}

						eval(xhr.responseText + debugSourceURL);

						onLoad(url, true);
					} else {
						onLoad(url, false);
					}
					xhr = null;
				};

				for (var i = 0; i < scriptCount; i++) {

					var src = url = scriptUrl[i];

					// 1.判断内存中是否存在
					var u = url.split("."), ref = window;
					for (var j = 0, len = u.length; j < len; j++) {
						if (ref) {
							ref = ref[u[j]];
						} else {
							break;
						}
					}
					if (ref && !ref.equals(window)) {
						continue;
					}

					// 2.判断当前ClassLoader是否加载过。
					if (loadedScripts[url]) {
						checkLoaded(url, true);
						continue;
					}

					var waitingInfo = waitingList[url]
							|| (waitingList[url] = []);
					waitingInfo.push(checkLoaded);

					// Load it only for the first request.
					if (waitingInfo.length > 1) {
						continue;
					}

					if (this.parent
							&& this.parent.loadClass(url, synchronous,
									callback, scope, showBusy)) {
						continue;
					}

					var classes = this.findClass(src, notModify);

					if (synchronous) {
						loadScript(url, classes[url]);
					} else {
						synchronousScript(url, classes[url]);
					}
				}
				return true;
			}

		});
$import = function(name) {
	// 1判断内存中是否存在 ， 2判断当前ClassLoader是否加载过。
	js.lang.ClassLoader.getSystemClassLoader().loadClass(name);
};