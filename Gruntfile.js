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
					{expand: true, cwd: 'site_dev/', src: ['assets/app_components/app/**', 'assets/app_components/img/**'], dest: 'dist/'}
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
				dest: 'dist/assets/bower_components/font-awesome/fonts'
			},
			keep_dist_fonts_bootstrap: {
				expand: true,
				cwd: 'site_dev/assets/bower_components/bootstrap/dist/fonts',
				src: '**/*',
				dest: 'dist/assets/bower_components/bootstrap/dist/fonts'
			},
			keep_dist_img_bootstrap: {
				expand: true,
				cwd: 'site_dev/assets/bower_components/bootstrap/dist/img',
				src: '**/*',
				dest: 'site_dev/dist/assets/bower_components/bootstrap/dist/img'
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
			}
		},

		cssmin: {
			target: {
				files: {
					'dist/assets/app_components/css/presentation.css': 'dist/assets/app_components/css/presentation.css',
				}
			}
		},

		jshint: {
			files: ['Gruntfile.js', 'dist/assets/app_components/app/**/*.js']
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
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('default',
		[
			'clean:site_prod',
			'copy:dev_to_prod',
			'copy:bower_libraries',
			'copy:keep_fonts_font_awesome',
			'copy:keep_dist_fonts_bootstrap',
			'copy:keep_dist_img_bootstrap',
			'less:less_to_css_prod',
			'replace:less_in_html',
			'preprocess:html',
			'jshint'
			// 'cssmin'
		]
	);

};	