import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { Country } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

interface CountryFormData {
  name: string;
  favoriteCity: string;
  favoriteFood: string;
  visitedDate: string;
  flagEmoji: string;
}

function CountryFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<CountryFormData>({
    name: "",
    favoriteCity: "",
    favoriteFood: "",
    visitedDate: "",
    flagEmoji: "",
  });

  useEffect(() => {
    if (isEditing && id) {
      axios
        .get<Country>(`${API_URL}/countries/${id}`)
        .then((response) => {
          const country = response.data;
          setFormData({
            name: country.name,
            favoriteCity: country.favoriteCity || "",
            favoriteFood: country.favoriteFood || "",
            visitedDate: country.visitedDate
              ? country.visitedDate.split("T")[0]
              : "",
            flagEmoji: country.flagEmoji || "",
          });
        })
        .catch((error) => console.error(error));
    }
  }, [id, isEditing]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const request = isEditing
      ? axios.put<Country>(`${API_URL}/countries/${id}`, formData)
      : axios.post<Country>(`${API_URL}/countries`, formData);

    request
      .then((response) => {
        navigate(`/countries/${response.data.id}`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="form-container">
      <h1>{isEditing ? "✏️ Edit Country" : "✈️ Add New Country"}</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Country Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Japan"
          />
        </div>

        <div className="form-group">
          <label>Favorite City</label>
          <input
            type="text"
            name="favoriteCity"
            value={formData.favoriteCity}
            onChange={handleChange}
            placeholder="e.g., Tokyo"
          />
        </div>

        <div className="form-group">
          <label>Favorite Food</label>
          <input
            type="text"
            name="favoriteFood"
            value={formData.favoriteFood}
            onChange={handleChange}
            placeholder="e.g., Ramen"
          />
        </div>

        <div className="form-group">
          <label>Visit Date</label>
          <input
            type="date"
            name="visitedDate"
            value={formData.visitedDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Flag Emoji</label>
          <input
            type="text"
            name="flagEmoji"
            value={formData.flagEmoji}
            onChange={handleChange}
            placeholder="🇯🇵"
          />
        </div>

        <button type="submit" className="btn-primary">
          {isEditing ? "Update Country" : "Create Country"}
        </button>
      </form>
    </div>
  );
}

export default CountryFormPage;
