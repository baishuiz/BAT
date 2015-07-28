module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON("package.json"),
        output : {
            fileName: '<%= pkg.name %>.<%= pkg.version %>.js',
            minFileName : '<%= pkg.name %>.<%= pkg.version %>.mini.js'
        },
        concat: {
            options: {
                separator: ';'
            }

           ,dist: {
                src: ['../libs/beacon.0.2.3.mini.js','../src/client/bat.js','../src/client/events.js','../src/client/test.js', '../src/client/openAPI.js'],
                dest: '../dist/<%= output.fileName %>'
            }
        }

       ,jasmine: {
            pivotal: {
              src: '../dist/<%=output.fileName %>',
              coverage: '../dist/<%=output.fileName %>',
              options: {
                specs: '../test/spec/*Spec.js',
                keepRunner: true
                // template: require('grunt-template-jasmine-istanbul'),
                // templateOptions: {
                //     coverage: 'bin/coverage/coverage.json',
                //     report: 'bin/coverage',
                //     files:'../dist/<%=output.fileName %>'
                // }
              }
            }

           ,mini: {
              src: '../dist/<%= output.minFileName %>',
              options: {
                specs: '../test/spec/*Spec.js',
                keepRunner:true
              }
            }
        }
       ,uglify: {
          mini: {
            files: {
              '../dist/<%= output.minFileName %>': ['../dist/<%= output.fileName %>']
            }
          }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', [ 'concat', 'uglify', 'jasmine']);
};
