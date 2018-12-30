var Encore = require('@symfony/webpack-encore');

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    .addEntry('js/main', './assets/js/main.js')
    .addEntry('js/plugins', './assets/js/plugins.js')
    .addEntry('js/datepicker', './assets/js/datepicker.js')
    .addEntry('js/vendor/bootstrap', './assets/js/vendor/bootstrap.js')
    .addEntry('js/vendor/bootstrap.min', './assets/js/vendor/bootstrap.min.js')
    .addEntry('js/vendor/jquery-1.11.2.min', './assets/js/vendor/jquery-1.11.2.min.js')
   // .addEntry('js/vendor/npm', './assets/js/vendor/npm.js')
    .addEntry('js/vendor/modernizr-2.8.3-respond-1.4.2.min', './assets/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js')
    .addStyleEntry('css/light-box', './assets/css/light-box.css')
    .addStyleEntry('css/bootstrap', './assets/css/bootstrap.css')
    .addStyleEntry('css/bootstrap.min', './assets/css/bootstrap.min.css')
    .addStyleEntry('css/bootstrap-theme', './assets/css/bootstrap-theme.css')
    .addStyleEntry('css/bootstrap-theme.min', './assets/css/bootstrap-theme.min.css')
    .addStyleEntry('css/fontAwesome', './assets/css/fontAwesome.css')
    .addStyleEntry('css/templatemo-main', './assets/css/templatemo-main.css')
    //.addEntry('page2', './assets/js/page2.js')

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables Sass/SCSS support
    //.enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    //.enableReactPreset()
    //.addEntry('admin', './assets/js/admin.js')
    .copyFiles({
        from: './assets/images',
        to: 'img/[path][name].[ext]',
        pattern: /\.(png|jpg|jpeg)$/
    });



module.exports = Encore.getWebpackConfig();
