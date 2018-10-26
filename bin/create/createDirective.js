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
            name: 'dirName',
            message: 'please input dirName:',
        },
        {
            type: 'list',
            name: 'templateType',
            message: 'please choose directive template:',
            choices: ['oneFile', 'twoFile']
        },
    ]).then(answer => {

        // create directive dir
        fs.mkdirSync(path.resolve(dirData.dirMap[answer.fileDir], `${answer.dirName}`));
        // copy file
        if (answer.templateType === 'oneFile') {
            let templateDir = path.resolve(__dirname, '../../template/dirJsAndHtmlTemplate.txt');
            let fileAbsolutePath = path.resolve(dirData.dirMap[answer.fileDir], `${answer.dirName}/directive.js`);
            copyFile(templateDir, fileAbsolutePath, {name: answer.dirName});

            // insert entry html
            let src = fileAbsolutePath.replace(cwd, '').replace(/\\/g, '/').substring(1);
            let script = `<script src="${src}"></script>`;
            let optionsHtml = {
                files: path.resolve(cwd, curProjectConfig.entryHtml),
                from: '<!--uui-template-directive-->',
                to: `${script}\n<!--uui-template-directive-->`,
            };
            replace(optionsHtml, (error, changes) => {
                if (error) {
                    return console.error('Error occurred:', error);
                }
            });
        } else if (answer.templateType === 'twoFile') {
            let templateDirJs = path.resolve(__dirname, '../../template/dirJsTemplate.txt');
            let templateDirHtml = path.resolve(__dirname, '../../template/dirHtmlTemplate.txt');
            let fileAbsolutePathJs = path.resolve(dirData.dirMap[answer.fileDir], `${answer.dirName}/directive.js`);
            let fileAbsolutePathHtml = path.resolve(dirData.dirMap[answer.fileDir], `${answer.dirName}/template.js`);
            copyFile(templateDirJs, fileAbsolutePathJs, {name: answer.dirName});
            copyFile(templateDirHtml, fileAbsolutePathHtml, {name: answer.dirName});

            // insert entry html
            let src1 = fileAbsolutePathJs.replace(cwd, '').replace(/\\/g, '/').substring(1);
            let src2 = fileAbsolutePathHtml.replace(cwd, '').replace(/\\/g, '/').substring(1);
            let script1 = `<script src="${src1}"></script>`;
            let script2 = `<script src="${src2}"></script>`;
            let optionsHtml = {
                files: path.resolve(cwd, curProjectConfig.entryHtml),
                from: '<!--uui-template-directive-->',
                to: `${script1}\n${script2}\n<!--uui-template-directive-->`,
            };
            replace(optionsHtml, (error, changes) => {
                if (error) {
                    return console.error('Error occurred:', error);
                }
            });
        }
    })
}