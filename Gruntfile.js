module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    preprocess: {
      core: {
        src: 'extension/js/agent/build/core.js',
        dest: 'extension/js/agent/build/src/core.js'
      },
      agent: {
        src: 'extension/js/agent/build/build.js',
        dest: 'extension/js/agent/build/src/agent.js'
      },
      localAgent: {
        src: 'extension/js/agent/build/localBuild.js',
        dest: 'extension/js/agent/build/src/localAgent.js'
      }
    },

    mocha: {
      test: {
        options: {
          reporter: grunt.option('mocha-reporter') || 'Nyan'
        },
        src: ['extension/js/test/unit/AgentSpecRunner.html'],
        dest: './test/output/xunit.out',
      },
    },

    mochaTest: {
      tests: {
        options: {
          require: './extension/js/test/unit/setup/node.js',
          reporter: grunt.option('mocha-reporter') || 'nyan',
          clearRequireCache: true,
          mocha: require('mocha')
        },
        src: [
          './extension/js/test/unit/setup/helpers.js',
          './extension/js/test/unit/**/*.spec.js'
        ]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'extension/css/marionette_inspector.css': 'extension/css/inspector/main.scss',
        }
      }
    },

    watch: {
      files: [
        'extension/js/agent/**/*.js',
        'extension/js/common/**/*.js',
        '!extension/js/agent/build/src/*.js',
        'extension/css/inspector/**/*.scss'
        ],
      tasks: ['build']
    },

  });


  grunt.registerTask('agent', ['preprocess']);

  grunt.registerTask('build', ['agent', 'sass']);

  grunt.registerTask('test', ['agent', 'mocha']);

  grunt.registerTask('default', ['watch']);

};
