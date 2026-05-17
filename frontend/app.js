const API = "";

async function crearIntervencion() {

    const direccion = document.getElementById("direccion").value;
    const localidad = document.getElementById("localidad").value;
    const tecnico = document.getElementById("tecnico").value;
    const descripcion = document.getElementById("descripcion").value;
    const cto = document.getElementById("cto").value;
    const cableado = document.getElementById("cableado").value;

    // 📅 Fecha automática
    const fecha = new Date().toLocaleString();

    // 🔴 Validación
    if (!direccion || !localidad || !tecnico || !descripcion || !cto || !cableado) {

        alert("Obligatorio rellenar todos los campos");
        return;
    }

    const data = {
        direccion,
        localidad,
        tecnico,
        descripcion,
        cto,
        cableado,
        fecha
    };

    // ✅ Guardar intervención
    await fetch("/intervenciones", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
    });

    alert("Guardado correctamente");

    // 🧹 Limpiar campos
    document.getElementById("direccion").value = "";
    document.getElementById("localidad").value = "";
    document.getElementById("tecnico").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("cto").value = "";
    document.getElementById("cableado").value = "";
}

async function buscar() {

    const direccion = document.getElementById("busqueda").value;

    const res = await fetch(`${API}/buscar?direccion=${direccion}`);

    const datos = await res.json();

    const lista = document.getElementById("resultados");

    lista.innerHTML = "";

    datos.forEach(i => {

        const li = document.createElement("li");

        li.innerHTML = `

        <div class="card">

            <h3>📍 ${i.direccion}</h3>

            <p><strong>🏘️ Localidad:</strong> ${i.localidad}</p>

            <p><strong>👨‍🔧 Técnico:</strong> ${i.tecnico}</p>

            <p><strong>📦 CTO:</strong> ${i.cto}</p>

            <p><strong>🔌 Cableado:</strong> ${i.cableado}</p>

            <p><strong>📝 Descripción:</strong> ${i.descripcion}</p>

            <p><strong>📅 Fecha:</strong> ${i.fecha}</p>

        </div>

        `;

        lista.appendChild(li);
    });
}