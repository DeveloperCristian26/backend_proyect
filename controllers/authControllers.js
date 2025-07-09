const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt.js');
const jwt = require('jsonwebtoken');

exports.registrarUsuario = async (req, res) => {
    const { nombre, correo, contraseña } = req.body
    try {
        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({ msg: 'el usuaio ya existe' });
        }

        usuario = new Usuario({ nombre, correo, contraseña });
        const salt = await bcrypt.genSalt(10);
        usuario.contraseña = await bcrypt.hash(contraseña, salt);

        await usuario.save();

        const payload = { usuario: { id: usuario.id } }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.json({ token })
    } catch (error) {
        console.error(error);
        res.status(500).send('error en el servior');
    }
};

exports.autenticarUsuario= async (req,res) => {
    const {correo,contraseña} = req.body
    try {
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({msg: 'el usuario no existe'})
        }

        const esMatch = await bcrypt.compare(contraseña,usuario.contraseña)
        if (!esMatch) {
            return res.status(400).json({msg:'contraseña incorrecta'})
        }

        const payload = {usuario:{id:usuario.id}}
        const token = jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn:'1h'
        });

        res.json({token})
    } catch (error) {
        console.error(error);
        res.status(500).send('error en el servidor')
    }
}