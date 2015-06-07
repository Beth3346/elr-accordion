module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        appFolder: 'src/',
        distFolder: 'dist/',

        copy: {
            build: {
                cwd: '<%= appFolder %>',
                src: [ '**', '!**/partials/**/*' ],
                dest: '<%= distFolder %>',
                expand: true
            }
        }, 

        clean: {
            build: {
                nonull: false,
                src: ['<%= distFolder %>']
            },

            scripts: {
                nonull: false,
                src: ['<%= distFolder %>js']        
            },

            postbuild: {
                nonull: false,
                src: ['<%= distFolder %>assets']
            }
        },

        concat: {
            options: {
                    // define a string to put between each file in the concatenated output
                separator: ';'
            },

            dist: {
                // the files to concatenate
                src: ['<%= distFolder %>assets/*.js'],
                // the location of the resulting JS file
                dest: '<%= distFolder %><%= pkg.name %>.js'
            }
        },

        jshint: {
            files: ['<%= distFolder %>*.js'],
            options: {
                maxerr: 10,
                // unused: true,
                eqnull: true,
                eqeqeq: true,
                jquery: true
            }
        },

        uglify: {
            my_target: {
                options: {
                    mangle: false
                },

                files: {
                    '<%= distFolder %><%= pkg.name %>.min.js': ['<%= distFolder %><%= pkg.name %>.js']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['clean:build', 'copy', 'jshint', 'uglify', 'clean:postbuild'])

};