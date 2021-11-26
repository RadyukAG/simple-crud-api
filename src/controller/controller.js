const { METHODS } = require('./constants');
const { isPersonValid } = require('./utils');

class Controller {

    constructor(Db) {
        this.db = new Db();
    }

    handlePersonsRequest(req) {
        switch(req.method) {
            case METHODS.GET:
                return this.getAllPersons(res);
            case METHODS.POST:
                return this.addPersonToDB(req.body, res);
            default:
                return this.cannotHandleRequest();         
        }
    }

    handlePersonIdRequest(req) {
        switch(req.method) {
            case METHODS.GET:
                return this.getPersonById(req);
            case METHODS.PUT:
                return this.updatePerson(req);
            case METHODS.DELETE:
                return this.deletePerson(req);
            default:
                return this.cannotHandleRequest();        
        }
    }

    getAllPersons(res) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(this.db.getAllPersons()));
        res.end();
    }

    addPersonToDB(person, res) {
        try {
            if (isPersonValid(person)) {
                this.db.addPerson(person);
            }
        } catch (e) {
            res.statusCode = 400;
            res.write(e.message);
            res.end();
        }
    }

}

module.exports = Controller;
