const createService = require('./createService');
const createRouter = require('./createRouter');
const createDirective = require('./createDirective');

module.exports = {
    service: createService,
    router: createRouter,
    directive: createDirective,
}