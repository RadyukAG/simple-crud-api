const { URLS } = require('./constants');

const Controller = require('./Controller');
const controller = new Controller();

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
