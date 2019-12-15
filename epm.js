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

// check if project directory exists
const exists = fs.existsSync(projectName);
if (exists) {
  log(chalk.red(`directory with name '${projectName}' already exists...`));
  process.exit(-1);
}
const questions = [
  {
    type: "input",
    name: "packages",
    message: "additional packages you want to install (space separated):"
  }
];
inquirer.prompt(questions).then(answers => {
  config = answers;
  createProjectDirectory();
  resolveAndInstallPackages(config);
});

function createProjectDirectory() {
  log("creating new express project in", chalk.green(root));
  fs.mkdirSync(projectName);
  const packageJson = {
    name: projectName,
    version: "0.1.0",
    private: true
  };
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson)
  );
}

function runPackageInstaller(packages) {
  process.chdir(root);
  const command = "npm";
  const args = ["install", "--save", "--loglevel", "error"].concat(packages);
  spawn.sync(command, args, {
    stdio: "inherit"
  });
}

function resolveAndInstallPackages({ packages }) {
  packages = packages
    .trim()
    .split(" ")
    .concat(["express"]);
  log(packages);
  runPackageInstaller(packages);
}
