const mix = require("laravel-mix");
const path = require("path");
const glob = require("glob-all");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const whitelister = require("purgecss-whitelister");

const staticPath = "dokeza_2_0/static/";
const devPath = "dokeza_2_0/static/dev/";
const distPath = "dokeza_2_0/static/dist/";
const nodeModules = "node_modules/";

mix
  .setPublicPath("dokeza_2_0/static/dist/")
  .copyDirectory(`${nodeModules}font-awesome/fonts/`, `${distPath}fonts/`)
  .copyDirectory(`${devPath}images/`, `${distPath}images/`)
  .sass(`${devPath}scss/dokeza.scss`, `${distPath}css/`)
  .sass(`${devPath}scss/onlyoffice.scss`, `${distPath}css/`)
  .sass(`${devPath}scss/calendar.scss`, `${distPath}css/`)
  .sass(`${devPath}scss/mzalendo.scss`, `${distPath}css/`)
  .babel(`${devPath}js/dokeza.js`, `${distPath}js/dokeza.min.js`)
  .babel(
    [
      `${nodeModules}jquery/dist/jquery.js`,
      `${nodeModules}popper.js/dist/umd/popper.js`,
      `${nodeModules}bootstrap/dist/js/bootstrap.js`,
    ],
    `${staticPath}js/vendor/bootstrap.min.js`
  )
  .babel(
    `${nodeModules}fullcalendar/main.js`,
    `${staticPath}js/vendor/fullcalendar.min.js`
  )
  .babel(
    `${devPath}js/dokeza-fullcalendar.js`,
    `${distPath}js/dokeza-fullcalendar.min.js`
  )
  .babel(`${devPath}js/dokeza.js`, `${distPath}js/dokeza.min.js`)
  .babel(
    `${devPath}js/dokeza-eventscalendar.js`,
    `${distPath}js/dokeza-eventscalendar.min.js`
  )
  .sourceMaps()
  .options({
    processCssUrls: false,
  });

class DokezaCssExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

if (mix.inProduction()) {
  mix
    .webpackConfig({
      plugins: [
        new PurgecssPlugin({
          paths: glob.sync([
            path.join(__dirname, "dokeza_2_0/templates/**/*.html"),
            path.join(__dirname, "dokeza_2_0/static/dev/js/**/*.js"),
          ]),
          whitelist: whitelister("node_modules/fullcalendar/main.min.css"),
          extractors: [
            {
              extractor: new DokezaCssExtractor,
              extensions: ["html", "js"],
            },
          ],
        }),
      ],
    })
    .version();
}
