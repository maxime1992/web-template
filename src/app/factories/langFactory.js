(() => {
	/**
	* @ngdoc service
	* @name app.langFactory
	**/
	app.factory('langFactory', () => {
		return {
			/**
			* @ngdoc property
			* @name .#lang
			*/
			lang: null,

			/**
			* @ngdoc method
			* @name getLang
			* @methodOf app.langFactory
			* @returns {string} The lang selected
			*/
			getLang: () => this.lang,

			/**
			* @ngdoc method
			* @name setLang
			* @methodOf app.langFactory
			* @param {string} lang Lang to set
			* @returns {string} The lang selected
			*/
			setLang: (lang) => {
				lang = lang;
			}
		};
	});
})();
