let inquirer = require('inquirer');
let path = require('path');
let cwd = process.cwd();
const findAllDir = require('../tool/findAllDir');

let config = require(path.resolve(cwd, './uui.config.js'));
let baseConfig = require('../../config/base');

let projectList = Object.keys(config);


module.exports = function(data) {
    let curProjectConfig = config[data.project];
    let saveFileDir = path.resolve(cwd, curProjectConfig[data.createType + 'Url']);
    let dirData = findAllDir(saveFileDir);
    inquirer.prompt([
        {
            type: 'list',
            name: 'fileDir',
            message: 'please saved file dir:',
            choices: dirData.allDir
        },
        {
            type: 'input',
            name: 'fileName',
            message: 'please ipnut fileName:',
        },
    ]).then(answer => {
        console.log(dirData.dirMap[answer.fileDir]);
        console.log(answer.fileName);
    })
}