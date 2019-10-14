const purify = require("purify-css");

var content = [".next/dist/pages/*.js", ".next/dist/pages/**/*.js"]; //['test.html']; //['.next/**/*.js'];
var css = ["static/css/bundle.css"];

var options = {
  minify: true,
  output: "./static/css/purified.css"
};

purify(content, css, options, function(purifiedAndMinifiedResult) {
  console.log(purifiedAndMinifiedResult);
});
