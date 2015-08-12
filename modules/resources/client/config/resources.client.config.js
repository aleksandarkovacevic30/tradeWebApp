'use strict';

// Configuring the Resources module
angular.module('resources').run(['Menus',
  function (Menus) {

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'List Resources',
      state: 'resources.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Create Resources',
      state: 'resources.create'
    });
  }
]);
