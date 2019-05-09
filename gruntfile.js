module.exports = function(grunt) {
  
  require('jit-grunt')(grunt);

  grunt.initConfig({
    sass: {
      options: {
        style: 'expanded'
      },
      files: {
        src: "css/input/main.scss",
        dest: "css/style.css"
      }
    },
    postcss: {
      prod: {
        options: {
          parser: require('postcss-scss'),
          processors: [
            require("pixrem")(), // add fallbacks for rem units
            require("autoprefixer")({ browsers: "last 2 versions" }), // add vendor prefixes
            require("cssnano")(), // minify the result
          ]
        },
        src: "css/style.css",
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
        src: ["css/style.css", "*.html"]
      },
      options: {
        watchTask: true,
        proxy: "build:8888"
      }
    },
    watch: {
      css: {
        files: ["css/input/*.scss"],
        tasks: ["sass"]
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
