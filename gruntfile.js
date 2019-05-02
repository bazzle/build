module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  
    grunt.initConfig({
      postcss: {
        options: {
          map: true, // inline sourcemaps
  
          processors: [
            require('pixrem')(), // add fallbacks for rem units 
            require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes 
            require('cssnano')() // minify the result 
          ]
        },
        dist: {
          src: 'css/main.css'
        }
      },
      sass: {
        dist: {
          files: {
            'css/main.css': 'sass/main.scss'
          }
        }
      },
      svgmin: {
        options: {
          plugins: [
            {
              removeViewBox: true
            },
            {
              removeUselessStrokeAndFill: true
            },
            {
              cleanupIDs:false
            },
          ]
        },
        dist: {
          files: {
            'assets/svg/icons.svg': 'assets/svg/input/*.svg'
          }
        }
      },
      watch: {
        sass: {
          files: ['sass/*.scss'],
          tasks: ['sass'],
         }
      },
      browserSync: {
        bsFiles: {
          src: ["_site/css/main.css", "_site/*.html"]
        },
        options: {
          watchTask: true,
          proxy: "http://localhost:4000"
        }
      },
    });


    grunt.registerTask("dev", ["browserSync", "watch"]);
    grunt.registerTask('svg', ['svgmin']);
  

  };