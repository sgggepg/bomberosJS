var Mongoose = require('mongoose');
var SecretoSchema = Mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    secreto: {
        type: String,
        index: false
    }
});
var Secreto = Mongoose.model('Secreto', SecretoSchema);

module.exports = {
    Secreto: Secreto
}