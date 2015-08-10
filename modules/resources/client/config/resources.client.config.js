'use strict';

// Configuring the Resources module
angular.module('resources').run(['Menus',
  function (Menus) {
    // Add the resources dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Resources',
      state: 'resources',
      type: 'dropdown'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'resources', {
      title: 'List Resources',
      state: 'resources.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'resources', {
      title: 'Create Resources',
      state: 'resources.create'
    });
  }
]);
