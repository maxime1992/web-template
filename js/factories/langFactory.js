'use strict';

(function () {
  /**
  * @ngdoc service
  * @name app.langFactory
  **/
  app.factory('langFactory', function () {
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
      getLang: function getLang() {
        return undefined.lang;
      },

      /**
      * @ngdoc method
      * @name setLang
      * @methodOf app.langFactory
      * @param {string} lang Lang to set
      * @returns {string} The lang selected
      */
      setLang: function setLang(lang) {
        lang = lang;
      }
    };
  });
})();