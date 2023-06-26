const mongoose = require("mongoose");

//create schema for the issue
const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  lable: String,
  author: String,
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
