const { v4 } = require('uuid');

class Db {

    constructor() {
        this.persons = {};
    }

    // getAllPersons() {
    //     return this.persons;
    // }

    // getPerson() {

    // }

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

    // removePerson(id) {

    // }
};

module.exports = Db;
