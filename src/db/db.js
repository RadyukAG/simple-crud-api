const { v4 } = require('uuid');
const { isPersonValid } = require('../controller/utils');

class Db {

    constructor() {
        this.persons = {};
    }

    getAllPersons() {
        return Object.values(this.persons);
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

    updatePerson(id, newPerson) {
        const person = this.persons[id];
        if (!person) {
            return;
        }
        const updatedPerson = {
            ...person,
            ...newPerson,
        };
        this.persons[id] = updatedPerson;
        return updatedPerson;
    }

    deletePerson(id) {
        const person = this.persons[id];
        if (!person) {
            return;
        }
        this.persons[id] = undefined;
        return true;
    }
};

module.exports = Db;
