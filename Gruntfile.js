/*!
 * Bootstrap's Gruntfile
<<<<<<< HEAD
 * http://getbootstrap.com
 * Copyright 2013-2016 Twitter, Inc.
=======
 * https://getbootstrap.com
 * Copyright 2013-2017 The Bootstrap Authors
 * Copyright 2013-2017 Twitter, Inc.
>>>>>>> db23b1f32e277e0e39485284f4007e8c19a31cf6
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function (grunt) {
  'use strict'

  // Force use of Unix newlines
  grunt.util.linefeed = '\n'

  RegExp.quote = function (string) {
<<<<<<< HEAD
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');
  var generateGlyphiconsData = require('./grunt/bs-glyphicons-data-generator.js');
  var BsLessdocParser = require('./grunt/bs-lessdoc-parser.js');
  var getLessVarsData = function () {
    var filePath = path.join(__dirname, 'less/variables.less');
    var fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    var parser = new BsLessdocParser(fileContent);
    return { sections: parser.parseFile() };
  };
  var generateRawFiles = require('./grunt/bs-raw-files-generator.js');
  var generateCommonJSModule = require('./grunt/bs-commonjs-generator.js');
  var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' });
=======
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  var path = require('path')
  var isTravis = require('is-travis')

  var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' })
>>>>>>> db23b1f32e277e0e39485284f4007e8c19a31cf6

  Object.keys(configBridge.paths).forEach(function (key) {
    configBridge.paths[key].forEach(function (val, i, arr) {
      arr[i] = path.join('./docs', val)
    })
  })

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n' +
            ' */\n',
    jqueryCheck: 'if (typeof jQuery === \'undefined\') {\n' +
                 '  throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\\\'s JavaScript.\')\n' +
                 '}\n',
    jqueryVersionCheck: '+function ($) {\n' +
                        '  var version = $.fn.jquery.split(\' \')[0].split(\'.\')\n' +
                        '  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {\n' +
                        '    throw new Error(\'Bootstrap\\\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0\')\n' +
                        '  }\n' +
                        '}(jQuery);\n\n',

    // Task configuration.
    clean: {
      dist: 'dist',
      docs: 'docs/dist'
    },

    // JS build configuration
    babel: {
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          'js/dist/util.js'      : 'js/src/util.js',
          'js/dist/alert.js'     : 'js/src/alert.js',
          'js/dist/button.js'    : 'js/src/button.js',
          'js/dist/carousel.js'  : 'js/src/carousel.js',
          'js/dist/collapse.js'  : 'js/src/collapse.js',
          'js/dist/dropdown.js'  : 'js/src/dropdown.js',
          'js/dist/modal.js'     : 'js/src/modal.js',
          'js/dist/scrollspy.js' : 'js/src/scrollspy.js',
          'js/dist/tab.js'       : 'js/src/tab.js',
          'js/dist/tooltip.js'   : 'js/src/tooltip.js',
          'js/dist/popover.js'   : 'js/src/popover.js'
        }
      },
      dist: {
        options: {
          extends: '../../js/.babelrc'
        },
        files: {
          '<%= concat.bootstrap.dest %>' : '<%= concat.bootstrap.dest %>'
        }
      }
    },

    stamp: {
      options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>\n+function () {\n',
        footer: '\n}();'
      },
      bootstrap: {
        files: {
          src: '<%= concat.bootstrap.dest %>'
        }
      }
    },

    concat: {
      options: {
        // Custom function to remove all export and import statements
        process: function (src) {
          return src.replace(/^(export|import).*/gm, '')
        }
      },
      bootstrap: {
        src: [
          'js/src/util.js',
          'js/src/alert.js',
          'js/src/button.js',
          'js/src/carousel.js',
          'js/src/collapse.js',
          'js/src/dropdown.js',
          'js/src/modal.js',
          'js/src/scrollspy.js',
          'js/src/tab.js',
          'js/src/tooltip.js',
          'js/src/popover.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

<<<<<<< HEAD
    uglify: {
      options: {
        compress: {
          warnings: false
        },
        mangle: true,
        preserveComments: /^!|@preserve|@license|@cc_on/i
      },
      core: {
        src: '<%= concat.bootstrap.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      customize: {
        src: configBridge.paths.customizerJs,
        dest: 'docs/assets/js/customize.min.js'
      },
      docsJs: {
        src: configBridge.paths.docsJs,
        dest: 'docs/assets/js/docs.min.js'
      }
    },

=======
>>>>>>> db23b1f32e277e0e39485284f4007e8c19a31cf6
    qunit: {
      options: {
        inject: 'js/tests/unit/phantom.js'
      },
      files: 'js/tests/index.html'
    },

<<<<<<< HEAD
    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: 'less/bootstrap.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      compileTheme: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>-theme.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>-theme.css.map'
        },
        src: 'less/theme.less',
        dest: 'dist/css/<%= pkg.name %>-theme.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: configBridge.config.autoprefixerBrowsers
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>.css'
      },
      theme: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>-theme.css'
      },
      docs: {
        src: ['docs/assets/css/src/docs.css']
      },
      examples: {
        expand: true,
        cwd: 'docs/examples/',
        src: ['**/*.css'],
        dest: 'docs/examples/'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      dist: [
        'dist/css/bootstrap.css',
        'dist/css/bootstrap-theme.css'
      ],
      examples: [
        'docs/examples/**/*.css'
      ],
      docs: {
        options: {
          ids: false,
          'overqualified-elements': false
        },
        src: 'docs/assets/css/src/docs.css'
      }
    },

    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        compatibility: 'ie8',
        keepSpecialComments: '*',
        sourceMap: true,
        advanced: false
      },
      minifyCore: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      },
      minifyTheme: {
        src: 'dist/css/<%= pkg.name %>-theme.css',
        dest: 'dist/css/<%= pkg.name %>-theme.min.css'
      },
      docs: {
        src: [
          'docs/assets/css/ie10-viewport-bug-workaround.css',
          'docs/assets/css/src/pygments-manni.css',
          'docs/assets/css/src/docs.css'
        ],
        dest: 'docs/assets/css/docs.min.css'
      }
    },

    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      },
      examples: {
        expand: true,
        cwd: 'docs/examples/',
        src: '**/*.css',
        dest: 'docs/examples/'
      },
      docs: {
        src: 'docs/assets/css/src/docs.css',
        dest: 'docs/assets/css/src/docs.css'
      }
    },

