#!/usr/bin/env node

let pJson = require('../package.json');
let program = require('commander');

const getAllDir = require('./tool/findAllDir');
let actionCreate = require('./action/create');
let fs = require('fs');
let path = require('path');

let cwd = process.cwd();
// console.log(getAllDir(path.resolve(cwd, 'test')));

program
    .version(pJson.version)
    .option('-c, --create', 'create service, router, direcitve......')
    .command('create')
    .description('execute the given remote cmd')
    .action(actionCreate);


program.parse(process.argv);
