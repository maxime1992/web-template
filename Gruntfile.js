module.exports = function(grunt) {

require('time-grunt')(grunt);
 
// project configuration
grunt.initConfig({

	 pkg: grunt.file.readJSON('package.json'),
	 	// Tasks

		clean: {
			site_prod: ['dist'],
		},

	 	copy: {
			dev_to_prod: {
				files: [
					// includes files within path
     				{expand: true, cwd: 'site_dev/', src: ['*.html'], dest: 'dist/'},
     				{expand: true, cwd: 'site_dev/assets/app_components/app/views/', src: ['*.html'], dest: 'dist/assets/app_components/app/views/'}
				],
			},
			keep_fonts_font_awesome: {
				expand: true,
				cwd: 'site_dev/assets/bower_components/font-awesome/fonts/',
				src: '**/*',
				dest: 'dist/assets/app_components/fonts/'
			},
			keep_dist_fonts_bootstrap: {
				expand: true,
				cwd: 'site_dev/assets/bower_components/bootstrap/dist/fonts',
				src: '**/*',
				dest: 'dist/assets/app_components/fonts/'
			},
			keep_dist_img_bootstrap: {
				expand: true,
				cwd: 'site_dev/assets/bower_components/bootstrap/dist/img',
				src: '**/*',
				dest: 'dist/assets/app_components/img/'
			}
		},

		less: {
			less_to_css_prod: {
				files: {
					'dist/assets/app_components/css/default_css.css': 'site_dev/assets/app_components/css/default_css.less'
				}
			}
		},

		replace: {
			less_in_html: {
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
			remove_mock_angular: {
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
			remove_css_important_comments: {
				src: ['.tmp/concat/assets/app_components/css/default_css.css'],
				dest: '.tmp/concat/assets/app_components/css/default_css.css',
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
			},
		},

		jshint: {
			files: ['Gruntfile.js', 'site_dev/assets/app_components/app/**/*.js']
		},

		concat: {
			options: {
				separator: '',
			},
			app: {
				src: ['.tmp/concat/assets/app_components/css/default_css.css', 'dist/assets/app_components/css/default_css.css'],
				dest: '.tmp/concat/assets/app_components/css/default_css.css'
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

		preprocess : {
			html : {
				src : ['dist/*.html'],
				options: {
					inline : true
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
						cwd: 'dist/assets/app_components/app/views/', // Src matches are relative to this path.
						src: ['**/*.html'], // Actual pattern(s) to match.
						dest: 'dist/assets/app_components/app/views/',   // Destination path prefix.
					}
				]
			}
		},

		purifycss: {
			options: {},
			target: {
				src: ['site_dev/index.html', 'site_dev/assets/app_components/app/views/*.html', 'site_dev/assets/app_components/app/app.js'],
				css: ['.tmp/concat/assets/app_components/css/default_css.css'],
				dest: '.tmp/concat/assets/app_components/css/default_css.css'
			}
		}

	});
	 
	// Load plugins
	require('load-grunt-tasks')(grunt);

	// Default task(s).
	grunt.registerTask('default',
		[
			// first check to know if JS is ok
			'jshint',
			'clean:site_prod',
			'copy:dev_to_prod',
			'copy:keep_fonts_font_awesome',
			'copy:keep_dist_fonts_bootstrap',
			'copy:keep_dist_img_bootstrap',
			'replace:less_in_html',
			'less:less_to_css_prod',
			'preprocess:html',
			'useminPrepare',
			'concat:generated',
			'concat:app',
			'replace:remove_css_important_comments',
			'purifycss',
			'replace:disableDebug',
			'uglify:generated',
			'cssmin:generated',
			'replace:remove_mock_angular',
			'imagemin',
			'usemin',
			'htmlmin:index',
			'htmlmin:views',
		]
	);

};	