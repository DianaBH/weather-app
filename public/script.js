async function fetchWeather() {
    const location = document.getElementById("locationInput").value;
    const result = document.getElementById("weatherResult");
    const icon = document.getElementById("weatherIcon");

    if (!location) {
        result.innerText = "Por favor, ingrese una ciudad.";
        icon.src = "";
        return;
    }

    result.innerText = "Cargando...";
    try {
        const response = await fetch(`/weather?location=${location}`);
        const data = await response.json();

        if (data.error) {
            result.innerText = "No se encontró la ciudad.";
            icon.src = "";
        } else {
            result.innerHTML = `<strong>${data.location.name}</strong>: ${data.current.weather_descriptions[0]}, ${data.current.temperature}°C`;
            icon.src = data.current.weather_icons[0]; 
        }
    } catch (error) {
        result.innerText = "Error al obtener los datos del clima.";
        icon.src = "";
    }
}
