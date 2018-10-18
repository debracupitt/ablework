const sass = require("node-sass");

module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        outputStyle: "expanded",
        sourceMap: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "resources/sass/",
            src: "main.scss",
            dest: "resources/css/",
            ext: ".css"
          }
        ]
      }
    },
    watch: {
      files: "resources/sass/**/*.scss",
      tasks: "sass"
    }
  });

  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["sass", "watch"]);
};
