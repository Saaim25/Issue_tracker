const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");

// Route to display the list of projects
router.get("/projects", projectsController.getProjectList);

// Route to handle creating a new project
router.post("/projects", projectsController.createProject);

// Route to handle deleting a project
router.delete("/projects/:id", projectsController.deleteProject);

// Display project details
router.get("/projects/:id", projectsController.getProjectDetails);

//Route to handle creating a new Issue
router.post("/projects/:id/issues", projectsController.createIssue);

// Delete an issue
router.delete("/projects/:id/issues/:issueId", projectsController.deleteIssue);

module.exports = router;
