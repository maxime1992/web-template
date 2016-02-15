(function () {
	app.factory('langFactory', function () {
		return {

			lang: null,

			/**
			* Get the lang
			* @returns {String} lang
			*/
			getLang: function () {
				return this.lang;
			},

			/**
			* Set the lang
			* @param {String} lang
			* @returns {undefined} nothing
			*/
			setLang: function (lang) {
				this.lang = lang;
			}
		};
	});
})();
