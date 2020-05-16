'use strict';
const Service = require('egg').Service;
const { GridFSBucket, ObjectID } = require('mongodb');
const { PassThrough } = require('stream');
const crypto = require('crypto');
const fs = require('fs');
const assert = require('assert');
const path = require('path');

class OssService extends Service {

  async list(bucket) {
    const { ctx, app } = this;
    try {
      const db = app.mongo.db(bucket);
      const col = db.collection('fs.files');
      const docs = await col.find({}).toArray();
      return docs;
    } catch (err) {
      ctx.logger.error(err.stack);
      return;
    }
  }

  async upload(bucket, stream) {
    const { ctx, app } = this;
    const db = app.mongo.db(bucket);
    const gridfs = new GridFSBucket(db);

    stream.pipe(gridfs.openUploadStream(stream.filename))
      .on('error', err => {
        assert.ifError(err);
      })
      .on('finish', () => {
        console.log(`${stream.filename} uploaded!`);
      });
  }

  async uploadUnique(bucket, stream) {
    const { app } = this;
    const db = app.mongo.db(bucket);
    const gridfs = new GridFSBucket(db);

    const filename = stream.filename;

    // find the latest file that match md5 value, if exists, return it
    const resFiles = await gridfs.find({ filename }, { sort: { uploadDate: -1 }, limit: 1 }).toArray();
    let id;
    if (!!resFiles && resFiles.length > 0) {
      id = resFiles[0]._id;
      gridfs.delete(id);
    } else {
      id = new ObjectID();
    }

    const fileId = await new Promise((resolve, reject) => {
      stream.pipe(gridfs.openUploadStreamWithId(id, filename))
        .on('error', error => {
          reject(error);
        })
        .on('finish', () => {
          resolve(id);
        });
    });
    return { id: fileId, filename };

  }

  async download(bucket, filename) {
    const { app } = this;
    const db = app.mongo.db(bucket);
    const gridfs = new GridFSBucket(db);
    // find the latest file that match md5 value, if exists, return it
    const resFiles = await gridfs.find({ filename }, { sort: { uploadDate: -1 }, limit: 1 }).toArray();
    if (resFiles.length === 0) {
      throw new Error('not found');
    }
    return gridfs.openDownloadStream(resFiles[0]._id);
  }

}

module.exports = OssService;
