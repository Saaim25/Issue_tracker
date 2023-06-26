const mongoose = require("mongoose");
const Issue = require("../models/issue");

// Create a schema for the projects collection
const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  author: String,
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: Issue }],
});

// Create a model based on the schema
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
