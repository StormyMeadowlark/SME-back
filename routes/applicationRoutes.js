// routes/apply.js
const express = require("express");
const ApplicationController = require("../controllers/jobApplicationController");
const applicationRouter = express.Router();

applicationRouter.post("/application", ApplicationController.createApplication);

module.exports = applicationRouter;
