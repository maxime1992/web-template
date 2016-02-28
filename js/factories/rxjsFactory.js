'use strict';

(function () {
  /**
  * @ngdoc service
  * @name app.rxjsFactory
  **/
  app.factory('rxjsFactory', ['rx', function (rx) {
    /**
    * @ngdoc property
    * @name .#rxjsFactoryObserver
    * @private
    */
    var rxjsFactoryObserver = undefined;

    /**
    * @ngdoc method
    * @name rx.Observable.create
    * @methodOf app.rxjsFactory
    * @param {object} observer To will watch and share with the controllers which subscribe it
    * @private
    */
    var rxjsFactory$ = new rx.Observable.create(function (observer) {
      rxjsFactoryObserver = observer;
    }).share();

    /**
    * @ngdoc property
    * @name .#data
    * @private
    */
    var data = {
      users: [{ name: 'John Rambo', isVisible: true, age: 32 }, { name: 'Pablo Picasso', isVisible: true, age: 64 }]
    };

    return {
      /**
      * @ngdoc property
      * @name .#rxjsFactory
      */
      rxjsFactory$: rxjsFactory$,

      /**
      * @ngdoc method
      * @name rx.Observable.getUsers
      * @methodOf app.rxjsFactory
      * @description Emit the signal to update data array and the subscribe controller will be update and get the users
      */
      getUsers: function getUsers() {
        // tell everyone to update users
        rxjsFactoryObserver.next(data.users);
      },

      /**
      * @ngdoc method
      * @name rx.Observable.addUser
      * @methodOf app.rxjsFactory
      * @description Add a user and emit the signal at the controllers to be update
      */
      addUser: function addUser() {
        data.users.push({ name: 'John Kennedy', isVisible: true, age: 87 });
        rxjsFactoryObserver.next(data.users);
      }
    };
  }]);
})();