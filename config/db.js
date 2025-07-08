const mongoose = require('mongoose');   

const conectarDB = async () => {
    try {
        const dbUri = process.env.DB_MONGO 
        if (!dbUri) {
            throw new Error('Database connection string is not defined in .env file');
        }await mongoose.connect(dbUri, {});
            console.log("Conectado a la base de datos MongoDB");
    } catch (error) {
        console.log("Error al conectar a la base de datos MongoDB:", error.mensage);
        process.exit(1); // Termina el proceso si no se puede conectar
    }
}

module.exports = conectarDB;