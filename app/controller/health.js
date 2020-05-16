'use strict';

const Controller = require('egg').Controller;

class HealthController extends Controller {
  async index() {
    const { ctx } = this;
    console.log('>>>>>', ctx.origin);
    ctx.body = { ok: true };
  }
}

module.exports = HealthController;
