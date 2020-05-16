'use strict';

const Controller = require('egg').Controller;
const { GridFSBucket } = require('mongodb');
const fs = require('fs');
const assert = require('assert');
const path = require('path');

class OssController extends Controller {
  async index() {
    const { ctx, app } = this;
    const db = app.mongo.db('test');
    const bucket = new GridFSBucket(db);

    fs.createReadStream(path.join(__dirname, './health.js'))
      .pipe(bucket.openUploadStream('health.js'))
      .on('error', err => {
        assert.ifError(err);
      })
      .on('finish', () => {
        console.log('done!!!!');
      });
    ctx.body = { ok: true };
  }
}

module.exports = OssController;