=======
    // CSS build configuration
>>>>>>> db23b1f32e277e0e39485284f4007e8c19a31cf6
    copy: {
      docs: {
        expand: true,
        cwd: 'dist/',
        src: [
          '**/*'
        ],
        dest: 'docs/dist/'
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

<<<<<<< HEAD
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        incremental: false
      },
      docs: {},
      github: {
        options: {
          raw: 'github: true'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeAttributeQuotes: true,
          removeComments: true
        },
        expand: true,
        cwd: '_gh_pages',
        dest: '_gh_pages',
        src: [
          '**/*.html',
          '!examples/**/*.html'
        ]
      }
    },

    jade: {
      options: {
        pretty: true,
        data: getLessVarsData
      },
      customizerVars: {
        src: 'docs/_jade/customizer-variables.jade',
        dest: 'docs/_includes/customizer-variables.html'
      },
      customizerNav: {
        src: 'docs/_jade/customizer-nav.jade',
        dest: 'docs/_includes/nav/customize.html'
      }
    },

    htmllint: {
      options: {
        ignore: [
          'Attribute "autocomplete" not allowed on element "button" at this point.',
          'Attribute "autocomplete" is only allowed when the input type is "color", "date", "datetime", "datetime-local", "email", "month", "number", "password", "range", "search", "tel", "text", "time", "url", or "week".',
          'Element "img" is missing required attribute "src".'
        ]
      },
      src: '_gh_pages/**/*.html'
    },

=======
>>>>>>> db23b1f32e277e0e39485284f4007e8c19a31cf6
    watch: {
      src: {
        files: '<%= concat.bootstrap.src %>',
        tasks: ['babel:dev']
      },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['dist-css', 'docs']
      },
