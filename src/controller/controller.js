const { METHODS } = require('./constants');

class Controller {

    handlePersonsRequest(req) {
        switch(req.method) {
            case METHODS.GET:
                return this.getAllPersons();
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

    getAllPersons() {

    }
}

module.exports = Controller;
