const fs = require('fs');
const path = require('path');

let allDir = [];
let rootUrl = '';
let dirMap = {};

function getDir(url) {
    return fs.readdirSync(url);
}

function getAllDir(preUrl, curDir, depth) {
    let curUrl = path.resolve(preUrl, curDir);
    let dirs = getDir(curUrl);


    dirs = dirs.filter(dir => {
        return !(/\./.test(dir));
    });
    /*if (!dirs || dirs.length === 0) {
        allDir.push(url.replace(rootUrl, ''));

        return true;
    }*/
    dirs.forEach(dir => {
        getAllDir(curUrl, dir, depth + 1)
    });
    let showUrl = '-'.repeat(depth*2) + curDir;
    allDir.push(showUrl);
    dirMap[showUrl] = curUrl;
}


module.exports = function(url) {
    rootUrl = url;
    let parentUrl = path.resolve(rootUrl, '../');
    let arr = rootUrl.split('\\');
    let curDir = arr[arr.length - 1];
    allDir = [];
    dirMap = {};
    getAllDir(parentUrl, curDir, 1);

    return {
        dirMap,
        allDir: allDir.reverse()
    }
}