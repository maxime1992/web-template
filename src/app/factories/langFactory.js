(() => {
	app.factory('langFactory', () => {
		return {

			lang: null,

			/**
			* Get the lang
			* @returns {String} lang
			*/
			getLang: () => {
				return lang;
			},

			/**
			* Set the lang
			* @param {String} lang
			* @returns {undefined} nothing
			*/
			setLang: (lang) => {
				lang = lang;
			}
		};
	});
})();
