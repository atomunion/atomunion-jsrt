Class.forName({
    name : "class atom.misc.Launcher extends Object",
    "private static launcher" : null,
    "private static loader" : null,

    "public getClassLoader" : function() {
        return this.loader;
    },

    "public Launcher" : function() {
        var bootstrap;
        try {
            bootstrap = atom.misc.Launcher.BootstrapClassLoader.getBootstrapClassLoader();
        } catch (e) {
            throw new js.lang.InternalError("Could not create bootstrap class loader");
        }
        
        var extcl;
        try {
            extcl = atom.misc.Launcher.ExtClassLoader.getExtClassLoader(bootstrap);
        } catch (e) {
            throw new js.lang.InternalError("Could not create extension class loader");
        }
        // Now create the class loader to use to launch the application
        try {
            this.loader = atom.misc.Launcher.AppClassLoader.getAppClassLoader(extcl);
        } catch (e) {
            throw new js.lang.InternalError("Could not create application class loader");
        }
    },
    
    "public static getLauncher" : function() {
        var launcher = atom.misc.Launcher.launcher;
        if (!launcher) {
            launcher = new atom.misc.Launcher();
            atom.misc.Launcher.launcher = launcher;
        }
        return launcher;
    }
});

Class.forName({
    name : "class atom.misc.Launcher.BootstrapClassLoader extends js.net.URLClassLoader",

    "private static bootstrapClassLoader" : null,

    "private BootstrapClassLoader" : function() {
        //System.getProperty("atom.boot.class.path")
        this.setRoot("js/jre/");
    },

    "public static getBootstrapClassLoader" : function() {
        var loader = atom.misc.Launcher.BootstrapClassLoader.bootstrapClassLoader;
        if (!loader) {
            loader = new atom.misc.Launcher.BootstrapClassLoader();
            atom.misc.Launcher.BootstrapClassLoader.bootstrapClassLoader = loader;
        }
        return loader;
    }
});

Class.forName({
    name : "class atom.misc.Launcher.ExtClassLoader extends js.net.URLClassLoader",

    "private static extClassLoader" : null,

    "private ExtClassLoader" : function(parent) {
        this.parent = parent;
        //System.getProperty("js.ext.dirs")
        this.setRoot("js/lib/");
    },

    "public static getExtClassLoader" : function(cl) {
        var loader = atom.misc.Launcher.ExtClassLoader.extClassLoader;
        if (!loader) {
            loader = new atom.misc.Launcher.ExtClassLoader(cl);
            atom.misc.Launcher.ExtClassLoader.extClassLoader = loader;
        }
        return loader;
    }
});

Class.forName({
    name : "class atom.misc.Launcher.AppClassLoader extends js.net.URLClassLoader",

    "private static appClassLoader" : null,

    "private AppClassLoader" : function(parent) {
        this.parent = parent;
        //System.getProperty("js.class.path")
        this.setRoot("js/classes/");
    },

    "public static getAppClassLoader" : function(cl) {
        var loader = atom.misc.Launcher.AppClassLoader.appClassLoader;
        if (!loader) {
            loader = new atom.misc.Launcher.AppClassLoader(cl);
            atom.misc.Launcher.AppClassLoader.appClassLoader = loader;
        }
        return loader;
    }
});
