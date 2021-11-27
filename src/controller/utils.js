const isPersonValid = (person) => {
    if (!person.name && !(typeof person.name === 'string')) {
        throw new Error('Invalid person name');
    };

    if (!person.age && !(typeof person.age === 'number')) {
        throw new Error('Invalid person age');
    };

    if (!(Array.isArray(person.hobbies))) {
        throw new Error('Invalid person hobbies');
    };

    return true;
};

const extractEndOfURL = (url) => {
    return url.split('/').pop;
};

module.exports = {
    isPersonValid,
    extractEndOfURL,
}
