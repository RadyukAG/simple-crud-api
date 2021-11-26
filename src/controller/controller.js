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
        this.constructResponse(res, {
            write: JSON.stringify(this.db.getAllPersons()),
            statusCode: 200,
            headers: [['Content-Type', 'application/json']],
        })
    }

    addPersonToDB(person, res) {
        try {
            if (isPersonValid(person)) {
                const storedPerson = this.db.addPerson(person);
                res.statusCode = 201
                this.constructResponse(res, {
                    write: JSON.stringify(storedPerson),
                    statusCode: 201,
                })
            }
        } catch (e) {
            this.constructResponse(res, {
                statusCode: 400,
                write: e.message,
            });
        }
    }

    constructResponse(res, options) {
        // interface Options = {
            // write: string;
            // statusCode: number;
            // headers?: Array<Array<string>>;
        // }
        res.statusCode = options.statusCode;
        if (options.write) {
            res.write(options.write);
        };
        if (options.headers) {
            options.headers.forEach(([key, val]) => {
                res.setHeader(key, val);
            });
        }
        res.end();
    }
}

module.exports = Controller;
