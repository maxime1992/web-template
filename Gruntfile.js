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
			bower_libraries: {
				files: [
					{src: 'site_dev/assets/bower_components/bootstrap/dist/css/bootstrap.min.css', dest: 'dist/assets/bower_components/bootstrap/dist/css/bootstrap.min.css'},
					{src: 'site_dev/assets/bower_components/font-awesome/css/font-awesome.min.css', dest: 'dist/assets/bower_components/font-awesome/css/font-awesome.min.css'},
					{src: 'site_dev/assets/bower_components/angular/angular.js', dest: 'dist/assets/bower_components/angular/angular.js'},
					{src: 'site_dev/assets/bower_components/angular-route/angular-route.js', dest: 'dist/assets/bower_components/angular-route/angular-route.js'},
					{src: 'site_dev/assets/bower_components/angular-animate/angular-animate.js', dest: 'dist/assets/bower_components/angular-animate/angular-animate.js'}
				]
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
					"dist/assets/app_components/css/default_css.css": "site_dev/assets/app_components/css/default_css.less"
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
			js_min: {
				src: ['dist/*.html'],
				dest: 'dist/',
				replacements: [
					{
						from: '<!-- JS_MIN -->',
						to: '<script src="assets/app_components/app/app.js"></script>'
					}
				]
			},
			css_min: {
				src: ['dist/*.html'],
				dest: 'dist/',
				replacements: [
					{
						from: '<!-- CSS_MIN -->',
						to: '<link href="assets/app_components/css/default_css.css" rel="stylesheet">'
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
					}
				]
			}
		},

		cssmin: {
			target: {
				files: {
					'dist/assets/app_components/css/default_css.css': [
						//libs
						'dist/assets/bower_components/bootstrap/dist/css/bootstrap.min.css',
						'dist/assets/bower_components/font-awesome/css/font-awesome.min.css',
						
						// app
						'dist/assets/app_components/css/default_css.css',
					]
				}
			}
		},

		jshint: {
			files: ['Gruntfile.js', 'site_dev/assets/app_components/app/**/*.js']
		},

		concat: {
			options: {
				separator: ';'
			},
			js: {
				src: [
						// libs
						'site_dev/assets/bower_components/angular/angular.js',
						'site_dev/assets/bower_components/angular-route/angular-route.js',
						'site_dev/assets/bower_components/angular-animate/angular-animate.js',

						// app
						'site_dev/assets/app_components/app/app.js',

						// directives
						'site_dev/assets/app_components/app/directives/CUSTOMDirective.js',

						// controllers
						'site_dev/assets/app_components/app/controllers/generalController.js'
					 ],
				dest: 'dist/assets/app_components/app/app.js'
			}
		},

		uglify: {
			js: {
				files: {
					'dist/assets/app_components/app/app.js': [ 'dist/assets/app_components/app/app.js' ]
				},
				options: {
					mangle: true
				}
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
		}

	});
	 
	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Default task(s).
	grunt.registerTask('default',
		[
			// first check to know if JS is ok
			'jshint',
			'clean:site_prod',
			'copy:dev_to_prod',
			'copy:bower_libraries',
			'copy:keep_fonts_font_awesome',
			'copy:keep_dist_fonts_bootstrap',
			'copy:keep_dist_img_bootstrap',
			'concat:js',
			'replace:remove_mock_angular',
			'uglify:js',
			'less:less_to_css_prod',
			'cssmin',
			'replace:less_in_html',
			'replace:js_min',
			'replace:css_min',
			'imagemin',
			'preprocess:html'
		]
	);

};	