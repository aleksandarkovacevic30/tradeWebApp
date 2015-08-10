'use strict';

// Configuring the trades module
angular.module('trades').run(['Menus',
  function (Menus) {
    // Add the trades dropdown item
    Menus.addMenuItem('topbar', {
      title: 'trades',
      state: 'trades',
      type: 'dropdown'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'trades', {
      title: 'List trades',
      state: 'trades.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'trades', {
      title: 'Create trades',
      state: 'trades.create'
    });
  }
]);
