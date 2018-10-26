const inquirer = require('inquirer');
const path = require('path');
const cwd = process.cwd();
const fs = require('fs');
const replace = require('replace-in-file');
const findAllDir = require('../tool/findAllDir');
const copyFile = require('../tool/copyFile');

let config = require(path.resolve(cwd, './uui.config.js'));
let baseConfig = require('../../config/base');

let projectList = Object.keys(config);

let templateDir = path.resolve(__dirname, '../../template/routerTemplate.txt');

module.exports = function(data) {
    let curProjectConfig = config[data.project];
    let saveFileDir = path.resolve(cwd, curProjectConfig[data.createType + 'Url']);
    let dirData = findAllDir(saveFileDir);
    inquirer.prompt([
        {
            type: 'list',
            name: 'fileDir',
            message: 'please choose saved file dir:',
            choices: dirData.allDir
        },
        {
            type: 'input',
            name: 'fileName',
            message: 'please input fileName:',
        },
        {
            type: 'input',
            name: 'routerName',
            message: 'please input routerName:',
        },
    ]).then(answer => {
        let fileAbsolutePath = path.resolve(dirData.dirMap[answer.fileDir], `${answer.fileName}.js`);
        // copy file
        copyFile(templateDir, fileAbsolutePath, {routerName: answer.routerName});

        // insert entry html
        let src = fileAbsolutePath.replace(cwd, '').replace(/\\/g, '/').substring(1);
        src = src.replace('sourcejs', 'js');
        let script = `<script src="${src}"></script>`;
        let optionsHtml = {
            files: path.resolve(cwd, curProjectConfig.entryHtml),
            from: '<!--uui-template-router-->',
            to: `${script}\n<!--uui-template-router-->`,
        }
        replace(optionsHtml, (error, changes) => {
            if (error) {
                return console.error('Error occurred:', error);
            }
        });


        // insert router
        let optionsRouter = {
            files: path.resolve(cwd, curProjectConfig.routerEntryUrl),
            from: '\/\/uui-template-router',
            to: `${answer.routerName}: [],\n\/\/uui-template-router`,
        }
        replace(optionsRouter, (error, changes) => {
            if (error) {
                return console.error('Error occurred:', error);
            }
        });
    })
}