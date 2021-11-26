const { METHODS } = require('../common/constants');
const { isPersonValid } = require('./utils');

class Controller {

    constructor(db) {
        this.db = db;
    }

    handlePersonsRequest(req, res) {
        switch(req.method) {
            case METHODS.GET:
                this.getAllPersons(res);
                break;
            case METHODS.POST:
                this.addPersonToDB(req.body, res);
                break;
            default:
                this.cannotHandleRequest(res);         
        }
    }

    handlePersonIdRequest(req, res) {
        switch(req.method) {
            case METHODS.GET:
                return this.getPersonById(req);
            case METHODS.PUT:
                return this.updatePerson(req);
            case METHODS.DELETE:
                return this.deletePerson(req);
            default:
                return this.cannotHandleRequest(res);        
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

    noSuchPageHandler(res) {
        this.constructResponse(res, {
            statusCode: 404,
            write: 'Sorry, but there is no such resource.'
        })
    }
}

module.exports = Controller;
