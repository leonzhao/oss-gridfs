'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/health', controller.health.index);

  router.get('/oss', controller.oss.list);
  router.post('/oss', controller.oss.upload);
  router.get('/oss/:bucket/:filename', controller.oss.download);
};
