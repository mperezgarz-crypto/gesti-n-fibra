const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./database');

app.use(cors());
app.use(express.json());

const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

/* ===== OBTENER TODAS LAS INTERVENCIONES ===== */
app.get('/intervenciones', (req, res) => {

    db.all("SELECT * FROM intervenciones", [], (err, rows) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);
    });
});

/* ===== BUSCAR POR DIRECCIÓN ===== */
app.get('/buscar', (req, res) => {

    const direccion = req.query.direccion;

    db.all(
        "SELECT * FROM intervenciones WHERE direccion LIKE ?",
        [`%${direccion}%`],

        (err, rows) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(rows);
        }
    );
});

/* ===== CREAR INTERVENCIÓN ===== */
app.post('/intervenciones', (req, res) => {

    const {
        direccion,
        localidad,
        tecnico,
        descripcion,
        cto,
        cableado,
        fecha
    } = req.body;

    const query = `
        INSERT INTO intervenciones 
        (direccion, localidad, tecnico, descripcion, cto, cableado, fecha)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [direccion, localidad, tecnico, descripcion, cto, cableado, fecha],

        function(err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                id: this.lastID
            });
        }
    );
});

/* ===== INICIAR SERVIDOR ===== */
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});