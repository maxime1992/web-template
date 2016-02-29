(() => {
	app.filter('rxjsFilter', () => {
		return (input) => {
			return input.map(i => { i.name = i.name.toUpperCase(); return i; });
		};
	});
})();
