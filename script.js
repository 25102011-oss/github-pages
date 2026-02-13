const noticias = [
    {
        titulo: "Robo a tienda en la colonia Juárez",
        descripcion: "Sujetos armados asaltaron un comercio durante la noche sin que hubiera detenidos.",
        tipo: "robo",
        imagen: "imagenes/robo2.jpg"
    },
    {
        titulo: "Choque múltiple en la vía corta a Morelia",
        descripcion: "Tres vehículos estuvieron involucrados en un accidente que causó tráfico por más de una hora.",
        tipo: "choque",
        imagen: "imagenes/OIP.webp"
    },
    {
        titulo: "Incendio en vivienda moviliza a bomberos",
        descripcion: "Un corto circuito provocó un incendio en una casa habitación, no hubo lesionados.",
        tipo: "otros",
        imagen: "imagenes/incendio1.jpg"
    }
];
function agregarNoticia() {
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const tipo = document.getElementById("tipo").value;
    const imagen = document.getElementById("imagen").value;

    if (titulo && descripcion && imagen) {
        noticias.unshift({ titulo, descripcion, tipo, imagen });
        mostrarNoticias(noticias);

        document.getElementById("titulo").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("imagen").value = "";
    } else {
        alert("Completa todos los campos");
    }
}


const contenedor = document.getElementById("contenedor-noticias");

function mostrarNoticias(lista) {
    contenedor.innerHTML = "";
    lista.forEach(noticia => {
        contenedor.innerHTML += `
            <div class="noticia">
                <h2>${noticia.titulo}</h2>
                <p>${noticia.descripcion}</p>
            </div>
        `;
    });
}

function filtrarNoticias(tipo) {
    if (tipo === "todas") {
        mostrarNoticias(noticias);
    } else {
        const filtradas = noticias.filter(n => n.tipo === tipo);
        mostrarNoticias(filtradas);
    }
}

mostrarNoticias(noticias);


// 🔎 CONEXIÓN A GOOGLE NEWS (RSS)
async function cargarNoticiasReales() {
    const url = "https://api.allorigins.win/raw?url=" + 
        encodeURIComponent("https://news.google.com/rss/search?q=Nicolás+Romero+robos+choques&hl=es-419&gl=MX&ceid=MX:es");

    try {
        const respuesta = await fetch(url);
        const texto = await respuesta.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(texto, "text/xml");
        const items = xml.querySelectorAll("item");

        items.forEach((item, index) => {
            if (index < 5) { // Solo mostrar 5 noticias reales
                const titulo = item.querySelector("title").textContent;
                const descripcion = item.querySelector("description").textContent;

                contenedor.innerHTML += `
                    <div class="noticia">
                        <h2>${titulo}</h2>
                        <p>${descripcion}</p>
                    </div>
                `;
            }
        });

    } catch (error) {
        console.log("No se pudieron cargar noticias reales", error);
    }
}

cargarNoticiasReales();
