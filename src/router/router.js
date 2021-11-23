const { URLS } = require('./constants');

const Controller = require('./Controller');
const controller = new Controller();

const router = (req) => {
    if (URLS.PERSON.test(req.url)) {
        return controller.handlePersonsRequest(req);
    };

    if (URLS.PERSON_ID.test(req.url)) {
        return controller.handlePersonIdRequest(req);
    };

    return controller.noSuchPageHandler(req);
};

module.exports = router;
