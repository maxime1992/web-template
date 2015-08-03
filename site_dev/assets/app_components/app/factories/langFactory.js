(function () {
	'use strict';

	// factory to set/get actual language
	app.factory('langFactory', function () {
		return {

			// by default lang is not set and HAS to be set when the app is launched
			lang: null,

			// getLang
			// @use    : Get the actual lang (example : 'fr' or 'en')
			// @param  : -
			// @return : The code language ('fr' or 'en')
			getLang: function () {
				return this.lang;
			},

			// setLang
			// @use    : Set the actual lang (example : 'fr' or 'en')
			// @param  : lang --> the code language
			// @return : -
			setLang: function (lang) {
				this.lang = lang;
			}

		};
	});
})();
