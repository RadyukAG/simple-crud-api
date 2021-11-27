const { METHODS } = require('../common/constants');
const { isPersonValid, extractEndOfURL } = require('./utils');
const uuid = require('uuid');

class Controller {

    constructor(db) {
        this.db = db;
    }

    handlePersonsRequest(req, res) {
        try {
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
        } catch(err) {
            this.cannotHandleRequest(res, err);
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

    handlePersonIdRequest(req, res) {
        try {
            switch(req.method) {
                case METHODS.GET:
                    return this.getPersonById(req, res);
                case METHODS.PUT:
                    return this.updatePerson(req);
                case METHODS.DELETE:
                    return this.deletePerson(req);
                default:
                    return this.cannotHandleRequest(res);        
            }
        } catch(err) {
            this.cannotHandleRequest(res, err);
        }    
    }

    validatePersonId(req) {
        const id = extractEndOfURL(req.url);
        if (!uuid.validate(id)) {
            this.constructResponse(res, {
                statusCode: 400,
                write: 'Passed id is not uuid. Please verify',
            });
            return;
        };
        return id;
    }

    getPersonById(req, res) {
        const id = this.validatePersonId(req, res);
        if (!id) {
            return;
        }
        const person = this.db.getPersonById(id);
        if (!person) {
            this.constructResponse(res, {
                statusCode: 404,
                write: `There is no person with id ${id}`,
            });
            return;
        };
        this.constructResponse(res, {
            statusCode: 200,
            write: JSON.stringify(person),
        });
    }

    updatePerson(req, res) {
        const id = this.validatePersonId(req, res);
        if (!id) {
            return;
        }
        const person = this.db.updatePerson(id);
        if (!person) {
            this.constructResponse(res, {
                statusCode: 404,
                write: `There is no person with id ${id}`,
            });
            return;
        };
        this.constructResponse(res, {
            statusCode: 200,
            write: JSON.stringify(person),
        })
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

    cannotHandleRequest(res, err) {
        let message = 'Sorry, cannot handle your request';
        if (err) {
            message += `: ${err.message}`;
        };

        this.constructResponse(res, {
            statusCode: 500,
            write: message,
        });
    }
}

module.exports = Controller;
