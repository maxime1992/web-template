'use strict';

module.exports = (gulp, $) => {
	return (done) => {
		return $.conventionalGithubReleaser({
			type: 'oauth',
			// change this to your own GitHub token or use an environment variable
			token: 'bf446c0f7ba0b23057cdc547b88500282179f3b0'
		}, {
			// convention you use.
			preset: 'angular'
		}, done);
	}
}
