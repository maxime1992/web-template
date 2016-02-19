(() => {
	/**
	* @ngdoc service
	* @name app.langFactory
	**/
	app.factory('langFactory', () => {
		return {

			/**
			* @ngdoc property
			* @name .#lang //the name after the hash is important
			*/
			lang: null,

			/**
			* @ngdoc method
			* @name getLang
			* @methodOf app.langFactory
			* @returns {string} the lang selected
			*/
			getLang: () => {
				return this.lang;
			},

			/**
			* @ngdoc method
			* @name setLang
			* @methodOf app.langFactory
			* @param {string} the lang that we want to set
			* @returns {string} the lang selected
			*/
			setLang: (lang) => {
				lang = lang;
			}
		};
	});
})();
