const { v4 } = require('uuid');
const { isPersonValid } = require('../controller/utils');

class Db {

    constructor() {
        this.persons = {};
    }

    getAllPersons() {
        return this.persons;
    }

    getPersonById(id) {
        return this.persons[id];
    }

    addPerson(person) {
        const storedPerson = {
            id: v4(),
            ...person,
        };
        this.persons = {
            ...this.persons,
            [storedPerson.id]: storedPerson,
        };

        return storedPerson;
    }

    updatePerson(id) {
        const person = this.persons[id];
        if (!person) {
            return;
        }
        
    }

    // removePerson(id) {

    // }
};

module.exports = Db;
