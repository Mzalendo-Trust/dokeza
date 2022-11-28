const mix = require("laravel-mix"), path = require("path"), glob = require("glob-all"), PurgecssPlugin = require("purgecss-webpack-plugin"), whitelister = require("purgecss-whitelister"), staticPath = "dokeza_2_0/static/", devPath = "dokeza_2_0/static/dev/", distPath = "dokeza_2_0/static/", nodeModules = "node_modules/"; mix.setPublicPath("dokeza_2_0/static/").copyDirectory("node_modules/font-awesome/fonts/", distPath + "fonts/").copyDirectory(devPath + "images/", distPath + "images/").sass(devPath + "scss/dokeza.scss", distPath + "css/").sass(devPath + "scss/onlyoffice.scss", distPath + "css/").sass(devPath + "scss/calendar.scss", distPath + "css/").sass(devPath + "scss/mzalendo.scss", distPath + "css/").babel(devPath + "js/dokeza.js", distPath + "js/dokeza.min.js").babel(["node_modules/jquery/jquery.js", "node_modules/popper.js/umd/popper.js", "node_modules/bootstrap/js/bootstrap.js"], staticPath + "js/vendor/bootstrap.min.js").babel("node_modules/fullcalendar/main.js", staticPath + "js/vendor/fullcalendar.min.js").babel(devPath + "js/dokeza-fullcalendar.js", distPath + "js/dokeza-fullcalendar.min.js").babel(devPath + "js/dokeza.js", distPath + "js/dokeza.min.js").babel(devPath + "js/dokeza-eventscalendar.js", distPath + "js/dokeza-eventscalendar.min.js").sourceMaps().options({ processCssUrls: !1 }); class DokezaCssExtractor { static extract(s) { return s.match(/[A-Za-z0-9-_:\/]+/g) || [] } } mix.inProduction() && mix.webpackConfig({ plugins: [new PurgecssPlugin({ paths: glob.sync([path.join(__dirname, "dokeza_2_0/templates/**/*.html"), path.join(__dirname, "dokeza_2_0/static/dev/js/**/*.js")]), whitelist: whitelister("node_modules/fullcalendar/main.min.css"), extractors: [{ extractor: new DokezaCssExtractor, extensions: ["html", "js"] }] })] }).version();
