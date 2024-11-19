
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registro-form");
    const bandasGrid = document.getElementById("bandas-grid");

    // Cargar bandas al inicio
    fetch("http://localhost:3000/api/bandas")
        .then(response => response.json())
        .then(bandas => {
            bandas.forEach(banda => addBandaToGrid(banda));
        });

    // Manejar el envío del formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nuevaBanda = {
            logo: document.getElementById("logo").value,
            nombre: document.getElementById("nombre").value,
            pais: document.getElementById("pais").value,
            spotify: document.getElementById("spotify").value,
            youtube: document.getElementById("youtube").value,
            facebook: document.getElementById("facebook").value,
            instagram: document.getElementById("instagram").value,
        };

        fetch("http://localhost:3000/api/bandas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaBanda),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    addBandaToGrid(nuevaBanda);
                    form.reset();
                }
            });
    });

    // Función para añadir una banda al grid
    function addBandaToGrid(banda) {
        const bandaCard = document.createElement("div");
        bandaCard.classList.add("banda-card");
        bandaCard.innerHTML = `
            <img src="${banda.logo}" alt="${banda.nombre}">
            <h3>${banda.nombre}</h3>
            <p>${banda.pais}</p>
            <div class="social-icons">
                ${banda.spotify ? `<a href="${banda.spotify}" target="_blank">Spotify</a>` : ""}
                ${banda.youtube ? `<a href="${banda.youtube}" target="_blank">YouTube</a>` : ""}
                ${banda.facebook ? `<a href="${banda.facebook}" target="_blank">Facebook</a>` : ""}
                ${banda.instagram ? `<a href="${banda.instagram}" target="_blank">Instagram</a>` : ""}
            </div>
        `;
        bandasGrid.appendChild(bandaCard);
    }
});
