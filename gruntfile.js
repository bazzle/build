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
    svgstore: {
      options: {
        prefix : 'icon-',
        includedemo: true
      },
      default: {
        files: {
          'assets/svg/icons.svg': ['assets/svg/input/*.svg'],
        }
      },
    },
    /* deprecated need to find a replacement for this that compiles es6
    uglify: {
      files: {
        src: "js/main.js",
        dest: "dest/js/scripts.js"
      }
    },
    */
    htmlmin: {
      default: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [
          {
            expand: true,
            src: '*.html',
            dest: 'dest/'
          }
        ]
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
        src: ["css/style.css", "*.html", "js/*.js"]
      },
      options: {
        watchTask: true,
        proxy: "baf-design:8888",
        notify: false
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
    "htmlmin",
    "imagemin",
    "postcss:prod"
  ]);


};
