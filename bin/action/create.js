let inquirer = require('inquirer');
let path = require('path');
let cwd = process.cwd();

const createFns = require('../create/index');
console.log(createFns);

let config = require(path.resolve(cwd, './uui.config.js'));
let baseConfig = require('../../config/base');

let projectList = Object.keys(config);


module.exports = function() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'createType',
            message: 'please choose createType:',
            choices: baseConfig.createList
        },
        {
            type: 'list',
            name: 'project',
            message: 'please choose project:',
            choices: projectList
        },
    ]).then(answer => {
        createFns[answer.createType](answer);
        // console.log(answer);
        // console.log(config);
    })
}