const Nota = require('../models/Nota');

// Crear nota
exports.crearNota = async (req, res) => {
    try {
        let data_nota = new Nota(req.body);
        await data_nota.save();
        res.status(201).json(data_nota);
    } catch (error) {
        console.error('Error al crear la nota:', error);
        res.status(500).json({ message: 'Error al crear la nota' });
    }
};

// Obtener todas las notas
exports.obtenerNotas = async (req, res) => {
    try {
        const notas = await Nota.find();
        res.json(notas);
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        res.status(500).json({ message: 'Error al obtener las notas' });
    }
};

// Obtener una nota por ID
exports.obtenerNotaPorId = async (req, res) => {
    try {
        const data_nota = await Nota.findById(req.params.id);
        if (!data_nota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.json(data_nota);
    } catch (error) {
        console.log('Error al obtener la nota por ID:', error);
        res.status(500).json({ message: 'Error al obtener la nota por ID' });
    }
};

// Actualizar una nota
exports.actualizarNota = async (req, res) => {
    try {
        const { titulo, nota } = req.body;
        let data_nota = await Nota.findById(req.params.id);

        if (!data_nota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }

        data_nota = await Nota.findByIdAndUpdate(
            req.params.id,
            { titulo, nota },
            { new: true }
        );

        res.json(data_nota);
    } catch (error) {
        console.error('Error al actualizar la nota:', error);
        res.status(500).json({ message: 'Error al actualizar la nota' });
    }
};

// Eliminar una nota
exports.eliminarNota = async (req, res) => {
    try {
        const data_nota = await Nota.findById(req.params.id);
        if (!data_nota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }

        await Nota.findByIdAndDelete(req.params.id);
        res.json({ message: 'Nota eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la nota:', error);
        res.status(500).json({ message: 'Error al eliminar la nota' });
    }
};
