const { METHODS } = require('./constants');

class Controller {

    constructor(Db) {
        this.db = new Db();
    }

    handlePersonsRequest(req) {
        switch(req.method) {
            case METHODS.GET:
                return this.getAllPersons(res);
            case METHODS.POST:
                return this.addPersonToDB(req);
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

}

module.exports = Controller;
