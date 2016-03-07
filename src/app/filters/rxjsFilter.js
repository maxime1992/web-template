(() => {
	app.filter('rxjsFilter', () => {
		return (input) =>
			input.map(i => {
				i.name = i.name.toUpperCase();
				return i;
			});
	});
})();

