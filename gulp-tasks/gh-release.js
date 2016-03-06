'use strict';

module.exports = (gulp, $) => (done) =>
	$.conventionalGithubReleaser({
		type: 'oauth',
		// change this to your own GitHub token or use an environment variable
		token: '187b47c824f227d3d6549f6eb69ad489894db439'
	}, {
		// convention you use.
		preset: 'angular'
	}, done);