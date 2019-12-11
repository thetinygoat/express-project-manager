const chalk = require("chalk");
const program = require("commander");
const spawn = require("cross-spawn");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const validate = require("validate-npm-package-name");
const log = console.log;
let projectName;
let config;
let root;

program
  .command("new <name>")
  .description("create a new express project")
  .action(name => {
    const { errors } = validate(name);
    if (errors) {
      log(chalk.red("invalid project name..."));
      process.exit(-1);
    }
    projectName = name;
    root = path.resolve(projectName);
  });

program.parse(process.argv);

function inquire() {
  // questions array
  const questions = [
    {
      type: "input",
      name: "db",
      message: "database do you want to use (mongo,postgres):"
    },
    {
      type: "input",
      name: "additional_packages",
      message: "additional packages you want to install (space separated):"
    }
  ];
  inquirer.prompt(questions).then(answers => {
    config = answers;
  });
}

function createProjectDirectory() {
  const exists = fs.existsSync(projectName);
  if (exists) {
    log(chalk.red(`directory with name '${projectName}' already exists...`));
    process.exit(-1);
  }
  log("creating new express project in", chalk.green(root));
  fs.mkdirSync(projectName);
}

// inquire();
createProjectDirectory();
