const inquirer = require('inquirer');
const path = require('path');
const cwd = process.cwd();
const fs = require('fs');
const replace = require('replace-in-file');
const findAllDir = require('../tool/findAllDir');

let config = require(path.resolve(cwd, './uui.config.js'));
let baseConfig = require('../../config/base');

let projectList = Object.keys(config);

let templateDir = path.resolve(__dirname, '../../template/serviceTemplate.txt');

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
    ]).then(answer => {
        let fileAbsolutePath = path.resolve(dirData.dirMap[answer.fileDir], `${answer.fileName}.js`);
        // copy file
        fs.createReadStream(templateDir).pipe(fs.createWriteStream(fileAbsolutePath));

        // insert entry html
        let src = fileAbsolutePath.replace(cwd, '').replace(/\\/g, '/').substring(1);
        let script = `<script src="${src}"></script>`;
        let options = {
            files: path.resolve(cwd, curProjectConfig.entryHtml),
            from: '<!--uui-template-service-->',
            to: `${script}\n<!--uui-template-service-->`,
        }
        replace(options, (error, changes) => {
            if (error) {
                return console.error('Error occurred:', error);
            }
        });
    })
}