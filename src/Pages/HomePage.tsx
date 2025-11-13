import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { Country } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL:", API_URL);
console.log("Full URL:", `${API_URL}/countries`);

function CountryFlag({ countryCode }: { countryCode: string }) {
  const [FlagComponent, setFlagComponent] = useState<any>(null);

  useEffect(() => {
    // Dynamic import for Vite
    import(`country-flag-icons/react/3x2/${countryCode.toUpperCase()}.js`)
      .then((module) => {
        setFlagComponent(() => module.default);
      })
      .catch((error) => {
        console.error(`Flag not found for: ${countryCode}`, error);
      });
  }, [countryCode]);

  if (!FlagComponent) return null;

  return (
    <FlagComponent
      style={{ width: "24px", height: "16px", marginRight: "8px" }}
    />
  );
}

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
            <h2 style={{ display: "flex", alignItems: "center" }}>
              {country.countryCode ? (
                <CountryFlag countryCode={country.countryCode} />
              ) : (
                <span style={{ marginRight: "8px" }}>{country.flagEmoji}</span>
              )}
              {country.name}
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
