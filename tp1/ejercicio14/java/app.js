//Geolocalización

function showPosition(titulo, latitud, longitud) {
    
    // Crear e inicializar el mapa centrado en las coordenadas
    var map = L.map('mapa').setView([latitud, longitud], 15);

    // Cargar la capa de imágenes de OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Agregar un marcador en la ubicación
    L.marker([latitud, longitud]).addTo(map)
        .bindPopup(titulo)
        .openPopup();
}

// Detección y ejecución automática
document.addEventListener("DOMContentLoaded", function() {
    var contenedor = document.getElementById('mapa');

    if (contenedor) {
        var titulo = contenedor.dataset.titulo;
        var latitud = parseFloat(contenedor.dataset.lat);
        var longitud = parseFloat(contenedor.dataset.lon);

        if (titulo && !isNaN(latitud) && !isNaN(longitud)) {
            showPosition(titulo, latitud, longitud);
        }
    }
});