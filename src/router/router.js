const { URLS } = require('./constants');
const Db = require('../db/db');
const Controller = require('../controller/controller');

const db = new Db();
const controller = new Controller(db);

const router = (req, res) => {
    console.log(`New request on ${req.url}`);
    if (URLS.PERSON.test(req.url)) {
        controller.handlePersonsRequest(req, res);
    };

    // if (URLS.PERSON_ID.test(req.url)) {
    //     controller.handlePersonIdRequest(req, res);
    // };

    // controller.noSuchPageHandler(req, res);
};

module.exports = router;
