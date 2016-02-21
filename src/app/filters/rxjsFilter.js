(() => {
	app.filter('rxjsFilter', () => {
		return (input) => {
			for (let i = 0; i < input.length; i++) {
				input[i].name = input[i].name.toUpperCase();
			}
			return input;
		};
	});
})();
