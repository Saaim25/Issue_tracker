const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");

// Route to display the list of projects
router.get("/", projectsController.getProjectList);

// Route to handle creating a new project
router.post("/", projectsController.createProject);

// Route to handle deleting a project
router.delete("/:id", projectsController.deleteProject);

// Display project details
router.get("/:id", projectsController.getProjectDetails);

//Route to handle creating a new Issue
router.post("/:id/issues", projectsController.createIssue);

// Delete an issue
router.delete("/:id/issues/:issueId", projectsController.deleteIssue);

module.exports = router;
