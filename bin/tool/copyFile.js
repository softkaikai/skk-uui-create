const fs = require('fs');
const handlebars = require('handlebars');

module.exports = function(source, target, templateData) {
    fs.readFile(source, 'utf8', (err, data) => {
        if (err) throw err;
        let template = handlebars.compile(data);
        let result = template(templateData);

        fs.writeFile(target, result, 'utf8', (err) => {
            if (err) throw err;
            // console.log('The file has been saved!');
        });
    });
}