const { URLS } = require('./constants');
const Db = require('../db/db');
const Controller = require('./Controller');

const db = new Db();
const controller = new Controller(db);

const router = (req, res) => {
    if (URLS.PERSON.test(req.url)) {
        return controller.handlePersonsRequest(req, res);
    };

    if (URLS.PERSON_ID.test(req.url)) {
        return controller.handlePersonIdRequest(req, res);
    };

    return controller.noSuchPageHandler(req, res);
};

module.exports = router;
