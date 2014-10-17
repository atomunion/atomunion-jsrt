/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 13, 2014
 */

$import("js.io.Console");

Class.forName({
    name : "class js.lang.System extends Object",
    "static err" : null, // 错误流
    "static out" : new js.io.Console(window.console), // 输出流
    "private static _env" : (function() {
        var userAgent = navigator.userAgent, ua = userAgent.toLowerCase(), check = function(r) {
            return r.test(ua);
        }, DOC = document, docMode = DOC.documentMode, isStrict = DOC.compatMode === "CSS1Compat", isOpera = check(/opera/), isChrome = check(/\bchrome\b/), isWebKit = check(/webkit/), isSafari = !isChrome && check(/safari/), isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
        isSafari3 = isSafari && check(/version\/3/), isSafari4 = isSafari && check(/version\/4/), isIE = !isOpera && check(/msie/), isIE7 = isIE && (check(/msie 7/) || docMode === 7), isIE8 = isIE && (check(/msie 8/) && docMode !== 7), isIE6 = isIE && !isIE7 && !isIE8, isGecko = !isWebKit && check(/gecko/), isGecko2 = isGecko && check(/rv:1\.8/), isGecko3 = isGecko && check(/rv:1\.9/), isBorderBox = isIE && !isStrict, isWindows = check(/windows|win32/), isMac = check(/macintosh|mac os x/), isAir = check(/adobeair/), isLinux = check(/linux/), isSecure = /^https/i.test(window.location.protocol), isIE9 = false;

        return {
            userAgent : userAgent,
            strict : isStrict,
            opera : isOpera,
            chrome : isChrome,
            webkit : isWebKit,
            safari : isSafari,
            safari2 : isSafari2,
            safari3 : isSafari3,
            safari4 : isSafari4,
            ie : isIE,
            ie6 : isIE6,
            ie7 : isIE7,
            ie8 : isIE8,
            ie9 : isIE9,
            gecko : isGecko,
            isGecko2 : isGecko2,
            isGecko3 : isGecko3,
            isBorderBox : isBorderBox,
            isWindows : isWindows,
            isMac : isMac,
            isAir : isAir,
            isLinux : isLinux,
            isSecure : isSecure
        };
    })(),
    /**
     * 获得指定的环境变量值
     */
    "static getenv" : function(env) {
        return (env) ? this._env[env] : this._env;
    },

    "public static currentTimeMillis" : function() {
        return new Date().getTime();
    },

    "public static native arraycopy" : function(src, srcPos, dest, destPos, length) {
        var parameter = Array.prototype.slice.call(src, srcPos, srcPos + length);
        Array.prototype.splice.call(parameter, 0, 0, destPos, 0);
        Array.prototype.splice.apply(dest, parameter);
    }
});
