/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 *
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 *
 * Date: Feb 14, 2014
 */

Class.forName({
    name : "public final class js.lang.reflect.Field extends Object",
    "@Setter @Getter private _declaringClass" : null,
    "@Setter @Getter private _name" : null,
    "@Setter @Getter private _modifiers" : null,
    "@Setter @Getter private _annotations" : null,
    "@Setter @Getter private _value" : null,
    "@Setter @Getter private writable" : true,
    "@Setter @Getter private enumerable" : true,
    "@Setter @Getter private configurable" : true,

    Field : function(name, value, declaringClass, modifiers, annotations, _writable, _enumerable, _configurable) {
        this._name = name;
        this._declaringClass = declaringClass;
        this._modifiers = modifiers;
        this._annotations = annotations;
        this._value = value;

        this.writable = _writable;
        this.enumerable = _enumerable;
        this.configurable = _configurable;
    },
    clone : function() {
        return this;
    },
    "set" : function(obj, value) {
        obj[this._name] = value;
    },
    "get" : function(obj) {
        return obj[this._name];
    }
});
js.lang.reflect.Field.loaded = true;
