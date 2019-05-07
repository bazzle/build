module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    postcss: {
      dev: {
        options: {
          map: true, // inline sourcemaps
          processors: [
            require("precss")(), // deal with SASS gubbins
            require('@csstools/postcss-sass')(/* node-sass options */),
            require("autoprefixer")({ browsers: "last 2 versions" }) // add vendor prefixes
          ]
        },
        src: "css/input/style.css",
        dest: "css/style.css"
      },
      prod: {
        options: {
          processors: [
            require("pixrem")(), // add fallbacks for rem units
            require("autoprefixer")({ browsers: "last 2 versions" }), // add vendor prefixes
            require("cssnano")(), // minify the result
            require("precss")() // deal with SASS gubbins
          ]
        },
        src: "css/input/style.css",
        dest: "dest/css/style.css"
      }
    },
    uglify: {
      files: {
        src: "js/scripts.js",
        dest: "dest/js/scripts.js"
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: {
        src: "index.html",
        dest: "dest/index.html"
      }
    },
    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: "assets/images/",
            src: ["**/*.{png,jpg,gif}"],
            dest: "dest/assets/images/"
          }
        ]
      }
    },
    browserSync: {
      bsFiles: {
        src: ["css/style.css", "index.html"]
      },
      options: {
        watchTask: true,
        proxy: "build:8888"
      }
    },
    watch: {
      css: {
        files: ["css/input/*.css"],
        tasks: ["postcss:dev"]
      }
    }
  });

  grunt.registerTask("dev", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "uglify",
    "htmlmin",
    "imagemin",
    "postcss:prod"
  ]);


};
