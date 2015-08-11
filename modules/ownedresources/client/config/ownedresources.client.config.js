'use strict';

// Configuring the ownedresources module
angular.module('ownedresources').run(['Menus',
  function (Menus) {
    // Add the ownedresources dropdown item
    Menus.addMenuItem('topbar', {
      title: 'ownedresources',
      state: 'ownedresources',
      type: 'dropdown'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'ownedresources', {
      title: 'List ownedresources',
      state: 'ownedresources.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'ownedresources', {
      title: 'Create ownedresources',
      state: 'ownedresources.create'
    });
  }
]);
