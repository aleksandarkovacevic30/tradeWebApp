'use strict';

module.exports = {
  app: {
    title: 'GDI-Trade',
    description: 'Small web app based on meanjs stack',
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  logo: 'modules/core/img/brand/logo.png',
  favicon: 'modules/core/img/brand/favicon.ico'
};
