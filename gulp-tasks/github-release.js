module.exports = function (gulp, plugins) {
	return function (done) {
		return 	plugins.conventionalGithubReleaser({
			type: "oauth",
		token: '187b47c824f227d3d6549f6eb69ad489894db439' // change this to your own GitHub token or use an environment variable
	}, {
		preset: 'angular' // Or to any other commit message convention you use.
	}, done);
	}
}