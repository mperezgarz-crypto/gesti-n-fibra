const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/fibra.db');

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