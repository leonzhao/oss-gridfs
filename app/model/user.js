'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.ObjectId;

  const UserSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    role: { type: ObjectId, ref: 'Role' },

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  });

  return mongoose.model('User', UserSchema);
};

