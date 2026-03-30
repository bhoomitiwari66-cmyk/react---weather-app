import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return alert("Please enter a city name");
    
    setLoading(true);
    const apiKey = "0199c929083e2566e1c9d68738b900c3"; // Replace with your OpenWeatherMap API key"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === "404") {
        alert("City not found!");
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌤️ Weather App</h1>

        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Enter city..."
            style={styles.input}
            onChange={(e) => setCity(e.target.value)}
          />
          <button style={styles.button} onClick={getWeather}>
            {loading ? "..." : "Search"}
          </button>
        </div>

        {weather && weather.main && (
          <div style={styles.result}>
            <h2 style={styles.cityName}>{weather.name}</h2>
            {/* Dynamic Icon from OpenWeatherMap */}
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon" 
            />
            <div style={styles.temp}>{Math.round(weather.main.temp)}°C</div>
            <p style={styles.desc}>{weather.weather[0].description}</p>
            
            <div style={styles.details}>
              <span>💧 Humidity: {weather.main.humidity}%</span>
              <span>💨 Wind: {weather.wind.speed} m/s</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ✨ Styles object for a professional look
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    color: "white",
    width: "350px",
    textAlign: "center",
  },
  title: { fontSize: "24px", marginBottom: "20px" },
  searchBox: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ff7e5f",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cityName: { fontSize: "28px", margin: "10px 0" },
  temp: { fontSize: "48px", fontWeight: "bold" },
  desc: { textTransform: "capitalize", fontSize: "18px", opacity: 0.8 },
  details: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    fontSize: "14px",
    borderTop: "1px solid rgba(255,255,255,0.3)",
    paddingTop: "15px",
  }
};

export default App;