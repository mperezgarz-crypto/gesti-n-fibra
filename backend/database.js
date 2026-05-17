const sqlite3 = require('sqlite3').verbose();

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/fibra.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error al conectar con SQLite", err);
    } else {
        console.log("Conectado a SQLite");
    }
});
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS intervenciones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            direccion TEXT,
            localidad TEXT,
            tecnico TEXT,
            descripcion TEXT,
            cto TEXT,
            cableado TEXT,
            fecha TEXT
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

module.exports = db;