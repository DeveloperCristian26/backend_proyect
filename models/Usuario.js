const mongoose = require('mongoose');


const usuarioSchema = new mongoose.Schema({
    nomre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usurio', usuarioSchema);
