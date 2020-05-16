'use strict';
// app/extend/context.js
const BUCKET = Symbol('Context#bucket');

module.exports = {
  get bucket() {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    if (!this[BUCKET]) {
      // 例如，从 header 中获取，实际情况肯定更复杂
      return this.app.bucket;
    }
    return this[BUCKET];
  },
};
