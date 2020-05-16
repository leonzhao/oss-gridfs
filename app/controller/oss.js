'use strict';

const Controller = require('egg').Controller;
const assert = require('assert');

class OssController extends Controller {
  async list() {
    const { ctx } = this;
    const { bucket } = ctx.query;
    const r = await ctx.service.oss.list(bucket);
    ctx.body = r;
  }

  async upload() {
    const { ctx } = this;
    const { bucket } = ctx.query;
    assert(bucket);
    try {
      const stream = await ctx.getFileStream();
      const r = await ctx.service.oss.uploadUnique(bucket, stream);
      ctx.body = r;
    } catch (err) {
      console.log(err);
      ctx.body = err.message;
    }
  }

  async download() {
    const { ctx } = this;
    const { bucket, filename } = ctx.params;
    assert(bucket);
    const r = await ctx.service.oss.download(bucket, filename);
    ctx.body = r;
  }

}

module.exports = OssController;
