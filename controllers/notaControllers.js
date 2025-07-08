const Nota = require('../models/Nota');


exports.crearNota = async (req, res) => {
    try {
        let data_nota = new Nota(req.body);
        await data_nota.save();
        res.send(data_nota);

    } catch (error) {
        console.error('Error al crear la nota:', error);
        res.status(500).send('Error al crear la nota');
    }
}

exports.obtenerNotas = async (req, res) => {
    try {
        const notas = await Nota.find();
        res.json(notas);
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        res.status(500).send('Error al obtener las notas');
    }
}

exports.obtenerNotaPorId = async (req, res) => {
    try {
        const data_nota = await Nota.findById(req.params.id);
        if (!data_nota) {
            res.status(404).json('Nota no encontrada');
        }

        res.json(data_nota);

    } catch (error) {
        console.log('Error al obtener la nota por ID:', error);
        res.status(500).send('Error al obtener la nota por ID');
    }
};

exports.actualizarNota = async (req, res) => {
    try {
        const { titulo, nota } = req.body;

        let data_nota = await Nota.findById(req.params.id);  // CORREGIDO

        if (!data_nota) {
            return res.status(404).json('Nota no encontrada');
        }

        data_nota = await Nota.findByIdAndUpdate(
            req.params.id,                   // TAMBIÉN CORREGIDO
            { titulo, nota },
            { new: true }
        );

        res.json(data_nota);

    } catch (error) {
        console.error('Error al actualizar la nota:', error);
        res.status(500).send('Error al actualizar la nota');
    }
};
