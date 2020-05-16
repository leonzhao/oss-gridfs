'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/health', controller.health.index);

  // router.get('/check-items', controller.checkItem.list);
  // router.get('/check-items/:id', controller.checkItem.get);
  // router.post('/check-items/verify', controller.checkItem.verify);
  router.get('/oss', controller.oss.index);
};
