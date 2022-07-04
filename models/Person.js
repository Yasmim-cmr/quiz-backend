const mongooose = require('mongoose');

const Person = mongooose.model('Person', {
    name: String,
    cpf:Number,
    nota: Number,
    teste: Array,

})

module.exports = Person;