<<<<<<< HEAD
      less: {
        files: 'less/**/*.less',
        tasks: 'less'
=======
      docs: {
        files: 'docs/assets/scss/**/*.scss',
        tasks: ['dist-css', 'docs']
>>>>>>> db23b1f32e277e0e39485284f4007e8c19a31cf6
      }
    },

    'saucelabs-qunit': {
      all: {
        options: {
          build: process.env.TRAVIS_JOB_ID,
          concurrency: 10,
          maxRetries: 3,
          maxPollRetries: 4,
          urls: ['http://127.0.0.1:3000/js/tests/index.html?hidepassed'],
          browsers: grunt.file.readYAML('grunt/sauce_browsers.yml')
        }
      }
    },

    exec: {
      'clean-css': {
        command: 'npm run clean-css'
      },
      'clean-css-docs': {
        command: 'npm run clean-css-docs'
      },
      postcss: {
        command: 'npm run postcss'
      },
      'postcss-docs': {
        command: 'npm run postcss-docs'
      },
      htmlhint: {
        command: 'npm run htmlhint'
      },
      htmllint: {
        command: 'npm run htmllint'
      },
      jekyll: {
        command: 'npm run jekyll'
      },
      'jekyll-github': {
        command: 'npm run jekyll-github'
      },
      sass: {
        command: 'npm run sass'
      },
      'sass-docs': {
        command: 'npm run sass-docs'
      },
      'scss-lint': {
        command: 'npm run scss-lint'
      },
      'scss-lint-docs': {
        command: 'npm run scss-lint-docs'
      },
      uglify: {
        command: 'npm run uglify'
      },
      'uglify-docs': {
        command: 'npm run uglify-docs'
      }
    },

    buildcontrol: {
      options: {
        dir: '_gh_pages',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:twbs/derpstrap.git',
          branch: 'gh-pages'
        }
      }
    },

    compress: {
      main: {
        options: {
          archive: 'bootstrap-<%= pkg.version %>-dist.zip',
          mode: 'zip',
          level: 9,
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: 'bootstrap-<%= pkg.version %>-dist'
          }
        ]
      }
    }

  })


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['exec:jekyll', 'exec:htmllint', 'exec:htmlhint'])

  var runSubset = function (subset) {
    return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset
  }
  var isUndefOrNonZero = function (val) {
    return val === undefined || val !== '0'
  }

  // Test task.
  var testSubtasks = []
  // Skip core tests if running a different subset of the test suite
  if (runSubset('core') &&
    // Skip core tests if this is a Savage build
    process.env.TRAVIS_REPO_SLUG !== 'twbs-savage/bootstrap') {
    testSubtasks = testSubtasks.concat(['dist-css', 'dist-js', 'test-scss', 'qunit', 'docs'])
  }
  // Skip HTML validation if running a different subset of the test suite
  if (runSubset('validate-html') &&
      isTravis &&
      // Skip HTML5 validator when [skip validator] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_VALIDATOR)) {
    testSubtasks.push('validate-html')
  }
  // Only run Sauce Labs tests if there's a Sauce access key
  if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined' &&
      // Skip Sauce if running a different subset of the test suite
      runSubset('sauce-js-unit')) {
    testSubtasks = testSubtasks.concat(['dist', 'docs-css', 'docs-js', 'clean:docs', 'copy:docs'])
    // Skip Sauce on Travis when [skip sauce] is in the commit message
    if (isUndefOrNonZero(process.env.TWBS_DO_SAUCE)) {
      testSubtasks.push('connect')
      testSubtasks.push('saucelabs-qunit')
    }
  }
  grunt.registerTask('test', testSubtasks)

  // JS distribution task.
  grunt.registerTask('dist-js', ['babel:dev', 'concat', 'babel:dist', 'stamp', 'exec:uglify'])

  grunt.registerTask('test-scss', ['exec:scss-lint'])

  // CSS distribution task.
  grunt.registerTask('sass-compile', ['exec:sass', 'exec:sass-docs'])

  grunt.registerTask('dist-css', ['sass-compile', 'exec:postcss', 'exec:clean-css', 'exec:clean-css-docs'])

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'dist-css', 'dist-js'])

  // Default task.
<<<<<<< HEAD
  grunt.registerTask('default', ['clean:dist', 'copy:fonts', 'test']);

  grunt.registerTask('build-glyphicons-data', function () { generateGlyphiconsData.call(this, grunt); });

  // task for building customizer
  grunt.registerTask('build-customizer', ['build-customizer-html', 'build-raw-files']);
  grunt.registerTask('build-customizer-html', 'jade');
  grunt.registerTask('build-raw-files', 'Add scripts/less files to customizer.', function () {
    var banner = grunt.template.process('<%= banner %>');
    generateRawFiles(grunt, banner);
  });
=======
  grunt.registerTask('default', ['clean:dist', 'test'])

  // Docs task.
  grunt.registerTask('docs-css', ['exec:clean-css-docs', 'exec:postcss-docs'])
  grunt.registerTask('lint-docs-css', ['exec:scss-lint-docs'])
  grunt.registerTask('docs-js', ['exec:uglify-docs'])
  grunt.registerTask('docs', ['lint-docs-css', 'docs-css', 'docs-js', 'clean:docs', 'copy:docs'])
  grunt.registerTask('docs-github', ['exec:jekyll-github'])
>>>>>>> db23b1f32e277e0e39485284f4007e8c19a31cf6

  grunt.registerTask('prep-release', ['dist', 'docs', 'docs-github', 'compress'])

<<<<<<< HEAD
  // Docs task.
  grunt.registerTask('docs-css', ['autoprefixer:docs', 'autoprefixer:examples', 'csscomb:docs', 'csscomb:examples', 'cssmin:docs']);
  grunt.registerTask('lint-docs-css', ['csslint:docs', 'csslint:examples']);
  grunt.registerTask('docs-js', ['uglify:docsJs', 'uglify:customize']);
  grunt.registerTask('lint-docs-js', ['jshint:assets', 'jscs:assets']);
  grunt.registerTask('docs', ['docs-css', 'lint-docs-css', 'docs-js', 'lint-docs-js', 'clean:docs', 'copy:docs', 'build-glyphicons-data', 'build-customizer']);
  grunt.registerTask('docs-github', ['jekyll:github', 'htmlmin']);

  grunt.registerTask('prep-release', ['dist', 'docs', 'docs-github', 'compress']);
};
=======
  // Publish to GitHub
  grunt.registerTask('publish', ['buildcontrol:pages'])
}
>>>>>>> db23b1f32e277e0e39485284f4007e8c19a31cf6
