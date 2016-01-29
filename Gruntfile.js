(function () {
	module.exports = function (grunt) {
		require('time-grunt')(grunt);

		var gruntArg = process.argv[2];

		// project configuration
		grunt.initConfig({

			pkg: grunt.file.readJSON('package.json'),
			// Tasks

			clean: {
				siteProd: ['dist']
			},

			copy: {
				devToProd: {
					files: [
						// includes files within path
						{expand: true, cwd: 'site_dev/', src: ['*.html'], dest: 'dist/'},
						{expand: true, cwd: 'site_dev/assets/app_components/app/views/', src: ['*'], dest: 'dist/assets/app_components/app/views/'},
						{expand: true, cwd: 'site_dev/assets/app_components/app/languages/', src: ['*'], dest: 'dist/assets/app_components/app/languages/'}
					]
				},
				keepFontsFontAwesome: {
					expand: true,
					cwd: 'site_dev/assets/bower_components/font-awesome/fonts/',
					src: '**/*',
					dest: 'dist/assets/app_components/fonts/'
				},
				keepDistFontsBootstrap: {
					expand: true,
					cwd: 'site_dev/assets/bower_components/bootstrap/dist/fonts',
					src: '**/*',
					dest: 'dist/assets/app_components/fonts/'
				},
				keepDistImgBootstrap: {
					expand: true,
					cwd: 'site_dev/assets/bower_components/bootstrap/dist/img',
					src: '**/*',
					dest: 'dist/assets/app_components/img/'
				}
			},

			less: {
				lessToCssProd: {
					files: {
						'dist/assets/app_components/css/defaultCss.css': 'site_dev/assets/app_components/css/defaultCss.less'
					}
				}
			},

			replace: {
				lessInHtml: {
					src: ['dist/*.html'],
					dest: 'dist/',
					replacements: [
						{
							from: '\.less',
							to: '\.css'
						},
						{
							from: 'stylesheet\/less',
							to: 'stylesheet'
						}
					]
				},
				addCompiledTemplate: {
					src: ['dist/*.html'],
					dest: 'dist/',
					replacements: [
						{
							from: '<!-- task : include_compiled_template_before_production -->',
							to: '<script src="\.\.\/\.tmp\/templates\.js"><\/script>'
						}
					]
				},
				changeAppNameCompiledTemplate: {
					src: ['.tmp/templates.js'],
					dest: '.tmp/templates.js',
					replacements: [
						{
							from: 'angular\.module\(\'app\'\)',
							to: 'app'
						},
						{
							from: 'site_dev\/',
							to: ''
						}
					]
				},
				removeMockAngular: {
					src: ['dist/assets/app_components/app/app.js'],
					dest: 'dist/assets/app_components/app/app.js',
					replacements: [
						{
							from: '\'ngMockE2E\',',
							to: ''
						},
						{
							from: '"ngMockE2E",',
							to: ''
						}
					]
				},
				removeCssImportantComments: {
					src: ['.tmp/concat/assets/app_components/css/defaultCss.css'],
					dest: '.tmp/concat/assets/app_components/css/defaultCss.css',
					replacements: [
						{
							from: '/*!',
							to: '/*'
						}
					]
				},
				disableDebug: {
					src: ['.tmp/concat/assets/app_components/app/app.js'],
					dest: '.tmp/concat/assets/app_components/app/app.js',
					replacements: [
						{
							from: 'debugInfoEnabled(true)',
							to: 'debugInfoEnabled(false)'
						}
					]
				}
			},

			if: {
				testing: {
					options: {
						test: function () {
							return gruntArg === 'test';
						}
					},
					ifFalse: ['replace:removeMockAngular']
				}
			},

			jshint: {
				app: {
					options: {
						globals: {
							angular: true
						}
					},
					files: {
						src: ['Gruntfile.js', 'site_dev/assets/app_components/app/**/*.js']
					}
				}
			},

			ngtemplates: {
				app: {
					src: 'site_dev/assets/app_components/app/directives/views/*.html',
					dest: '.tmp/templates.js'
				}
			},

			concat: {
				options: {
					separator: ''
				},
				app: {
					src: ['.tmp/concat/assets/app_components/css/defaultCss.css', 'dist/assets/app_components/css/defaultCss.css'],
					dest: '.tmp/concat/assets/app_components/css/defaultCss.css'
				}
			},

			ngAnnotate: {
				options: {
					singleQuotes: true
				},
				app: {
					files: {
						'.tmp/concat/assets/app_components/app/app.js': ['.tmp/concat/assets/app_components/app/app.js']
					}
				}
			},

			useminPrepare: {
				html: 'dist/index.html',
				options: {
					dest: 'dist/',
					root: 'site_dev/'
				}
			},

			imagemin: {
				dynamic: {
					options: {
						optimizationLevel: 3,
						cache: true
					},
					files: [{
						expand: true,
						cwd: 'site_dev/assets/app_components/img/',
						src: ['**/*.{png,jpg,gif,PNG,JPG,GIF}'],
						dest: 'dist/assets/app_components/img/'
					}]
				}
			},

			preprocess: {
				html: {
					src: ['dist/*.html'],
					options: {
						inline: true,
						context: {
							TEST: gruntArg === 'test'
						}
					}
				}
			},

			usemin: {
				html: 'dist/index.html'
			},

			htmlmin: {
				index: {
					options: {
						removeComments: true,
						collapseWhitespace: true
					},
					files: {
						'dist/index.html': 'dist/index.html'
					}
				},
				views: {
					options: {
						removeComments: true,
						collapseWhitespace: true
					},
					files: [
						{
							expand: true,
							cwd: 'dist/assets/app_components/app/views/',
							src: ['**/*.html'],
							dest: 'dist/assets/app_components/app/views/'
						}
					]
				}
			},

			purifycss: {
				options: {},
				target: {
					src: ['site_dev/index.html', 'site_dev/assets/app_components/app/views/*.html', 'site_dev/assets/app_components/app/directives/views/*.html', 'site_dev/assets/app_components/app/app.js'],
					css: ['.tmp/concat/assets/app_components/css/defaultCss.css'],
					dest: '.tmp/concat/assets/app_components/css/defaultCss.css'
				}
			},

			karma: {
				unit: {
					options: {
						frameworks: ['jasmine'],
						singleRun: true,
						browsers: ['PhantomJS'],
						files: [
							'dist/assets/app_components/app/app.js',
							'site_dev/assets/app_components/app/tests/*.js'
						]
					}
				}
			}

		});

		// Load plugins
		require('load-grunt-tasks')(grunt);

		// Default task(s).
		grunt.registerTask('default',
			[
				// first check to know if JS is ok
				'jshint:app',
				'clean:siteProd',
				'copy:devToProd',
				'copy:keepFontsFontAwesome',
				'copy:keepDistFontsBootstrap',
				'copy:keepDistImgBootstrap',
				'replace:lessInHtml',
				'less:lessToCssProd',
				'replace:addCompiledTemplate',
				'ngtemplates:app',
				'replace:changeAppNameCompiledTemplate',
				'preprocess:html',
				'useminPrepare',
				'concat:generated',
				'concat:app',
				'replace:removeCssImportantComments',
				// 'purifycss',
				'replace:disableDebug',
				'ngAnnotate:app',
				'uglify:generated',
				'cssmin:generated',
				'if:testing',
				'imagemin',
				'usemin',
				'htmlmin:index',
				'htmlmin:views'
			]
		);

		grunt.registerTask('test', [
			'default',
			'karma'
		]);
	};
})();
