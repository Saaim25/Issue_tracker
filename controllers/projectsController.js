const Project = require("../models/project");
const Issue = require("../models/issue");

// Controller action to display the list of projects
exports.getProjectList = (req, res) => {
  Project.find()
    .then((projects) => {
      res.render("projects", { projects });
    })
    .catch((err) => {
      console.error("Failed to fetch projects:", err);
      res.status(500).send("Internal Server Error");
    });
};

// Controller action to handle creating a new project
exports.createProject = (req, res) => {
  const { projectName, description, author } = req.body;
  const newProject = new Project({
    name: projectName,
    description: description,
    author: author,
  });

  newProject
    .save()
    .then(() => {
      res.redirect("/projects");
    })
    .catch((err) => {
      console.error("Failed to create project:", err);
      res.status(500).send("Internal Server Error");
    });
};

// DELETE a project
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndRemove(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller action to display project details
exports.getProjectDetails = (req, res) => {
  const projectId = req.params.id;

  Project.findById(projectId)
    .populate("issues") // Populate the 'issues' field in the project document
    .then((project) => {
      if (!project) {
        // Project not found
        res.status(404).send("Project not found");
      } else {
        res.render("project-details", { project });
      }
    })
    .catch((err) => {
      console.error("Failed to fetch project details:", err);
      res.status(500).send("Internal Server Error");
    });
};

// Controller action to handle creating a issues
exports.createIssue = (req, res) => {
  const projectId = req.params.id;
  const { title, description, lable, author } = req.body;
  const newIssue = new Issue({
    title: title,
    description: description,
    lable: lable,
    author: author,
  });

  newIssue
    .save()
    .then((createdIssue) => {
      // Update the project's issues array
      Project.findByIdAndUpdate(projectId, {
        $push: { issues: createdIssue._id },
      })
        .then(() => {
          res.redirect("/projects/" + projectId);
        })
        .catch((err) => {
          console.error("Failed to update project:", err);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.error("Failed to create issue:", err);
      res.status(500).send("Internal Server Error");
    });
};

// Controller action to delete an issue
exports.deleteIssue = (req, res) => {
  const projectId = req.params.id;
  const issueId = req.params.issueId;

  // Find the project by ID
  Project.findById(projectId)
    .then((project) => {
      if (!project) {
        // Project not found
        return res.status(404).send("Project not found");
      }

      // Find the issue by ID and remove it
      Issue.findByIdAndRemove(issueId)
        .then((deletedIssue) => {
          if (!deletedIssue) {
            // Issue not found
            return res.status(404).send("Issue not found");
          }

          // Remove the issue from the project's issues array
          const issueIndex = project.issues.indexOf(issueId);
          if (issueIndex !== -1) {
            project.issues.splice(issueIndex, 1);
          }

          // Save the updated project
          project
            .save()
            .then(() => {
              res.redirect(`/projects/${projectId}`);
            })
            .catch((err) => {
              console.error("Failed to save project:", err);
              res.status(500).send("Internal Server Error");
            });
        })
        .catch((err) => {
          console.error("Failed to delete issue:", err);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.error("Failed to find project:", err);
      res.status(500).send("Internal Server Error");
    });
};
