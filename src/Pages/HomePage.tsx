import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { Country } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL:", API_URL);
console.log("Full URL:", `${API_URL}/countries`);

function HomePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Country[]>(`${API_URL}/countries`)
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading your adventures...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🗺️ Where Have I Been?</h1>
        <p>
          You've visited {countries.length}{" "}
          {countries.length === 1 ? "country" : "countries"}!
        </p>
      </div>

      <div className="countries-grid">
        {countries.map((country) => (
          <Link
            key={country.id}
            to={`/countries/${country.id}`}
            className="country-card"
          >
            <h2>
              {country.flagEmoji} {country.name}
            </h2>
            <p>📍 {country.favoriteCity || "No favorite city yet"}</p>
            <p>🍽️ {country.favoriteFood || "No favorite food yet"}</p>
            <p>
              💭 {country.memories?.length || 0}{" "}
              {country.memories?.length === 1 ? "memory" : "memories"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
