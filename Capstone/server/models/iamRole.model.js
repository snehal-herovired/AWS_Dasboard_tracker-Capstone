const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const iamRoleSchema = new Schema({
 
  RoleName: {
    type: String,
    required: true,
  },
  RoleId: {
    type: String,
    required: true,
  },
  Arn: {
    type: String,
    required: true,
  },
  CreateDate: {
    type: Date,
    required: true,
  },
  AssumeRolePolicyDocument: {
    type: String,
  },
  Description: {
    type: String,
  },
  MaxSessionDuration: {
    type: Number,
  }
});

const iamRoleModel = mongoose.model('IAMRole', iamRoleSchema);

module.exports = iamRoleModel;
