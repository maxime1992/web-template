(function () {
	var connect = require('connect');
	var serveStatic = require('serve-static');
	var path = require('path');

	connect().use(serveStatic(path.join(__dirname, process.env.NODE_ENV === 'DEV' ? 'site_dev' : 'dist'))).listen(8080);

	console.log('Server launched at http://localhost:8080 based on ' + (process.env.NODE_ENV === 'DEV' ? 'site_dev' : 'dist') + ' folder');
})();
